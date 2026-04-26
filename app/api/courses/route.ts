import { NextRequest, NextResponse } from 'next/server';

// In-memory storage (for demo; use a database in production)
let coursesData = [
  {
    id: 1,
    name: 'Web Development Fundamentals',
    subject: 'Web Development',
    instructor: 'John Smith',
    progress: 65,
    completed: 13,
    lessons: 20,
  },
  {
    id: 2,
    name: 'JavaScript Basics',
    subject: 'Programming',
    instructor: 'Sarah Johnson',
    progress: 45,
    completed: 9,
    lessons: 20,
  },
  {
    id: 3,
    name: 'React Advanced',
    subject: 'Frontend',
    instructor: 'Mike Davis',
    progress: 80,
    completed: 16,
    lessons: 20,
  },
];

let courseIdCounter = 4;

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      courses: coursesData,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, subject, instructor } = await request.json();

    if (!name || !subject || !instructor) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newCourse = {
      id: courseIdCounter++,
      name,
      subject,
      instructor,
      progress: 0,
      completed: 0,
      lessons: 20,
    };

    coursesData.push(newCourse);

    return NextResponse.json(
      { success: true, course: newCourse },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create course' },
      { status: 500 }
    );
  }
}
