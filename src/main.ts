#!/usr/bin/env node
/**
 * Main entry point for msearch CLI tool
 * Dependency Inversion: Depends on abstractions
 * Open/Closed: Easy to extend with new handlers
 */

import { config } from "dotenv";
import { argv } from "process";
import { CliHandler } from "./handlers/CliHandler.js";
import { InteractiveHandler } from "./handlers/InteractiveHandler.js";
import { HelpHandler } from "./handlers/HelpHandler.js";

// Load environment variables from .env, .env.local, etc.
config({ path: [".env.local", ".env"] });

export class MSearchApp {
  private cliHandler: CliHandler;
  private interactiveHandler: InteractiveHandler;
  private helpHandler: HelpHandler;

  constructor() {
    this.cliHandler = new CliHandler();
    this.interactiveHandler = new InteractiveHandler();
    this.helpHandler = new HelpHandler();
  }

  /**
   * Main application entry point
   */
  public async run(): Promise<void> {
    const args = this.cliHandler.parseArgs();

    // Show help
    if (argv.includes("--help") || argv.includes("-h")) {
      this.helpHandler.show();
      return;
    }

    // Environment setup
    if (args.setup) {
      await this.cliHandler.handleSetup();
      return;
    }

    // Environment status
    if (args.status) {
      await this.cliHandler.handleStatus();
      return;
    }

    // Version display
    if (args.version) {
      this.cliHandler.handleVersion();
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

    // Show help if no arguments provided (msearch alone)
    if (
      !args.keyword &&
      !args.list &&
      !args.urlOnly &&
      !args.interactive &&
      !args.setup &&
      !args.status &&
      !args.version
    ) {
      this.helpHandler.show();
      return;
    }

    // Validate keyword for other modes
    if (!args.keyword) {
      console.error("❌ 検索キーワードを指定してください。");
      console.log(
        "使用方法: msearch <keyword> または msearch --help でヘルプを表示",
      );
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

// Run the application
async function main(): Promise<void> {
  try {
    const app = new MSearchApp();
    await app.run();
  } catch (error) {
    console.error("❌ エラーが発生しました:", error);
    process.exit(1);
  }
}

// Entry point
if (require.main === module) {
  main().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
}
