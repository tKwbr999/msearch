"use strict";
/**
 * SearchService - Main search orchestration service
 * Facade Pattern: Coordinates between different services
 * Interface Segregation: Provides clean interface for search operations
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchService = void 0;
const OverpassService_js_1 = require("./OverpassService.js");
const PoiService_js_1 = require("./PoiService.js");
class SearchService {
    constructor() {
        this.overpassService = new OverpassService_js_1.OverpassService();
        this.poiService = new PoiService_js_1.PoiService();
    }
    /**
     * Search places using hybrid API approach
     */
    async searchPlaces(keyword) {
        try {
            const overpassResults = await this.overpassService.searchPois(keyword);
            if (overpassResults.length === 0) {
                console.log('❌ 該当する場所が見つかりませんでした。');
                return [];
            }
            console.log(`✅ ${overpassResults.length}件の基本データを取得しました。`);
            const enrichedResults = await this.poiService.enrichWithFoursquare(overpassResults);
            return enrichedResults;
        }
        catch (error) {
            console.error('検索エラー:', error);
            return [];
        }
    }
    /**
     * Format search results for display
     */
    formatResults(results) {
        return results.map((poi, index) => `【${index + 1}】${this.poiService.formatPoiForDisplay(poi)}`).join('\n');
    }
}
exports.SearchService = SearchService;
