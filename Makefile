# Makefile for msearch project
# 宮古島Google Maps検索ツール開発用コマンド

.PHONY: help install build test lint fmt clean check check-all dev

# デフォルトターゲット
help: ## このヘルプを表示
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

# 依存関係のインストール
install: ## 依存関係をインストール
	@echo "📦 Installing dependencies..."
	npm ci --prefer-offline --no-audit --no-fund

# ビルド
build: ## TypeScriptをビルド
	@echo "🔨 Building TypeScript..."
	npm run build

# フォーマット
fmt: ## コードをフォーマット
	@echo "🎨 Formatting code..."
	npm run fmt

fmt-check: ## フォーマットをチェック（修正しない）
	@echo "🔍 Checking code formatting..."
	npm run fmt:check

# リント
lint: ## ESLintでコードをチェック
	@echo "🔍 Linting code..."
	npm run lint

lint-fix: ## ESLintでコードをチェック・修正
	@echo "🔧 Linting and fixing code..."
	npm run lint:fix

# テスト
test: ## 全テストを実行
	@echo "🧪 Running all tests..."
	npm test

test-unit: ## 単体テストを実行
	@echo "🧪 Running unit tests..."
	npm run test:unit

test-e2e: ## E2Eテストを実行
	@echo "🧪 Running E2E tests..."
	npm run test:e2e

test-lightweight: ## 軽量テストを実行
	@echo "🧪 Running lightweight tests..."
	npm run test:lightweight

test-coverage: ## カバレッジ付きテストを実行
	@echo "📊 Running tests with coverage..."
	npm run test:coverage

# 開発
dev: ## 開発モードで実行
	@echo "🚀 Running in development mode..."
	npm run dev

start: ## アプリケーションを開始
	@echo "▶️  Starting application..."
	npm start

# Docker関連
docker-build: ## Dockerイメージをビルド
	@echo "🐳 Building Docker image..."
	npm run docker:build

docker-test: ## Dockerでテストを実行
	@echo "🐳 Running tests in Docker..."
	npm run docker:test

# チェック系
check: fmt-check lint ## フォーマットとリントをチェック
	@echo "✅ Format and lint checks completed"

check-all: check test ## 全チェック（フォーマット・リント・テスト）
	@echo "✅ All checks completed"

# クリーンアップ
clean: ## ビルド成果物とnode_modulesを削除
	@echo "🧹 Cleaning up..."
	rm -rf build/
	rm -rf node_modules/
	rm -rf coverage/
	rm -f *.tgz

# CI用コマンド
ci-install: ## CI用の依存関係インストール
	@echo "🤖 Installing dependencies for CI..."
	export PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 && \
	export PUPPETEER_SKIP_DOWNLOAD=1 && \
	npm ci --prefer-offline --no-audit --no-fund --silent

ci-test: ## CI用テスト実行
	@echo "🤖 Running tests for CI..."
	export CI=true NODE_ENV=test && npm test

# 情報表示
info: ## プロジェクト情報を表示
	@echo "📋 Project Information:"
	@echo "  Name: msearch"
	@echo "  Description: 宮古諸島専用Google Mapsコマンドライン検索ツール"
	@echo "  Node.js: $(shell node --version 2>/dev/null || echo 'Not installed')"
	@echo "  npm: $(shell npm --version 2>/dev/null || echo 'Not installed')"
	@echo "  Git: $(shell git --version 2>/dev/null || echo 'Not installed')"
