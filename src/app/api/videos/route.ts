import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabaseClient';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const projectSlug = searchParams.get('project');

  if (!projectSlug) {
    return NextResponse.json(
      { error: 'Project slug is required' },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from('project_videos')
    .select('*')
    .eq('project_slug', projectSlug)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
