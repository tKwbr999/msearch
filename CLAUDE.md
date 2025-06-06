# CLAUDE.md - Claude AI用プロジェクト記憶ファイル

> このファイルはClaude AIが新しいセッションでプロジェクトを理解するための記憶ファイルです。
> プロジェクト開始時に必ずこのファイルを参照してください。

## 📋 プロジェクト概要

**プロジェクト名**: msearch  
**説明**: 宮古諸島エリア専用 Google Maps 検索CLI ツール  
**リポジトリ**: https://github.com/tKwbr999/msearch  
**言語**: JavaScript (Node.js)  
**現在バージョン**: v0.7.1

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

- **プロダクション**: `playwright` (v1.42.1), `cheerio` (v1.0.0-rc.12)
- **開発**: `jest` (v29.7.0), `puppeteer` (v21.11.0), `typescript`, `eslint`, `prettier`

### 主要ファイル

- **実行ファイル**: `miyako-maps-search.js`
- **バイナリ**: `bin: { "msearch": "./miyako-maps-search.js" }`
- **テスト**: `tests/unit/` (11個), `tests/e2e/` (11個)
- **設定**: `jest.config.js`, `tsconfig.json`, `.eslintrc`, `Makefile`

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

### 検索機能

- **関数**: `searchPlacesInTerminal(keyword, bounds)`
- **スクレイピング**: `scrapeGoogleMapsResults(searchUrl)`
- **URL生成**: `buildMapsUrl(keyword)`

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
├── miyako-maps-search.js    # メイン実行ファイル
├── miyako-maps-search.ts    # TypeScriptソース（参考用）
├── package.json             # プロジェクト設定
├── package-lock.json        # 依存関係ロック
├── jest.config.js           # Jest設定
├── tsconfig.json           # TypeScript設定
├── Makefile                # 開発コマンド
├── README.md               # ユーザー向けドキュメント
├── CLAUDE.md               # このファイル（Claude用記憶）
├── .github/workflows/      # CI/CDワークフロー
│   ├── version-tag.yml     # develop→main自動マージ
│   └── release.yml         # main→リリース自動化
├── tests/                  # テストディレクトリ
│   ├── unit/              # 単体テスト
│   ├── e2e/               # E2Eテスト
│   └── setup.js           # テストセットアップ
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

**ファイル構成の問題**:

- `miyako-maps-search.js` (root, 547行) - 実際に使用される実行ファイル
- `build/miyako-maps-search.js` (319行) - 未使用のTypeScriptコンパイル成果物
- `miyako-maps-search.ts` - 開発用TypeScriptソース

**リリースワークフローの問題**:

- 現在：mainブランチへの全pushでリリースが発動
- 課題：コードに変更がなくてもリリースが実行される
- 解決策：`miyako-maps-search.js`の変更時のみ発動するよう修正

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
      - 'miyako-maps-search.js'
      - 'package.json'
```

## 💡 Claude AI作業時の注意点

1. **このファイルを最初に読む**: 新セッション開始時は必ずCLAUDE.mdを参照
2. **座標は正確に**: 宮古諸島の境界座標は重要な仕様
3. **テスト実行**: 変更後は `make test` で全テスト確認
4. **ブランチ**: develop で作業、CI で自動マージ
5. **インストール確認**: `make install-clean` でローカルテスト

---

**最終更新**: 2025年6月6日  
**作業ブランチ**: develop  
**次回リリース予定**: CI通過後自動リリース

**重要**: 新しいClaude AIセッションでは、まずこのCLAUDE.mdファイルを読んでプロジェクトコンテキストを理解してから作業を開始してください。
