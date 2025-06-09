"use strict";
/**
 * FoursquareService - Handles Foursquare API interactions
 * Single Responsibility: Foursquare API communication for reviews and ratings
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoursquareService = void 0;
const axios_1 = __importDefault(require("axios"));
class FoursquareService {
    /**
     * Check if Foursquare API key is available
     */
    hasApiKey() {
        return !!process.env.FOURSQUARE_API_KEY;
    }
    /**
     * Search for venue data using Foursquare API
     */
    async searchVenue(placeName, lat, lng) {
        try {
            const apiKey = process.env.FOURSQUARE_API_KEY;
            if (!apiKey) {
                return null;
            }
            // Debug: console.log(`🔑 Foursquare API呼び出し: "${placeName}" (${lat},${lng}) - キー: ${apiKey.slice(0,8)}...`);
            const params = new URLSearchParams({
                query: placeName,
                ll: `${lat},${lng}`,
                radius: '1000',
                limit: '1'
            });
            const response = await axios_1.default.get(`https://api.foursquare.com/v3/places/search?${params}`, {
                headers: {
                    'Authorization': apiKey,
                    'Accept': 'application/json'
                },
                timeout: 5000,
            });
            const results = response.data.results;
            if (results && results.length > 0) {
                // Debug: console.log(`✅ Foursquare API成功: ${results[0].name} (評価: ${results[0].rating || 'なし'})`);
                return results[0];
            }
            else {
                // Debug: console.log(`❌ Foursquare API: "${placeName}" の結果なし`);
                return null;
            }
        }
        catch (error) {
            // Debug: console.log(`❌ Foursquare API エラー: ${error.response?.status || error.message}`);
            return null;
        }
    }
}
exports.FoursquareService = FoursquareService;
