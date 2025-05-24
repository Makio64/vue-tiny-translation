/**
 * Minimalist reactive translation plugin for Vue 3
 * @author Makio64
 */

import { reactive } from 'vue'

const _translations = reactive({})

// Function to translate a key, can be used outside of Vue components
function translate(key, defaultValue = null) {
	const translation = _translations[key]
	if (translation !== '' && !translation) {
		console.warn(`${key} key does not exist in translations`)
		return defaultValue || key
	}
	return translation
}

// Async function to load translations and update the reactive object
async function loadTranslations(path = '/translations/en.json') {
	const json = await fetch(path).then((response) => response.json())
	// Clear existing translations
	Object.keys(_translations).forEach((key) => delete _translations[key])
	// Assign new translations
	Object.assign(_translations, json)
}

export default {
	// Install the plugin in Vue; $t(key) will be available in Vue components
	install(app, translations = {}) {
		Object.assign(_translations, translations)
		app.config.globalProperties.$t = (key, defaultValue = null) => translate(key, defaultValue)
	},
}

// Export the function to translate a key, can be used outside of Vue components
export { translate, loadTranslations } 