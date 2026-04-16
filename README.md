# Vue Tiny Translation 🌍✨

A minimalist reactive translation plugin for Vue 3. Super lightweight (**~0.35 KB gzipped**) — zero dependencies, full TypeScript support, reactive out of the box.

[![npm version](https://img.shields.io/npm/v/vue-tiny-translation.svg)](https://www.npmjs.com/package/vue-tiny-translation)
[![npm downloads](https://img.shields.io/npm/dm/vue-tiny-translation.svg)](https://www.npmjs.com/package/vue-tiny-translation)
[![bundle size](https://img.shields.io/bundlephobia/minzip/vue-tiny-translation?label=min%2Bgzip)](https://bundlephobia.com/package/vue-tiny-translation)
[![types included](https://img.shields.io/badge/types-included-blue.svg)](./src/index.d.ts)
[![Vue 3](https://img.shields.io/badge/vue-3-42b883.svg)](https://vuejs.org/)
[![license](https://img.shields.io/npm/l/vue-tiny-translation.svg)](./LICENSE)

🌐 **[Live Demo](https://vue-tiny-translation.netlify.app/)** — 35 languages, reactive language switching, no page reload.

[<img width="1005" alt="vue-tiny-translation demo" src="https://github.com/user-attachments/assets/deae1302-a9c7-48d0-a63f-5bce37b83cd8" />](https://vue-tiny-translation.netlify.app/)

## Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Composition API](#composition-api)
- [Loading translations](#loading-translations)
- [TypeScript](#typescript)
- [CDN usage](#cdn-usage)
- [API Reference](#api-reference)
- [vs vue-i18n](#vs-vue-i18n)
- [Troubleshooting](#troubleshooting)
- [Local development](#local-development)
- [License](#license)

## Features

- 🚀 **Tiny** — ~0.35 KB gzipped. Zero runtime dependencies.
- ⚡ **Reactive** — components re-render automatically when the language changes. No page reload.
- 🔧 **Four-function API** — `$t`, `translate`, `loadTranslations`, `setTranslations`. Nothing else to learn.
- 🌐 **Any source** — load translations from a static file, an API, a CMS, or a bundled import.
- 📦 **TypeScript** — full `.d.ts` with `$t` augmentation for `ComponentCustomProperties`.
- 🌳 **Tree-shakeable** — `sideEffects: false`, ESM-only, dev warnings stripped from the production build.

## Installation

```bash
npm install vue-tiny-translation
# or
pnpm add vue-tiny-translation
# or
yarn add vue-tiny-translation
```

## Quick Start

**1. Register the plugin**

```js
// main.js
import { createApp } from 'vue'
import TinyTranslation from 'vue-tiny-translation'
import App from './App.vue'

createApp(App).use(TinyTranslation).mount('#app')
```

You can also seed initial translations at install time:

```js
app.use(TinyTranslation, { hello: 'Hello', goodbye: 'Goodbye' })
```

**2. Use `$t` in templates**

```vue
<template>
  <h1>{{ $t('hello') }}</h1>
  <p>{{ $t('goodbye', 'Bye!') }}</p> <!-- second arg is a fallback -->
</template>
```

**3. Load a language**

```vue
<script>
import { loadTranslations } from 'vue-tiny-translation'

export default {
  async mounted() {
    const lang = navigator.language.split('-')[0]
    await loadTranslations(`/translations/${lang}.json`)
  },
}
</script>
```

Switching languages is just another `loadTranslations()` call — every `$t` re-renders reactively.

## Composition API

Use `useTranslation()` from `<script setup>`:

```vue
<script setup>
import { onMounted } from 'vue'
import { useTranslation } from 'vue-tiny-translation'

const { t, loadTranslations } = useTranslation()

onMounted(() => loadTranslations('/translations/en.json'))

async function switchLang(code) {
  await loadTranslations(`/translations/${code}.json`)
}
</script>

<template>
  <h1>{{ t('hello') }}</h1>
  <button @click="switchLang('fr')">FR</button>
  <button @click="switchLang('ja')">JA</button>
</template>
```

## Loading translations

```js
import { loadTranslations, setTranslations } from 'vue-tiny-translation'

// from a static file in /public
await loadTranslations('/translations/en.json')

// from your API
await loadTranslations('/api/i18n?lang=en')

// from an already-imported object (no fetch)
import en from './locales/en.json'
setTranslations(en)
```

### Organizing translation files

Put JSON files wherever your bundler can serve them. A common layout:

```
public/translations/
  en.json
  fr.json
  ja.json
```

```json
{
  "hello": "Hello",
  "goodbye": "Goodbye",
  "hero.title": "Welcome",
  "hero.subtitle": "Enjoy your stay"
}
```

Dot-notation keys are strings — there's no nested-object lookup by design. Keep it flat and searchable.

## TypeScript

Types ship with the package, no `@types/` install needed. The plugin augments Vue's `ComponentCustomProperties` so `this.$t` is typed in every component.

```ts
import { translate, useTranslation, setTranslations } from 'vue-tiny-translation'

translate('hello')                  // string
translate('missing', 'Fallback')    // string

const { t } = useTranslation()
const greeting: string = t('hello')

setTranslations({ hello: 'Hello', 'hero.title': 'Welcome' })
```

## CDN usage

Because the package is ESM-only, you can load it directly from a CDN via an import map:

```html
<script type="importmap">
{
  "imports": {
    "vue": "https://esm.sh/vue@3",
    "vue-tiny-translation": "https://esm.sh/vue-tiny-translation"
  }
}
</script>

<div id="app">{{ $t('hello') }}</div>

<script type="module">
  import { createApp } from 'vue'
  import TinyTranslation from 'vue-tiny-translation'

  createApp({}).use(TinyTranslation, { hello: 'Hello from CDN 🌍' }).mount('#app')
</script>
```

## API Reference

| Export | Signature | Description |
|---|---|---|
| `default` (plugin) | `app.use(plugin, initial?)` | Registers `$t` on every component. Optional initial dictionary. |
| `translate` | `(key, fallback?) => value` | Look up a key. Returns the fallback if provided, otherwise the key itself. |
| `useTranslation` | `() => { t, loadTranslations, setTranslations }` | Composable for `<script setup>`. |
| `loadTranslations` | `(url?) => Promise<void>` | Fetches JSON and replaces the current dictionary. Defaults to `/translations/en.json`. |
| `setTranslations` | `(dict) => void` | Replaces the current dictionary without fetching (useful for bundled imports, CMS, SSR hydration). |

Missing keys log `Missing translation: <key>` once per key in development. The warning is compiled out of the production build (see [Troubleshooting](#troubleshooting)).

## vs vue-i18n

| | vue-tiny-translation | [vue-i18n](https://vue-i18n.intlify.dev/) |
|---|---|---|
| Bundle (gzipped) | **~0.35 KB** | ~13 KB |
| Runtime deps | **0** | Several |
| Reactive switching | ✓ | ✓ |
| Dot-notation keys | ✓ (flat strings) | ✓ (true nesting) |
| Pluralization | ✗ | ✓ |
| Interpolation (`{name}`) | ✗ | ✓ |
| Number / date formatting | ✗ | ✓ (Intl) |
| Lazy loading | Manual | Built-in helpers |
| Learning curve | 4 functions | Larger surface |

**Pick `vue-tiny-translation`** when you want small bundles, static strings, and no ceremony. **Pick `vue-i18n`** when you need ICU plural rules, message formatting, or locale-aware number/date output.

If all you need later is interpolation, you can build it yourself in ~5 lines on top of `translate()` without bringing in another library.

## Troubleshooting

**No missing-key warnings in production.** Expected. The production build strips `console.warn` via terser's `pure_funcs` — your consumer's bundler picks the minified build automatically via the `production` export condition. To see warnings while debugging a production bundle, import the development build explicitly or run your bundler in dev mode.

**SSR / Nuxt.** Translations live in a module-level `reactive` object, which is shared across requests on the server. For SSR, initialize translations before rendering (e.g. in a Nuxt plugin with `ssr: true`) and ensure the same dictionary is serialized into the client payload so hydration matches. If you need per-request isolation, this plugin is not the right fit — reach for `vue-i18n`.

**HMR not reflecting JSON edits.** Translation JSON files served from `public/` are not watched. After editing, call `loadTranslations()` again or add a Vite plugin that invalidates the module on change.

**CJS `require()` no longer works.** As of v1.2.0 the package is ESM-only. If you're locked to CommonJS, pin to `vue-tiny-translation@1.1.x`.

## Local development

```bash
pnpm install
pnpm test      # vitest
pnpm build     # rollup + copy .d.ts to dist/
pnpm dev       # rollup watch mode
```

Run the showcase example locally:

```bash
cd example
npm install
npm run dev
```

Then open `http://localhost:5173` to see language auto-detection, a 3D background, and 35 translation files in action.

## License

MIT © [Makio64](https://github.com/Makio64)
