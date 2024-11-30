# Vue 3 Snippets Pro

<p align="center">
  <img src="images/logo.png" alt="Vue 3 Snippets Pro" width="128" height="128">
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
  <a href="README.zh-CN.md">简体中文</a> | English
</p>

## ✨ Core Features

- 🚀 **Enhanced IntelliSense**: Real-time preview, examples, and documentation links
- 💪 **Complete TypeScript Support**: Built-in type hints and type safety
- 🎯 **Highly Configurable**: Customize code style and coding conventions
- 📦 **Rich Snippet Collection**: Covers all common Vue 3 functionalities
- 🎨 **UI Framework Support**: Includes popular UI frameworks worldwide

## 📥 Quick Start

### Installation

1. Open VS Code
2. Press `Ctrl+P` / `Cmd+P`
3. Type `ext install lushiqiang.vue3-snippets-pro`
4. Press Enter

Or search for "Vue 3 Snippets Pro" in VS Code Extensions Marketplace.

## 🎯 Snippet Categories

### Vue 3 Core
| Prefix | Description |
|--------|-------------|
| `v3setup` | Vue 3 Setup SFC |
| `v3setup-ts` | TypeScript Setup SFC |
| `v3ref` | ref reactive variable |
| `v3reactive` | reactive object |
| `v3computed` | computed property |

### UI Frameworks
#### Element Plus
| Prefix | Description |
|--------|-------------|
| `v3el-search-table` | Search Table Component |
| `v3el-form` | Form Component |

#### Ant Design Vue
| Prefix | Description |
|--------|-------------|
| `v3a-search-table` | Search Table Component |
| `v3a-form` | Form Component |

#### Naive UI
| Prefix | Description |
|--------|-------------|
| `v3n-search-table` | Search Table Component |
| `v3n-form` | Form Component |

#### Vant
| Prefix | Description |
|--------|-------------|
| `v3vant-list` | List Component |
| `v3vant-form` | Form Component |

#### International UI Frameworks
- **Vuetify**: `v3vuetify-table`
- **PrimeVue**: `v3prime-table`
- **Arco Design**: `v3a-search-table`

[View Full Cheat Sheet](docs/cheatsheet.md)

## ⚙️ Configuration

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

[View Full Configuration Guide](docs/configuration.md)

## 🌟 Support

If you find this project helpful, please give it a star ⭐️

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for release history.

## 📄 License

[MIT](LICENSE)
