"use strict";
/**
 * UrlService - Handles URL and address building
 * Single Responsibility: URL generation and address formatting
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlService = void 0;
const config_js_1 = require("../config.js");
class UrlService {
    /**
     * Build Google Maps search URL with keyword
     */
    buildMapsSearchUrl(keyword) {
        const encodedKeyword = encodeURIComponent(keyword);
        const { lat, lng } = config_js_1.MIYAKOJIMA_CENTER;
        return `https://www.google.com/maps/search/${encodedKeyword}/@${lat},${lng},12z/data=!3m1!4b1`;
    }
    /**
     * Build Google Maps URL for specific POI
     */
    buildMapsUrl(lat, lng, name) {
        const encodedName = encodeURIComponent(name);
        return `https://www.google.com/maps/search/${encodedName}/@${lat},${lng},15z`;
    }
    /**
     * Build address string from OpenStreetMap tags
     */
    buildAddress(tags) {
        const parts = [];
        if (tags['addr:housenumber'])
            parts.push(tags['addr:housenumber']);
        if (tags['addr:street'])
            parts.push(tags['addr:street']);
        if (tags['addr:city'])
            parts.push(tags['addr:city']);
        if (parts.length === 0) {
            return '住所情報なし';
        }
        return parts.join(' ');
    }
}
exports.UrlService = UrlService;
