/**
 * UrlService - Handles URL and address building
 * Single Responsibility: URL generation and address formatting
 */

import { MIYAKOJIMA_CENTER } from "../config.js";
import { OverpassPoi } from "../types.js";

export class UrlService {
  /**
   * Build Google Maps default URL (宮古島 center)
   */
  public buildMapsDefaultUrl(): string {
    const { lat, lng } = MIYAKOJIMA_CENTER;
    return `https://www.google.com/maps/@${lat},${lng},12z`;
  }

  /**
   * Build Google Maps search URL with keyword
   */
  public buildMapsSearchUrl(keyword: string): string {
    const encodedKeyword = encodeURIComponent(keyword);
    const { lat, lng } = MIYAKOJIMA_CENTER;
    return `https://www.google.com/maps/search/${encodedKeyword}/@${lat},${lng},12z/data=!3m1!4b1`;
  }

  /**
   * Build Google Maps URL for specific POI
   */
  public buildMapsUrl(lat: number, lng: number, name: string): string {
    const encodedName = encodeURIComponent(name);
    return `https://www.google.com/maps/search/${encodedName}/@${lat},${lng},15z`;
  }

  /**
   * Build address string from OpenStreetMap tags
   */
  public buildAddress(tags: OverpassPoi["tags"]): string {
    const parts = [];

    if (tags["addr:housenumber"]) parts.push(tags["addr:housenumber"]);
    if (tags["addr:street"]) parts.push(tags["addr:street"]);
    if (tags["addr:city"]) parts.push(tags["addr:city"]);

    if (parts.length === 0) {
      return "住所情報なし";
    }

    return parts.join(" ");
  }
}
