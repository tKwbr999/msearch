"use strict";
/**
 * KeywordService - Handles keyword mapping and fuzzy search
 * Single Responsibility: Keyword processing and mapping
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeywordService = void 0;
const config_js_1 = require("../config.js");
class KeywordService {
    /**
     * Find similar keywords using fuzzy search
     */
    findSimilarKeywords(keyword) {
        const normalizedKeyword = keyword.toLowerCase().trim();
        const exactMatch = config_js_1.KEYWORD_MAPPING[keyword];
        if (exactMatch)
            return exactMatch;
        // Try partial matches
        const partialMatches = [];
        for (const [key, mappings] of Object.entries(config_js_1.KEYWORD_MAPPING)) {
            if (key.toLowerCase().includes(normalizedKeyword) ||
                normalizedKeyword.includes(key.toLowerCase())) {
                partialMatches.push(...mappings);
            }
        }
        if (partialMatches.length > 0) {
            console.log(`💡 "${keyword}" の関連キーワードで検索中...`);
            return partialMatches;
        }
        return [];
    }
    /**
     * Get keyword mappings for a given keyword
     */
    getKeywordMappings(keyword) {
        return config_js_1.KEYWORD_MAPPING[keyword] || this.findSimilarKeywords(keyword);
    }
    /**
     * Build safe regex patterns for keyword search
     */
    buildSafeKeywordPatterns(keyword) {
        console.log(`🔍 "${keyword}" を含む名前で検索中...`);
        // Use safer regex patterns and escape special characters
        const safeKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const patterns = [
            `name~"${safeKeyword}"`,
            `name~".*${safeKeyword}.*"`
        ];
        // If keyword is katakana/hiragana, also try common patterns
        if (/[\u3040-\u309F\u30A0-\u30FF]/.test(keyword)) {
            patterns.push(`brand~"${safeKeyword}"`);
            patterns.push(`operator~"${safeKeyword}"`);
        }
        return patterns;
    }
}
exports.KeywordService = KeywordService;
