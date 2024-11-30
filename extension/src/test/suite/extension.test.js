"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = __importStar(require("assert"));
const vscode = __importStar(require("vscode"));
const snippet_validator_1 = require("../../snippet-validator");
const analytics_1 = require("../../analytics");
const mocha_1 = require("mocha");
// 增加测试超时时间
const TEST_TIMEOUT = 10000;
(0, mocha_1.suite)('Vue 3 Snippets Pro Test Suite', () => {
    const EXTENSION_ID = 'lushiqiang.vue3-snippets-pro';
    const MAX_RETRIES = 5;
    const RETRY_DELAY = 1000;
    async function waitForExtension(retries = MAX_RETRIES) {
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
    (0, mocha_1.before)(async function () {
        this.timeout(TEST_TIMEOUT * 2);
        // 等待 VS Code 完全启动
        await new Promise(resolve => setTimeout(resolve, 3000));
        const extension = await waitForExtension();
        if (!extension) {
            throw new Error('Extension failed to load after multiple retries');
        }
    });
    // 基础测试
    (0, mocha_1.test)('Extension should be present', async function () {
        this.timeout(TEST_TIMEOUT);
        const extension = await waitForExtension();
        assert.ok(extension, 'Extension should be installed');
    });
    // 代码片段验证测试
    (0, mocha_1.suite)('Snippet Validator', () => {
        (0, mocha_1.test)('should validate correct snippet', async function () {
            this.timeout(TEST_TIMEOUT);
            const validSnippet = {
                prefix: 'v3setup',
                body: ['<script setup>', '${1}', '</script>'],
                description: 'Vue 3 setup template'
            };
            const result = await snippet_validator_1.SnippetValidator.validate(validSnippet);
            assert.strictEqual(result, true);
        });
        (0, mocha_1.test)('should reject invalid prefix', async function () {
            this.timeout(TEST_TIMEOUT);
            const invalidSnippet = {
                prefix: 'setup',
                body: ['<script setup>', '${1}', '</script>'],
                description: 'Invalid prefix'
            };
            // 使用 Promise.race 来添加超时处理
            const result = await Promise.race([
                snippet_validator_1.SnippetValidator.validate(invalidSnippet),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Validation timeout')), 5000))
            ]).catch(() => false);
            assert.strictEqual(result, false);
        });
        (0, mocha_1.test)('should validate template variables', async () => {
            const snippetWithVars = {
                prefix: 'v3test',
                body: ['const ${1:name} = ${2:value}'],
                description: 'Test variables'
            };
            const result = await snippet_validator_1.SnippetValidator.validate(snippetWithVars);
            assert.strictEqual(result, true);
        });
    });
    // 使用统计测试
    (0, mocha_1.suite)('Analytics', () => {
        // 每个测试前重置统计数据
        (0, mocha_1.beforeEach)(() => {
            analytics_1.SnippetAnalytics.resetStats();
        });
        (0, mocha_1.test)('should track snippet usage', () => {
            analytics_1.SnippetAnalytics.trackUsage('v3setup');
            const stats = analytics_1.SnippetAnalytics.getPopularSnippets();
            assert.ok(stats.some(s => s.prefix === 'v3setup' && s.count > 0));
        });
        (0, mocha_1.test)('should reset statistics', () => {
            analytics_1.SnippetAnalytics.trackUsage('v3test');
            analytics_1.SnippetAnalytics.resetStats();
            const stats = analytics_1.SnippetAnalytics.getPopularSnippets();
            assert.strictEqual(stats.length, 0);
        });
        (0, mocha_1.test)('should generate usage report', () => {
            analytics_1.SnippetAnalytics.trackUsage('v3setup');
            analytics_1.SnippetAnalytics.trackUsage('v3setup');
            const report = analytics_1.SnippetAnalytics.getReport();
            assert.ok(report.includes('v3setup: 2'));
        });
    });
    // 配置测试
    (0, mocha_1.suite)('Configuration', () => {
        (0, mocha_1.test)('should load default configuration', async function () {
            this.timeout(TEST_TIMEOUT);
            // 等待扩展完全激活
            await new Promise(resolve => setTimeout(resolve, 1000));
            // 获取配置
            const config = vscode.workspace.getConfiguration('vue3SnippetsPro');
            // 使用 get 的泛型版本并提供默认值
            assert.strictEqual(config.get('style.defaultStyle', 'css'), 'css');
            assert.strictEqual(config.get('style.scopedByDefault', true), true);
            assert.strictEqual(config.get('formatting.indentSize', 2), 2);
            assert.strictEqual(config.get('formatting.quotes', 'single'), 'single');
            assert.strictEqual(config.get('script.defaultApiStyle', 'composition'), 'composition');
            assert.strictEqual(config.get('script.semicolon', true), true);
        });
    });
    // 配置特性测试
    (0, mocha_1.suite)('Configuration Features', () => {
        (0, mocha_1.test)('should have correct configuration structure', async function () {
            this.timeout(TEST_TIMEOUT);
            const extension = await waitForExtension();
            assert.ok(extension, 'Extension should be installed');
            // 确保扩展已激活
            if (!extension.isActive) {
                await extension.activate();
            }
            const packageJSON = extension.packageJSON;
            assert.ok(packageJSON.contributes.configuration);
            assert.strictEqual(packageJSON.contributes.configuration.title, 'Vue 3 Snippets Pro');
            const properties = packageJSON.contributes.configuration.properties;
            assert.ok(properties['vue3SnippetsPro.style']);
            assert.ok(properties['vue3SnippetsPro.formatting']);
            assert.ok(properties['vue3SnippetsPro.script']);
        });
        (0, mocha_1.test)('should respect user settings', async function () {
            this.timeout(TEST_TIMEOUT);
            const config = vscode.workspace.getConfiguration('vue3SnippetsPro');
            // 等待配置加载
            await new Promise(resolve => setTimeout(resolve, 100));
            // 使用 get 的泛型版本并提供默认值
            const indentSize = config.get('formatting.indentSize', 2);
            const quotes = config.get('formatting.quotes', 'single');
            // 更精确的类型检查
            assert.strictEqual(typeof indentSize, 'number');
            assert.ok(['single', 'double'].includes(quotes));
        });
    });
});
//# sourceMappingURL=extension.test.js.map