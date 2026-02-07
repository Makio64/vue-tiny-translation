/**
 * Minimalist reactive translation plugin for Vue 3
 * @author Makio64
 */

import { reactive } from 'vue'

const _translations = reactive({})

function translate(key, defaultValue) {
	if (key in _translations) return _translations[key]
	console.warn(`Missing translation: ${key}`)
	return defaultValue ?? key
}

function setTranslations(newTranslations) {
	for (const k in _translations) delete _translations[k]
	Object.assign(_translations, newTranslations)
}

async function loadTranslations(path = '/translations/en.json') {
	const r = await fetch(path)
	if (!r.ok) throw new Error(`Failed: ${path} ${r.status}`)
	setTranslations(await r.json())
}

function useTranslation() {
	return { t: translate, loadTranslations, setTranslations }
}

export default {
	install(app, translations = {}) {
		Object.assign(_translations, translations)
		app.config.globalProperties.$t = translate
	},
}

export { translate, loadTranslations, setTranslations, useTranslation } 