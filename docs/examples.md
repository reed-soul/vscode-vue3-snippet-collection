# Vue 3 Snippets Pro Examples

## Base Templates

### v3setup
Basic Vue 3 component with `<script setup>`:
```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <div>
    <button @click="count++">Count: {{ count }}</button>
  </div>
</template>
```

### v3setup-ts
TypeScript component with type annotations:
```vue
<script setup lang="ts">
import { ref, defineProps } from 'vue'

interface Props {
  message: string
  count?: number
}

const props = defineProps<Props>()
const localCount = ref(props.count ?? 0)
</script>

<template>
  <div>
    <p>{{ message }}</p>
    <button @click="localCount++">Count: {{ localCount }}</button>
  </div>
</template>
```

## Composition API

### v3ref
Create a reactive reference:
```typescript
const count = ref(0)
const message = ref<string>('Hello')

console.log(count.value) // 0
count.value++
```

### v3reactive
Create a reactive object:
```typescript
interface User {
  name: string
  age: number
}

const user = reactive<User>({
  name: 'John',
  age: 25
})

user.age++ // reactive update
```

### v3computed
Create a computed property:
```typescript
const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`
})
```

## Lifecycle Hooks

### v3onMounted
Setup code when component is mounted:
```typescript
onMounted(() => {
  console.log('Component is mounted')
  // fetch initial data
  fetchData()
})
```

### v3watch
Watch for reactive changes:
```typescript
const searchQuery = ref('')
const results = ref([])

watch(searchQuery, async (newQuery) => {
  if (newQuery.length >= 3) {
    results.value = await searchApi(newQuery)
  }
})
```

## Pinia Store

### v3store
Create a Pinia store:
```typescript
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
```

## Composables

### v3composable
Create a custom composable:
```typescript
export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  
  function increment() {
    count.value++
  }
  
  function decrement() {
    count.value--
  }

  return {
    count,
    increment,
    decrement
  }
}
```

## Directives

### v3vmodel
Custom v-model implementation:
```typescript
const vModel = {
  mounted: (el, binding) => {
    el.value = binding.value
    el.addEventListener('input', () => {
      binding.instance[binding.expression] = el.value
    })
  },
  updated: (el, binding) => {
    el.value = binding.value
  }
}
```

## More Examples

For more examples and detailed usage, please check our [documentation](https://github.com/reed-soul/vscode-vue3-snippet-collection/blob/main/docs/README.md).

## Contributing

Feel free to contribute more examples by submitting a PR!