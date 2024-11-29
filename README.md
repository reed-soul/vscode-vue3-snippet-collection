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
- 🎨 **Elegant Code Organization**: Code structure following best practices

## 📥 Quick Start

### Installation

1. Open VS Code
2. Press `Ctrl+P` / `Cmd+P`
3. Type `ext install lushiqiang.vue3-snippets-pro`
4. Press Enter

Or search for "Vue 3 Snippets Pro" in VS Code Extensions Marketplace.

### Basic Usage

1. Create a new Vue component:
   - Type `v3setup` and press Tab
   ```vue
   <script setup>
   // Component logic
   </script>

   <template>
     <div></div>
   </template>
   ```

2. Add reactive variable:
   - Type `v3ref` and press Tab
   ```typescript
   const count = ref(0)
   ```

[View More Examples...](docs/examples.md)

## 🎯 Snippet Cheat Sheet

### Base Templates
| Prefix | Description | Example |
|--------|-------------|---------|
| `v3setup` | Basic component template | [View Example](#v3setup) |
| `v3setup-ts` | TypeScript component template | [View Example](#v3setup-ts) |

### Composition API
| Prefix | Description | Example |
|--------|-------------|---------|
| `v3ref` | ref reactive variable | [View Example](#v3ref) |
| `v3reactive` | reactive object | [View Example](#v3reactive) |
| `v3computed` | computed property | [View Example](#v3computed) |

[View Full Cheat Sheet](docs/cheatsheet.md)

## ⚙️ Configuration

### Code Style Configuration

```json
{
  "vue3SnippetsPro.style": {
    "defaultStyle": "scss",    // Default style language
    "scopedByDefault": true    // Add scoped by default
  },
  "vue3SnippetsPro.formatting": {
    "indentSize": 2,          // Number of spaces for indentation
    "quotes": "single"        // Quote style
  }
}
```

[View Full Configuration Guide](docs/configuration.md)

## 🎯 Pro Tips

1. **Quick View All Snippets**
   - Press `Ctrl+Shift+P` / `Cmd+Shift+P`
   - Type "Vue 3: Show All Available Snippets"

2. **Smart IntelliSense**
   - Type `v3` to see all available snippets
   - Each snippet comes with live preview and example

3. **Custom Configuration**
   - Press `Ctrl+,` / `Cmd+,`
   - Search for "Vue 3 Snippets Pro"
   - Adjust settings as needed

[View More Tips](docs/tips.md)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for release history.

## 📄 License

[MIT](LICENSE)

## 🌟 Support

If you find this project helpful, please give it a star ⭐️

## 🤔 FAQ

[View FAQ](docs/faq.md)
