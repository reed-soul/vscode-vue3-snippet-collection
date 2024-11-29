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
exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs/promises"));
const analytics_1 = require("./analytics");
const snippet_validator_1 = require("./snippet-validator");
const error_handler_1 = require("./error-handler");
// 使用异步函数读取代码片段
async function getAllSnippets() {
    const snippets = [];
    const snippetFiles = [
        'base.code-snippets',
        'composition.code-snippets',
        'lifecycle.code-snippets',
        'directives.code-snippets',
        'pinia.code-snippets',
        'composables.code-snippets'
    ];
    for (const file of snippetFiles) {
        try {
            const filePath = path.join(__dirname, '..', 'snippets', file);
            const content = await fs.readFile(filePath, 'utf-8');
            const fileContent = JSON.parse(content);
            snippets.push(...Object.values(fileContent));
        }
        catch (error) {
            await error_handler_1.ErrorHandler.handle(error, `Loading snippets from ${file}`);
        }
    }
    return snippets;
}
// 修改 createCompletionItems 函数为异步函数
async function createCompletionItems(linePrefix) {
    try {
        const snippets = await getAllSnippets();
        return snippets
            .filter(snippet => snippet.prefix.startsWith(linePrefix))
            .map(snippet => {
            const completion = new vscode.CompletionItem(snippet.prefix, vscode.CompletionItemKind.Snippet);
            completion.detail = snippet.description;
            // 添加示例用法到文档中
            const example = _getExampleUsage(snippet.prefix);
            const documentation = new vscode.MarkdownString()
                .appendCodeblock(Array.isArray(snippet.body) ? snippet.body.join('\n') : snippet.body, 'vue');
            if (example) {
                documentation.appendMarkdown('\n\n### Example Usage:\n\n')
                    .appendCodeblock(example, 'vue');
            }
            completion.documentation = documentation;
            return completion;
        });
    }
    catch (error) {
        await error_handler_1.ErrorHandler.handle(error, 'createCompletionItems');
        return [];
    }
}
/** @internal */
function _getConfiguration() {
    const config = vscode.workspace.getConfiguration('vue3SnippetsPro');
    return {
        formatting: {
            indentSize: config.get('formatting.indentSize') ?? 2,
            quotes: config.get('formatting.quotes') ?? 'single'
        },
        script: {
            semicolon: config.get('script.semicolon') ?? true
        }
    };
}
/** @internal */
function _processSnippet(snippet, config) {
    const indent = ' '.repeat(config.formatting.indentSize);
    const quoteChar = config.formatting.quotes === 'single' ? "'" : '"';
    const semicolon = config.script.semicolon ? ';' : '';
    return snippet
        .split('\n')
        .map(line => line ? indent + line : line)
        .join('\n')
        .replace(/['"]/g, quoteChar)
        .replace(/;?\s*$/, semicolon);
}
function activate(context) {
    const disposable = vscode.commands.registerCommand('vue3snippets.showSnippets', async () => {
        const panel = vscode.window.createWebviewPanel('snippetPreview', 'Vue 3 Snippets Preview', vscode.ViewColumn.One, {
            enableScripts: true
        });
        const snippets = await getAllSnippets();
        panel.webview.html = getWebviewContent(snippets);
    });
    // 注册代码片段补全提供程序
    const provider = vscode.languages.registerCompletionItemProvider(['vue', 'typescript', 'javascript'], {
        async provideCompletionItems(document, position) {
            try {
                const lineText = document.lineAt(position).text;
                const currentPosition = position.character;
                // 检查是否需要触发补全
                if (!shouldTriggerCompletion(lineText, currentPosition)) {
                    return [];
                }
                const completionItems = await createCompletionItems(lineText.slice(0, currentPosition));
                // 跟踪使用情况
                completionItems.forEach((item) => {
                    analytics_1.SnippetAnalytics.trackUsage(item.label.toString());
                });
                return completionItems;
            }
            catch (error) {
                if (error instanceof Error) {
                    await error_handler_1.ErrorHandler.handle(error, 'provideCompletionItems');
                }
                else {
                    await error_handler_1.ErrorHandler.handle(new Error('Unknown error'), 'provideCompletionItems');
                }
                return [];
            }
        }
    });
    // 添加新的命令
    context.subscriptions.push(vscode.commands.registerCommand('vue3snippets.showStats', async () => {
        const report = analytics_1.SnippetAnalytics.getReport();
        await vscode.window.showInformationMessage(report);
    }), vscode.commands.registerCommand('vue3snippets.resetStats', async () => {
        analytics_1.SnippetAnalytics.resetStats();
        await vscode.window.showInformationMessage('统计数据已重置');
    }), vscode.commands.registerCommand('vue3snippets.validateSnippets', async () => {
        const snippets = await getAllSnippets();
        const validationResults = await Promise.all(snippets.map(snippet => snippet_validator_1.SnippetValidator.validate(snippet)));
        const validCount = validationResults.filter(result => result).length;
        await vscode.window.showInformationMessage(`验证完成: ${validCount}/${snippets.length} 个代码片段有效`);
    }));
    context.subscriptions.push(disposable, provider);
}
exports.activate = activate;
// 辅助函数：检查是否应该触发补全
function shouldTriggerCompletion(lineText, position) {
    const textBeforeCursor = lineText.slice(0, position);
    return textBeforeCursor.endsWith('v3');
}
// 修改 getWebviewContent 函数以接受代码片段数据
function getWebviewContent(snippets = []) {
    const snippetList = snippets.map(snippet => `
        <div class="snippet-container">
            <div class="snippet-title">${snippet.prefix}</div>
            <div class="snippet-description">${snippet.description}</div>
            <pre class="snippet-preview"><code>${Array.isArray(snippet.body) ? snippet.body.join('\n') : snippet.body}</code></pre>
        </div>
    `).join('');
    return `<!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <style>
                .snippet-container { margin: 20px; }
                .snippet-title { font-size: 1.2em; font-weight: bold; }
                .snippet-description { color: #666; margin: 5px 0; }
                .snippet-preview { background: #f5f5f5; padding: 10px; margin: 10px 0; }
            </style>
        </head>
        <body>
            <h1>Vue 3 Snippets Preview</h1>
            ${snippetList}
        </body>
    </html>`;
}
// 重命名为内部函数
function _getExampleUsage(snippet) {
    const examples = {
        'v3setup': `<script setup>
import { ref } from 'vue'

const count = ref(0)
const increment = () => count.value++
</script>

<template>
  <button @click="increment">Count: {{ count }}</button>
</template>`,
        'v3ref': `const count = ref(0)
const message = ref('Hello')

// 使用示例
console.log(count.value) // 0
count.value++
console.log(message.value) // 'Hello'`,
    };
    return examples[snippet] || '';
}
//# sourceMappingURL=extension.js.map