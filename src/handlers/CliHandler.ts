/**
 * CliHandler - Handles CLI argument parsing and command execution
 * Dependency Inversion: Depends on abstractions (SearchService) not concretions
 */

import { execSync } from "child_process";
import { argv } from "process";
import { Args } from "../types.js";
import { SearchService } from "../services/SearchService.js";
import { UrlService } from "../services/UrlService.js";
import { EnvService } from "../services/EnvService.js";

export class CliHandler {
  private searchService: SearchService;
  private urlService: UrlService;
  private envService: EnvService;

  constructor() {
    this.searchService = new SearchService();
    this.urlService = new UrlService();
    this.envService = new EnvService();
  }

  /**
   * Parse command line arguments
   */
  public parseArgs(): Args {
    const args: Args = {};
    const argList = argv.slice(2);

    // Find flags
    if (argList.includes("--url-only")) {
      args.urlOnly = true;
    }

    if (argList.includes("-l")) {
      args.list = true;
    }

    if (argList.includes("-i")) {
      args.interactive = true;
    }

    if (argList.includes("--setup")) {
      args.setup = true;
    }

    if (argList.includes("--status")) {
      args.status = true;
    }

    if (argList.includes("--version") || argList.includes("-v")) {
      args.version = true;
    }

    // Find keyword (non-flag arguments, excluding flags)
    const nonFlagArgs = argList.filter((arg) => {
      if (arg.startsWith("--")) return false;
      if (arg === "-l" || arg === "-i" || arg === "-v") return false;
      return true;
    });

    if (nonFlagArgs.length > 0) {
      args.keyword = nonFlagArgs.join(" ");
    }

    return args;
  }

  /**
   * Open URL in browser
   */
  public openUrl(url: string): void {
    try {
      const platform = process.platform;
      let command: string;

      switch (platform) {
        case "darwin":
          command = `open "${url}"`;
          break;
        case "win32":
          command = `start "${url}"`;
          break;
        default:
          command = `xdg-open "${url}"`;
      }

      execSync(command);
    } catch (error) {
      console.error("Failed to open browser:", error);
    }
  }

  /**
   * Handle URL-only mode
   */
  public async handleUrlOnly(keyword?: string): Promise<void> {
    const url = keyword
      ? this.urlService.buildMapsSearchUrl(keyword)
      : this.urlService.buildMapsDefaultUrl();
    console.log(url);
  }

  /**
   * Handle list mode
   */
  public async handleListMode(keyword: string): Promise<void> {
    console.log(`🔍 "${keyword}" を宮古諸島エリアで検索中...`);
    const results = await this.searchService.searchPlaces(keyword);

    if (results.length === 0) {
      console.log("❌ 該当する場所が見つかりませんでした。");
      return;
    }

    console.log(`\n✅ ${results.length}件の結果が見つかりました:\n`);
    console.log(this.searchService.formatResults(results));
  }

  /**
   * Handle default mode (open in browser)
   */
  public async handleDefaultMode(keyword: string): Promise<void> {
    console.log(`🔍 "${keyword}" の検索結果をブラウザで開きます...`);
    const url = this.urlService.buildMapsSearchUrl(keyword);
    this.openUrl(url);
  }

  /**
   * Handle environment setup
   */
  public async handleSetup(): Promise<void> {
    await this.envService.setupInteractive();
  }

  /**
   * Handle environment status check
   */
  public handleStatus(): void {
    this.envService.checkStatus();
  }

  /**
   * Handle version display
   */
  public handleVersion(): void {
    console.log("msearch v1.0.0");
    console.log("🏝️ 宮古諸島専用ハイブリッドAPI検索CLIツール");
    console.log("🏗️ SOLID原則準拠アーキテクチャ");
    console.log("🌐 OpenStreetMap + Foursquare API統合");
  }
}
