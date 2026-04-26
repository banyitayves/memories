import { NextResponse } from 'next/server';

export async function GET() {
  const notifications = [
    {
      id: 1,
      bookId: 5,
      title: 'The Book of Joy',
      message: 'Your reserved book is ready for pickup!',
      readyDate: new Date().toISOString(),
      shelf: 'Circulation Desk - Shelf A',
    },
  ];

  return NextResponse.json({ notifications });
}
