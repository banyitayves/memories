import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { message } = await request.json();

  // Simulate librarian response
  const responses: Record<string, string> = {
    citation: 'For citations, we recommend using our Citation Generator tool. You can find it in the Learning Support section.',
    book: 'Use our search bar to find books by title, author, or subject. I can help you find specific resources!',
    research: 'For research help, our subject guides can point you to the best databases for your field.',
    default: 'Thank you for your question! A librarian will respond shortly with help.',
  };

  let response = responses.default;
  for (const [key, value] of Object.entries(responses)) {
    if (message.toLowerCase().includes(key)) {
      response = value;
      break;
    }
  }

  return NextResponse.json({ response });
}
