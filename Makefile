# Makefile for msearch project (v2.0 - SOLID Architecture)
# 宮古諸島ハイブリッドAPI検索CLIツール開発用コマンド

.PHONY: help install test lint fmt clean check dev check-ci test-e2e-ci test-unit-ci uninstall reinstall install-clean update-deps update-deps-major check-deps audit build start check-all info check-install

# デフォルトターゲット
help: ## このヘルプを表示
	@echo "Available commands for msearch v2.0 (SOLID Architecture):"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

# 依存関係のインストール
install: ## 依存関係をインストール
	@echo "📦 Installing dependencies for SOLID architecture..."
	npm ci --no-audit --no-fund

# ビルド・SOLID アーキテクチャ
build: ## TypeScriptをビルド（src/からルートへ）
	@echo "🏗️ Building TypeScript with SOLID architecture..."
	npm run build
	@echo "✅ Build completed: main.js, handlers/, services/ generated"

start: ## ビルド済みメインファイルを実行
	@echo "🚀 Starting built application..."
	npm run start

# 開発
dev: ## TypeScript watchモードで開発
	@echo "🔄 Running TypeScript in watch mode..."
	npm run dev

# フォーマット
fmt: ## コードをフォーマット
	@echo "🎨 Formatting TypeScript code..."
	npm run fmt

fmt-check: ## フォーマットをチェック（修正しない）
	@echo "🔍 Checking code formatting..."
	npm run fmt:check

# リント
lint: ## ESLintでコードをチェック
	@echo "🔍 Linting TypeScript code..."
	npm run lint

lint-fix: ## ESLintでコードをチェック・修正
	@echo "🔧 Linting and fixing TypeScript code..."
	npm run lint:fix

# テスト
test: ## 全テストを実行
	@echo "🧪 Running all tests for SOLID architecture..."
	npm test

test-unit: ## 単体テストを実行
	@echo "🧪 Running unit tests..."
	npm run test:unit

test-e2e: ## E2Eテストを実行
	@echo "🧪 Running E2E tests for Hybrid API..."
	npm run test:e2e

test-e2e-ci: ## CI用のE2Eテストを実行（Hybrid API版）
	@echo "🤖 Running E2E tests for Hybrid API version..."
	@npm install jest@29.7.0 axios@1.9.0 dotenv@16.5.0 --no-save --silent && \
	npm run test:e2e-ci

test-unit-ci: ## CI用の最小依存関係で単体テストを実行
	@echo "🤖 Running unit tests with minimal dependencies..."
	@npm install jest@29.7.0 --no-save --silent && \
	npm run test:unit

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

check-all: build lint fmt test ## 全チェック（ビルド+リント+フォーマット+テスト）
	@echo "✅ All checks completed for SOLID architecture version"

check-ci: ## CI用のフォーマット・リントチェック（SOLID版）
	@echo "🤖 Running CI checks for SOLID architecture..."
	@npm install prettier@3.2.5 eslint@9.28.0 @typescript-eslint/eslint-plugin@8.33.1 @typescript-eslint/parser@8.33.1 eslint-config-prettier@10.1.5 eslint-plugin-prettier@5.1.3 typescript@5.5.4 --no-save --silent && \
	echo "🔍 Checking TypeScript formatting..." && \
	npx prettier --check "src/**/*.ts" "*.{ts,json,md}" && \
	echo "🔍 Linting TypeScript code..." && \
	npx eslint src/ tests/ && \
	echo "✅ CI checks completed for SOLID architecture"

# クリーンアップ
clean: ## ビルド成果物とnode_modulesを削除（SOLID版）
	@echo "🧹 Cleaning SOLID architecture build artifacts..."
	rm -rf main.js handlers/ services/ types.js config.js node_modules/ coverage/ *.tgz
	@echo "✅ Cleaned: Compiled JS files, node_modules, coverage removed"

# ローカルインストール管理
install-clean: build ## ビルド後にローカルからグローバルインストール
	@echo "📦 Installing locally built version globally..."
	npm install -g .
	@echo "✅ Local installation completed"

check-install: ## インストール状況を確認
	@echo "🔍 Checking installation status..."
	@echo "Global msearch location: $$(which msearch 2>/dev/null || echo 'Not installed globally')"
	@echo "Version: $$(msearch --help 2>/dev/null | head -1 || echo 'Not accessible')"
	@echo "Local build status: $$(test -f main.js && echo 'Built' || echo 'Not built')"

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
info: ## プロジェクト情報を表示（SOLID版）
	@echo "📋 Project Information (v2.0 SOLID Architecture):"
	@echo "  Name: msearch"
	@echo "  Description: 宮古諸島ハイブリッドAPI検索CLIツール"
	@echo "  Architecture: SOLID Principles + Service-Oriented"
	@echo "  APIs: OpenStreetMap Overpass + Foursquare Places"
	@echo "  Language: TypeScript + JavaScript (Node.js)"
	@echo "  Node.js: $(shell node --version 2>/dev/null || echo 'Not installed')"
	@echo "  npm: $(shell npm --version 2>/dev/null || echo 'Not installed')"
	@echo "  Build Status: $(shell test -f main.js && echo '✅ Built' || echo '❌ Not built')"
	@echo "  Global Install: $(shell which msearch >/dev/null 2>&1 && echo '✅ Installed' || echo '❌ Not installed')"