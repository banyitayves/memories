import { NextResponse } from 'next/server';

export async function GET() {
  const rentals = [
    {
      id: 1,
      equipmentId: 1,
      equipmentName: 'Laptop',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
    },
  ];

  return NextResponse.json({ rentals });
}

export async function POST(request: Request) {
  const { equipmentId } = await request.json();

  return NextResponse.json({
    success: true,
    rental: {
      id: Math.random(),
      equipmentId,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
  });
}
