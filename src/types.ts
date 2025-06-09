/**
 * Type definitions for msearch
 */

export interface Bounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Args {
  urlOnly?: boolean;
  keyword?: string;
  list?: boolean;
  interactive?: boolean;
}

export interface OverpassPoi {
  type: string;
  id: number;
  lat: number;
  lon: number;
  tags: {
    name?: string;
    amenity?: string;
    shop?: string;
    'addr:housenumber'?: string;
    'addr:street'?: string;
    'addr:city'?: string;
    phone?: string;
    website?: string;
    opening_hours?: string;
  };
}

export interface FoursquareVenue {
  fsq_id: string;
  name: string;
  rating?: number;
  stats?: {
    total_tips: number;
  };
  price?: number;
  photos?: Array<{ prefix: string; suffix: string }>;
}

export interface EnrichedPoi {
  name: string;
  address: string;
  coordinates: Coordinates;
  rating?: number;
  reviews_count?: number;
  price_level?: number;
  phone?: string;
  website?: string;
  opening_hours?: string;
  mapsUrl: string;
}

export interface PopularKeyword {
  name: string;
  emoji: string;
  description: string;
}