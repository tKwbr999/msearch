# msearch 開発者向けドキュメント

> このファイルは開発者向けの技術詳細・アーキテクチャ・開発環境構築について説明します。

## 📋 プロジェクト概要

**プロジェクト名**: msearch v1.0.0  
**アーキテクチャ**: SOLID原則準拠のクリーンアーキテクチャ + ハイブリッドAPI統合  
**技術スタック**: TypeScript, Node.js, OpenStreetMap Overpass API, Foursquare Places API  
**テストフレームワーク**: Jest (単体テスト18個 + E2Eテスト11個)

## 🏗️ ディレクトリ構成

### 現在の構成 (TypeScript配布ベストプラクティス準拠)

```
msearch/
├── src/                          # 🎯 TypeScriptソースコード (SOLID設計)
│   ├── main.ts                   # メインエントリーポイント
│   ├── types.ts                  # 型定義
│   ├── config.ts                 # 設定・定数・キーワードマッピング
│   ├── handlers/                 # CLI・UI処理ハンドラー
│   │   ├── CliHandler.ts         # CLI引数解析・実行
│   │   ├── InteractiveHandler.ts # 対話型モード (readline)
│   │   └── HelpHandler.ts        # ヘルプ表示
│   └── services/                 # ビジネスロジックサービス (SOLID)
│       ├── SearchService.ts      # 🎭 ファサードパターン: 検索統合
│       ├── OverpassService.ts    # OpenStreetMap API統合
│       ├── FoursquareService.ts  # Foursquare API統合 (レビュー・評価)
│       ├── PoiService.ts         # POI処理・表示フォーマット
│       ├── KeywordService.ts     # キーワード変換・類似語検索
│       ├── UrlService.ts         # GoogleMaps URL生成
│       └── EnvService.ts         # 🔧 環境変数管理・セットアップ
├── dist/                         # 🚀 TypeScriptコンパイル出力 (配布用)
│   ├── main.js                   # コンパイル済みメインファイル (bin entry)
│   ├── handlers/                 # コンパイル済みハンドラー
│   ├── services/                 # コンパイル済みサービス
│   ├── types.js                  # コンパイル済み型定義
│   └── config.js                 # コンパイル済み設定
├── tests/                        # 🧪 テストファイル
│   ├── unit/                     # 単体テスト (18個)
│   │   └── core-functions.test.js
│   ├── e2e/                      # E2Eテスト (11個)
│   │   ├── cli-integration.test.js
│   │   ├── ci-optimized.test.js
│   │   └── lightweight.test.js
│   └── setup.js                  # テストセットアップ
├── .github/workflows/            # 🤖 CI/CDワークフロー
│   ├── version-tag.yml           # develop→main自動マージ
│   └── release.yml               # main→リリース自動化
├── package.json                  # 📦 プロジェクト設定
├── tsconfig.json                 # 🔧 TypeScript設定
├── jest.config.js                # 🧪 Jest設定
├── eslint.config.js              # 🔍 ESLint v9設定 (Flat Config)
├── Makefile                      # 🛠️ 開発用コマンド集
├── .gitignore                    # 📝 Git除外設定
├── .env.example                  # 🔑 環境変数テンプレート
├── README.md                     # 👥 ユーザー向けドキュメント
├── DEVELOP.md                    # 👨‍💻 このファイル (開発者向け)
└── CLAUDE.md                     # 🤖 Claude AI用プロジェクト記憶
```

## 🏛️ SOLID原則アーキテクチャ

### 1. Single Responsibility Principle (単一責任の原則)

各クラス・モジュールが一つの責任のみを持つ:

```typescript
// ❌ 悪い例: 一つのクラスで複数の責任
class SearchTool {
  parseArgs() {
    /* CLI解析 */
  }
  searchAPI() {
    /* API呼び出し */
  }
  formatDisplay() {
    /* 表示処理 */
  }
}

// ✅ 良い例: 責任ごとに分離
class CliHandler {
  parseArgs() {
    /* CLI解析のみ */
  }
}
class SearchService {
  searchPlaces() {
    /* 検索統合のみ */
  }
}
class PoiService {
  formatPoiForDisplay() {
    /* 表示処理のみ */
  }
}
```

### 2. Open/Closed Principle (開放/閉鎖の原則)

新機能を既存コードを変更せずに追加可能:

```typescript
// 新しいAPIサービスを簡単に追加
class GooglePlacesService implements ApiService {
  async searchVenues(keyword: string): Promise<Venue[]> {
    // Google Places API実装
  }
}

// SearchServiceを変更せずに新APIを統合可能
```

