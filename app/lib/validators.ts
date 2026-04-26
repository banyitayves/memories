// Utility functions for data validation and formatting

export interface Course {
  id: number;
  name: string;
  subject: string;
  instructor: string;
  progress: number;
  completed: number;
  lessons: number;
}

export interface Note {
  id: number;
  title: string;
  content: string;
  course: string;
  tags: string[];
  createdAt: string;
}

export function validateCourse(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.name || typeof data.name !== 'string') {
    errors.push('Course name is required and must be a string');
  }
  if (!data.subject || typeof data.subject !== 'string') {
    errors.push('Subject is required and must be a string');
  }
  if (!data.instructor || typeof data.instructor !== 'string') {
    errors.push('Instructor is required and must be a string');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateNote(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.title || typeof data.title !== 'string') {
    errors.push('Note title is required and must be a string');
  }
  if (!data.content || typeof data.content !== 'string') {
    errors.push('Note content is required and must be a string');
  }
  if (!data.course || typeof data.course !== 'string') {
    errors.push('Course is required and must be a string');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function calculateDaysAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  return `${diffDays} days ago`;
}
