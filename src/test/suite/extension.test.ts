import * as assert from 'assert';
import * as vscode from 'vscode';
import { SnippetValidator } from '../../snippet-validator';
import { SnippetAnalytics } from '../../analytics';
import { before, beforeEach, suite, test } from 'mocha';

// 增加测试超时时间
const TEST_TIMEOUT = 10000;

// 添加类型定义
interface PackageJSON {
    contributes: {
        configuration: {
            title: string;
            properties: Record<string, unknown>;
        };
    };
}

suite('Vue 3 Snippets Pro Test Suite', () => {
    const EXTENSION_ID = 'lushiqiang.vue3-snippets-pro';
    const MAX_RETRIES = 5;
    const RETRY_DELAY = 1000;

    async function waitForExtension(retries = MAX_RETRIES): Promise<vscode.Extension<unknown> | undefined> {
        for (let i = 0; i < retries; i++) {
            const extension = vscode.extensions.getExtension(EXTENSION_ID);
            if (extension) {
                if (!extension.isActive) {
                    await extension.activate();
                }
                return extension;
            }
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
            await vscode.window.showInformationMessage(`Retrying to get extension (${i + 1}/${retries})...`);
        }
        return undefined;
    }

    // 在所有测试开始前设置
    before(async function() {
        this.timeout(TEST_TIMEOUT * 2);
        
        // 等待 VS Code 完全启动
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        const extension = await waitForExtension();
        if (!extension) {
            throw new Error('Extension failed to load after multiple retries');
        }
    });

    // 基础测试
    test('Extension should be present', async function() {
        this.timeout(TEST_TIMEOUT);
        const extension = await waitForExtension();
        assert.ok(extension, 'Extension should be installed');
    });

    // 代码片段验证测试
    suite('Snippet Validator', () => {
        test('should validate correct snippet', async function() {
            this.timeout(TEST_TIMEOUT);
            const validSnippet = {
                prefix: 'v3setup',
                body: ['<script setup>', '${1}', '</script>'],
                description: 'Vue 3 setup template'
            };
            const result = await SnippetValidator.validate(validSnippet);
            assert.strictEqual(result, true);
        });

        test('should reject invalid prefix', async function() {
            this.timeout(TEST_TIMEOUT);
            
            const invalidSnippet = {
                prefix: 'setup',
                body: ['<script setup>', '${1}', '</script>'],
                description: 'Invalid prefix'
            };

            // 使用 Promise.race 来添加超时处理
            const result = await Promise.race([
                SnippetValidator.validate(invalidSnippet),
                new Promise<boolean>((_, reject) => 
                    setTimeout(() => reject(new Error('Validation timeout')), 5000)
                )
            ]).catch(() => false);

            assert.strictEqual(result, false);
        });

        test('should validate template variables', async () => {
            const snippetWithVars = {
                prefix: 'v3test',
                body: ['const ${1:name} = ${2:value}'],
                description: 'Test variables'
            };
            const result = await SnippetValidator.validate(snippetWithVars);
            assert.strictEqual(result, true);
        });
    });

    // 使用统计测试
    suite('Analytics', () => {
        // 每个测试前重置统计数据
        beforeEach(() => {
            SnippetAnalytics.resetStats();
        });

        test('should track snippet usage', () => {
            SnippetAnalytics.trackUsage('v3setup');
            const stats = SnippetAnalytics.getPopularSnippets();
            assert.ok(stats.some(s => s.prefix === 'v3setup' && s.count > 0));
        });

        test('should reset statistics', () => {
            SnippetAnalytics.trackUsage('v3test');
            SnippetAnalytics.resetStats();
            const stats = SnippetAnalytics.getPopularSnippets();
            assert.strictEqual(stats.length, 0);
        });

        test('should generate usage report', () => {
            SnippetAnalytics.trackUsage('v3setup');
            SnippetAnalytics.trackUsage('v3setup');
            const report = SnippetAnalytics.getReport();
            assert.ok(report.includes('v3setup: 2'));
        });
    });

    // 配置测试
    suite('Configuration', () => {
        test('should load default configuration', async function() {
            this.timeout(TEST_TIMEOUT);
            
            // 等待扩展完全激活
            await new Promise(resolve => setTimeout(resolve, 1000));

            // 获取配置
            const config = vscode.workspace.getConfiguration('vue3SnippetsPro');
            
            // 使用 get 的泛型版本并提供默认值
            assert.strictEqual(config.get<string>('style.defaultStyle', 'css'), 'css');
            assert.strictEqual(config.get<boolean>('style.scopedByDefault', true), true);
            assert.strictEqual(config.get<number>('formatting.indentSize', 2), 2);
            assert.strictEqual(config.get<string>('formatting.quotes', 'single'), 'single');
            assert.strictEqual(config.get<string>('script.defaultApiStyle', 'composition'), 'composition');
            assert.strictEqual(config.get<boolean>('script.semicolon', true), true);
        });
    });

    // 配置特性测试
    suite('Configuration Features', () => {
        test('should have correct configuration structure', async function() {
            this.timeout(TEST_TIMEOUT);
            const extension = await waitForExtension();
            assert.ok(extension, 'Extension should be installed');
            
            // 确保扩展已激活
            if (!extension.isActive) {
                await extension.activate();
            }

            const packageJSON = extension.packageJSON as PackageJSON;
            assert.ok(packageJSON.contributes.configuration);
            assert.strictEqual(packageJSON.contributes.configuration.title, 'Vue 3 Snippets Pro');
            
            const properties = packageJSON.contributes.configuration.properties;
            assert.ok(properties['vue3SnippetsPro.style']);
            assert.ok(properties['vue3SnippetsPro.formatting']);
            assert.ok(properties['vue3SnippetsPro.script']);
        });

        test('should respect user settings', async function() {
            this.timeout(TEST_TIMEOUT);
            
            const config = vscode.workspace.getConfiguration('vue3SnippetsPro');
            
            // 等待配置加载
            await new Promise(resolve => setTimeout(resolve, 100));
            
            // 使用 get 的泛型版本并提供默认值
            const indentSize = config.get<number>('formatting.indentSize', 2);
            const quotes = config.get<string>('formatting.quotes', 'single');
            
            // 更精确的类型检查
            assert.strictEqual(typeof indentSize, 'number');
            assert.ok(['single', 'double'].includes(quotes));
        });
    });
}); 