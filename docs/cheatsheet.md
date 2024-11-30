# Vue 3 Snippets Pro Cheat Sheet

## Vue 3 Core Snippets

### Base Templates
| Prefix | Description | Example |
|--------|-------------|---------|
| `v3setup` | Basic Vue 3 SFC | [View](#v3setup) |
| `v3setup-ts` | TypeScript SFC | [View](#v3setup-ts) |
| `v3setup-full` | Full Featured SFC | [View](#v3setup-full) |
| `v3setup-async` | Async Data Loading SFC | [View](#v3setup-async) |

### Composition API
| Prefix | Description | Example |
|--------|-------------|---------|
| `v3ref` | ref variable | `const count = ref(0)` |
| `v3reactive` | reactive object | `const state = reactive({ count: 0 })` |
| `v3computed` | computed property | `const double = computed(() => count.value * 2)` |
| `v3watch` | watch effect | `watch(source, (newVal, oldVal) => {})` |
| `v3watcheffect` | watchEffect | `watchEffect(() => { /* effect */ })` |

### Lifecycle Hooks
| Prefix | Description | Example |
|--------|-------------|---------|
| `v3mounted` | onMounted hook | `onMounted(() => {})` |
| `v3unmounted` | onUnmounted hook | `onUnmounted(() => {})` |
| `v3updated` | onUpdated hook | `onUpdated(() => {})` |

## UI Framework Snippets

### Element Plus
| Prefix | Description |
|--------|-------------|
| `v3el-search-table` | Search + Table Component |
| `v3el-form` | Form Component |

### Ant Design Vue
| Prefix | Description |
|--------|-------------|
| `v3a-search-table` | Search + Table Component |
| `v3a-form` | Form Component |

### Naive UI
| Prefix | Description |
|--------|-------------|
| `v3n-search-table` | Search + Table Component |
| `v3n-form` | Form Component |

### Vant
| Prefix | Description |
|--------|-------------|
| `v3vant-list` | List Component |
| `v3vant-form` | Form Component |

### International UI Frameworks
| Framework | Prefix | Description |
|-----------|--------|-------------|
| Vuetify | `v3vuetify-table` | Data Table Component |
| PrimeVue | `v3prime-table` | Data Table Component |
| Arco Design | `v3a-search-table` | Search Table Component |

## Examples

### v3setup
```vue
<script setup>
// Component logic
</script>

<template>
  <div></div>
</template>

<style scoped>
</style>
```

[View More Examples...](examples.md) 