### 3. Dependency Inversion Principle (依存関係逆転の原則)

具象クラスではなく抽象（インターフェース）に依存:

```typescript
export class MSearchApp {
  private cliHandler: CliHandler; // 抽象に依存
  private searchService: SearchService; // 抽象に依存

  constructor() {
    this.cliHandler = new CliHandler(); // DIパターン
    this.searchService = new SearchService(); // DIパターン
  }
}
```

## 🔧 開発環境セットアップ

### 1. 前提条件

```bash
# 必要なツール
node --version   # v16.0.0+ 推奨
npm --version    # 最新版推奨
git --version    # 最新版推奨
```

### 2. プロジェクトセットアップ

```bash
# 1. リポジトリクローン
git clone https://github.com/tKwbr999/msearch.git
cd msearch

# 2. 依存関係インストール
npm install

# 3. 環境変数設定 (オプション)
cp .env.example .env
# .env を編集してFOURSQUARE_API_KEYを設定

# 4. TypeScriptビルド
npm run build

# 5. ローカルインストール
make install-clean

# 6. 動作確認
msearch --help
```

### 3. 開発用コマンド

```bash
# ビルド・実行
make build              # TypeScriptコンパイル (src/ → dist/)
make start              # ビルド済みアプリ実行
make dev                # TypeScript watch mode

# コード品質
make lint               # ESLint実行
make lint-fix           # ESLint自動修正
make fmt                # Prettier実行
make fmt-check          # Prettier確認のみ

# テスト
make test               # 全テスト実行 (単体18個 + E2E11個)
make test-unit          # 単体テストのみ
make test-e2e           # E2Eテストのみ

# 総合チェック
make check-all          # build + lint + fmt + test
make check              # format + lint + yaml チェック

# パッケージ管理
make install-clean      # ビルド → グローバルインストール
make reinstall          # アンインストール → 再インストール
make uninstall          # グローバルアンインストール
make check-install      # インストール状況確認

# クリーンアップ
make clean              # dist/, node_modules/, coverage/ 削除

# 情報表示
make info               # プロジェクト情報表示
make help               # 利用可能コマンド一覧
```

## 🧪 テストアーキテクチャ

### 単体テスト (18個)

**ファイル**: `tests/unit/core-functions.test.js`

```javascript
describe("🧪 Core Functions Unit Tests", () => {
  // 地理的境界テスト
  describe("MIYAKOJIMA_BOUNDS", () => {
    test("should have correct coordinate bounds for Miyako Islands");
  });

  // キーワードマッピングテスト
  describe("Keyword Mapping", () => {
    test("should have correct mappings for essential categories");
    test("should support fuzzy search for keywords");
  });

  // URL構築テスト
  describe("URL Building", () => {
    test("should build valid Google Maps search URLs");
    test("should build POI-specific URLs with coordinates");
  });

  // CLI引数解析テスト
  describe("Command Line Argument Parsing", () => {
    test("should recognize interactive flag");
    test("should recognize list flag");
    test("should handle keyword arguments");
  });

  // ブラウザ起動テスト
  describe("Browser URL Opening", () => {
    test("should use correct command for macOS/Windows/Linux");
  });

  // API統合テスト
  describe("API Integration", () => {
    test("should build valid Overpass API query");
    test("should handle Overpass API response format");
    test("should validate POI data structure");
  });

  // 表示フォーマットテスト
  describe("Display Formatting", () => {
    test("should format POI data for terminal display");
    test("should handle rating display with stars");
  });
});
```

### E2Eテスト (11個)

**ファイル**: `tests/e2e/cli-integration.test.js`, `ci-optimized.test.js`, `lightweight.test.js`

- CLI統合テスト: ヘルプ表示、引数解析、エラーハンドリング
- ハイブリッドAPI検索テスト: OpenStreetMap + Foursquare統合
- インタラクティブモードテスト: readline動作確認
- URL生成テスト: 各種オプションでのURL生成確認

## 🌐 API統合アーキテクチャ

### ハイブリッドAPI設計

