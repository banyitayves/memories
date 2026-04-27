import { NextResponse } from 'next/server';

export async function GET() {
  const books = [
    {
      id: 1,
      title: 'The Midnight Library',
      author: 'Matt Haig',
      tags: ['Fiction', 'Bestseller'],
      arrivalDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      trending: true,
    },
    {
      id: 2,
      title: 'Lessons in Chemistry',
      author: 'Bonnie Garmus',
      tags: ['Fiction', 'Drama'],
      arrivalDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      trending: true,
    },
    {
      id: 3,
      title: 'Atomic Habits',
      author: 'James Clear',
      tags: ['Self-Help', 'Productivity'],
      arrivalDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      trending: true,
    },
    {
      id: 4,
      title: 'Project Hail Mary',
      author: 'Andy Weir',
      tags: ['Sci-Fi', 'Adventure'],
      arrivalDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      trending: false,
    },
    {
      id: 5,
      title: 'Educated',
      author: 'Tara Westover',
      tags: ['Memoir', 'Education'],
      arrivalDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      trending: false,
    },
    {
      id: 6,
      title: 'The Seven Husbands',
      author: 'Taylor Jenkins Reid',
      tags: ['Fiction', 'Mystery'],
      arrivalDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
      trending: false,
    },
  ];

  return NextResponse.json({ books });
}
