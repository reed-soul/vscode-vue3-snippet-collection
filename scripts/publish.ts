import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

// 版本类型
type VersionType = 'patch' | 'minor' | 'major';

// 更新版本号
function updateVersion(type: VersionType) {
    execSync(`pnpm version ${type} --no-git-tag-version`);
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    return pkg.version;
}

// 更新 CHANGELOG.md
function updateChangelog(version: string) {
    const date = new Date().toISOString().split('T')[0];
    const template = `\n## [${version}] - ${date}\n### Added\n- \n\n### Changed\n- \n\n### Fixed\n- \n`;
    
    const changelog = fs.readFileSync('CHANGELOG.md', 'utf8');
    const updatedChangelog = changelog.replace(
        '# Change Log\n',
        '# Change Log\n' + template
    );
    
    fs.writeFileSync('CHANGELOG.md', updatedChangelog);
}

// 清理构建文件
function clean() {
    execSync('pnpm run clean');
}

// 构建项目
function build() {
    execSync('pnpm run compile');
}

// 打包扩展
function packageExtension(version: string) {
    const outDir = 'dist';
    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir);
    }
    
    execSync(`vsce package --no-dependencies --out dist/vue3-snippets-pro-${version}.vsix`);
}

// 发布扩展
function publishExtension(version: string) {
    execSync(`vsce publish --packagePath dist/vue3-snippets-pro-${version}.vsix --no-dependencies`);
}

// 主函数
async function main() {
    try {
        const versionType = process.argv[2] as VersionType || 'patch';
        
        // 1. 清理旧文件
        clean();
        
        // 2. 更新版本号
        const newVersion = updateVersion(versionType);
        console.log(`Updating to version ${newVersion}`);
        
        // 3. 更新 CHANGELOG
        updateChangelog(newVersion);
        console.log('Updated CHANGELOG.md');
        
        // 4. 构建项目
        build();
        console.log('Build completed');
        
        // 5. 打包扩展
        packageExtension(newVersion);
        console.log('Package created');
        
        // 6. 发布扩展
        publishExtension(newVersion);
        console.log('Published successfully');
        
        // 7. 提交变更
        execSync('git add .');
        execSync(`git commit -m "chore: release v${newVersion}"`);
        execSync(`git tag v${newVersion}`);
        execSync('git push && git push --tags');
        
        console.log('All done!');
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

main(); 