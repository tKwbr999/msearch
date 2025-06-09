/**
 * SearchService - Main search orchestration service
 * Facade Pattern: Coordinates between different services
 * Interface Segregation: Provides clean interface for search operations
 */

import { EnrichedPoi } from "../types.js";
import { OverpassService } from "./OverpassService.js";
import { PoiService } from "./PoiService.js";

export class SearchService {
  private overpassService: OverpassService;
  private poiService: PoiService;

  constructor() {
    this.overpassService = new OverpassService();
    this.poiService = new PoiService();
  }

  /**
   * Search places using hybrid API approach
   */
  public async searchPlaces(keyword: string): Promise<EnrichedPoi[]> {
    try {
      const overpassResults = await this.overpassService.searchPois(keyword);

      if (overpassResults.length === 0) {
        console.log("❌ 該当する場所が見つかりませんでした。");
        return [];
      }

      console.log(`✅ ${overpassResults.length}件の基本データを取得しました。`);

      const enrichedResults =
        await this.poiService.enrichWithFoursquare(overpassResults);

      return enrichedResults;
    } catch (error) {
      console.error("検索エラー:", error);
      return [];
    }
  }

  /**
   * Format search results for display
   */
  public formatResults(results: EnrichedPoi[]): string {
    return results
      .map(
        (poi, index) =>
          `【${index + 1}】${this.poiService.formatPoiForDisplay(poi)}`,
      )
      .join("\n");
  }
}
