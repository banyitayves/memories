import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Simulate loan renewal
  return NextResponse.json({ success: true, message: 'Book renewed for 14 more days' });
}
