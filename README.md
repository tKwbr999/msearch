# msearch - 宮古島 Google Maps 検索ツール

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
- 🚀 **自動CI/CD**: 開発からリリースまで自動化

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

- **言語**: JavaScript (Node.js)
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

# 開発用実行
node miyako-maps-search.js
```

### 開発コマンド

```bash
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
make test-coverage

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
2. **main → release**: バージョン自動アップ、タグ作成、GitHub Release

## ライセンス

MIT License

## 作者

Created for Miyako Islands community 🏝️