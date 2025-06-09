#!/usr/bin/env node
"use strict";
/**
 * Main entry point for msearch CLI tool
 * Dependency Inversion: Depends on abstractions
 * Open/Closed: Easy to extend with new handlers
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MSearchApp = void 0;
const dotenv_1 = require("dotenv");
const process_1 = require("process");
const CliHandler_js_1 = require("./handlers/CliHandler.js");
const InteractiveHandler_js_1 = require("./handlers/InteractiveHandler.js");
const HelpHandler_js_1 = require("./handlers/HelpHandler.js");
// Load environment variables from .env, .env.local, etc.
(0, dotenv_1.config)({ path: ['.env.local', '.env'] });
class MSearchApp {
    constructor() {
        this.cliHandler = new CliHandler_js_1.CliHandler();
        this.interactiveHandler = new InteractiveHandler_js_1.InteractiveHandler();
        this.helpHandler = new HelpHandler_js_1.HelpHandler();
    }
    /**
     * Main application entry point
     */
    async run() {
        const args = this.cliHandler.parseArgs();
        // Show help
        if (process_1.argv.includes('--help') || process_1.argv.includes('-h')) {
            this.helpHandler.show();
            return;
        }
        // Interactive mode
        if (args.interactive) {
            await this.interactiveHandler.run();
            return;
        }
        // URL only mode
        if (args.urlOnly) {
            await this.cliHandler.handleUrlOnly(args.keyword);
            return;
        }
        // Validate keyword for other modes
        if (!args.keyword) {
            console.error('❌ 検索キーワードを指定してください。');
            console.log('使用方法: msearch <keyword> または msearch --help でヘルプを表示');
            process.exit(1);
        }
        // List mode - search and display results in terminal
        if (args.list) {
            await this.cliHandler.handleListMode(args.keyword);
            return;
        }
        // Default mode - open in browser
        await this.cliHandler.handleDefaultMode(args.keyword);
    }
}
exports.MSearchApp = MSearchApp;
// Run the application
async function main() {
    try {
        const app = new MSearchApp();
        await app.run();
    }
    catch (error) {
        console.error('❌ エラーが発生しました:', error);
        process.exit(1);
    }
}
// Entry point
if (require.main === module) {
    main().catch((error) => {
        console.error('Fatal error:', error);
        process.exit(1);
    });
}
