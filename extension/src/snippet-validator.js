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
exports.SnippetValidator = void 0;
const vscode = __importStar(require("vscode"));
class SnippetValidator {
    static async validate(snippet) {
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
        }
        catch (error) {
            if (error instanceof Error) {
                await vscode.window.showWarningMessage(`代码片段验证失败: ${error.message}`);
            }
            else {
                await vscode.window.showWarningMessage('代码片段验证失败: 未知错误');
            }
            return false;
        }
    }
    static validateTemplateVariables(body) {
        const variablePattern = /\${\d+:?[^}]*}/;
        body.forEach(line => {
            if (line.includes('${') && !variablePattern.test(line)) {
                throw new Error('模板变量格式不正确');
            }
        });
    }
}
exports.SnippetValidator = SnippetValidator;
//# sourceMappingURL=snippet-validator.js.map