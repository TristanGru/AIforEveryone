import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testPathPattern: 'tests/(unit|integration)',
  collectCoverageFrom: [
    'src/lib/**/*.ts',
    'scripts/**/*.ts',
    '!src/lib/content/schema-version.ts',
  ],
}

export default createJestConfig(config)
