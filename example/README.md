# Vue Tiny Translation - Example 🌍✨

This is a working example demonstrating how to use the vue-tiny-translation plugin.

## Features Demonstrated

- 🌍 Auto-detection of browser language
- 🔄 Dynamic language switching
- 📦 Loading translations from local files
- ⚡ Reactive translation updates
- 🛡️ Fallback to English if language not supported

## How to Test Locally

1. **Install dependencies:**
   ```bash
   cd example
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   - Go to `http://localhost:5173`
   - The app will auto-detect your browser language
   - Try switching languages with the dropdown
   - Open browser console to see loading messages

## What You'll See

- Translations loaded automatically based on your browser language
- Language selector to switch between English, French, and German
- Reactive updates when switching languages (no page reload!)
- Loading state while translations are being fetched
- Console messages showing translation loading process

## Translation Files

The translation files are located in `public/translations/`:
- `en.json` - English translations
- `fr.json` - French translations  
- `de.json` - German translations

## How It Works

1. On app mount, it detects your browser language
2. Loads the appropriate translation file from `/translations/{lang}.json`
3. Falls back to English if your language isn't supported
4. All `$t()` calls in the template automatically update when translations change 