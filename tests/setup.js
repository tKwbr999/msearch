// Test setup file
global.console = {
  ...console,
  // 実際のテスト中はログを抑制
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
};