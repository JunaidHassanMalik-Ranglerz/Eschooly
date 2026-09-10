const DEFAULT_OPTIONS = [
  {key: 'A', value: '5'},
  {key: 'B', value: '6'},
  {key: 'C', value: '7'},
  {key: 'D', value: '8'},
];

export const MIDTERM_EXAM = {
  title: 'Mid-Term Mathematics',
  className: 'Class 10A',
  totalMarks: 100,
  totalQuestions: 25,
};

export const EXAM_QUESTIONS = Array.from({length: 25}, (_, index) => ({
  id: index + 1,
  marks: 4,
  text:
    index === 4
      ? 'If 2x + 5 = 17, what is the value of x?'
      : `Solve the equation for question ${index + 1}.`,
  options: DEFAULT_OPTIONS.map(opt => ({...opt})),
}));

export const INITIAL_ANSWERS = {0: 'A', 1: 'B', 2: 'C', 3: 'B'};
export const INITIAL_FLAGGED = [3];
export const INITIAL_QUESTION_INDEX = 4;
