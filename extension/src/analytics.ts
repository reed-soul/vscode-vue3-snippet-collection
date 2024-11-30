export class SnippetAnalytics {
    private static usage: Record<string, number> = {};
    private static lastReset: Date = new Date();

    static trackUsage(snippetPrefix: string) {
        this.usage[snippetPrefix] = (this.usage[snippetPrefix] || 0) + 1;
    }

    static getPopularSnippets(): Array<{prefix: string, count: number}> {
        return Object.entries(this.usage)
            .map(([prefix, count]) => ({prefix, count}))
            .sort((a, b) => b.count - a.count);
    }

    static resetStats() {
        this.usage = {};
        this.lastReset = new Date();
    }

    static getReport(): string {
        const popular = this.getPopularSnippets();
        return `最常用的代码片段:\n${
            popular.slice(0, 5)
                .map(({prefix, count}) => `${prefix}: ${count}次`)
                .join('\n')
        }`;
    }
} 