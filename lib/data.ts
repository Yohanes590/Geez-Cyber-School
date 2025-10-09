export interface Course {
  id: string;
  name: string;
  studentId: string;
}

export interface User {
  id: string;
  name: string;
}

export const users: User[] = [
  { id: 'user1', name: 'Alice' },
  { id: 'user2', name: 'Bob' },
];

export const courses: Course[] = [
  { id: 'c1', name: 'Math 101', studentId: 'user1' },
  { id: 'c2', name: 'History 201', studentId: 'user1' },
  { id: 'c3', name: 'Physics 301', studentId: 'user2' },
];

export function getCoursesByStudent(studentId: string): Course[] {
  return courses.filter((c) => c.studentId === studentId);
}