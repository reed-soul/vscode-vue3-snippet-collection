import * as vscode from 'vscode';

interface Snippet {
    prefix: string;
    body: string | string[];
    description: string;
}

export class SnippetValidator {
    static async validate(snippet: Snippet): Promise<boolean> {
        try {
            // 验证基本结构
            if (!snippet.prefix || !snippet.body || !snippet.description) {
                throw new Error('代码片段缺少必要字段');
            }

            // 验证前缀格式
            if (typeof snippet.prefix !== 'string' || !snippet.prefix.startsWith('v3')) {
                throw new Error('前缀必须以 v3 开头');
            }

            // 验证模板语法
            if (Array.isArray(snippet.body)) {
                this.validateTemplateVariables(snippet.body);
            }

            return true;
        } catch (error) {
            if (error instanceof Error) {
                await vscode.window.showWarningMessage(
                    `代码片段验证失败: ${error.message}`
                );
            } else {
                await vscode.window.showWarningMessage(
                    '代码片段验证失败: 未知错误'
                );
            }
            return false;
        }
    }

    private static validateTemplateVariables(body: string[]): void {
        const variablePattern = /\${\d+:?[^}]*}/;
        body.forEach(line => {
            if (line.includes('${') && !variablePattern.test(line)) {
                throw new Error('模板变量格式不正确');
            }
        });
    }
} 