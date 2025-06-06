import { NextResponse } from 'next/server';
import { sql } from '@/app/lib/neonClient';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const projectSlug = searchParams.get('project');

  if (!projectSlug) {
    return NextResponse.json(
      { error: 'Project slug or idea ID is required' },
      { status: 400 }
    );
  }

  try {
    let data = await sql`
      SELECT 
        id,
        item_type,
        item_identifier,
        filename,
        content_type,
        file_size,
        created_at
      FROM project_videos 
      WHERE item_type = 'project' AND item_identifier = ${projectSlug}
      ORDER BY created_at DESC
    `;

    if (data.length === 0) {
      data = await sql`
        SELECT 
          id,
          item_type,
          item_identifier,
          filename,
          content_type,
          file_size,
          created_at
        FROM project_videos 
        WHERE item_type = 'idea' AND item_identifier = ${projectSlug}
        ORDER BY created_at DESC
      `;
    }

    const videosWithApiUrls = data.map(video => ({
      ...video,
      video_url: `/api/videos/stream/${video.id}`,
    }));

    return NextResponse.json(videosWithApiUrls);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Neon database error:', error);
    }
    return NextResponse.json(
      { error: 'Database query failed' },
      { status: 500 }
    );
  }
}
