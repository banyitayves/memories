import { NextRequest, NextResponse } from 'next/server';

// Mock database
const mockBooks = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', type: 'book', available: true, location: 'Shelf A1' },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', type: 'ebook', available: true, location: 'Digital' },
  { id: 3, title: 'Nature Today', author: 'John Smith', type: 'journal', available: false, location: 'Shelf B2' },
  { id: 4, title: 'Python Guide', author: 'David Johnson', type: 'book', available: true, location: 'Shelf C3' },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.toLowerCase() || '';

  if (!q) {
    return NextResponse.json({ results: [] });
  }

  const results = mockBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q) ||
      book.type.toLowerCase().includes(q)
  );

  return NextResponse.json({ results });
}
