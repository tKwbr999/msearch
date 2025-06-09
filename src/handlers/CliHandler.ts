/**
 * CliHandler - Handles CLI argument parsing and command execution
 * Dependency Inversion: Depends on abstractions (SearchService) not concretions
 */

import { execSync } from 'child_process';
import { argv } from 'process';
import { Args } from '../types.js';
import { SearchService } from '../services/SearchService.js';
import { UrlService } from '../services/UrlService.js';

export class CliHandler {
  private searchService: SearchService;
  private urlService: UrlService;

  constructor() {
    this.searchService = new SearchService();
    this.urlService = new UrlService();
  }

  /**
   * Parse command line arguments
   */
  public parseArgs(): Args {
    const args: Args = {};
    const argList = argv.slice(2);

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
      if (arg.startsWith('--')) return false;
      if (arg === '-l' || arg === '-i') return false;
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
  public openUrl(url: string): void {
    try {
      const platform = process.platform;
      let command: string;

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

      execSync(command);
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  }

  /**
   * Handle URL-only mode
   */
  public async handleUrlOnly(keyword?: string): Promise<void> {
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
  public async handleListMode(keyword: string): Promise<void> {
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
  public async handleDefaultMode(keyword: string): Promise<void> {
    console.log(`🔍 "${keyword}" の検索結果をブラウザで開きます...`);
    const url = this.urlService.buildMapsSearchUrl(keyword);
    this.openUrl(url);
  }
}