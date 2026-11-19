module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  testMatch: [
    '**/__tests__/parentFees.mapping.test.js',
    '**/__tests__/homeEnterSession.test.js',
    '**/__tests__/parentResultCard.test.js',
    '**/__tests__/studentAssignmentDocument.test.js',
  ],
  transformIgnorePatterns: ['/node_modules/'],
};
