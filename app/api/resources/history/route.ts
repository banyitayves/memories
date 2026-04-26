import { NextResponse } from 'next/server';

export async function GET() {
  const history = [
    {
      id: 1,
      title: 'Atomic Habits',
      author: 'James Clear',
      finishedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 2,
      title: 'Educated',
      author: 'Tara Westover',
      finishedDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  return NextResponse.json({ history });
}
