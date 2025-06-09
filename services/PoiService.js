"use strict";
/**
 * PoiService - Handles POI data enrichment and formatting
 * Single Responsibility: POI data processing and enrichment
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoiService = void 0;
const FoursquareService_js_1 = require("./FoursquareService.js");
const UrlService_js_1 = require("./UrlService.js");
class PoiService {
    constructor() {
        this.foursquareService = new FoursquareService_js_1.FoursquareService();
        this.urlService = new UrlService_js_1.UrlService();
    }
    /**
     * Enrich POI data with Foursquare ratings and reviews
     */
    async enrichWithFoursquare(overpassResults) {
        const enrichedResults = [];
        console.log('📊 レビュー・評価データを取得中...');
        // Check API key once and show warning if missing
        const hasApiKey = this.foursquareService.hasApiKey();
        if (!hasApiKey) {
            console.log('⚠️ Foursquare API key not found, skipping reviews');
        }
        for (const poi of overpassResults) {
            const basePoi = {
                name: poi.tags.name || 'Unknown',
                address: this.urlService.buildAddress(poi.tags),
                coordinates: { lat: poi.lat, lng: poi.lon },
                phone: poi.tags.phone,
                website: poi.tags.website,
                opening_hours: poi.tags.opening_hours,
                mapsUrl: this.urlService.buildMapsUrl(poi.lat, poi.lon, poi.tags.name || 'Unknown')
            };
            // Only try Foursquare API if we have an API key
            if (hasApiKey) {
                try {
                    const foursquareData = await this.foursquareService.searchVenue(poi.tags.name || '', poi.lat, poi.lon);
                    if (foursquareData) {
                        basePoi.rating = foursquareData.rating;
                        basePoi.reviews_count = foursquareData.stats?.total_tips || 0;
                        basePoi.price_level = foursquareData.price;
                    }
                }
                catch {
                    // Continue with basic data if Foursquare fails
                }
            }
            enrichedResults.push(basePoi);
        }
        return enrichedResults;
    }
    /**
     * Format POI data for display
     */
    formatPoiForDisplay(poi) {
        let result = `🏪 ${poi.name}\n`;
        result += `📍 ${poi.address}\n`;
        // レーティング情報の表示（APIキーがあり、Foursquareから取得を試行した場合）
        if (this.foursquareService.hasApiKey()) {
            if (poi.rating) {
                const stars = '⭐'.repeat(Math.round(poi.rating));
                result += `⭐ ${poi.rating}/5 ${stars}`;
                if (poi.reviews_count) {
                    result += ` (${poi.reviews_count} reviews)`;
                }
                result += '\n';
            }
            else {
                result += `⭐ レーティング情報なし\n`;
            }
        }
        if (poi.price_level) {
            const priceChars = '💰'.repeat(poi.price_level);
            result += `💰 価格帯: ${priceChars}\n`;
        }
        if (poi.phone) {
            result += `📞 ${poi.phone}\n`;
        }
        if (poi.website) {
            result += `🌐 ${poi.website}\n`;
        }
        if (poi.opening_hours) {
            result += `🕒 ${poi.opening_hours}\n`;
        }
        result += `🗺️ ${poi.mapsUrl}\n`;
        return result;
    }
}
exports.PoiService = PoiService;
