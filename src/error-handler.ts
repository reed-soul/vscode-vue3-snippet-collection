import * as vscode from 'vscode';

export class ErrorHandler {
    static async handle(error: Error, context: string): Promise<void> {
        console.error(`[Vue3SnippetsPro] Error in ${context}:`, error);
        
        // 使用 await 处理 Promise
        await vscode.window.showErrorMessage(
            `Vue 3 Snippets Pro: ${this.getUserFriendlyMessage(error)}`
        );
    }

    private static getUserFriendlyMessage(error: Error): string {
        const errorMap: Record<string, string> = {
            'ENOENT': '无法找到配置文件',
            'SyntaxError': '代码片段格式错误',
        };

        return errorMap[error.name] || '发生未知错误，请重试';
    }
} 