"use strict";
/**
 * Configuration constants for msearch
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.POPULAR_KEYWORDS = exports.KEYWORD_MAPPING = exports.MIYAKOJIMA_CENTER = exports.MIYAKOJIMA_BOUNDS = void 0;
// Miyako Islands coordinate bounds (宮古諸島全域の緯度経度範囲)
// Includes: 宮古島、下地島、伊良部島、多良間村、池間島、来間島
exports.MIYAKOJIMA_BOUNDS = {
    north: 24.9417, // 24°56'30"N (宮古島市北端)
    south: 24.65, // 24°39'00"N (多良間村南端)
    east: 125.475, // 125°28'30"E (宮古島市東端)
    west: 124.6833, // 124°41'00"E (多良間村西端)
};
// Miyakojima main island center (宮古島本島の中心部)
exports.MIYAKOJIMA_CENTER = {
    lat: 24.805, // 宮古島本島の中心緯度
    lng: 125.2817, // 宮古島本島の中心経度
};
// Enhanced keyword to Overpass amenity/shop mapping with fuzzy search support
exports.KEYWORD_MAPPING = {
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
    // レンタカー・交通関連
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
// Popular keywords for interactive mode
exports.POPULAR_KEYWORDS = [
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
