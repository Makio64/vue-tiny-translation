# Vue Tiny Translation 🌍✨

A minimalist reactive translation plugin for Vue 3. Super lightweight (**0.32KB gzipped**), simple, and efficient internationalization solution.

🌐 **[Live Demo](https://vue-tiny-translation.netlify.app/)** - Try it now !
[<img width="900" alt="Screenshot 2025-05-24 at 12 35 09" src="https://github.com/user-attachments/assets/cc7c3508-8d61-4de8-ab36-ba381b13921b" />](https://vue-tiny-translation.netlify.app/)

## Features

- 🚀 **Tiny**: Minimal footprint, maximum performance
- ⚡ **Reactive**: Automatically updates components when translations change, no page reload!
- 🔧 **Simple API**: Super easy to use with intuitive methods
- 🌐 **Dynamic Loading**: Load translations asynchronously
- 📦 **TypeScript Support**: Full TypeScript definitions included

## Installation

```bash
npm install vue-tiny-translation
```

## Quick Start

### 1. Install the plugin

```javascript
import { createApp } from 'vue'
import TinyTranslation from 'vue-tiny-translation'
import App from './App.vue'

const app = createApp(App)
app.use(TinyTranslation)
app.mount('#app')
```

### 2. Load translations and use in components

```vue
<template>
  <div>
    <h1>{{ $t('hello') }}</h1>
    <p>{{ $t('goodbye') }}</p>
    <button @click="changeLanguage">Change Language</button>
  </div>
</template>

<script>
import { loadTranslations } from 'vue-tiny-translation'

export default {
  async mounted() {
    // Auto-load based on browser language
    const lang = navigator.language.split('-')[0]
    await loadTranslations(`/translations/${lang}.json`)
  },
  methods: {
    async changeLanguage() {
      await loadTranslations('/translations/fr.json')
    }
  }
}
</script>
```

## Load translation files from anywhere

```javascript
// Load from anywhere
await loadTranslations('/translations/en.json')  // Local files
await loadTranslations('/api/translations/en')   // API endpoints
```

## Example of organization using local files
```
public/translations/ 
  en.json
  fr.json
  de.json
```
```json
{
  "hello": "Hello",
  "goodbye": "Goodbye"
}
```


## API

- **`$t(key, fallback?)`** - Translate in templates
- **`translate(key, fallback?)`** - Translate in JavaScript  
- **`loadTranslations(path)`** - Load translations from any source


## Demo & Testing

🌐 **[Live Demo](https://vue-tiny-translation.netlify.app/)** - Try it now !

**Local Testing**: Clone and run the example locally:

```bash
cd example
npm install
npm run dev
```

Open `http://localhost:5173` and see the plugin working with automatic language detection!

## License

MIT © Makio64 
