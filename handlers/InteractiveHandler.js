"use strict";
/**
 * InteractiveHandler - Handles interactive mode operations
 * Single Responsibility: Interactive mode logic and UI
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractiveHandler = void 0;
const config_js_1 = require("../config.js");
const SearchService_js_1 = require("../services/SearchService.js");
class InteractiveHandler {
    constructor() {
        this.searchService = new SearchService_js_1.SearchService();
    }
    /**
     * Run interactive mode
     */
    async run() {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const readline = require('readline');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        // Handle Ctrl+C gracefully
        process.on('SIGINT', () => {
            console.log('\n👋 プログラムを終了します。');
            rl.close();
            process.exit(0);
        });
        console.log('\n🏝️ 宮古諸島エリア検索 - インタラクティブモード');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        const displayMenu = () => {
            console.log('\n✨ 人気の検索カテゴリ:');
            config_js_1.POPULAR_KEYWORDS.forEach((item, index) => {
                console.log(`${String(index + 1).padStart(2, ' ')}. ${item.emoji} ${item.name} - ${item.description}`);
            });
            console.log('\n💡 使い方:');
            console.log('- 番号を入力してカテゴリを選択');
            console.log('- または直接キーワードを入力');
            console.log('- "exit", "quit", または空文字で終了');
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        };
        displayMenu();
        const askQuestion = () => {
            rl.question('\n🔍 検索したいカテゴリの番号またはキーワードを入力してください: ', async (input) => {
                const trimmedInput = input.trim();
                if (trimmedInput === '' || trimmedInput.toLowerCase() === 'exit' || trimmedInput.toLowerCase() === 'quit') {
                    console.log('\n👋 ありがとうございました！');
                    rl.close();
                    return;
                }
                let keyword = trimmedInput;
                // Check if input is a number (category selection)
                const num = parseInt(trimmedInput);
                if (!isNaN(num) && num >= 1 && num <= config_js_1.POPULAR_KEYWORDS.length) {
                    keyword = config_js_1.POPULAR_KEYWORDS[num - 1].name;
                    console.log(`\n${config_js_1.POPULAR_KEYWORDS[num - 1].emoji} "${keyword}" を検索します...`);
                }
                else {
                    console.log(`\n🔍 "${keyword}" を検索します...`);
                }
                try {
                    const results = await this.searchService.searchPlaces(keyword);
                    if (results.length === 0) {
                        console.log('❌ 該当する場所が見つかりませんでした。別のキーワードをお試しください。');
                    }
                    else {
                        console.log(`\n✅ ${results.length}件の結果が見つかりました:\n`);
                        console.log(this.searchService.formatResults(results));
                    }
                }
                catch (searchError) {
                    console.error('❌ 検索中にエラーが発生しました:', searchError);
                }
                askQuestion();
            });
        };
        askQuestion();
    }
}
exports.InteractiveHandler = InteractiveHandler;
