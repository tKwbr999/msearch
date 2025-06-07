const { execSync, spawn } = require('child_process');
const path = require('path');

// テスト用のCLIパス
const CLI_PATH = path.join(__dirname, '../../miyako-maps-search.js');

describe('🚀 CLI Integration E2E Tests', () => {
  
  // タイムアウトを長めに設定（ネットワーク呼び出しがあるため）
  jest.setTimeout(30000);

  describe('Help and Version', () => {
    test('should display help when --help flag is used', () => {
      try {
        const output = execSync(`node ${CLI_PATH} --help`, { 
          encoding: 'utf8',
          timeout: 5000
        });
        
        expect(output).toContain('Usage: msearch');
        expect(output).toContain('宮古諸島');
        expect(output).toContain('--help');
        expect(output).toContain('Examples:');
      } catch (error) {
        expect(error.status).toBe(0);
      }
    });

    test('should display coordinate bounds in help', () => {
      try {
        const output = execSync(`node ${CLI_PATH} --help`, { 
          encoding: 'utf8',
          timeout: 5000
        });
        
        expect(output).toContain('24.9417');
        expect(output).toContain('24.65');
        expect(output).toContain('125.475');
        expect(output).toContain('124.6833');
      } catch (error) {
        expect(error.status).toBe(0);
      }
    });
  });

  describe('URL Generation', () => {
    test('should generate URL when --url-only flag is used', () => {
      try {
        const output = execSync(`node ${CLI_PATH} --url-only`, { 
          encoding: 'utf8',
          timeout: 3000
        });
        
        expect(output).toContain('https://www.google.com/maps/');
        expect(output).toContain('24.805,125.2817');
      } catch (error) {
        console.error('URL generation test failed:', error.message);
        throw error;
      }
    });

    test('should generate search URL with keyword', () => {
      try {
        const output = execSync(`node ${CLI_PATH} レストラン --url-only`, { 
          encoding: 'utf8',
          timeout: 3000
        });
        
        expect(output).toContain('https://www.google.com/maps/search/');
        // URLエンコードされた状態で検証
        expect(decodeURIComponent(output)).toContain('宮古島');
        expect(decodeURIComponent(output)).toContain('レストラン');
      } catch (error) {
        console.error('Search URL generation test failed:', error.message);
        throw error;
      }
    });
  });

  describe('Error Handling', () => {
    test('should show error message when -l is used without keyword', () => {
      try {
        const output = execSync(`node ${CLI_PATH} -l`, { 
          encoding: 'utf8',
          timeout: 3000
        });
        
        expect(false).toBe(true); // この行には到達しないはず
      } catch (error) {
        expect(error.stderr || error.stdout).toContain('キーワードを指定してください');
        expect(error.status).toBe(1);
      }
    });
  });

  describe('Search Functionality (Fast Mock Test)', () => {
    test('should start search process with valid keyword', () => {
      try {
        const output = execSync(`node ${CLI_PATH} カフェ --url-only`, { 
          encoding: 'utf8',
          timeout: 10000
        });
        
        expect(output).toContain('https://www.google.com/maps/search/');
        // URLエンコードされた状態で検証
        expect(decodeURIComponent(output)).toContain('カフェ');
      } catch (error) {
        console.error('Search process test failed:', error.message);
        throw error;
      }
    });
  });

  // 未実装機能はスキップ
  describe('Future Features (Not Implemented)', () => {
    test.skip('Interactive mode (-i) is planned for future implementation', () => {
      // インタラクティブモードは今後実装予定
    });

    test.skip('History feature (-h) is planned for future implementation', () => {
      // 履歴機能は今後実装予定
    });

    test.skip('Favorites feature (-f) is planned for future implementation', () => {
      // お気に入り機能は今後実装予定
    });
  });
});