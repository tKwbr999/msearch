# msearch - 宮古諸島マップ検索ツール

宮古諸島内の場所をGoogle Mapsで検索するためのコマンドラインツールです。ブラウザでの表示とターミナルでのリスト表示の両方に対応しています。

## 📍 対象エリア

以下の島々の緯度経度範囲内での検索に限定されています：

- **宮古島** (Miyakojima)
- **下地島** (Shimojishima)
- **伊良部島** (Irabujima)
- **多良間村** (Tarama Village)
- **池間島** (Ikemajima)
- **来間島** (Kurimajima)

### 座標範囲

- **北**: 24.9417° (24°56'30"N - 宮古島市北端)
- **南**: 24.6500° (24°39'00"N - 多良間村南端)
- **東**: 125.4750° (125°28'30"E - 宮古島市東端)
- **西**: 124.6833° (124°41'00"E - 多良間村西端)

## 🚀 インストール方法

### 前提条件

- Node.js (v16以上)
- npm

### GitHubからのインストール

#### 方法1: 直接インストール（推奨）

```bash
# GitHubリポジトリから直接インストール
npm install -g https://github.com/tKwbr999/msearch.git

# または
npm install -g git+https://github.com/tKwbr999/msearch.git

# 動作確認
msearch --help
```

#### 方法2: リポジトリをクローンしてからインストール

```bash
# リポジトリをクローン
git clone https://github.com/tKwbr999/msearch.git
cd msearch

# グローバルインストール
npm install -g .

# 動作確認
msearch --help
```

インストール後、どこからでも `msearch` コマンドが使用できます。

### ローカルソースからのインストール

#### 方法1: ローカルファイルから直接インストール

```bash
# 現在のディレクトリからグローバルインストール
npm install -g .

# 特定のパスからインストール
npm install -g /path/to/msearch

# 相対パスからインストール
npm install -g ../msearch
```

#### 方法2: ローカル開発用セットアップ

```bash
# リポジトリをクローン（または既存ソースを使用）
git clone https://github.com/tKwbr999/msearch.git
cd msearch

# 依存関係をインストール
npm install

# TypeScriptをビルド
npm run build

# ローカルでテスト実行
node miyako-maps-search.js [options]

# グローバルインストール
npm install -g .
```

#### 方法3: 開発モードでの実行

```bash
# TypeScriptを直接実行（開発用）
npm run dev

# ビルドして実行
npm run build && node miyako-maps-search.js [options]
```

### アップデート方法

#### GitHubからのアップデート

```bash
# 最新版に直接アップデート
npm install -g https://github.com/tKwbr999/msearch.git

# または一度アンインストールしてから再インストール
npm uninstall -g msearch
npm install -g https://github.com/tKwbr999/msearch.git

# 動作確認
msearch --help
```

#### ローカルソースのアップデート

```bash
# ソースを更新してから再インストール
git pull origin main  # または最新のソースを取得
npm run build
npm install -g .

# または一度アンインストールしてから再インストール
npm uninstall -g msearch
npm install -g .
```

#### コード変更後のアップデート手順

**開発中にコードを変更した場合:**

```bash
# 1. TypeScriptをビルド
npm run build

# 2. グローバルインストールを更新
npm install -g .

# 上記で問題がある場合は、一度アンインストールしてから再インストール
npm uninstall -g msearch
npm install -g .
```

**確実にアップデートしたい場合:**

```bash
# 1. 現在のインストールを削除
npm uninstall -g msearch

# 2. 最新のコードをビルド
npm run build

# 3. 再インストール
npm install -g .

# 4. 動作確認
msearch --help
```

**アップデートが反映されているか確認:**

```bash
# インストール場所とバージョンを確認
npm list -g msearch

# コマンドの動作確認
msearch --help

# 最新の機能が動作するかテスト
msearch coffee -l
```

## 📖 使い方

### ブラウザ検索（デフォルト）

```bash
# 宮古諸島エリアを表示
msearch

# レストランを検索（ブラウザで開く）
msearch レストラン

# コーヒーショップを検索
msearch "coffee shop"

# URLのみを表示
msearch カフェ --url-only
```

### ターミナルリスト表示

```bash
# ターミナルに検索結果を一覧表示（実際のGoogle Maps結果を取得）
msearch レストラン -l
msearch "居酒屋" -l
msearch "ガソリンスタンド" -l
```

**リスト表示の出力例:**

```
🔍 宮古諸島で「レストラン」を検索中...
🌐 Google Mapsにアクセス中...

15件の結果が見つかりました:

1. 【店名】 島唄居酒屋 海風
   【レビュー】 ⭐ 4.3/5.0
   【住所】 📍 沖縄県宮古島市平良字下里108-11
   【電話番号】 📞 0980-72-3456
   【Maps詳細】 🗺️ https://www.google.com/maps/place/...

2. 【店名】 宮古島海鮮市場
   【レビュー】 ⭐ 4.1/5.0
   【住所】 📍 沖縄県宮古島市平良字西里5-2
   【サイト】 🌐 https://miyako-seafood.jp
   【Maps詳細】 🗺️ https://www.google.com/maps/place/...

💡 ヒント: -lフラグなしで実行するとGoogle Mapsブラウザで開きます
📊 最大100件まで表示 (現在: 15件)
```

## 🛠️ オプション

| オプション   | 説明                                                                          |
| ------------ | ----------------------------------------------------------------------------- |
| `-l`         | ブラウザではなくターミナルに検索結果を一覧表示（実際のGoogle Maps結果を取得） |
| `--url-only` | ブラウザを開かずURLのみを表示                                                 |
| `--help`     | ヘルプメッセージを表示                                                        |

## 📝 使用例

### ブラウザ検索

```bash
msearch                         # 宮古諸島エリアを表示
msearch レストラン                # レストランを検索
msearch "観光スポット"             # 観光スポットを検索
msearch 下地島                   # 下地島を検索
msearch 病院 --url-only         # 病院のURLのみ表示
```

### ターミナル一覧表示（リアルタイム検索）

```bash
msearch レストラン -l             # レストランをターミナルに一覧
msearch "コンビニ" -l             # コンビニをターミナルに一覧
msearch "ATM" -l                # ATMをターミナルに一覧
msearch "薬局" -l               # 薬局をターミナルに一覧
```

### 表示される情報

ターミナルリスト表示（`-l`フラグ）では以下の情報が表示されます：

- **【店名】** - 店舗・施設名
- **【レビュー】** - ⭐Google評価/5.0
- **【住所】** - 📍完全な住所
- **【電話番号】** - 📞電話番号（取得できた場合）
- **【サイト】** - 🌐公式ウェブサイト（取得できた場合）
- **【Maps詳細】** - 🗺️Google Maps店舗詳細ページURL

### URLのクリック方法

表示されたURLをブラウザで開くには：

- **macOS**: `Cmd+クリック`
- **Windows/Linux**: `Ctrl+クリック`
- **代替方法**: URLを選択してコピー&ペースト

## 🎯 特徴

- **地理的制限**: 全ての検索は宮古諸島の緯度経度範囲内に限定
- **中心点最適化**: 宮古島本島の中心部を基準とした検索
- **高解像度表示**: 14zズームレベルで詳細な検索結果
- **リアルタイム検索**: `-l`フラグで実際のGoogle Maps結果をスクレイピング取得
- **詳細情報表示**: 店名、評価、住所、電話番号、ウェブサイト、Maps URLを表示
- **クロスプラットフォーム**: macOS、Windows、Linuxで動作

## 🔧 開発

### 開発フロー

**ブランチ構成:**
- `main`: 本番用ブランチ（自動リリース）
- `develop`: 開発用ブランチ

**開発手順:**
```bash
# 1. developブランチで開発
git checkout develop
git pull origin develop

# 2. 機能開発・修正
# ファイルを編集...

# 3. developにコミット・プッシュ
git add .
git commit -m "機能追加: 新しい機能の説明"
git push origin develop

# 4. 自動リリース
# CI通過後、自動的にバージョンアップしてmainブランチにマージされます
```

**自動化されるプロセス:**
1. `develop`ブランチへのプッシュでCI実行
2. Lint、Format、その他チェック実行
3. 全チェック通過後：
   - パッチバージョンを自動増加（0.7.0 → 0.7.1）
   - `package.json`のバージョン更新
   - Gitタグ作成
   - `main`ブランチに自動マージ

### 開発モード

```bash
# TypeScriptで直接実行
npm run dev

# ローカルテスト
node miyako-maps-search.js --help
```

### プロジェクト構造

```
msearch/
├── miyako-maps-search.ts    # メインソースファイル
├── miyako-maps-search.js    # コンパイル済みJavaScript
├── package.json             # プロジェクト設定
├── tsconfig.json           # TypeScript設定
├── README.md               # このファイル
└── .gitignore              # Git除外設定
```

## 🔍 技術仕様

### 依存関係

- **playwright**: Google Mapsのスクレイピング
- **cheerio**: HTMLパースィング
- **typescript**: TypeScript開発環境

### 検索方式

1. **ブラウザ検索**: 宮古諸島の緯度経度bounds付きGoogle Maps URLを生成
2. **ターミナル検索**: Playwrightを使用してGoogle Mapsから実際の検索結果を取得・パース

## ⚠️ 注意事項

- Google Mapsの利用規約に従ってご使用ください
- 大量のリクエストは避け、適度な間隔での使用を推奨します
- ターミナル検索（`-l`）は初回実行時にPlaywrightのChromiumダウンロードが発生する場合があります

## 🐛 トラブルシューティング

### よくある問題

**Q: `msearch: command not found`**
A: グローバルインストールが正しく行われていません。以下の手順で再インストールしてください：

```bash
# 既存のインストールを削除
npm uninstall -g msearch

# 再インストール
npm install -g https://github.com/tKwbr999/msearch.git
```

**Q: インストール後もコマンドが見つからない**
A: npm のグローバルパスが環境変数に設定されているか確認してください：

```bash
# npm グローバルパスを確認
npm config get prefix

# パスが通っているか確認（例: /Users/username/.npm-global/bin）
echo $PATH

# パスが含まれていない場合は、シェルの設定ファイルに追加
# bashの場合: ~/.bashrc または ~/.bash_profile
# zshの場合: ~/.zshrc
export PATH="$(npm config get prefix)/bin:$PATH"
```

**Q: ターミナル検索でエラーが発生する**
A: ネットワーク接続を確認し、Google Mapsにアクセスできることを確認してください。

**Q: 検索結果が表示されない**
A: キーワードを変更して再試行してください。宮古諸島内の施設のみが対象です。

## 📄 ライセンス

MIT License

## 🤝 貢献

プルリクエストや問題報告はお気軽にどうぞ。

GitHub: https://github.com/tKwbr999/msearch

---

**開発者向け情報**: 現在の検索機能はPlaywrightを使用して実際のGoogle Mapsから結果を取得しています。リアルタイムでの検索結果表示により、最新の店舗・施設情報を提供します。URLのクリック方法の説明により、ユーザーは簡単にGoogle Mapsで詳細を確認できます。
