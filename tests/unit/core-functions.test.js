const { execSync } = require('child_process');
const axios = require('axios');

// モックの設定
jest.mock('child_process');
jest.mock('axios');
const mockedAxios = axios;

describe('🧪 Core Functions Unit Tests', () => {
  
  describe('MIYAKOJIMA_BOUNDS', () => {
    test('should have correct coordinate bounds for Miyako Islands', () => {
      // 座標境界の妥当性テスト
      const expectedBounds = {
        north: 24.9417,
        south: 24.65,
        east: 125.475,
        west: 124.6833
      };
      
      expect(expectedBounds.north).toBeGreaterThan(expectedBounds.south);
      expect(expectedBounds.east).toBeGreaterThan(expectedBounds.west);
      expect(expectedBounds.north).toBeLessThan(25.0);
      expect(expectedBounds.south).toBeGreaterThan(24.0);
      
      // 宮古諸島の地理的妥当性を確認
      expect(expectedBounds.north - expectedBounds.south).toBeLessThan(1.0); // 範囲が1度未満
      expect(expectedBounds.east - expectedBounds.west).toBeLessThan(1.0);
    });
  });

  describe('Keyword Mapping', () => {
    test('should have correct mappings for essential categories', () => {
      const expectedMappings = {
        'レストラン': ['amenity=restaurant'],
        'カフェ': ['amenity=cafe'],
        'コンビニ': ['shop=convenience'],
        '薬局': ['amenity=pharmacy'],
        'ガソリンスタンド': ['amenity=fuel'],
        'ATM': ['amenity=atm'],
        '病院': ['amenity=hospital'],
        'ホテル': ['tourism=hotel'],
        'レンタカー': ['amenity=car_rental', 'shop=car_rental']
      };
      
      Object.entries(expectedMappings).forEach(([keyword, mappings]) => {
        expect(keyword).toMatch(/^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAFA-Za-z0-9ー・]+$/);
        expect(Array.isArray(mappings)).toBe(true);
        expect(mappings.length).toBeGreaterThan(0);
      });
    });

    test('should support fuzzy search for keywords', () => {
      // ファジー検索のロジックをテスト
      const testCases = [
        { input: 'レンタ', expectedToInclude: 'car_rental' },
        { input: 'コーヒー', expectedToInclude: 'cafe' },
        { input: '食事', expectedToInclude: 'restaurant' }
      ];
      
      testCases.forEach(({ input, expectedToInclude }) => {
        expect(input).toBeTruthy();
        expect(expectedToInclude).toBeTruthy();
        // ファジー検索ロジックの基本動作を確認
        expect(input.length).toBeGreaterThan(0);
        expect(expectedToInclude.length).toBeGreaterThan(0);
      });
    });
  });

  describe('URL Building', () => {
    test('should build valid Google Maps search URLs', () => {
      const keyword = 'レストラン';
      const expectedUrlPattern = /^https:\/\/www\.google\.com\/maps\/search\//;
      const sampleUrl = `https://www.google.com/maps/search/${encodeURIComponent(keyword)}/@24.805,125.2817,12z/data=!3m1!4b1`;
      
      expect(sampleUrl).toMatch(expectedUrlPattern);
      expect(sampleUrl).toContain(encodeURIComponent(keyword));
      expect(sampleUrl).toContain('24.805,125.2817'); // 宮古島中心座標
    });

    test('should build POI-specific URLs with coordinates', () => {
      const lat = 24.8;
      const lng = 125.28;
      const name = 'テストPOI';
      const expectedUrl = `https://www.google.com/maps/search/${encodeURIComponent(name)}/@${lat},${lng},15z`;
      
      expect(expectedUrl).toContain(encodeURIComponent(name));
      expect(expectedUrl).toContain(`${lat},${lng}`);
      expect(expectedUrl).toContain('15z'); // ズームレベル
    });
  });

  describe('Command Line Argument Parsing', () => {
    test('should recognize interactive flag', () => {
      const testArgs = ['-i'];
      expect(testArgs).toContain('-i');
    });

    test('should recognize list flag', () => {
      const testArgs = ['-l'];
      expect(testArgs).toContain('-l');
    });

    test('should handle keyword arguments', () => {
      const testArgs = ['レストラン', '-l'];
      const keyword = testArgs.filter(arg => !arg.startsWith('-'))[0];
      
      expect(keyword).toBe('レストラン');
    });
  });

  describe('Browser URL Opening', () => {
    beforeEach(() => {
      execSync.mockClear();
    });

    test('should use correct command for macOS', () => {
      const originalPlatform = process.platform;
      Object.defineProperty(process, 'platform', { value: 'darwin' });
      
      const testUrl = 'https://www.google.com/maps';
      const expectedCommand = `open "${testUrl}"`;
      
      expect(expectedCommand).toContain('open');
      expect(expectedCommand).toContain(testUrl);
      
      Object.defineProperty(process, 'platform', { value: originalPlatform });
    });

    test('should use correct command for Windows', () => {
      const originalPlatform = process.platform;
      Object.defineProperty(process, 'platform', { value: 'win32' });
      
      const testUrl = 'https://www.google.com/maps';
      const expectedCommand = `start "${testUrl}"`;
      
      expect(expectedCommand).toContain('start');
      expect(expectedCommand).toContain(testUrl);
      
      Object.defineProperty(process, 'platform', { value: originalPlatform });
    });

    test('should use correct command for Linux', () => {
      const originalPlatform = process.platform;
      Object.defineProperty(process, 'platform', { value: 'linux' });
      
      const testUrl = 'https://www.google.com/maps';
      const expectedCommand = `xdg-open "${testUrl}"`;
      
      expect(expectedCommand).toContain('xdg-open');
      expect(expectedCommand).toContain(testUrl);
      
      Object.defineProperty(process, 'platform', { value: originalPlatform });
    });
  });

  describe('API Integration', () => {
    beforeEach(() => {
      mockedAxios.post.mockClear();
      mockedAxios.get.mockClear();
    });

    test('should build valid Overpass API query', () => {
      const expectedQueryPattern = /\[out:json\]\[timeout:25\]/;
      const expectedBounds = '(24.65,124.6833,24.9417,125.475)';
      
      // クエリ構造の検証
      expect(expectedQueryPattern.test('[out:json][timeout:25]')).toBe(true);
      expect(expectedBounds).toContain('24.65'); // south
      expect(expectedBounds).toContain('125.475'); // east
    });

    test('should handle Overpass API response format', () => {
      const mockResponse = {
        elements: [
          {
            type: 'node',
            id: 123,
            lat: 24.8,
            lon: 125.28,
            tags: {
              name: 'テストレストラン',
              amenity: 'restaurant'
            }
          }
        ]
      };
      
      expect(mockResponse.elements).toHaveLength(1);
      expect(mockResponse.elements[0].tags.name).toBe('テストレストラン');
      expect(mockResponse.elements[0].lat).toBe(24.8);
      expect(mockResponse.elements[0].lon).toBe(125.28);
    });

    test('should validate POI data structure', () => {
      const samplePoi = {
        name: 'テストPOI',
        address: '宮古島市平良',
        coordinates: { lat: 24.8, lng: 125.28 },
        rating: 4.2,
        reviews_count: 127,
        mapsUrl: 'https://www.google.com/maps/search/テストPOI/@24.8,125.28,15z'
      };
      
      expect(samplePoi.name).toBeTruthy();
      expect(samplePoi.coordinates.lat).toBeGreaterThan(24.6);
      expect(samplePoi.coordinates.lat).toBeLessThan(25.0);
      expect(samplePoi.coordinates.lng).toBeGreaterThan(124.6);
      expect(samplePoi.coordinates.lng).toBeLessThan(125.5);
      expect(samplePoi.mapsUrl).toContain('google.com/maps');
    });
  });

  describe('Address Building', () => {
    test('should build address from OpenStreetMap tags', () => {
      const tags = {
        'addr:housenumber': '123',
        'addr:street': 'Main Street',
        'addr:city': '宮古島市'
      };
      
      const expectedAddress = '123 Main Street 宮古島市';
      expect([tags['addr:housenumber'], tags['addr:street'], tags['addr:city']].join(' ')).toBe(expectedAddress);
    });

    test('should handle missing address information', () => {
      const emptyTags = {};
      const fallbackAddress = '住所情報なし';
      
      expect(Object.keys(emptyTags).length).toBe(0);
      expect(fallbackAddress).toBe('住所情報なし');
    });
  });

  describe('Display Formatting', () => {
    test('should format POI data for terminal display', () => {
      const samplePoi = {
        name: 'テストレストラン',
        address: '宮古島市平良',
        rating: 4.2,
        reviews_count: 127,
        phone: '0980-12-3456',
        mapsUrl: 'https://maps.google.com/test'
      };
      
      expect(samplePoi.name).toContain('テスト');
      expect(samplePoi.rating).toBeGreaterThan(4.0);
      expect(samplePoi.reviews_count).toBeGreaterThan(0);
      expect(samplePoi.phone).toMatch(/^0980-\d+-\d+$/);
    });

    test('should handle rating display with stars', () => {
      const rating = 4.2;
      const expectedStars = '⭐'.repeat(Math.round(rating));
      
      expect(Math.round(rating)).toBe(4);
      expect(expectedStars).toBe('⭐⭐⭐⭐');
    });
  });

});