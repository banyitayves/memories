import { NextRequest, NextResponse } from 'next/server';

// In-memory storage (for demo; use a database in production)
let notesData = [
  {
    id: 1,
    title: 'React Hooks Explained',
    content: 'useState and useEffect are fundamental hooks in React...',
    course: 'React Advanced',
    tags: ['react', 'hooks', 'javascript'],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    title: 'CSS Flexbox Guide',
    content: 'Flexbox is a powerful layout tool...',
    course: 'Web Development Fundamentals',
    tags: ['css', 'flexbox', 'layout'],
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

let noteIdCounter = 3;

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      notes: notesData,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch notes' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, content, course, tags } = await request.json();

    if (!title || !content || !course) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newNote = {
      id: noteIdCounter++,
      title,
      content,
      course,
      tags: tags || [],
      createdAt: new Date().toISOString(),
    };

    notesData.push(newNote);

    return NextResponse.json(
      { success: true, note: newNote },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create note' },
      { status: 500 }
    );
  }
}
