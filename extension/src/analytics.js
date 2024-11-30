"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnippetAnalytics = void 0;
class SnippetAnalytics {
    static trackUsage(snippetPrefix) {
        this.usage[snippetPrefix] = (this.usage[snippetPrefix] || 0) + 1;
    }
    static getPopularSnippets() {
        return Object.entries(this.usage)
            .map(([prefix, count]) => ({ prefix, count }))
            .sort((a, b) => b.count - a.count);
    }
    static resetStats() {
        this.usage = {};
        this.lastReset = new Date();
    }
    static getReport() {
        const popular = this.getPopularSnippets();
        return `最常用的代码片段:\n${popular.slice(0, 5)
            .map(({ prefix, count }) => `${prefix}: ${count}次`)
            .join('\n')}`;
    }
}
exports.SnippetAnalytics = SnippetAnalytics;
SnippetAnalytics.usage = {};
SnippetAnalytics.lastReset = new Date();
//# sourceMappingURL=analytics.js.map