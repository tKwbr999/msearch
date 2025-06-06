#!/bin/bash
set -e

echo "🐳 Docker E2E Testing Environment"
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"
echo "Jest version: $(jest --version 2>/dev/null || echo 'not found')"

# 環境変数を設定
export CI=true
export NODE_ENV=test
export PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
export NPM_CONFIG_LOGLEVEL=error

# 引数に応じてテストを実行
case "${1:-test}" in
  "test")
    echo "🧪 Running all tests..."
    npm test
    ;;
  "test:unit")
    echo "🔬 Running unit tests..."
    npm run test:unit
    ;;
  "test:e2e")
    echo "🚀 Running E2E tests..."
    npm run test:e2e
    ;;
  "test:lightweight")
    echo "⚡ Running lightweight tests..."
    npm run test:lightweight
    ;;
  "lint")
    echo "🔍 Running linting..."
    npm run lint
    ;;
  "check-all")
    echo "✅ Running all checks..."
    make check-all
    ;;
  *)
    echo "Running custom command: $@"
    exec "$@"
    ;;
esac