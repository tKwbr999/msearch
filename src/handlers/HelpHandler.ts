/**
 * HelpHandler - Handles help display
 * Single Responsibility: Help text formatting and display
 */

export class HelpHandler {
  /**
   * Show help information
   */
  public show(): void {
    console.log(`
🏝️ msearch - 宮古諸島専用 Google Maps 検索ツール (Hybrid API版)

使用方法:
  msearch [keyword]           ブラウザでマップを開く
  msearch [keyword] -l        ターミナルに結果を表示
  msearch -i                  インタラクティブモード
  msearch --url-only          URLのみ表示
  msearch --help              このヘルプを表示

環境設定:
  msearch --setup             レビュー機能の対話式セットアップ
  msearch --status            現在の環境設定状況を確認
  msearch --version, -v       バージョン情報を表示

例:
  msearch レストラン          宮古島のレストランをブラウザで表示
  msearch カフェ -l           宮古島のカフェをターミナルに一覧表示
  msearch -i                  対話式カテゴリ選択
  msearch --setup             レビュー機能を設定
  msearch --status            設定状況を確認

対象エリア: 宮古島、池間島、来間島、伊良部島、下地島、多良間島、水納島

🆕 ハイブリッドAPI機能:
- OpenStreetMap: 基本POIデータ (無料)
- Foursquare: レビュー・評価データ (要API キー)
- レビュー機能セットアップ: msearch --setup
- 軽量で安定した動作
`);
  }
}
