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

**ハイブリッドAPI統合**: OpenStreetMap + Foursquare APIによる高速検索でレビュー・評価データも表示！  
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

# 特定のバージョンをインストール (例: v1.0.0)
npm install -g https://github.com/tKwbr999/msearch.git#v1.0.0
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

### 3. レビュー機能セットアップ (オプション)

**レビュー・評価機能**を有効にするには：

```bash
# 対話式セットアップ（推奨）
msearch --setup

# 設定状況確認
msearch --status

# 手動設定の場合
export FOURSQUARE_API_KEY="your_api_key_here"
```

**📝 注意**: API キーがなくても基本検索は動作します。レビュー機能は完全オプションです。

### 4. インストール確認

```bash
# ヘルプ表示でインストール確認
msearch --help

# バージョン確認
msearch --version

# 基本動作テスト (ブラウザが開く)
msearch レストラン

# URL生成テスト (APIキーなしでも動作)
msearch カフェ --url-only

# ターミナル検索テスト
msearch レストラン -l

# 環境設定状況確認
msearch --status
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

## ✨ 主要機能

### 🚀 高速検索

- ⚡ **高速レスポンス**: 2-3秒で検索完了
- 🏗️ **ハイブリッドAPI**: OpenStreetMap + Foursquare API統合
- 🛡️ **安定性**: API直接呼び出しによる確実な動作

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
export FOURSQUARE_API_KEY="your_api_key_here"
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
export FOURSQUARE_API_KEY="your_api_key_here"

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

## 技術スタック

- **言語**: TypeScript + JavaScript (Node.js)
- **アーキテクチャ**: SOLID原則準拠 + ハイブリッドAPI統合
- **基本データAPI**: OpenStreetMap Overpass API (無料)
- **レビューAPI**: Foursquare Places API (月40,000リクエスト無料)
- **対応プラットフォーム**: macOS, Windows, Linux
- **Node.js**: v16 以上推奨

### レビュー機能セットアップ

#### 対話式セットアップ（推奨）

```bash
# 対話式でAPI キーを設定
msearch --setup

# 設定状況を確認
msearch --status
```

#### 手動セットアップ

1. [Foursquare Developer Console](https://foursquare.com/developers/) で無料アカウント作成
2. アプリを作成してAPI キーを取得
3. 環境変数に設定:

```bash
# グローバル設定
export FOURSQUARE_API_KEY="your_api_key_here"

# または .env.local ファイルに記述
echo "FOURSQUARE_API_KEY=your_api_key_here" > .env.local
```

**無料枠**: 月40,000リクエスト (個人利用には十分)  
**制限到達時**: 基本検索は継続、レビューのみ非表示

## 開発者向け情報

開発・カスタマイズ・コントリビューションについては **[DEVELOP.md](./DEVELOP.md)** をご参照ください。

### 開発クイックスタート

```bash
# 開発環境セットアップ
git clone https://github.com/tKwbr999/msearch.git
cd msearch
npm install
npm run build
make install-clean

# 開発用コマンド
make dev           # TypeScript watch mode
make test          # 全テスト実行
make check-all     # 品質チェック
```

**詳細なアーキテクチャ・SOLID設計・API統合については [DEVELOP.md](./DEVELOP.md) をご覧ください。**

## ライセンス

MIT License

## 作者

[@tkwbr999 on X](https://x.com/tkwbr999)
