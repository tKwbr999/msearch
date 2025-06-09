/**
 * OverpassService - Handles OpenStreetMap Overpass API interactions
 * Single Responsibility: Overpass API communication and query building
 */

import axios from 'axios';
import { MIYAKOJIMA_BOUNDS } from '../config.js';
import { OverpassPoi } from '../types.js';
import { KeywordService } from './KeywordService.js';

export class OverpassService {
  private keywordService: KeywordService;

  constructor() {
    this.keywordService = new KeywordService();
  }

  /**
   * Build Overpass API query for the given keyword
   */
  public buildOverpassQuery(keyword: string): string {
    const bounds = `(${MIYAKOJIMA_BOUNDS.south},${MIYAKOJIMA_BOUNDS.west},${MIYAKOJIMA_BOUNDS.north},${MIYAKOJIMA_BOUNDS.east})`;
    
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
  public async searchPois(keyword: string): Promise<OverpassPoi[]> {
    try {
      const query = this.buildOverpassQuery(keyword);
      console.log('🔍 OpenStreetMapから基本データを検索中...');
      
      const response = await axios.post(
        'https://overpass-api.de/api/interpreter',
        query,
        {
          headers: {
            'Content-Type': 'text/plain',
          },
          timeout: 30000,
        }
      );

      const data = response.data;
      if (data.elements && Array.isArray(data.elements)) {
        return data.elements.filter((element: OverpassPoi) => 
          element.tags && 
          element.tags.name && 
          element.lat && 
          element.lon
        );
      }
      
      return [];
    } catch (error) {
      console.error('❌ Overpass API error:', error);
      return [];
    }
  }
}