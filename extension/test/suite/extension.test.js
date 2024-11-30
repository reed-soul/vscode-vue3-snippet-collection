"use strict";
describe('Vue 3 Snippets Pro Test Suite', () => {
    // Increase timeout and ensure proper Promise/done handling
    before(async function () {
        this.timeout(30000); // Increase timeout to 30 seconds
        await vscode.extensions.getExtension('your-extension-id'); // Make sure to use correct extension ID
    });
    it('Extension should be present', async () => {
        const extension = vscode.extensions.getExtension('your-extension-id');
        assert.ok(extension);
    });
    // ... rest of tests ...
});
//# sourceMappingURL=extension.test.js.map