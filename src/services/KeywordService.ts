/**
 * KeywordService - Handles keyword mapping and fuzzy search
 * Single Responsibility: Keyword processing and mapping
 */

import { KEYWORD_MAPPING } from '../config.js';

export class KeywordService {
  /**
   * Find similar keywords using fuzzy search
   */
  public findSimilarKeywords(keyword: string): string[] {
    const normalizedKeyword = keyword.toLowerCase().trim();
    const exactMatch = KEYWORD_MAPPING[keyword];
    if (exactMatch) return exactMatch;
    
    // Try partial matches
    const partialMatches: string[] = [];
    for (const [key, mappings] of Object.entries(KEYWORD_MAPPING)) {
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
  public getKeywordMappings(keyword: string): string[] {
    return KEYWORD_MAPPING[keyword] || this.findSimilarKeywords(keyword);
  }

  /**
   * Build safe regex patterns for keyword search
   */
  public buildSafeKeywordPatterns(keyword: string): string[] {
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