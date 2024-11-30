# Vue 3 Snippets Pro

<p align="center">
  <img src="extension/images/logo.png" alt="Vue 3 Snippets Pro" width="128" height="128">
</p>

<p align="center">
  <img src="extension/images/preview.gif" alt="Vue 3 Snippets Pro 预览" width="720">
</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=lushiqiang.vue3-snippets-pro">
    <img src="https://img.shields.io/visual-studio-marketplace/v/lushiqiang.vue3-snippets-pro.svg?color=blue&amp;label=VS%20Code%20Marketplace&logo=visual-studio-code" alt="Visual Studio Marketplace Version">
  </a>
  <a href="https://marketplace.visualstudio.com/items?itemName=lushiqiang.vue3-snippets-pro">
    <img src="https://img.shields.io/visual-studio-marketplace/d/lushiqiang.vue3-snippets-pro.svg?color=blue" alt="Visual Studio Marketplace Downloads">
  </a>
  <a href="https://marketplace.visualstudio.com/items?itemName=lushiqiang.vue3-snippets-pro">
    <img src="https://img.shields.io/visual-studio-marketplace/r/lushiqiang.vue3-snippets-pro.svg?color=blue" alt="Visual Studio Marketplace Rating">
  </a>
</p>

<p align="center">
  简体中文 | <a href="README.md">English</a>
</p>

## ✨ 核心特性

- 🚀 **增强的智能提示**：实时预览、示例展示、文档链接
- 💪 **完整的 TypeScript 支持**：内置类型提示和类型安全
- 🎯 **高度可配置**：支持自定义代码风格和编码习惯
- 📦 **丰富的代码片段**：涵盖 Vue 3 所有常用功能
- 🎨 **UI 框架支持**：包含全球流行的 UI 框架

## 📥 快速开始

### 安装

1. 打开 VS Code
2. 按下 `Ctrl+P` / `Cmd+P`
3. 输入 `ext install lushiqiang.vue3-snippets-pro`
4. 按下回车

或者在 VS Code 扩展市场中搜索 "Vue 3 Snippets Pro"。

## 🎯 代码片段分类

### Vue 3 核心
| 前缀 | 说明 |
|------|------|
| `v3setup` | Vue 3 Setup 组件 |
| `v3setup-ts` | TypeScript Setup 组件 |
| `v3ref` | ref 响应式变量 |
| `v3reactive` | reactive 响应式对象 |
| `v3computed` | 计算属性 |

### UI 框架
#### Element Plus
| 前缀 | 说明 |
|------|------|
| `v3el-search-table` | 搜索表格组件 |
| `v3el-form` | 表单组件 |

#### Ant Design Vue
| 前缀 | 说明 |
|------|------|
| `v3a-search-table` | 搜索表格组件 |
| `v3a-form` | 表单组件 |

#### Naive UI
| 前缀 | 说明 |
|------|------|
| `v3n-search-table` | 搜索表格组件 |
| `v3n-form` | 表单组件 |

#### Vant
| 前缀 | 说明 |
|------|------|
| `v3vant-list` | 列表组件 |
| `v3vant-form` | 表单组件 |

#### 国际化 UI 框架
- **Vuetify**: `v3vuetify-table`
- **PrimeVue**: `v3prime-table`
- **Arco Design**: `v3a-search-table`

[查看完整速查表](docs/cheatsheet.md)

## ⚙️ 配置

```json
{
  "vue3SnippetsPro.style": {
    "defaultStyle": "scss",
    "scopedByDefault": true
  },
  "vue3SnippetsPro.formatting": {
    "indentSize": 2,
    "quotes": "single"
  }
}
```

[查看完整配置指南](docs/configuration.md)

## 🌟 支持项目

如果这个项目对您有帮助，请给它一个星标 ⭐️

## 📝 更新日志

查看 [CHANGELOG.md](CHANGELOG.md) 了解详细更新历史。

## 📄 许可证

[MIT](LICENSE)