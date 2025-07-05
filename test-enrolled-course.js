// Test script to verify multiple course data handling
// This is a simple test to demonstrate the functionality

const testPayloads = [
  {
    studentId: 'student123',
    courseId: 'course456',
    courseMarks: {
      classTest1: 8,
      classTest2: 25,
      classTest3: 7,
      classTest4: 8,
      finalExam: 40,
    },
    isMarkSubmitted: true,
  },
  {
    studentId: 'student123',
    courseId: 'course789',
    subjectMarks: [
      {
        subjectName: 'Mathematics',
        marks: {
          classTest1: 9,
          classTest2: 28,
          classTest3: 8,
          classTest4: 9,
          finalTerm: 45,
        },
      },
      {
        subjectName: 'Physics',
        marks: {
          classTest1: 7,
          classTest2: 26,
          classTest3: 8,
          classTest4: 7,
          finalTerm: 42,
        },
      },
    ],
    isMarkSubmitted: true,
  },
];

console.log('Test payloads for multiple courses:');
testPayloads.forEach((payload, index) => {
  console.log(`\nCourse ${index + 1}:`);
  console.log(`- Student ID: ${payload.studentId}`);
  console.log(`- Course ID: ${payload.courseId}`);
  if (payload.courseMarks) {
    console.log(`- Type: Single subject course`);
    console.log(
      `- Total Marks: ${Object.values(payload.courseMarks).reduce(
        (sum, mark) => sum + (mark || 0),
        0,
      )}`,
    );
  } else if (payload.subjectMarks) {
    console.log(`- Type: Multi-subject course`);
    console.log(
      `- Subjects: ${payload.subjectMarks
        .map((sm) => sm.subjectName)
        .join(', ')}`,
    );
    const totalMarks = payload.subjectMarks.reduce((sum, subject) => {
      return (
        sum +
        Object.values(subject.marks).reduce((s, mark) => s + (mark || 0), 0)
      );
    }, 0);
    console.log(`- Total Marks: ${totalMarks}`);
  }
});

console.log('\nExpected behavior:');
console.log('1. Each course should be updated independently');
console.log('2. Course marks and subject marks should be preserved separately');
console.log('3. Grades should be calculated correctly for each course');
console.log(
  '4. Multiple courses for the same student should be handled properly',
);
