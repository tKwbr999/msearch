# Makefile for msearch project
# 宮古島Google Maps検索ツール開発用コマンド

.PHONY: help install test lint fmt clean check dev

# デフォルトターゲット
help: ## このヘルプを表示
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

# 依存関係のインストール
install: ## 依存関係をインストール
	@echo "📦 Installing dependencies..."
	npm ci --no-audit --no-fund

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

test-e2e-docker: ## PlaywrightのDockerイメージでE2Eテストを実行
	@echo "🐳 Running E2E tests with Playwright Docker image..."
	docker run --rm \
		-v $(PWD):/workspace \
		-w /workspace \
		-e CI=true \
		-e PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 \
		mcr.microsoft.com/playwright:v1.42.1-jammy \
		/bin/bash -c "npm ci --no-audit --no-fund && npm run test:e2e-ci"

# 開発
dev: ## 開発モードで実行
	@echo "🚀 Running in development mode..."
	npm run dev

# チェック系
check: fmt-check lint ## フォーマットとリントをチェック
	@echo "✅ Format and lint checks completed"

# クリーンアップ
clean: ## ビルド成果物とnode_modulesを削除
	@echo "🧹 Cleaning up..."
	rm -rf build/ node_modules/ coverage/ *.tgz

# 情報表示
info: ## プロジェクト情報を表示
	@echo "📋 Project Information:"
	@echo "  Name: msearch"
	@echo "  Description: 宮古諸島専用Google Mapsコマンドライン検索ツール"
	@echo "  Node.js: $(shell node --version 2>/dev/null || echo 'Not installed')"
	@echo "  npm: $(shell npm --version 2>/dev/null || echo 'Not installed')"
