#!/usr/bin/env node
"use strict";
/**
 * Miyakojima Maps Search CLI Tool (Hybrid API Version)
 * Uses Overpass API + Foursquare API for POI search with reviews/ratings
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const child_process_1 = require("child_process");
const process_1 = require("process");
const axios_1 = __importDefault(require("axios"));
// Load environment variables from .env, .env.local, etc.
(0, dotenv_1.config)({ path: ['.env.local', '.env'] });
// Miyako Islands coordinate bounds (宮古諸島全域の緯度経度範囲)
// Includes: 宮古島、下地島、伊良部島、多良間村、池間島、来間島
const MIYAKOJIMA_BOUNDS = {
    north: 24.9417, // 24°56'30"N (宮古島市北端)
    south: 24.65, // 24°39'00"N (多良間村南端)
    east: 125.475, // 125°28'30"E (宮古島市東端)
    west: 124.6833, // 124°41'00"E (多良間村西端)
};
// Miyakojima main island center (宮古島本島の中心部)
const MIYAKOJIMA_CENTER = {
    lat: 24.805, // 宮古島本島の中心緯度
    lng: 125.2817, // 宮古島本島の中心経度
};
function parseArgs() {
    const args = {};
    const argList = process_1.argv.slice(2);
    // Find flags
    if (argList.includes('--url-only')) {
        args.urlOnly = true;
    }
    if (argList.includes('-l')) {
        args.list = true;
    }
    if (argList.includes('-i')) {
        args.interactive = true;
    }
    // Find keyword (non-flag arguments, excluding -l, -i and --help)
    const nonFlagArgs = argList.filter((arg) => {
        if (arg.startsWith('--'))
            return false;
        if (arg === '-l' || arg === '-i')
            return false;
        return true;
    });
    if (nonFlagArgs.length > 0) {
        args.keyword = nonFlagArgs.join(' ');
    }
    return args;
}
function openUrl(url) {
    try {
        const platform = process.platform;
        let command;
        switch (platform) {
            case 'darwin':
                command = `open "${url}"`;
                break;
            case 'win32':
                command = `start "${url}"`;
                break;
            default:
                command = `xdg-open "${url}"`;
        }
        (0, child_process_1.execSync)(command);
    }
    catch (error) {
        console.error('Failed to open browser:', error);
    }
}
// Enhanced keyword to Overpass amenity/shop mapping with fuzzy search support
const KEYWORD_MAPPING = {
    // レストラン・食事関連
    レストラン: ['amenity=restaurant'],
    食事: ['amenity=restaurant'],
    グルメ: ['amenity=restaurant'],
    // カフェ関連
    カフェ: ['amenity=cafe'],
    喫茶店: ['amenity=cafe'],
    コーヒー: ['amenity=cafe'],
    // コンビニ・店舗関連
    コンビニ: ['shop=convenience'],
    コンビニエンスストア: ['shop=convenience'],
    // 薬局関連
    薬局: ['amenity=pharmacy'],
    ドラッグストア: ['amenity=pharmacy'],
    // ガソリンスタンド関連
    ガソリンスタンド: ['amenity=fuel'],
    ガソリン: ['amenity=fuel'],
    給油所: ['amenity=fuel'],
    // ATM・銀行関連
    ATM: ['amenity=atm'],
    銀行: ['amenity=bank'],
    // 病院・医療関連
    病院: ['amenity=hospital'],
    医療: ['amenity=hospital', 'amenity=clinic'],
    クリニック: ['amenity=clinic'],
    // ホテル・宿泊関連
    ホテル: ['tourism=hotel'],
    宿泊: ['tourism=hotel', 'tourism=guest_house'],
    宿: ['tourism=hotel', 'tourism=guest_house'],
    // 観光関連
    観光スポット: ['tourism=attraction', 'tourism=museum', 'tourism=viewpoint'],
    観光地: ['tourism=attraction', 'tourism=museum', 'tourism=viewpoint'],
    観光: ['tourism=attraction', 'tourism=museum', 'tourism=viewpoint'],
    名所: ['tourism=attraction', 'tourism=viewpoint'],
    博物館: ['tourism=museum'],
    美術館: ['tourism=museum'],
    // ビーチ・自然関連
    ビーチ: ['natural=beach'],
    海岸: ['natural=beach'],
    海: ['natural=beach'],
    // スーパー・買い物関連
    スーパー: ['shop=supermarket'],
    スーパーマーケット: ['shop=supermarket'],
    買い物: ['shop=supermarket', 'shop=mall'],
    // 居酒屋・バー関連
    居酒屋: ['amenity=bar', 'amenity=pub'],
    バー: ['amenity=bar'],
    // レンタカー・交通関連 ★追加
    レンタカー: ['amenity=car_rental', 'shop=car_rental'],
    レンタル: ['amenity=car_rental', 'shop=car_rental'],
    'レンタ-カー': ['amenity=car_rental', 'shop=car_rental'],
    車: ['amenity=car_rental', 'shop=car_rental'],
    // 空港・交通関連
    空港: ['aeroway=aerodrome'],
    交通: ['amenity=bus_station', 'railway=station'],
    タクシー: ['amenity=taxi'],
    バス: ['amenity=bus_station'],
    // English mappings
    restaurant: ['amenity=restaurant'],
    cafe: ['amenity=cafe'],
    convenience: ['shop=convenience'],
    pharmacy: ['amenity=pharmacy'],
    fuel: ['amenity=fuel'],
    atm: ['amenity=atm'],
    hospital: ['amenity=hospital'],
    hotel: ['tourism=hotel'],
    attraction: ['tourism=attraction'],
    beach: ['natural=beach'],
    supermarket: ['shop=supermarket'],
    bar: ['amenity=bar'],
    'car_rental': ['amenity=car_rental', 'shop=car_rental'],
    rental: ['amenity=car_rental', 'shop=car_rental'],
};
// Fuzzy search function for similar keywords
function findSimilarKeywords(keyword) {
    const normalizedKeyword = keyword.toLowerCase().trim();
    const exactMatch = KEYWORD_MAPPING[keyword];
    if (exactMatch)
        return exactMatch;
    // Try partial matches
    const partialMatches = [];
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
function buildOverpassQuery(keyword) {
    const bounds = `(${MIYAKOJIMA_BOUNDS.south},${MIYAKOJIMA_BOUNDS.west},${MIYAKOJIMA_BOUNDS.north},${MIYAKOJIMA_BOUNDS.east})`;
    // Try exact match first, then fuzzy search
    let mappings = KEYWORD_MAPPING[keyword] || findSimilarKeywords(keyword);
    // If still no matches, try broad searches with name matching
    if (mappings.length === 0) {
        console.log(`🔍 "${keyword}" を含む名前で検索中...`);
        // Use safer regex patterns and escape special characters
        const safeKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        mappings = [
            `name~"${safeKeyword}"`,
            `name~".*${safeKeyword}.*"`
        ];
        // If keyword is katakana/hiragana, also try common patterns
        if (/[\u3040-\u309F\u30A0-\u30FF]/.test(keyword)) {
            mappings.push(`brand~"${safeKeyword}"`);
            mappings.push(`operator~"${safeKeyword}"`);
        }
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
async function searchOverpassApi(keyword) {
    try {
        const query = buildOverpassQuery(keyword);
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
async function searchFoursquareApi(placeName, lat, lng) {
    try {
        // Note: In production, API key should be from environment variable
        const apiKey = process.env.FOURSQUARE_API_KEY;
        if (!apiKey) {
            console.log('⚠️ Foursquare API key not found, skipping reviews');
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
function buildAddress(tags) {
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
function buildMapsUrl(lat, lng, name) {
    const encodedName = encodeURIComponent(name);
    return `https://www.google.com/maps/search/${encodedName}/@${lat},${lng},15z`;
}
async function enrichWithFoursquare(overpassResults) {
    const enrichedResults = [];
    console.log('📊 レビュー・評価データを取得中...');
    // Check API key once and show warning if missing
    const hasApiKey = !!process.env.FOURSQUARE_API_KEY;
    if (!hasApiKey) {
        console.log('⚠️ Foursquare API key not found, skipping reviews');
    }
    for (const poi of overpassResults) {
        const basePoi = {
            name: poi.tags.name || 'Unknown',
            address: buildAddress(poi.tags),
            coordinates: { lat: poi.lat, lng: poi.lon },
            phone: poi.tags.phone,
            website: poi.tags.website,
            opening_hours: poi.tags.opening_hours,
            mapsUrl: buildMapsUrl(poi.lat, poi.lon, poi.tags.name || 'Unknown')
        };
        // Only try Foursquare API if we have an API key
        if (hasApiKey) {
            try {
                const foursquareData = await searchFoursquareApi(poi.tags.name || '', poi.lat, poi.lon);
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
function formatPoiForDisplay(poi) {
    let result = `🏪 ${poi.name}\n`;
    result += `📍 ${poi.address}\n`;
    // レーティング情報の表示（APIキーがあり、Foursquareから取得を試行した場合）
    if (process.env.FOURSQUARE_API_KEY) {
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
async function searchPlacesWithHybridApi(keyword) {
    try {
        const overpassResults = await searchOverpassApi(keyword);
        if (overpassResults.length === 0) {
            console.log('❌ 該当する場所が見つかりませんでした。');
            return [];
        }
        console.log(`✅ ${overpassResults.length}件の基本データを取得しました。`);
        const enrichedResults = await enrichWithFoursquare(overpassResults);
        return enrichedResults;
    }
    catch (error) {
        console.error('検索エラー:', error);
        return [];
    }
}
function buildMapsSearchUrl(keyword) {
    const encodedKeyword = encodeURIComponent(keyword);
    const { lat, lng } = MIYAKOJIMA_CENTER;
    return `https://www.google.com/maps/search/${encodedKeyword}/@${lat},${lng},12z/data=!3m1!4b1`;
}
// Popular keywords for interactive mode
const POPULAR_KEYWORDS = [
    { name: 'レストラン', emoji: '🍽️', description: '食事・グルメ' },
    { name: 'カフェ', emoji: '☕', description: 'コーヒー・喫茶店' },
    { name: 'コンビニ', emoji: '🏪', description: 'コンビニエンスストア' },
    { name: '薬局', emoji: '💊', description: 'ドラッグストア・薬局' },
    { name: 'ガソリンスタンド', emoji: '⛽', description: 'ガソリンスタンド' },
    { name: 'ATM', emoji: '🏧', description: '銀行・ATM' },
    { name: '病院', emoji: '🏥', description: '病院・医療施設' },
    { name: 'ホテル', emoji: '🏨', description: 'ホテル・宿泊施設' },
    { name: 'レンタカー', emoji: '🚗', description: 'レンタカー・車両レンタル' },
    { name: '観光スポット', emoji: '🗾', description: '観光地・名所' },
    { name: 'ビーチ', emoji: '🏖️', description: 'ビーチ・海岸' },
    { name: 'スーパー', emoji: '🛒', description: 'スーパーマーケット' },
    { name: '居酒屋', emoji: '🍻', description: '居酒屋・バー' },
];
async function runInteractiveMode() {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    // Handle Ctrl+C gracefully
    process.on('SIGINT', () => {
        console.log('\n👋 プログラムを終了します。');
        rl.close();
        process.exit(0);
    });
    console.log('\n🏝️ 宮古諸島エリア検索 - インタラクティブモード');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    const displayMenu = () => {
        console.log('\n✨ 人気の検索カテゴリ:');
        POPULAR_KEYWORDS.forEach((item, index) => {
            console.log(`${String(index + 1).padStart(2, ' ')}. ${item.emoji} ${item.name} - ${item.description}`);
        });
        console.log('\n💡 使い方:');
        console.log('- 番号を入力してカテゴリを選択');
        console.log('- または直接キーワードを入力');
        console.log('- "exit", "quit", または空文字で終了');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    };
    displayMenu();
    const askQuestion = () => {
        rl.question('\n🔍 検索したいカテゴリの番号またはキーワードを入力してください: ', async (input) => {
            const trimmedInput = input.trim();
            if (trimmedInput === '' || trimmedInput.toLowerCase() === 'exit' || trimmedInput.toLowerCase() === 'quit') {
                console.log('\n👋 ありがとうございました！');
                rl.close();
                return;
            }
            let keyword = trimmedInput;
            // Check if input is a number (category selection)
            const num = parseInt(trimmedInput);
            if (!isNaN(num) && num >= 1 && num <= POPULAR_KEYWORDS.length) {
                keyword = POPULAR_KEYWORDS[num - 1].name;
                console.log(`\n${POPULAR_KEYWORDS[num - 1].emoji} "${keyword}" を検索します...`);
            }
            else {
                console.log(`\n🔍 "${keyword}" を検索します...`);
            }
            try {
                const results = await searchPlacesWithHybridApi(keyword);
                if (results.length === 0) {
                    console.log('❌ 該当する場所が見つかりませんでした。別のキーワードをお試しください。');
                }
                else {
                    console.log(`\n✅ ${results.length}件の結果が見つかりました:\n`);
                    results.forEach((poi, index) => {
                        console.log(`【${index + 1}】${formatPoiForDisplay(poi)}`);
                    });
                }
            }
            catch (searchError) {
                console.error('❌ 検索中にエラーが発生しました:', searchError);
            }
            askQuestion();
        });
    };
    askQuestion();
}
function showHelp() {
    console.log(`
🏝️ msearch - 宮古諸島専用 Google Maps 検索ツール (Hybrid API版)

使用方法:
  msearch [keyword]           ブラウザでマップを開く
  msearch [keyword] -l        ターミナルに結果を表示
  msearch -i                  インタラクティブモード
  msearch --url-only          URLのみ表示
  msearch --help              このヘルプを表示

例:
  msearch レストラン          宮古島のレストランをブラウザで表示
  msearch カフェ -l           宮古島のカフェをターミナルに一覧表示
  msearch -i                  対話式カテゴリ選択

対象エリア: 宮古島、池間島、来間島、伊良部島、下地島、多良間島、水納島

🆕 新機能:
- OpenStreetMap + Foursquare APIによる高速検索
- レビュー・評価データの表示
- より正確なPOI情報
- 軽量で安定した動作
`);
}
async function main() {
    const args = parseArgs();
    // Show help
    if (process_1.argv.includes('--help') || process_1.argv.includes('-h')) {
        showHelp();
        return;
    }
    // Interactive mode
    if (args.interactive) {
        await runInteractiveMode();
        return;
    }
    // Validate keyword
    if (!args.keyword) {
        console.error('❌ 検索キーワードを指定してください。');
        console.log('使用方法: msearch <keyword> または msearch --help でヘルプを表示');
        process.exit(1);
    }
    const keyword = args.keyword;
    try {
        // URL only mode
        if (args.urlOnly) {
            const url = buildMapsSearchUrl(keyword);
            console.log(url);
            return;
        }
        // List mode - search and display results in terminal
        if (args.list) {
            console.log(`🔍 "${keyword}" を宮古諸島エリアで検索中...`);
            const results = await searchPlacesWithHybridApi(keyword);
            if (results.length === 0) {
                console.log('❌ 該当する場所が見つかりませんでした。');
                return;
            }
            console.log(`\n✅ ${results.length}件の結果が見つかりました:\n`);
            results.forEach((poi, index) => {
                console.log(`【${index + 1}】${formatPoiForDisplay(poi)}`);
            });
            return;
        }
        // Default mode - open in browser
        console.log(`🔍 "${keyword}" の検索結果をブラウザで開きます...`);
        const url = buildMapsSearchUrl(keyword);
        openUrl(url);
    }
    catch (error) {
        console.error('❌ エラーが発生しました:', error);
        process.exit(1);
    }
}
// Run the main function
if (require.main === module) {
    main().catch((error) => {
        console.error('Fatal error:', error);
        process.exit(1);
    });
}
