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
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const test_electron_1 = require("@vscode/test-electron");
async function main() {
    try {
        const extensionDevelopmentPath = path.resolve(__dirname, '../../');
        const extensionTestsPath = path.resolve(__dirname, './suite/index');
        const testWorkspace = path.resolve(__dirname, '../../test-workspace');
        // 创建测试工作区
        if (!fs.existsSync(testWorkspace)) {
            fs.mkdirSync(testWorkspace, { recursive: true });
        }
        // 创建测试文件
        const testFile = path.join(testWorkspace, 'test.vue');
        if (!fs.existsSync(testFile)) {
            fs.writeFileSync(testFile, `<script setup lang="ts">
// Test file for Vue 3 Snippets Pro
</script>

<template>
  <div>Test Component</div>
</template>`);
        }
        // 下载并安装 VS Code
        const vscodeExecutablePath = await (0, test_electron_1.downloadAndUnzipVSCode)();
        // 运行测试
        await (0, test_electron_1.runTests)({
            vscodeExecutablePath,
            extensionDevelopmentPath,
            extensionTestsPath,
            launchArgs: [
                testWorkspace,
                '--install-extension=' + extensionDevelopmentPath,
                '--disable-workspace-trust',
                '--enable-proposed-api',
                '--user-data-dir=' + path.resolve(__dirname, '../../.vscode-test/user-data')
            ],
            extensionTestsEnv: {
                EXTENSION_DEVELOPMENT: 'true',
                EXTENSION_ID: 'lushiqiang.vue3-snippets-pro',
                VSCODE_EXTENSION_PATH: extensionDevelopmentPath,
                NODE_ENV: 'test'
            }
        });
    }
    catch (err) {
        process.exit(1);
    }
}
void main();
//# sourceMappingURL=runTest.js.map