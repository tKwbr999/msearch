# CLAUDE.md - Claude AI用プロジェクト記憶ファイル

> このファイルはClaude AIが新しいセッションでプロジェクトを理解するための記憶ファイルです。
> プロジェクト開始時に必ずこのファイルを参照してください。

## 📋 プロジェクト概要

**プロジェクト名**: msearch  
**説明**: 宮古諸島エリア専用ハイブリッドAPI検索CLIツール (OpenStreetMap + Foursquare)  
**リポジトリ**: https://github.com/tKwbr999/msearch  
**言語**: TypeScript + JavaScript (Node.js)  
**現在バージョン**: v2.0.0  
**アーキテクチャ**: SOLID原則準拠のクリーンアーキテクチャ

## 🏝️ 地理的設定

### 座標境界（MIYAKOJIMA_BOUNDS）

```javascript
{
  north: 24.9417,  // 24°56'30"N (多良間島北端)
  south: 24.65,    // 24°39'00"N (宮古島南端)
  east: 125.475,   // 125°28'30"E (宮古島東端)
  west: 124.6833   // 124°41'00"E (多良間島西端)
}
```

### 中心座標（MIYAKOJIMA_CENTER）

```javascript
{
  lat: 24.805,     // 宮古島本島の中心緯度
  lng: 125.2817    // 宮古島本島の中心経度
}
```

### 対象エリア

宮古島、池間島、来間島、伊良部島、下地島、多良間島、水納島

## 🚀 主要機能

### コマンドオプション

- **基本検索**: `msearch [keyword]` - ブラウザでマップを開く
- **リスト表示**: `msearch [keyword] -l` - ターミナルに結果表示
- **インタラクティブ**: `msearch -i` - 対話式カテゴリ選択
- **URL生成**: `msearch --url-only` - URLのみ表示
- **ヘルプ**: `msearch --help`

### 人気カテゴリ（12種類）

1. 🍽️ レストラン 2. ☕ カフェ 3. 🏪 コンビニ 4. 💊 薬局
2. ⛽ ガソリンスタンド 6. 🏧 ATM 7. 🏥 病院 8. 🏨 ホテル
3. 🗾 観光スポット 10. 🏖️ ビーチ 11. 🛒 スーパー 12. 🍻 居酒屋

## 🛠️ 技術スタック

### 依存関係

- **プロダクション**: `axios` (v1.9.0), `dotenv` (v16.5.0)
- **開発**: `jest` (v29.7.0), `typescript` (v5.5.4), `eslint` (v9.28.0), `prettier` (v3.2.5)
- **API**: OpenStreetMap Overpass API (無料), Foursquare Places API (月40,000リクエスト無料)

### 主要ファイル

- **実行ファイル**: `src/main.js` (TypeScriptコンパイル後)
- **バイナリ**: `bin: { "msearch": "./src/main.js" }`
- **ソースコード**: `src/` ディレクトリ (SOLID設計)
- **テスト**: `tests/unit/` (11個), `tests/e2e/` (11個)
- **設定**: `jest.config.js`, `tsconfig.json`, `eslint.config.js`, `Makefile`

## 🔧 開発ワークフロー

### ブランチ構成

- **develop**: 開発ブランチ（作業用）
- **main**: 本番ブランチ（自動リリース）

### CI/CD（2段階）

1. **develop→main**: テスト・リント・フォーマットチェック → 自動マージ
2. **main→release**: バージョン自動アップ → タグ作成 → GitHub Release

### Makefileコマンド

```bash
make test          # 全テスト実行
make test-unit     # 単体テスト
make test-e2e      # E2Eテスト
make test-coverage # カバレッジ付きテスト
make lint          # ESLint実行
make fmt           # Prettier実行
make check-all     # lint + format + test
make install-clean # クリーンインストール（ローカル）
make uninstall     # アンインストール
make reinstall     # install-cleanのエイリアス
make check-install # インストール状況確認
```

## 🧪 テスト構成

### 単体テスト（11個）

- 座標境界検証
- URL構築テスト
- 引数解析テスト
- ブラウザコマンドテスト
- 結果フィルタリングテスト

### E2Eテスト（11個）

