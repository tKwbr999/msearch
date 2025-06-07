# Makefile for msearch project
# 宮古島Google Maps検索ツール開発用コマンド

.PHONY: help install test lint fmt clean check dev check-ci test-e2e-ci test-e2e-ci-docker test-unit-ci uninstall reinstall update-deps update-deps-major check-deps audit

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
		/bin/bash -c "npm install jest@29.7.0 cheerio@1.0.0-rc.12 --no-save --silent && npm run test:e2e-ci"

test-e2e-ci: ## CI用の最小依存関係でE2Eテストを実行
	@echo "🤖 Running E2E tests with minimal dependencies..."
	@export PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 && \
	export PUPPETEER_SKIP_DOWNLOAD=1 && \
	npm install jest@29.7.0 playwright@1.42.1 cheerio@1.0.0-rc.12 --no-save --silent && \
	npm run test:e2e-ci

test-e2e-ci-docker: ## Docker環境用の最小依存関係でE2Eテストを実行（Playwrightプリインストール済み）
	@echo "🤖 Running E2E tests with minimal dependencies (Docker environment)..."
	@npm install jest@29.7.0 cheerio@1.0.0-rc.12 --no-save --silent && \
	npm run test:e2e-ci

test-unit-ci: ## CI用の最小依存関係で単体テストを実行
	@echo "🤖 Running unit tests with minimal dependencies..."
	@npm install jest@29.7.0 --no-save --silent && \
	npm run test:unit

# ビルド
build: ## TypeScriptをビルド
	@echo "🔨 Building TypeScript..."
	npm run build

# 開発
dev: ## 開発モードで実行
	@echo "🚀 Running in development mode..."
	npm run dev

# YAML構文チェック
yaml-check: ## YAML構文をチェック
	@echo "📝 Checking YAML syntax..."
	@if command -v yamllint >/dev/null 2>&1; then \
		yamllint .github/workflows/; \
	elif command -v python3 >/dev/null 2>&1; then \
		python3 -c "import sys; exec('try:\\n import yaml\\nexcept ImportError:\\n print(\"Installing PyYAML...\"); import subprocess; subprocess.check_call([sys.executable, \"-m\", \"pip\", \"install\", \"PyYAML\"]); import yaml\\nfor f in sys.argv[1:]:\\n try:\\n  with open(f) as file: yaml.safe_load(file); print(f\"✅ {f} is valid\")\\n except Exception as e: print(f\"❌ {f}: {e}\"); sys.exit(1)')" .github/workflows/*.yml; \
	else \
		echo "⚠️  yamllint or python3 not found. Skipping YAML validation."; \
	fi
	@echo "✅ YAML syntax check completed"

# チェック系
check: fmt-check lint yaml-check ## フォーマットとリントとYAMLをチェック
	@echo "✅ Format, lint, and YAML checks completed"

check-ci: ## CI用の最小依存関係でフォーマット・リントチェック
	@echo "🤖 Running CI checks with minimal dependencies..."
	@export PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 && \
	export PUPPETEER_SKIP_DOWNLOAD=1 && \
	npm install prettier eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-prettier typescript@~5.5.0 --no-save --silent && \
	echo "🔍 Checking code formatting..." && \
	npx prettier --check "**/*.{ts,json,md}" --ignore-path .prettierignore && \
	echo "🔍 Linting code..." && \
	npx eslint . --ext .ts --ignore-path .eslintignore && \
	echo "✅ CI checks completed"

# クリーンアップ
clean: ## ビルド成果物とnode_modulesを削除
	@echo "🧹 Cleaning up..."
	rm -rf build/ node_modules/ coverage/ *.tgz

# グローバルインストール管理
uninstall: ## グローバルパッケージをアンインストール
	@echo "🗑️  Uninstalling msearch globally..."
	npm uninstall -g msearch

reinstall: uninstall ## アンインストール後に再インストール
	@echo "🔄 Reinstalling msearch globally..."
	npm install -g .
	@echo "✅ Reinstall completed"

# パッケージ管理
update-deps: ## 依存関係を最新バージョンに更新
	@echo "📦 Updating dependencies to latest versions..."
	npm update
	@echo "🔍 Checking for outdated packages..."
	npm outdated || echo "All packages are up to date"

update-deps-major: ## メジャーバージョンアップも含めて依存関係を更新
	@echo "🚀 Updating dependencies including major versions..."
	npx npm-check-updates -u
	npm install
	@echo "✅ Dependencies updated to latest versions"

check-deps: ## 古いパッケージをチェック
	@echo "🔍 Checking for outdated packages..."
	npm outdated

audit: ## セキュリティ監査を実行
	@echo "🔒 Running security audit..."
	npm audit

# 情報表示
info: ## プロジェクト情報を表示
	@echo "📋 Project Information:"
	@echo "  Name: msearch"
	@echo "  Description: 宮古諸島専用Google Mapsコマンドライン検索ツール"
	@echo "  Node.js: $(shell node --version 2>/dev/null || echo 'Not installed')"
	@echo "  npm: $(shell npm --version 2>/dev/null || echo 'Not installed')"
