# Changelog

## 1.1.0

### Bug Fixes

- Fix falsy-value check in `translate()` — values like `0` or `null` are no longer treated as missing keys
- Use nullish coalescing (`??`) for `defaultValue` — explicit empty-string defaults are now respected
- Handle HTTP errors in `loadTranslations()` — 404/500 responses now throw a clear error instead of a cryptic JSON parse failure

### New Features

- Add `useTranslation()` composable for Composition API / `<script setup>` usage
- Add `setTranslations()` for updating translations without `fetch` (bundled imports, CMS, SSR)
- Warn once per missing key instead of on every render — warnings clear when translations are reloaded

### Package & Build

- Add `exports` field to `package.json` for modern TypeScript `moduleResolution` support (`bundler` / `node16`)
- Add `sideEffects: false` for better tree-shaking
- Type augmentation now targets `vue` instead of `@vue/runtime-core` (recommended since Vue 3.4)
- Build script auto-copies type declarations to `dist/`
- Remove unused `@rollup/plugin-node-resolve` dependency