- CLI統合テスト
- ヘルプ表示テスト
- インタラクティブモードテスト
- エラーハンドリングテスト
- URL生成テスト

### テスト実行環境

- **フレームワーク**: Jest
- **カバレッジ**: 設定済み (`coverage/` ディレクトリ)
- **CI**: GitHub Actions（キャッシュ最適化済み）

## 📦 インストール方法

### GitHub直接インストール

```bash
# 最新版
npm install -g https://github.com/tKwbr999/msearch.git

# 特定バージョン
npm install -g https://github.com/tKwbr999/msearch.git#v0.7.1

# latest タグ
npm install -g https://github.com/tKwbr999/msearch.git#latest
```

### ローカル開発

```bash
git clone https://github.com/tKwbr999/msearch.git
cd msearch
npm install
make install-clean  # ローカルから直接インストール
```

## 🎯 重要な実装詳細

### ハイブリッドAPI検索アーキテクチャ

- **SearchService**: 検索統合ファサード（メイン検索エントリーポイント）
- **OverpassService**: OpenStreetMap API統合（基本POIデータ取得）
- **FoursquareService**: Foursquare API統合（レビュー・評価データ取得）
- **PoiService**: POI情報統合・表示フォーマット処理
- **KeywordService**: キーワード変換・類似語検索
- **UrlService**: GoogleMaps URL生成

### SOLID原則適用詳細

1. **Single Responsibility**: 各サービスが単一の責任を持つ
2. **Open/Closed**: 新しいAPI・ハンドラーを簡単に追加可能
3. **Liskov Substitution**: インターフェース準拠で代替可能
4. **Interface Segregation**: 必要な機能のみを公開
5. **Dependency Inversion**: 具象クラスでなく抽象に依存

### インタラクティブモード

- **readline使用**: 対話式入力
- **数字選択**: 1-12でカテゴリ選択
- **終了**: `exit`, `quit`, 空文字で終了
- **エラーハンドリング**: readline closure対応
- **SIGINT対応**: Ctrl+C での適切な終了処理

### データフィルタリング

除外キーワード: 営業、時間、フィルタ、保存、共有、地図、ログイン、データ、プライバシー、レイヤ、ウェブサイトにアクセス、km

## 🚨 既知の問題と解決済み事項

### 解決済み

- ✅ CI npm install ハング → Playwright skip & キャッシュ最適化
- ✅ readline エラーループ → 適切なクリーンアップ実装
- ✅ TypeScript配布問題 → pure JavaScript移行
- ✅ インタラクティブモード終了問題 → SIGINT & process.exit実装

### 今後の予定機能

- 🚧 検索履歴機能（`--history`）
- 🚧 お気に入り機能（`--favorites`）

## 📁 プロジェクト構造

```
msearch/
├── src/                     # ソースコードディレクトリ（SOLID設計）
│   ├── main.ts             # メインエントリーポイント
│   ├── types.ts            # 型定義
│   ├── config.ts           # 設定・定数
│   ├── handlers/           # CLI・UI処理ハンドラー
│   │   ├── CliHandler.ts   # CLI引数解析・実行
│   │   ├── InteractiveHandler.ts # 対話型モード
│   │   └── HelpHandler.ts  # ヘルプ表示
│   └── services/           # ビジネスロジックサービス
│       ├── SearchService.ts    # 検索統合（ファサード）
│       ├── OverpassService.ts  # OpenStreetMap API
│       ├── FoursquareService.ts # Foursquare API
│       ├── PoiService.ts      # POI処理・表示
│       ├── KeywordService.ts  # キーワード変換
│       └── UrlService.ts      # URL生成
├── tests/                  # テストディレクトリ
│   ├── unit/              # 単体テスト (11個)
│   ├── e2e/               # E2Eテスト (11個)
│   └── setup.js           # テストセットアップ
├── .github/workflows/      # CI/CDワークフロー
│   ├── version-tag.yml     # develop→main自動マージ
│   └── release.yml         # main→リリース自動化
├── package.json            # プロジェクト設定 (bin: src/main.js)
├── package-lock.json       # 依存関係ロック
├── jest.config.js          # Jest設定
├── tsconfig.json          # TypeScript設定
├── eslint.config.js       # ESLint v9設定（Flat Config）
├── Makefile               # 開発コマンド
├── README.md              # ユーザー向けドキュメント
├── CLAUDE.md              # このファイル（Claude用記憶）
├── .env.local             # 環境変数（ローカル開発用）
├── .envrc                 # direnv設定
├── coverage/              # テストカバレッジ（.gitignore済み）
└── node_modules/          # 依存関係（.gitignore済み）
```

