export const calculateSubjectResult = (
  subjects: Record<string, number>,
  classTests: number[],
) => {
  if (classTests.length !== 4) {
    throw new Error('Exactly 4 class test marks must be provided.');
  }

  const bestThree = classTests.sort((a, b) => b - a).slice(0, 3);
  const classTestTotal = bestThree.reduce((sum, mark) => sum + mark, 0);

  const subjectTotal = Object.values(subjects).reduce(
    (sum, mark) => sum + mark,
    0,
  );
  const total = classTestTotal + subjectTotal;

  const status = total >= 120 ? 'PASS' : 'FAIL';
  return { total, status };
};
