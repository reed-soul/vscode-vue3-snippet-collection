import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext): void {
    // 只保留命令注册
    const disposable = vscode.commands.registerCommand('vue3snippets.showSnippets', () => {
        vscode.commands.executeCommand('editor.action.triggerSuggest');
    });

    context.subscriptions.push(disposable);
}
 