## 🎨 インタラクティブモードの実装

```javascript
// 人気検索キーワード候補（POPULAR_KEYWORDS配列）
const POPULAR_KEYWORDS = [
  { name: 'レストラン', emoji: '🍽️', description: '食事・グルメ' },
  { name: 'カフェ', emoji: '☕', description: 'コーヒー・喫茶店' },
  // ... 12個の定義
];

// インタラクティブモード実装のポイント
- readline.createInterface() 使用
- SIGINT ハンドラーで Ctrl+C 対応
- process.exit(0) で確実な終了
- エラーハンドリングで readline.closed チェック
```

## 🔄 CI/CD最適化

### 現在の課題と解決方針

**ファイル構成の改善（解決済み）**:

- ✅ `src/main.js` - SOLID原則に基づくモジュラー設計に移行
- ✅ `src/services/` - 各サービスクラスによる責任分離
- ✅ `src/handlers/` - CLI・UI処理の分離
- ✅ `src/types.ts` - 型安全性の向上

**リリースワークフローの最適化**:

- 現在：mainブランチの`src/main.js`変更時のみリリース発動
- 解決：不要なリリースを防止し、効率的なCI/CD運用を実現
- 改善：SOLID設計により個別モジュールの変更追跡が可能

### GitHub Actions設定

```yaml
# キャッシュ設定
- name: Cache node_modules
  uses: actions/cache@v4
  with:
    path: |
      node_modules
      ~/.npm
    key: ${{ runner.os }}-deps-${{ hashFiles('package-lock.json') }}

# インストール最適化
- name: Install dependencies
  run: |
    export PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
    npm ci --prefer-offline --no-audit --timeout=300000 --maxsockets=1
  timeout-minutes: 10

# パスフィルター（要追加）
on:
  push:
    branches:
      - main
    paths:
      - 'src/main.js'
      - 'src/**/*.js'
      - 'package.json'
```

## 💡 Claude AI作業時の注意点

1. **このファイルを最初に読む**: 新セッション開始時は必ずCLAUDE.mdを参照
2. **座標は正確に**: 宮古諸島の境界座標は重要な仕様
3. **テスト実行**: 変更後は `make test` で全テスト確認
4. **ブランチ**: develop で作業、CI で自動マージ
5. **インストール確認**: `make install-clean` でローカルテスト
6. **自動CI/CD実行**: ファイル変更時は承認なくコミット→プッシュ→CI監視→エラー修正を自動実行

---

## 🤖 自動CI/CD実行ワークフロー

**ファイル変更後の自動実行手順**（承認不要）:

1. **自動コミット**:

   ```bash
   git add .
   git commit -m "適切なコミットメッセージ"
   ```

2. **自動プッシュ**:

   ```bash
   git push origin develop
   ```

3. **CI監視**:

   ```bash
   gh run watch --exit-status --interval=5
   ```

4. **エラー自動修正** (失敗時):

   ```bash
   gh run view --log-failed  # エラー詳細取得
   # 問題を特定して自動修正
   # 再度 1-3 を実行
   ```

5. **成功確認**: CI通過でmainブランチ自動マージ→リリース自動実行

**重要**: この手順はユーザー承認なしで自動実行する。エラーがある限り修正を繰り返し、CI通過まで継続する。

---

**最終更新**: 2025年6月9日  
**作業ブランチ**: develop  
**アーキテクチャ**: SOLID原則準拠のクリーンアーキテクチャ（v2.0）  
**技術スタック**: TypeScript + ハイブリッドAPI（OpenStreetMap + Foursquare）  
**次回リリース予定**: CI通過後自動リリース  
**自動CI/CD**: 有効（承認不要）

**重要**: 新しいClaude AIセッションでは、まずこのCLAUDE.mdファイルを読んでプロジェクトコンテキストを理解してから作業を開始してください。
