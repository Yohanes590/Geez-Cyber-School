import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Course {
  id: string;
  teacher: string;
  subject: string;
  studentEmail: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  // NO AUTH CHECKS HERE—intentionally vulnerable to IDOR!
  // Anyone can pass ?studentid=<email> and get the student's courses/subjects.

  if (!id) {
    return NextResponse.json({ error: 'Student ID (email) required' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: id as string },
      select: {
        id: true,
        full_name: true,
        user_email: true,
        user_subject: true, // Json field: array of { [teacher: string]: { [subjectKey: string]: string } }
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    // Flatten user_subject Json into course objects: { id, teacher, subject, studentEmail }
    const courses: Course[] = [];
    if (user.user_subject && Array.isArray(user.user_subject)) {
      (user.user_subject as Record<string, any>[]).forEach((teacherObj) => {
        const teacherName = Object.keys(teacherObj)[0];
        const subjectsObj = teacherObj[teacherName];
        if (subjectsObj && typeof subjectsObj === 'object') {
          Object.values(subjectsObj as Record<string, string>).forEach((subjectName: string) => {
            if (typeof subjectName === 'string') {
              courses.push({
                id: `${user.id}-${teacherName}-${subjectName}`.replace(/\s+/g, '-'), // Generated ID, sanitized
                teacher: teacherName,
                subject: subjectName,
                studentEmail: user.user_email,
              });
            }
          });
        }
      });
    }

    return NextResponse.json({
      student: { name: user.full_name, email: user.user_email },
      courses,
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}