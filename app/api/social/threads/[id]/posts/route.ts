import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const posts = [
    {
      id: 1,
      author: 'Sarah M.',
      content: 'I recommend starting with PubMed for peer-reviewed articles.',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      likes: 5,
    },
    {
      id: 2,
      author: 'David L.',
      content: 'Also check out Google Scholar and ResearchGate for preprints.',
      timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
      likes: 3,
    },
  ];

  return NextResponse.json({ posts });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { content } = await request.json();

  return NextResponse.json({
    success: true,
    post: {
      id: Math.random(),
      content,
      timestamp: new Date().toISOString(),
    },
  });
}
