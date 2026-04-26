import { NextResponse } from 'next/server';

export async function GET() {
  const holds = [
    {
      id: 1,
      title: 'The Midnight Library',
      author: 'Matt Haig',
      position: 3,
      estimatedReady: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 2,
      title: 'Verity',
      author: 'Colleen Hoover',
      position: 7,
      estimatedReady: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  return NextResponse.json({ holds });
}

export async function DELETE(request: Request) {
  return NextResponse.json({ success: true, message: 'Hold cancelled' });
}
