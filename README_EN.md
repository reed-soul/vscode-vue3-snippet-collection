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

### Lifecycle Hooks
| Prefix | Description | Example |
|--------|-------------|---------|
| `v3mounted` | onMounted hook | [View Example](#v3mounted) |
| `v3unmounted` | onUnmounted hook | [View Example](#v3unmounted) |

## ⚙️ Configuration

### Code Style Configuration
