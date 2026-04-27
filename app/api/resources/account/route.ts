import { NextResponse } from 'next/server';

export async function GET() {
  const account = {
    name: 'John Student',
    studentId: 'STU001234',
    email: 'john@university.edu',
    currentLoans: 5,
    fineAmount: 2.50,
  };

  return NextResponse.json({ account });
}