```typescript
// 1. 基本POIデータ: OpenStreetMap Overpass API
class OverpassService {
  async searchPois(keyword: string): Promise<OverpassPoi[]> {
    const query = this.buildOverpassQuery(keyword);
    const response = await axios.post(OVERPASS_URL, query);
    return this.parseOverpassResponse(response.data);
  }
}

// 2. レビュー・評価データ: Foursquare Places API
class FoursquareService {
  async searchVenue(
    placeName: string,
    lat: number,
    lng: number,
  ): Promise<FoursquareVenue | null> {
    const response = await axios.get(FOURSQUARE_URL, {
      headers: { Authorization: process.env.FOURSQUARE_API_KEY },
    });
    return this.parseFoursquareResponse(response.data);
  }
}

// 3. データ統合: ファサードパターン
class SearchService {
  async searchPlaces(keyword: string): Promise<EnrichedPoi[]> {
    // Step 1: 基本POIデータ取得
    const overpassResults = await this.overpassService.searchPois(keyword);

    // Step 2: Foursquareでレビュー・評価データ拡張
    const enrichedResults =
      await this.poiService.enrichWithFoursquare(overpassResults);

    return enrichedResults;
  }
}
```

### API設定

```bash
# Foursquare API設定 (月40,000リクエスト無料)
export FOURSQUARE_API_KEY="fsq3teOaSVybilqmGRFvWlQ5aW6Vd22dBiwVHAorH1qKmpE="

# 無料枠詳細:
# - 月40,000リクエスト ($200相当)
# - 1日あたり約1,300リクエスト
# - 制限到達時: レビューデータのみ非表示、基本検索は継続
```

## 🚀 CI/CD パイプライン

### 2段階自動化

```yaml
# 1. develop → main (自動マージ)
name: Version Tag CI/CD
on:
  push:
    branches: [develop]

# 2. main → release (自動リリース)
name: Automated Release
on:
  push:
    branches: [main]
    paths: ['dist/**/*.js', 'package.json']
```

### CI最適化機能

- **依存関係キャッシュ**: `node_modules`, `~/.npm`
- **最小依存関係**: テスト・リント用パッケージのみインストール
- **タイムアウト対策**: 各ステップ10分制限
- **パスフィルター**: `dist/` 変更時のみリリース発動

## 🔍 コード品質保証

### ESLint v9 (Flat Config)

```javascript
// eslint.config.js
export default [
  {
    files: ["src/**/*.ts", "tests/**/*.js"],
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/explicit-function-return-type": "warn",
    },
  },
];
```

### Prettier統合

```json
// package.json
{
  "scripts": {
    "fmt": "prettier --write \"**/*.{ts,json,md}\"",
    "fmt:check": "prettier --check \"**/*.{ts,json,md}\""
  }
}
```

## 📊 パフォーマンス最適化

### パフォーマンス特性

| 項目           | 現在の実装             |
| -------------- | ---------------------- |
| 検索速度       | 2-3秒                  |
| 安定性         | API直接呼び出し        |
| データ量       | レビュー・評価・価格帯 |
| 依存関係       | axios (軽量)           |
| メンテナンス性 | 高 (API仕様準拠)       |

### 最適化技術

1. **並列API呼び出し**: OpenStreetMap → Foursquare の段階的処理
2. **フォールバック設計**: API失敗時の基本データ表示
3. **エラーハンドリング**: タイムアウト・レート制限対応
4. **キャッシュ戦略**: 環境変数による設定キャッシュ

## 🔧 トラブルシューティング

### よくある問題

1. **ビルドエラー**:

   ```bash
   make clean && npm install && make build
   ```

2. **テスト失敗**:

   ```bash
   # E2Eテスト: dist/main.js が存在しない
   make build && npm test
   ```

3. **グローバルインストール問題**:

   ```bash
   make uninstall && make install-clean
   ```

4. **API制限**:
   ```bash
   # Foursquare API制限到達時
   unset FOURSQUARE_API_KEY  # 基本検索のみ継続
   ```

### デバッグ方法

```bash
# 詳細ログ出力
DEBUG=msearch* msearch レストラン -l

# API応答確認
curl -X POST https://overpass-api.de/api/interpreter -d '[out:json]; node[amenity=restaurant](24.65,124.6833,24.9417,125.475); out;'

# ビルド成果物確認
ls -la dist/
file dist/main.js
```

## 🤝 コントリビューション

### 開発フロー

1. **Issue作成**: バグ報告・機能要求
2. **ブランチ作成**: `feature/feature-name`, `fix/bug-name`
3. **開発・テスト**: `make check-all` で品質確認
4. **PR作成**: develop ブランチ向け
5. **自動CI/CD**: テスト・リント・自動マージ

### コーディング規約

- **TypeScript**: strict mode, explicit types
- **命名規約**: camelCase, PascalCase (classes)
- **コメント**: 日本語コメント推奨
- **エラーハンドリング**: 必須、ユーザーフレンドリーなメッセージ

---

**最終更新**: 2025年6月9日  
**アーキテクチャバージョン**: v2.0 (SOLID + Hybrid API)  
**開発者**: tKwbr999  
**ライセンス**: MIT
