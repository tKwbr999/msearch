/**
 * InteractiveHandler - Handles interactive mode operations
 * Single Responsibility: Interactive mode logic and UI
 */

import { POPULAR_KEYWORDS } from "../config.js";
import { SearchService } from "../services/SearchService.js";

export class InteractiveHandler {
  private searchService: SearchService;

  constructor() {
    this.searchService = new SearchService();
  }

  /**
   * Run interactive mode
   */
  public async run(): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const readline = require("readline");

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    // Handle Ctrl+C gracefully
    process.on("SIGINT", () => {
      console.log("\n👋 プログラムを終了します。");
      rl.close();
      process.exit(0);
    });

    console.log("\n🏝️ 宮古諸島エリア検索 - インタラクティブモード");
    console.log(
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    );

    const displayMenu = () => {
      console.log("\n✨ 人気の検索カテゴリ:");
      POPULAR_KEYWORDS.forEach((item, index) => {
        console.log(
          `${String(index + 1).padStart(2, " ")}. ${item.emoji} ${item.name} - ${item.description}`,
        );
      });
      console.log("\n💡 使い方:");
      console.log("- 番号を入力してカテゴリを選択");
      console.log("- または直接キーワードを入力");
      console.log('- "exit", "quit", または空文字で終了');
      console.log(
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      );
    };

    displayMenu();

    const askQuestion = () => {
      rl.question(
        "\n🔍 検索したいカテゴリの番号またはキーワードを入力してください: ",
        async (input: string) => {
          const trimmedInput = input.trim();

          if (
            trimmedInput === "" ||
            trimmedInput.toLowerCase() === "exit" ||
            trimmedInput.toLowerCase() === "quit"
          ) {
            console.log("\n👋 ありがとうございました！");
            rl.close();
            return;
          }

          let keyword = trimmedInput;

          // Check if input is a number (category selection)
          const num = parseInt(trimmedInput);
          if (!isNaN(num) && num >= 1 && num <= POPULAR_KEYWORDS.length) {
            keyword = POPULAR_KEYWORDS[num - 1].name;
            console.log(
              `\n${POPULAR_KEYWORDS[num - 1].emoji} "${keyword}" を検索します...`,
            );
          } else {
            console.log(`\n🔍 "${keyword}" を検索します...`);
          }

          try {
            const results = await this.searchService.searchPlaces(keyword);

            if (results.length === 0) {
              console.log(
                "❌ 該当する場所が見つかりませんでした。別のキーワードをお試しください。",
              );
            } else {
              console.log(`\n✅ ${results.length}件の結果が見つかりました:\n`);
              console.log(this.searchService.formatResults(results));
            }
          } catch (searchError) {
            console.error("❌ 検索中にエラーが発生しました:", searchError);
          }

          askQuestion();
        },
      );
    };

    askQuestion();
  }
}
