const { execSync } = require('child_process');
const path = require('path');

// テスト用のCLIパス
const CLI_PATH = path.join(__dirname, '../../main.js');

describe('🚀 CLI Integration E2E Tests (Hybrid API)', () => {
  
  // タイムアウトを長めに設定（API呼び出しがあるため）
  jest.setTimeout(45000);

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
        execSync(`node ${CLI_PATH} -l`, { 
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

  describe('Hybrid API Search Functionality', () => {
    test('should generate URL for keyword search', () => {
      try {
        const output = execSync(`node ${CLI_PATH} カフェ --url-only`, { 
          encoding: 'utf8',
          timeout: 5000
        });
        
        expect(output).toContain('https://www.google.com/maps/search/');
        expect(output).toContain('@24.805,125.2817'); // 宮古島中心座標
        expect(decodeURIComponent(output)).toContain('カフェ');
      } catch (error) {
        console.error('URL generation test failed:', error.message);
        throw error;
      }
    });

    test('should handle enhanced keyword mapping', () => {
      try {
        const output = execSync(`node ${CLI_PATH} レンタカー --url-only`, { 
          encoding: 'utf8',
          timeout: 5000
        });
        
        expect(output).toContain('https://www.google.com/maps/search/');
        expect(decodeURIComponent(output)).toContain('レンタカー');
      } catch (error) {
        console.error('Enhanced keyword mapping test failed:', error.message);
        throw error;
      }
    });
  });

  describe('Interactive Mode', () => {
    test('should start interactive mode', () => {
      try {
        // インタラクティブモードは自動終了しないため、
        // ここでは起動確認のみテスト
        const child = require('child_process').spawn('node', [CLI_PATH, '-i'], {
          stdio: ['pipe', 'pipe', 'pipe']
        });
        
        let output = '';
        child.stdout.on('data', (data) => {
          output += data.toString();
        });
        
        // 少し待ってから終了シグナルを送信
        setTimeout(() => {
          child.kill('SIGINT');
        }, 1000);
        
        return new Promise((resolve) => {
          child.on('close', () => {
            expect(output).toContain('宮古諸島エリア検索');
            expect(output).toContain('インタラクティブモード');
            resolve();
          });
        });
      } catch {
        console.log('Interactive mode test skipped due to environment limitations');
      }
    });
  });

  describe('Future Features (Planned)', () => {
    test.skip('History feature is planned for future implementation', () => {
      // 履歴機能は今後実装予定
    });

    test.skip('Favorites feature is planned for future implementation', () => {
      // お気に入り機能は今後実装予定
    });
  });
});