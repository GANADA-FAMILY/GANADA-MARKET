module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
      diagnostics: true,
    },
  },
  moduleFileExtensions: ['ts', 'js', 'tsx', 'jsx'],
  moduleNameMapper: {
    // 절대 경로
    '^src/(.*)': '<rootDir>/src/$1',
  },
  transformIgnorePatterns: ['./node_modules/'],
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['**/test/**/*.test.(ts|tsx)'],
  testEnvironment: 'jsdom',
  snapshotSerializers: ['@emotion/jest/serializer'],
  setupFilesAfterEnv: ['./test/setup.ts'],
};
