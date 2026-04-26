import { NextResponse } from 'next/server';

export async function GET() {
  const loans = [
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
    },
    {
      id: 2,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
    },
    {
      id: 3,
      title: 'Python Programming',
      author: 'David Johnson',
      dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'overdue',
    },
  ];

  return NextResponse.json({ loans });
}

export async function POST(request: Request) {
  const { loanId } = await request.json();
  // Simulate renewal
  return NextResponse.json({ success: true, message: 'Book renewed successfully' });
}
