check:
	make lint && make fmt-check

check-all:
	make lint && make fmt-check && make test

# 並列実行用のターゲット
parallel-tests:
	npm run test:unit & \
	npm run test:lightweight & \
	npm run test:e2e-ci & \
	wait

parallel-checks:
	make lint & \
	make fmt-check & \
	wait

lint:
	npm run lint

fmt:
	npm run fmt

fmt-check:
	npm run fmt:check

test:
	npm test

test-unit:
	npm run test:unit

test-e2e:
	npm run test:e2e

test-lightweight:
	npm run test:lightweight

test-watch:
	npm run test:watch

test-coverage:
	npm run test:coverage

dev:
	npm run dev

start:
	npm start

install:
	npm install -g .

install-clean:
	@echo "🗑️  Uninstalling existing msearch..."
	-npm uninstall -g msearch 2>/dev/null || true
	@echo "📦 Installing msearch from local source..."
	npm install -g .
	@echo "✅ msearch installed successfully!"
	@echo "🧪 Testing installation..."
	msearch --help

reinstall: install-clean

uninstall:
	@echo "🗑️  Uninstalling msearch..."
	npm uninstall -g msearch
	@echo "✅ msearch uninstalled successfully!"

check-install:
	@echo "📋 Checking msearch installation..."
	@which msearch || echo "❌ msearch not found in PATH"
	@npm list -g msearch 2>/dev/null || echo "❌ msearch not installed globally"
	@echo "🧪 Testing msearch command..."
	@msearch --help || echo "❌ msearch command failed"
