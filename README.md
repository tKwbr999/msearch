# msearch 🏝️🗺️🔍

<!-- GitHub/リポジトリ -->

[![CI/CD Pipeline](https://github.com/tKwbr999/msearch/actions/workflows/ci-e2e-docker.yml/badge.svg)](https://github.com/tKwbr999/msearch/actions/workflows/ci-e2e-docker.yml)
[![Unit Tests](https://github.com/tKwbr999/msearch/actions/workflows/ci-e2e-docker.yml/badge.svg?branch=develop&event=push)](https://github.com/tKwbr999/msearch/actions/workflows/ci-e2e-docker.yml)
[![codecov](https://codecov.io/gh/tKwbr999/msearch/branch/develop/graph/badge.svg)](https://codecov.io/gh/tKwbr999/msearch)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Stars](https://img.shields.io/github/stars/tKwbr999/msearch?style=social)](https://github.com/tKwbr999/msearch/stargazers)
[![Forks](https://img.shields.io/github/forks/tKwbr999/msearch?style=social)](https://github.com/tKwbr999/msearch/network/members)
[![Watchers](https://img.shields.io/github/watchers/tKwbr999/msearch?style=social)](https://github.com/tKwbr999/msearch/watchers)
[![Issues](https://img.shields.io/github/issues/tKwbr999/msearch)](https://github.com/tKwbr999/msearch/issues)
[![Pull Requests](https://img.shields.io/github/issues-pr/tKwbr999/msearch)](https://github.com/tKwbr999/msearch/pulls)
[![Contributors](https://img.shields.io/github/contributors/tKwbr999/msearch)](https://github.com/tKwbr999/msearch/graphs/contributors)
[![Last Commit](https://img.shields.io/github/last-commit/tKwbr999/msearch)](https://github.com/tKwbr999/msearch/commits/main)
[![Repo Size](https://img.shields.io/github/repo-size/tKwbr999/msearch)](https://github.com/tKwbr999/msearch)

<!-- CI/CD・品質 -->

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/tKwbr999/msearch/pulls)

<!-- 技術スタック -->

![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-16%2B-339933?logo=node.js&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-45ba63?logo=playwright&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?logo=jest&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white)

<!-- プラットフォーム -->

![macOS](https://img.shields.io/badge/macOS-black?logo=apple)
![Linux](https://img.shields.io/badge/Linux-black?logo=linux)
![Windows](https://img.shields.io/badge/Windows-black?logo=windows)

<!-- X(Twitter) -->

[![X (formerly Twitter) Follow](https://img.shields.io/twitter/follow/tkwbr999?label=Follow%20%40tkwbr999&style=social&logo=twitter)](https://x.com/tkwbr999)

> 🏝️ **宮古諸島特化** Google Maps CLI検索ツール
> 🗾 **地理境界限定**・🇯🇵 **日本語対応**・⚡ **超高速**・🧪 **テスト完備**・🤖 **自動CI/CD** #宮古島 #GoogleMaps #CLI #TypeScript #Playwright #Jest #ESLint #Prettier #自動化 #日本語対応 #高速 #インタラクティブ #旅行 #地図 #検索 #オープンソース #MIT

---

🏝️ 宮古諸島エリアに特化した Google Maps 検索コマンドラインツール

## 特徴

- 🎯 **地理的境界制限**: 宮古諸島（北緯24.65-24.9417度、東経124.6833-125.475度）に検索を限定
- 🌐 **デュアル機能**: ブラウザでマップを開く & ターミナルに結果リスト表示
- 🔍 **リアルタイム検索**: Playwright を使用した実際の Google Maps データ取得
- 🇯🇵 **日本語対応**: 完全な日本語インターフェース
- 📱 **クリック可能リンク**: ターミナルで直接店舗 URL をクリック可能
- 🎨 **インタラクティブモード**: 人気カテゴリから簡単選択
- ⚡ **高速インストール**: GitHub から直接インストール可能
- 🧪 **テスト完備**: 22のテストで品質保証
- �� **自動CI/CD**: 開発からリリースまで自動化

## インストール

### GitHub からインストール（推奨）

```bash
# 最新版をインストール
npm install -g https://github.com/tKwbr999/msearch.git

# 特定のバージョンをインストール
npm install -g https://github.com/tKwbr999/msearch.git#v0.7.1

# 最新のstable版をインストール
npm install -g https://github.com/tKwbr999/msearch.git#latest
```

### 動作確認

```bash
msearch --help
```

## 使用方法

### 基本的な使い方

```bash
# ブラウザで宮古島を表示
msearch

# キーワード検索（ブラウザで開く）
msearch レストラン
msearch カフェ
msearch コンビニ

# ターミナルに結果リスト表示
msearch レストラン -l
msearch カフェ --list

# インタラクティブモード（人気カテゴリ表示）
msearch -i
msearch --interactive

# URL のみ生成
msearch --url-only
msearch レストラン --url-only
```

### オプション

```
Usage: msearch [keyword] [options]

Options:
  -l, --list           ターミナルに検索結果をリスト表示
  -u, --url-only       検索URLのみを表示（ブラウザを開かない）
  -i, --interactive    インタラクティブモード（人気カテゴリ表示）
  -h, --help           このヘルプを表示
  -v, --version        バージョンを表示

Future Features (開発中):
  --history            検索履歴を表示 🚧
  --favorites          お気に入りを表示 🚧

Examples:
  msearch                     宮古島の地図をブラウザで開く
  msearch レストラン           レストランを検索してブラウザで開く
  msearch カフェ -l           カフェを検索してターミナルに一覧表示
  msearch -i                  インタラクティブモードで人気カテゴリを表示
  msearch --url-only          宮古島の地図URLを表示
```

### インタラクティブモード

人気の検索カテゴリから簡単に選択できます：

- 🍽️ レストラン（食事・グルメ）
- ☕ カフェ（コーヒー・喫茶店）
- 🏪 コンビニ（コンビニエンスストア）
- 💊 薬局（ドラッグストア・薬局）
- ⛽ ガソリンスタンド
- 💰 ATM（ATM・銀行）
- 🏥 病院（病院・クリニック）
- 🏨 ホテル（ホテル・宿泊施設）
- 🛒 スーパー（スーパーマーケット）
- 🗾 観光地（観光スポット）
- 🏖️ ビーチ（ビーチ・海岸）
- ✈️ 空港（宮古空港・交通）

## 地理的範囲

このツールは以下の座標範囲に検索を限定しています：

- **北**: 24.9417°N（多良間島北端）
- **南**: 24.65°N（宮古島南端）
- **東**: 125.475°E（宮古島東端）
- **西**: 124.6833°E（多良間島西端）

この範囲には以下の島々が含まれます：

- 宮古島
- 池間島
- 来間島
- 伊良部島
- 下地島
- 多良間島
- 水納島

## 技術詳細

- **言語**: TypeScript + JavaScript (Node.js)
- **アーキテクチャ**: bin/ + lib/ 標準npm構造
- **Web スクレイピング**: Playwright
- **テストフレームワーク**: Jest
- **対応プラットフォーム**: macOS, Windows, Linux
- **Node.js**: v16 以上推奨

## 開発

### セットアップ

```bash
# リポジトリをクローン
git clone https://github.com/tKwbr999/msearch.git
cd msearch

# 依存関係をインストール
npm install

# TypeScriptをビルド
npm run build

# 開発用実行
npm run dev
# または
node lib/miyako-maps-search.js
```

### 開発コマンド

```bash
# ビルド
npm run build
make build

# リンティング
npm run lint
make lint

# フォーマット
npm run fmt
make fmt

# テスト実行
npm test
make test

# 単体テスト
npm run test:unit
make test-unit

# E2Eテスト
npm run test:e2e
make test-e2e

# カバレッジ付きテスト
npm run test:coverage

# ローカルテストインストール
make install-clean
make reinstall

# インストール状況確認
make check-install

# 全チェック（lint + format + test）
make check-all
```

### テスト

22個のテストで品質を保証：

- **単体テスト** (11個): 座標境界、URL構築、引数解析、ブラウザコマンド、結果フィルタリング
- **E2Eテスト** (11個): CLI統合、ヘルプ表示、インタラクティブモード、エラーハンドリング、URL生成

### CI/CD

2段階のCI/CDパイプライン：

1. **develop → main**: テスト・リント・フォーマットチェック後、自動マージ
2. **main → release**: `lib/miyako-maps-search.js` 変更時のみバージョン自動アップ、タグ作成、GitHub Release

**最適化されたリリース条件**:

- コアファイル (`lib/miyako-maps-search.js`) 変更時のみリリース実行
- パッケージ構成ファイル変更時のスマート処理
- 不要なリリースを防止し、効率的なCI/CD運用を実現

**CI最適化機能**:

- `package.json`, `package-lock.json`, `*.ts` 変更のみ時はテストスキップ
- 自動ビルドで `lib/` および `bin/` ディレクトリ生成
- npm installエラー自動修復機能

### プロジェクト構造

```
msearch/
├── miyako-maps-search.ts    # TypeScriptソース（開発用）
├── miyako-maps-search.js    # 下位互換用（削除予定）
├── bin/                     # npm実行可能ファイル
│   └── msearch             # メインエントリーポイント
├── lib/                     # TypeScriptビルド出力
│   └── miyako-maps-search.js # コンパイル済みJavaScript
├── tests/                   # テストディレクトリ
│   ├── unit/               # 単体テスト (11個)
│   └── e2e/                # E2Eテスト (11個)
├── .github/workflows/      # CI/CDワークフロー
│   ├── ci-e2e-docker.yml   # 開発→本番自動マージ
│   └── release.yml         # 本番→リリース自動化
├── package.json            # npm設定（bin: bin/msearch, main: lib/...）
├── tsconfig.json           # TypeScript設定（outDir: lib）
└── Makefile               # 開発用コマンド集
```

## ライセンス

MIT License

## 作者

[@tkwbr999 on X](https://x.com/tkwbr999)
