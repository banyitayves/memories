import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { roomId, date, time } = await request.json();

  return NextResponse.json({
    success: true,
    booking: {
      id: Math.random(),
      roomId,
      date,
      time,
      bookedAt: new Date().toISOString(),
    },
  });
}
