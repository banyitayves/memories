import { NextResponse } from 'next/server';

export async function GET() {
  const threads = [
    {
      id: 1,
      title: 'Best resources for Biology research papers?',
      author: 'Sarah M.',
      category: 'Biology',
      replies: 12,
      views: 145,
      lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 2,
      title: 'Study group for Organic Chemistry - Join us!',
      author: 'Mike Johnson',
      category: 'Chemistry',
      replies: 8,
      views: 89,
      lastActivity: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 3,
      title: 'Anyone interested in forming a Data Science club?',
      author: 'Alex K.',
      category: 'Computer Science',
      replies: 23,
      views: 234,
      lastActivity: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    },
    {
      id: 4,
      title: 'Literature discussion: Modern Poetry',
      author: 'Emma Davis',
      category: 'Literature',
      replies: 15,
      views: 112,
      lastActivity: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    },
  ];

  return NextResponse.json({ threads });
}
