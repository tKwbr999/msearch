"use strict";
/**
 * OverpassService - Handles OpenStreetMap Overpass API interactions
 * Single Responsibility: Overpass API communication and query building
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OverpassService = void 0;
const axios_1 = __importDefault(require("axios"));
const config_js_1 = require("../config.js");
const KeywordService_js_1 = require("./KeywordService.js");
class OverpassService {
    constructor() {
        this.keywordService = new KeywordService_js_1.KeywordService();
    }
    /**
     * Build Overpass API query for the given keyword
     */
    buildOverpassQuery(keyword) {
        const bounds = `(${config_js_1.MIYAKOJIMA_BOUNDS.south},${config_js_1.MIYAKOJIMA_BOUNDS.west},${config_js_1.MIYAKOJIMA_BOUNDS.north},${config_js_1.MIYAKOJIMA_BOUNDS.east})`;
        // Try exact match first, then fuzzy search
        let mappings = this.keywordService.getKeywordMappings(keyword);
        // If still no matches, try broad searches with name matching
        if (mappings.length === 0) {
            mappings = this.keywordService.buildSafeKeywordPatterns(keyword);
        }
        // Build query parts for each mapping
        const queryParts = mappings.flatMap(mapping => [
            `node[${mapping}]${bounds};`,
            `way[${mapping}]${bounds};`,
            `relation[${mapping}]${bounds};`
        ]);
        return `[out:json][timeout:25];
(
  ${queryParts.join('\n  ')}
);
out center;`;
    }
    /**
     * Search POIs using Overpass API
     */
    async searchPois(keyword) {
        try {
            const query = this.buildOverpassQuery(keyword);
            console.log('🔍 OpenStreetMapから基本データを検索中...');
            const response = await axios_1.default.post('https://overpass-api.de/api/interpreter', query, {
                headers: {
                    'Content-Type': 'text/plain',
                },
                timeout: 30000,
            });
            const data = response.data;
            if (data.elements && Array.isArray(data.elements)) {
                return data.elements.filter((element) => element.tags &&
                    element.tags.name &&
                    element.lat &&
                    element.lon);
            }
            return [];
        }
        catch (error) {
            console.error('❌ Overpass API error:', error);
            return [];
        }
    }
}
exports.OverpassService = OverpassService;
