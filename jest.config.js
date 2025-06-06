const isCI = process.env.CI === 'true' || process.env.GITHUB_ACTIONS === 'true';

module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: [
    'miyako-maps-search.js',
    '!node_modules/**',
    '!coverage/**'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  testMatch: [
    '**/tests/**/*.test.js',
    '**/tests/**/*.spec.js'
  ],
  // CI環境では高速化設定
  testTimeout: isCI ? 10000 : 30000,
  maxWorkers: isCI ? 2 : '50%',
  // CI環境では重いE2Eテストを制限
  testPathIgnorePatterns: isCI ? [
    '/node_modules/',
    // 重いネットワークテストはCIでスキップ
    '/tests/e2e/.*heavy.*'
  ] : ['/node_modules/'],
  verbose: true,
  // CI環境でのエラー許容度を上げる
  bail: isCI ? false : 1,
  // 並列実行の最適化
  detectOpenHandles: !isCI,
  forceExit: isCI,
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js']
};