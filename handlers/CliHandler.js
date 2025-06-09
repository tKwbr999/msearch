"use strict";
/**
 * CliHandler - Handles CLI argument parsing and command execution
 * Dependency Inversion: Depends on abstractions (SearchService) not concretions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CliHandler = void 0;
const child_process_1 = require("child_process");
const process_1 = require("process");
const SearchService_js_1 = require("../services/SearchService.js");
const UrlService_js_1 = require("../services/UrlService.js");
class CliHandler {
    constructor() {
        this.searchService = new SearchService_js_1.SearchService();
        this.urlService = new UrlService_js_1.UrlService();
    }
    /**
     * Parse command line arguments
     */
    parseArgs() {
        const args = {};
        const argList = process_1.argv.slice(2);
        // Find flags
        if (argList.includes('--url-only')) {
            args.urlOnly = true;
        }
        if (argList.includes('-l')) {
            args.list = true;
        }
        if (argList.includes('-i')) {
            args.interactive = true;
        }
        // Find keyword (non-flag arguments, excluding -l, -i and --help)
        const nonFlagArgs = argList.filter((arg) => {
            if (arg.startsWith('--'))
                return false;
            if (arg === '-l' || arg === '-i')
                return false;
            return true;
        });
        if (nonFlagArgs.length > 0) {
            args.keyword = nonFlagArgs.join(' ');
        }
        return args;
    }
    /**
     * Open URL in browser
     */
    openUrl(url) {
        try {
            const platform = process.platform;
            let command;
            switch (platform) {
                case 'darwin':
                    command = `open "${url}"`;
                    break;
                case 'win32':
                    command = `start "${url}"`;
                    break;
                default:
                    command = `xdg-open "${url}"`;
            }
            (0, child_process_1.execSync)(command);
        }
        catch (error) {
            console.error('Failed to open browser:', error);
        }
    }
    /**
     * Handle URL-only mode
     */
    async handleUrlOnly(keyword) {
        if (!keyword) {
            console.error('❌ 検索キーワードを指定してください。');
            process.exit(1);
        }
        const url = this.urlService.buildMapsSearchUrl(keyword);
        console.log(url);
    }
    /**
     * Handle list mode
     */
    async handleListMode(keyword) {
        console.log(`🔍 "${keyword}" を宮古諸島エリアで検索中...`);
        const results = await this.searchService.searchPlaces(keyword);
        if (results.length === 0) {
            console.log('❌ 該当する場所が見つかりませんでした。');
            return;
        }
        console.log(`\n✅ ${results.length}件の結果が見つかりました:\n`);
        console.log(this.searchService.formatResults(results));
    }
    /**
     * Handle default mode (open in browser)
     */
    async handleDefaultMode(keyword) {
        console.log(`🔍 "${keyword}" の検索結果をブラウザで開きます...`);
        const url = this.urlService.buildMapsSearchUrl(keyword);
        this.openUrl(url);
    }
}
exports.CliHandler = CliHandler;
