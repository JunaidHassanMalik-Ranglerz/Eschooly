module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  testMatch: ['**/__tests__/parentFees.mapping.test.js'],
  transformIgnorePatterns: ['/node_modules/'],
};
