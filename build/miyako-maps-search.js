#!/usr/bin/env node
"use strict";
/**
 * Miyakojima Maps Search CLI Tool
 * Opens Google Maps search within Miyakojima's geographic bounds
 */
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const playwright_1 = require("playwright");
const process_1 = require("process");
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
    // Find keyword (non-flag arguments, excluding -l)
    const nonFlagArgs = argList.filter((arg) => {
        if (arg.startsWith('--'))
            return false;
        if (arg === '-l')
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
async function scrapeGoogleMapsResults(searchUrl) {
    let browser;
    try {
        browser = await playwright_1.chromium.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
        });
    }
    catch (launchError) {
        console.log('❌ ブラウザの起動に失敗しました。シンプルな検索結果を表示します。');
        // Fallback: return simple search suggestion
        const keyword = decodeURIComponent(searchUrl.split('search/')[1]?.split('/@')[0] || 'coffee');
        return [
            {
                name: `「${keyword}」の検索`,
                address: '🔍 ブラウザでの検索をお試しください',
                mapsUrl: searchUrl,
            },
        ];
    }
    try {
        const page = await browser.newPage();
        await page.setExtraHTTPHeaders({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        });
        console.log('🌐 Google Mapsにアクセス中...');
        await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
        // 検索結果が読み込まれるまで待機
        await page.waitForTimeout(8000);
        // ページの内容を解析中
        console.log('📄 ページの内容を解析中...');
        // CSSセレクタを使用して正確に店名を取得
        const results = await page.evaluate(() => {
            const places = [];
            // 店名を含むリンク要素を取得
            const linkElements = document.querySelectorAll('#QA0Szd a[aria-label]');
            for (let i = 0; i < Math.min(linkElements.length, 100); i++) {
                const element = linkElements[i];
                const ariaLabel = element.getAttribute('aria-label');
                if (!ariaLabel)
                    continue;
                // 「·アクセスしたリンク」を除去
                const cleanName = ariaLabel.replace(/·アクセスしたリンク$/, '').trim();
                // 明らかに店名ではないものを除外
                if (!cleanName ||
                    cleanName.length < 4 ||
                    cleanName.length > 80 ||
                    cleanName.includes('営業') ||
                    cleanName.includes('時間') ||
                    cleanName.includes('フィルタ') ||
                    cleanName.includes('保存') ||
                    cleanName.includes('共有') ||
                    cleanName.includes('地図') ||
                    cleanName.includes('ログイン') ||
                    cleanName.includes('データ') ||
                    cleanName.includes('プライバシー') ||
                    cleanName.includes('レイヤ') ||
                    cleanName.includes('ウェブサイトにアクセス') ||
                    cleanName.includes('のウェブサイト') ||
                    (cleanName.startsWith('「') && cleanName.endsWith('」')) ||
                    cleanName.match(/^[\d.]+\(/) ||
                    cleanName.includes('km')) {
                    continue;
                }
                // 重複チェック
                if (places.some((place) => place.name === cleanName)) {
                    continue;
                }
                const place = { name: cleanName };
                // 親要素から追加情報を取得
                const parentElement = element.closest('[data-result-index]') ||
                    element.closest('[role="article"]') ||
                    element.parentElement;
                if (parentElement) {
                    // 評価を取得
                    const ratingElement = parentElement.querySelector('[role="img"][aria-label*="星"], [aria-label*="5つ星"]');
                    if (ratingElement) {
                        const ratingText = ratingElement.getAttribute('aria-label') || '';
                        const ratingMatch = ratingText.match(/(\d+\.?\d*)/);
                        if (ratingMatch) {
                            place.rating = parseFloat(ratingMatch[1]);
                        }
                    }
                    // 住所を取得（具体的なセレクターを使用）
                    const addressElement = document.querySelector('#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div.m6QErb.DxyBCb.kA9KIf.dS8AEf.XiKgde.ecceSd > div.m6QErb.DxyBCb.kA9KIf.dS8AEf.XiKgde.ecceSd > div:nth-child(5) > div > div.bfdHYd.Ppzolf.OFBs3e > div.lI9IFe > div.y7PRA > div > div > div.UaQhfb.fontBodyMedium > div:nth-child(4) > div:nth-child(1) > span:nth-child(2) > span:nth-child(2)');
                    if (addressElement) {
                        const addressText = addressElement.textContent?.trim();
                        if (addressText &&
                            (addressText.includes('平良') ||
                                addressText.includes('下地') ||
                                addressText.includes('来間') ||
                                addressText.includes('池間') ||
                                addressText.includes('多良間') ||
                                addressText.includes('伊良部'))) {
                            place.address = addressText;
                        }
                    }
                }
                places.push(place);
            }
            // Google Maps URLを各店舗に追加
            for (const place of places) {
                if (place.name) {
                    const encodedName = encodeURIComponent(place.name + ' 宮古島');
                    place.mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedName}&center=24.805,125.2817&zoom=15`;
                }
            }
            return places;
        });
        return results;
    }
    catch (error) {
        console.error('❌ Google Mapsからの情報取得に失敗しました:', error?.message || error);
        return [];
    }
    finally {
        if (browser) {
            try {
                await browser.close();
            }
            catch (closeError) {
                console.error('ブラウザクローズエラー:', closeError?.message || closeError);
            }
        }
    }
}
async function searchPlacesInTerminal(keyword, _bounds) {
    console.log(`🔍 宮古諸島で「${keyword}」を検索中...`);
    // 実際のGoogle Maps URLを生成
    const searchUrl = buildMapsUrl(keyword);
    console.log(`🔗 検索URL: ${searchUrl}`);
    console.log('');
    try {
        // Google Mapsから実際の検索結果を取得
        const results = await scrapeGoogleMapsResults(searchUrl);
        if (results.length === 0) {
            console.log('指定されたエリアで結果が見つかりませんでした。');
            console.log('💡 ヒント: キーワードを変更してお試しください。');
            return;
        }
        console.log(`${results.length}件の結果が見つかりました:`);
        console.log('');
        results.forEach((place, index) => {
            console.log(`${index + 1}. 【店名】 ${place.name}`);
            if (place.rating) {
                console.log(`   【レビュー】 ⭐ ${place.rating}/5.0`);
            }
            if (place.address) {
                console.log(`   【住所】 📍 ${place.address}`);
            }
            if (place.phone) {
                console.log(`   【電話番号】 📞 ${place.phone}`);
            }
            if (place.website) {
                console.log(`   【サイト】 🌐 ${place.website}`);
            }
            if (place.mapsUrl) {
                console.log(`   【Maps詳細】 ${place.mapsUrl}`);
            }
            console.log('');
        });
        console.log(`💡 ヒント: -lフラグなしで実行するとGoogle Mapsブラウザで開きます`);
        console.log(`🖱️  URLクリック方法:`);
        console.log(`   • macOS: Cmd+クリック`);
        console.log(`   • Windows/Linux: Ctrl+クリック`);
        console.log(`   • または、URLを選択してコピー&ペースト`);
        console.log(`📊 最大100件まで表示 (現在: ${results.length}件)`);
    }
    catch (error) {
        console.error('❌ 検索中にエラーが発生しました:', error);
        console.log('💡 ネットワーク接続を確認して再試行してください。');
    }
}
function buildMapsUrl(keyword) {
    const bounds = MIYAKOJIMA_BOUNDS;
    if (keyword) {
        // 宮古島を地理的に指定した検索クエリを作成
        const locationQuery = `${keyword} 宮古島 沖縄`;
        const baseUrl = 'https://www.google.com/maps/search/';
        // 宮古諸島の境界を指定してズーム
        const boundsParam = `${bounds.south},${bounds.west}|${bounds.north},${bounds.east}`;
        const searchParams = new URLSearchParams({
            api: '1',
            query: locationQuery,
            bounds: boundsParam,
        });
        return `${baseUrl}?${searchParams.toString()}`;
    }
    else {
        // Show Miyakojima islands with bounds to ensure proper zoom
        const boundsParam = `${bounds.south},${bounds.west}|${bounds.north},${bounds.east}`;
        return `https://www.google.com/maps/@${MIYAKOJIMA_CENTER.lat},${MIYAKOJIMA_CENTER.lng},12z?bounds=${encodeURIComponent(boundsParam)}`;
    }
}
function showHelp() {
    console.log('Usage: msearch [keyword] [options]');
    console.log('');
    console.log('Searches Google Maps within Miyako Islands (宮古諸島) geographic bounds.');
    console.log('All searches are centered on Miyakojima main island for optimal results.');
    console.log('Higher zoom level (14z) is used to show more detailed search results.');
    console.log('If no keyword is provided, shows Miyako Islands area.');
    console.log('');
    console.log('Included islands:');
    console.log('  • 宮古島 (Miyakojima)');
    console.log('  • 下地島 (Shimojishima)');
    console.log('  • 伊良部島 (Irabujima)');
    console.log('  • 多良間村 (Tarama Village)');
    console.log('  • 池間島 (Ikemajima)');
    console.log('  • 来間島 (Kurimajima)');
    console.log('');
    console.log('Coordinate bounds:');
    console.log(`  North: ${MIYAKOJIMA_BOUNDS.north}° (24°56'30"N - 宮古島市北端)`);
    console.log(`  South: ${MIYAKOJIMA_BOUNDS.south}° (24°39'00"N - 多良間村南端)`);
    console.log(`  East:  ${MIYAKOJIMA_BOUNDS.east}° (125°28'30"E - 宮古島市東端)`);
    console.log(`  West:  ${MIYAKOJIMA_BOUNDS.west}° (124°41'00"E - 多良間村西端)`);
    console.log('');
    console.log('Options:');
    console.log('  -l               Display search results in terminal instead of browser');
    console.log('  --url-only       Print the URL only without opening browser');
    console.log('  --help           Show this help message');
    console.log('');
    console.log('Examples:');
    console.log('  msearch                         # Show Miyako Islands area');
    console.log('  msearch レストラン                # Search restaurants in Miyako Islands');
    console.log('  msearch レストラン -l             # List restaurants in terminal');
    console.log('  msearch "coffee shop" -l        # List coffee shops in terminal');
    console.log('  msearch --url-only              # Print Miyako Islands URL only');
}
async function main() {
    const args = parseArgs();
    // Show help if --help flag is present
    if (process_1.argv.includes('--help')) {
        showHelp();
        process.exit(0);
    }
    // Handle -l flag for terminal display
    if (args.list) {
        if (!args.keyword) {
            console.log('❌ -lフラグを使用する場合はキーワードを指定してください');
            console.log('例: msearch レストラン -l');
            process.exit(1);
        }
        await searchPlacesInTerminal(args.keyword, MIYAKOJIMA_BOUNDS);
        return;
    }
    const mapsUrl = buildMapsUrl(args.keyword);
    if (args.urlOnly) {
        console.log(mapsUrl);
    }
    else {
        const searchDesc = args.keyword
            ? `${args.keyword} within Miyako Islands bounds`
            : `Miyako Islands area`;
        console.log(`Opening Google Maps search for: ${searchDesc}`);
        openUrl(mapsUrl);
        console.log(`URL: ${mapsUrl}`);
    }
}
if (require.main === module) {
    main();
}
