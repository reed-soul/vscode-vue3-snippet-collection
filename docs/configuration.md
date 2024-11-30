# Configuration Guide

## Available Settings

### General Settings

```json
{
  "vue3SnippetsPro.enableTypeScript": true,
  "vue3SnippetsPro.enablePreview": true,
  "vue3SnippetsPro.showExamples": true,
  "vue3SnippetsPro.documentationLinks": true
}
```

### Style Settings

```json
{
  "vue3SnippetsPro.style": {
    "defaultStyle": "scss",
    "scopedByDefault": true
  }
}
```

### Formatting Settings

```json
{
  "vue3SnippetsPro.formatting": {
    "indentSize": 2,
    "quotes": "single"
  }
}
```

### Feature Settings

```json
{
  "vue3SnippetsPro.features": {
    "enablePinia": true,
    "enableRouter": true,
    "enableI18n": true,
    "enableTests": true
  }
}
```

## Configuration Details

### Style Configuration
- `defaultStyle`: Choose between "css", "scss", or "less"
- `scopedByDefault`: Add scoped attribute to style tags by default

### Formatting Configuration
- `indentSize`: Number of spaces for indentation
- `quotes`: Quote style in snippets ("single" or "double")

### Feature Configuration
- `enablePinia`: Enable Pinia store snippets
- `enableRouter`: Enable Vue Router snippets
- `enableI18n`: Enable Vue I18n snippets
- `enableTests`: Enable test-related snippets

[View Examples](examples.md) 