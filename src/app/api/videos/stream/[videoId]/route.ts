import { NextRequest, NextResponse } from 'next/server';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { r2Client, BUCKET_NAME } from '@/app/lib/r2Client';
import { sql } from '@/app/lib/neonClient';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ videoId: string }> }
) {
  try {
    const { videoId } = await params;

    const videoResult = await sql`
      SELECT * FROM project_videos 
      WHERE id = ${videoId}
    `;

    if (videoResult.length === 0) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    const video = videoResult[0];

    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: video.filename,
    });

    const r2Response = await r2Client.send(command);

    if (!r2Response.Body) {
      return NextResponse.json(
        { error: 'Video file not found in storage' },
        { status: 404 }
      );
    }

    const chunks: Uint8Array[] = [];
    const reader = r2Response.Body.transformToWebStream().getReader();

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      chunks.push(value);
    }

    const buffer = Buffer.concat(chunks);

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': video.content_type || 'video/mp4',
        'Content-Length': buffer.length.toString(),
        'Cache-Control':
          'public, max-age=86400, stale-while-revalidate=31536000',
        'Accept-Ranges': 'bytes',
        ETag: `"${video.id}-${video.file_size}"`,
        Vary: 'Accept-Encoding',
      },
    });
  } catch (error) {
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
