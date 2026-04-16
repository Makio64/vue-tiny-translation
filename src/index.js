/**
 * Minimalist reactive translation plugin for Vue 3
 * @author Makio64
 */

import { reactive } from 'vue'

const _translations = reactive({})
const _warned = new Set()

function warn(key) {
	if (_warned.has(key)) return
	_warned.add(key)
	console.warn(`Missing translation: ${key}`)
}

function clearWarned() { _warned.clear() }

function translate(key, defaultValue) {
	if (key in _translations) return _translations[key]
	warn(key)
	return defaultValue ?? key
}

function setTranslations(newTranslations) {
	for (const k in _translations) delete _translations[k]
	clearWarned()
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
		setTranslations(translations)
		app.config.globalProperties.$t = translate
	},
}

export { translate, loadTranslations, setTranslations, useTranslation } 