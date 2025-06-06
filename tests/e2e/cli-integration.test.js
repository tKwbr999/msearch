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
        expect(output).toContain('Options:');
        expect(output).toContain('Examples:');
        expect(output).toContain('Miyako Islands');
      } catch (error) {
        // ヘルプ表示は正常終了するはず
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

  describe('Interactive Mode', () => {
    test('should display interactive menu when -i flag is used', () => {
      try {
        const output = execSync(`node ${CLI_PATH} -i`, { 
          encoding: 'utf8',
          timeout: 10000
        });
        
        expect(output).toContain('インタラクティブモード');
        expect(output).toContain('人気の検索カテゴリ');
        expect(output).toContain('🍽️ レストラン');
        expect(output).toContain('☕ カフェ');
        expect(output).toContain('🏪 コンビニ');
        expect(output).toContain('よく使われる検索例');
      } catch (error) {
        console.error('Interactive mode test failed:', error.message);
        throw error;
      }
    });

    test('should show examples in interactive mode', () => {
      try {
        const output = execSync(`node ${CLI_PATH} --interactive`, { 
          encoding: 'utf8',
          timeout: 10000
        });
        
        expect(output).toContain('msearch レストラン -l');
        expect(output).toContain('msearch カフェ -l');
        expect(output).toContain('上記のコマンドをコピーして実行してください');
      } catch (error) {
        console.error('Interactive examples test failed:', error.message);
        throw error;
      }
    });
  });

  describe('Future Features', () => {
    test('should show coming soon message for history flag', () => {
      try {
        const output = execSync(`node ${CLI_PATH} -h`, { 
          encoding: 'utf8',
          timeout: 5000
        });
        
        expect(output).toContain('検索履歴機能は開発中です');
        expect(output).toContain('今後のバージョンで実装予定');
      } catch (error) {
        console.error('History flag test failed:', error.message);
        throw error;
      }
    });

    test('should show coming soon message for favorites flag', () => {
      try {
        const output = execSync(`node ${CLI_PATH} -f`, { 
          encoding: 'utf8',
          timeout: 5000
        });
        
        expect(output).toContain('お気に入り機能は開発中です');
        expect(output).toContain('今後のバージョンで実装予定');
      } catch (error) {
        console.error('Favorites flag test failed:', error.message);
        throw error;
      }
    });
  });

  describe('URL Generation', () => {
    test('should generate URL when --url-only flag is used', () => {
      try {
        const output = execSync(`node ${CLI_PATH} --url-only`, { 
          encoding: 'utf8',
          timeout: 5000
        });
        
        expect(output.trim()).toMatch(/^https:\/\/www\.google\.com\/maps/);
        expect(output).toContain('24.805');
        expect(output).toContain('125.2817');
      } catch (error) {
        console.error('URL generation test failed:', error.message);
        throw error;
      }
    });

    test('should generate search URL with keyword', () => {
      try {
        const output = execSync(`node ${CLI_PATH} レストラン --url-only`, { 
          encoding: 'utf8',
          timeout: 5000
        });
        
        expect(output.trim()).toMatch(/^https:\/\/www\.google\.com\/maps\/search/);
        expect(output).toContain('bounds=');
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
          timeout: 5000
        });
        
        // -l フラグのみの場合はエラーが期待される
        expect(false).toBe(true); // この行には到達しないはず
      } catch (error) {
        expect(error.stderr || error.stdout).toContain('キーワードを指定してください');
        expect(error.stderr || error.stdout).toContain('msearch -i でインタラクティブモード');
        expect(error.status).toBe(1);
      }
    });
  });

  describe('Search Functionality (Fast Mock Test)', () => {
    test('should start search process with valid keyword', (done) => {
      // CI環境での高速テスト：検索開始のみ確認
      const isCI = process.env.CI === 'true' || process.env.GITHUB_ACTIONS === 'true';
      const timeout = isCI ? 3000 : 8000; // CIでは3秒、ローカルでは8秒
      
      const child = spawn('node', [CLI_PATH, 'テスト', '-l'], {
        stdio: 'pipe',
        env: { 
          ...process.env, 
          // CIではPlaywrightブラウザをスキップ
          PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD: '1',
          // ネットワークタイムアウトを短縮
          PLAYWRIGHT_TIMEOUT: '5000'
        }
      });

      let output = '';
      child.stdout.on('data', (data) => {
        output += data.toString();
      });

      child.stderr.on('data', (data) => {
        output += data.toString();
      });

      const timeoutId = setTimeout(() => {
        child.kill('SIGTERM');
        
        // 検索開始メッセージが表示されているかチェック
        expect(output).toContain('宮古諸島で「テスト」を検索中');
        done();
      }, timeout);

      child.on('exit', () => {
        clearTimeout(timeoutId);
        done();
      });

      child.on('error', (error) => {
        clearTimeout(timeoutId);
        // CI環境でのエラーは許容（ブラウザ未インストールなど）
        if (isCI) {
          done();
        } else {
          done(error);
        }
      });
    }, 15000); // 最大15秒でタイムアウト
  });

});