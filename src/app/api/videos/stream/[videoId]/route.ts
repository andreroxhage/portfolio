import { NextRequest, NextResponse } from 'next/server';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { r2Client, BUCKET_NAME } from '@/app/lib/r2Client';
import { sql } from '@/app/lib/neonClient';

// Accepts integer or UUID ids; rejects anything else before hitting the DB.
const VIDEO_ID_PATTERN = /^[0-9a-fA-F-]{1,36}$/;

// Only single-range requests of the form `bytes=start-end` are forwarded to R2.
const RANGE_PATTERN = /^bytes=(\d*)-(\d*)$/;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ videoId: string }> }
) {
  try {
    const { videoId } = await params;

    if (!VIDEO_ID_PATTERN.test(videoId)) {
      return NextResponse.json({ error: 'Invalid video id' }, { status: 400 });
    }

    const videoResult = await sql`
      SELECT id, filename, content_type, file_size FROM project_videos
      WHERE id = ${videoId}
    `;

    if (videoResult.length === 0) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    const video = videoResult[0];

    const rangeHeader = request.headers.get('range');
    const range =
      rangeHeader &&
      RANGE_PATTERN.test(rangeHeader) &&
      rangeHeader !== 'bytes=-'
        ? rangeHeader
        : undefined;

    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: video.filename,
      Range: range,
    });

    const r2Response = await r2Client.send(command);

    if (!r2Response.Body) {
      return NextResponse.json(
        { error: 'Video file not found in storage' },
        { status: 404 }
      );
    }

    const headers = new Headers({
      'Content-Type': video.content_type || 'video/mp4',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=31536000',
      'Accept-Ranges': 'bytes',
      ETag: `"${video.id}-${video.file_size}"`,
      'X-Content-Type-Options': 'nosniff',
    });

    if (r2Response.ContentLength !== undefined) {
      headers.set('Content-Length', r2Response.ContentLength.toString());
    }

    const isPartial = Boolean(range && r2Response.ContentRange);
    if (isPartial) {
      headers.set('Content-Range', r2Response.ContentRange!);
    }

    return new NextResponse(r2Response.Body.transformToWebStream(), {
      status: isPartial ? 206 : 200,
      headers,
    });
  } catch (error) {
    if ((error as { name?: string }).name === 'InvalidRange') {
      return new NextResponse(null, { status: 416 });
    }
    if (process.env.NODE_ENV === 'development') {
      console.error('Streaming error:', error);
    }
    return NextResponse.json(
      {
        error: 'Failed to load video',
        details:
          process.env.NODE_ENV === 'development'
            ? (error as Error).message
            : undefined,
      },
      { status: 500 }
    );
  }
}
