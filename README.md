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
![OpenStreetMap](https://img.shields.io/badge/OpenStreetMap-7EBC49?logo=openstreetmap&logoColor=white)
![Foursquare](https://img.shields.io/badge/Foursquare-F94877?logo=foursquare&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?logo=jest&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white)

<!-- プラットフォーム -->

![macOS](https://img.shields.io/badge/macOS-black?logo=apple)
![Linux](https://img.shields.io/badge/Linux-black?logo=linux)
![Windows](https://img.shields.io/badge/Windows-black?logo=windows)

<!-- X(Twitter) -->

[![X (formerly Twitter) Follow](https://img.shields.io/twitter/follow/tkwbr999?label=Follow%20%40tkwbr999&style=social&logo=twitter)](https://x.com/tkwbr999)

> 🏝️ **宮古諸島特化** ハイブリッドAPI CLI検索ツール
> 🗾 **地理境界限定**・🇯🇵 **日本語対応**・⚡ **超高速**・⭐ **レビュー表示**・🧪 **テスト完備**・🤖 **自動CI/CD** #宮古島 #OpenStreetMap #Foursquare #CLI #TypeScript #ハイブリッドAPI #Jest #ESLint #Prettier #自動化 #日本語対応 #高速 #インタラクティブ #旅行 #地図 #検索 #オープンソース #MIT

---

🏝️ 宮古諸島エリアに特化したハイブリッドAPI検索コマンドラインツール

**🆕 v2.0 ハイブリッドAPI版**: OpenStreetMap + Foursquare APIによる高速検索でレビュー・評価データも表示！  
**🏗️ モジュラー設計**: SOLID原則に基づくクリーンアーキテクチャでメンテナンス性向上！

## 📦 インストール・セットアップ方法

### 1. 前提条件

- **Node.js v16以上** が必要です
- **npm** がインストールされていること

```bash
# Node.js バージョン確認
node --version  # v16.0.0 以上であることを確認
npm --version   # npmがインストールされていることを確認
```

### 2. インストール

#### 推奨: GitHub から直接インストール

```bash
# 最新版をインストール
npm install -g https://github.com/tKwbr999/msearch.git

# 特定のバージョンをインストール (例: v0.7.1)
npm install -g https://github.com/tKwbr999/msearch.git#v0.7.1
```

#### ローカル開発・カスタマイズ用

```bash
# リポジトリをクローン
git clone https://github.com/tKwbr999/msearch.git
cd msearch

# 依存関係をインストール
npm install

# TypeScriptをコンパイル
npm run build

# グローバルにインストール
npm install -g .
```

### 3. 環境変数設定 (オプション)

**レビュー・評価機能を有効にするには** Foursquare API キーが必要です：

```bash
# 1. .env.example をコピー
cp .env.example .env

# 2. Foursquare API キーを取得
# https://foursquare.com/developers/ から無料でAPI キーを取得

# 3. .env ファイルを編集
echo "FOURSQUARE_API_KEY=your_actual_api_key_here" > .env

# または環境変数として設定
export FOURSQUARE_API_KEY="your_actual_api_key_here"
```

**📝 注意**: API キーがなくても基本検索は動作しますが、レビュー・評価データは表示されません。

### 4. インストール確認

```bash
# ヘルプ表示でインストール確認
msearch --help

# 基本動作テスト (ブラウザが開く)
msearch

# URL生成テスト (APIキーなしでも動作)
msearch カフェ --url-only

# ターミナル検索テスト (APIキーあり推奨)
msearch レストラン -l
```

### 5. アンインストール

```bash
# グローバルインストールを削除
npm uninstall -g msearch

# 設定ファイル削除 (必要に応じて)
rm -f .env
```

## 特徴

- 🎯 **地理的境界制限**: 宮古諸島（北緯24.65-24.9417度、東経124.6833-125.475度）に検索を限定
- 🌐 **デュアル機能**: ブラウザでマップを開く & ターミナルに結果リスト表示
- 🔍 **ハイブリッド検索**: OpenStreetMap基本データ + Foursquareレビュー・評価
- 🇯🇵 **日本語対応**: 完全な日本語インターフェース
- 📱 **クリック可能リンク**: ターミナルで直接店舗 URL をクリック可能
- 🎨 **インタラクティブモード**: 人気カテゴリから簡単選択
- ⚡ **高速インストール**: GitHub から直接インストール可能
- 🧪 **テスト完備**: 51のテストで品質保証
- 🚀 **自動CI/CD**: 開発からリリースまで自動化

## ✨ 新機能 (v2.0 ハイブリッドAPI版)

### 🚀 パフォーマンス大幅向上
- ⚡ **3倍高速化**: 従来11-13秒 → 2-3秒で検索完了
- 🏗️ **ハイブリッドAPI**: OpenStreetMap + Foursquare API統合
- 🛡️ **安定性向上**: DOM解析不要、API直接呼び出し

### ⭐ 充実したPOI情報
- 📊 **レビュー・評価**: Foursquare APIからの★評価とレビュー数
- 💰 **価格帯表示**: レストラン・カフェの価格レベル
- 📞 **詳細情報**: 電話番号、営業時間、ウェブサイト
- 📍 **正確な住所**: OpenStreetMapの構造化データ

### 🆓 完全無料運用
- 💸 **追加費用なし**: Foursquare月40,000リクエスト無料枠
- 🔧 **設定可能**: 環境変数 `FOURSQUARE_API_KEY` でレビュー機能有効化
- 🔄 **フォールバック**: API失敗時も基本データ表示

### 📱 使用例

```bash
# 基本検索（レビューなし）
msearch レストラン -l

# レビュー付き検索（要API Key）
export FOURSQUARE_API_KEY="your_api_key"
msearch レストラン -l
```

出力例:
```
【1】🏪 じんく屋
📍 沖縄県宮古島市平良下里８４−４
⭐ 4.2/5 ⭐⭐⭐⭐ (127 reviews)
💰 価格帯: 💰💰
📞 0980-73-4017
🌐 http://jinkuya.com
🗺️ https://www.google.com/maps/search/じんく屋/@24.8035502,125.2783208,15z
```

## 🚀 クイックスタート

### 1分で始める

```bash
# 1. インストール
npm install -g https://github.com/tKwbr999/msearch.git

# 2. 動作確認
msearch --help

# 3. 基本使用（ブラウザが開く）
msearch レストラン

# 4. ターミナル表示
msearch カフェ -l
```

### レビュー機能有効化 (5分)

```bash
# 1. API キー取得: https://foursquare.com/developers/
# 2. 環境変数設定
export FOURSQUARE_API_KEY="your_api_key"
fsq3teOaSVybilqmGRFvWlQ5aW6Vd22dBiwVHAorH1qKmpE=

# 3. レビュー付き検索
msearch レストラン -l
# ⭐ 4.2/5 ⭐⭐⭐⭐ (127 reviews) のような表示になる
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
- **アーキテクチャ**: ハイブリッドAPI統合アーキテクチャ
- **基本データAPI**: OpenStreetMap Overpass API (無料)
- **レビューAPI**: Foursquare Places API (月40,000リクエスト無料)
- **HTTPクライアント**: axios
- **テストフレームワーク**: Jest
- **リンター**: ESLint v9 (Flat Config)
- **フォーマッター**: Prettier
- **対応プラットフォーム**: macOS, Windows, Linux
- **Node.js**: v16 以上推奨

### API設定詳細

#### Foursquare API セットアップ

1. **無料アカウント作成**: [Foursquare Developer Console](https://foursquare.com/developers/)
2. **新しいアプリを作成**: プロジェクト名は "msearch" など適当に
3. **API キーをコピー**: `Authorization` ヘッダー用のキーを取得
4. **環境変数に設定**:

```bash
# 永続的な設定 (推奨)
echo 'export FOURSQUARE_API_KEY="your_api_key_here"' >> ~/.bashrc
source ~/.bashrc

# 一時的な設定
export FOURSQUARE_API_KEY="your_api_key_here"

# .env ファイル使用
echo "FOURSQUARE_API_KEY=your_api_key_here" > .env
```

#### 無料枠について
- **月40,000リクエスト無料** ($200クレジット相当)
- **1日あたり約1,300リクエスト** 使用可能
- **通常使用**: 1日10-20回検索程度なら余裕
- **制限到達時**: 基本検索は継続、レビューのみ非表示

## 開発

### ローカル開発セットアップ

```bash
# 1. リポジトリをクローン
git clone https://github.com/tKwbr999/msearch.git
cd msearch

# 2. 依存関係をインストール
npm install

# 3. 環境変数設定 (オプション)
cp .env.example .env
# .env を編集して FOURSQUARE_API_KEY を設定

# 4. TypeScriptをビルド
npm run build

# 5. 開発用実行
npm run dev          # TypeScript直接実行
# または
node miyako-maps-search.js  # コンパイル済みJS実行

# 6. ローカルでテスト
./miyako-maps-search.js --help
./miyako-maps-search.js カフェ --url-only
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

# パッケージ管理
make update-deps          # 依存関係更新
make check-deps          # 古いパッケージチェック
make audit              # セキュリティ監査

# ローカルテストインストール
make reinstall

# YAML構文チェック
make yaml-check

# 全チェック（lint + format + test + yaml）
make check
```

### テスト

51個のテストで品質を保証：

- **単体テスト**: 座標境界、URL構築、引数解析、API統合、結果フィルタリング
- **E2Eテスト**: CLI統合、ヘルプ表示、インタラクティブモード、エラーハンドリング、ハイブリッドAPI検索

### CI/CD

2段階のCI/CDパイプライン：

1. **develop → main**: テスト・リント・フォーマットチェック後、自動マージ
2. **main → release**: `miyako-maps-search.js` 変更時のみバージョン自動アップ、タグ作成、GitHub Release

**最適化されたリリース条件**:

- コアファイル (`miyako-maps-search.js`) 変更時のみリリース実行
- パッケージ構成ファイル変更時のスマート処理
- 不要なリリースを防止し、効率的なCI/CD運用を実現

**CI最適化機能**:

- `package.json`, `package-lock.json`, `*.ts` 変更のみ時はテストスキップ
- ESLint v9 Flat Config対応
- npm installエラー自動修復機能

### プロジェクト構造

```
msearch/
├── miyako-maps-search.ts    # TypeScriptソース（開発用）
├── miyako-maps-search.js    # コンパイル済みJavaScript（実行ファイル）
├── tests/                   # テストディレクトリ
│   ├── unit/               # 単体テスト (11個)
│   └── e2e/                # E2Eテスト (11個)
├── .github/workflows/      # CI/CDワークフロー
│   ├── ci-e2e-docker.yml   # 開発→本番自動マージ
│   └── release.yml         # 本番→リリース自動化
├── eslint.config.js        # ESLint v9 設定（Flat Config）
├── jest.config.js          # Jest設定
├── tsconfig.json           # TypeScript設定
├── package.json            # npm設定（bin: miyako-maps-search.js）
├── Makefile               # 開発用コマンド集
└── CLAUDE.md              # Claude AI用プロジェクト記憶ファイル
```

## ライセンス

MIT License

## 作者

[@tkwbr999 on X](https://x.com/tkwbr999)
