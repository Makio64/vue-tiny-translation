import { describe, it, expect, vi, beforeEach } from 'vitest'
import plugin, { translate, setTranslations, loadTranslations, useTranslation } from './index.js'

beforeEach(() => {
	setTranslations({})
})

describe('translate', () => {
	it('returns value for existing key', () => {
		setTranslations({ hello: 'Hello!' })
		expect(translate('hello')).toBe('Hello!')
	})

	it('returns key when key is missing', () => {
		expect(translate('missing.key')).toBe('missing.key')
	})

	it('returns defaultValue when key is missing and defaultValue is provided', () => {
		expect(translate('missing.key', 'fallback')).toBe('fallback')
	})

	it('returns empty string defaultValue (not the key)', () => {
		expect(translate('missing.key', '')).toBe('')
	})

	it('handles empty string translation values', () => {
		setTranslations({ empty: '' })
		expect(translate('empty')).toBe('')
	})

	it('handles falsy translation values (0, null, false)', () => {
		setTranslations({ zero: 0, nil: null, no: false })
		expect(translate('zero')).toBe(0)
		expect(translate('nil')).toBe(null)
		expect(translate('no')).toBe(false)
	})

	it('warns on missing key', () => {
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
		translate('missing')
		expect(warn).toHaveBeenCalledTimes(1)
		expect(warn).toHaveBeenCalledWith('Missing translation: missing')
		warn.mockRestore()
	})

	it('warns only once per missing key', () => {
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
		translate('once')
		translate('once')
		translate('once')
		expect(warn).toHaveBeenCalledTimes(1)
		warn.mockRestore()
	})

	it('re-warns for a missing key after setTranslations resets the dictionary', () => {
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
		translate('gone')
		setTranslations({ something: 'else' })
		translate('gone')
		expect(warn).toHaveBeenCalledTimes(2)
		warn.mockRestore()
	})
})

describe('setTranslations', () => {
	it('replaces all existing translations', () => {
		setTranslations({ a: '1', b: '2' })
		setTranslations({ c: '3' })
		expect(translate('a')).toBe('a') // missing, returns key
		expect(translate('c')).toBe('3')
	})

	it('works with nested-style dot keys', () => {
		setTranslations({ 'hero.title': 'Title', 'hero.subtitle': 'Sub' })
		expect(translate('hero.title')).toBe('Title')
		expect(translate('hero.subtitle')).toBe('Sub')
	})
})

describe('loadTranslations', () => {
	it('fetches and sets translations from a URL', async () => {
		const mockJson = { greeting: 'Hi' }
		globalThis.fetch = vi.fn(() =>
			Promise.resolve({ ok: true, json: () => Promise.resolve(mockJson) })
		)
		await loadTranslations('/translations/en.json')
		expect(translate('greeting')).toBe('Hi')
		expect(fetch).toHaveBeenCalledWith('/translations/en.json')
	})

	it('uses default path when none is provided', async () => {
		globalThis.fetch = vi.fn(() =>
			Promise.resolve({ ok: true, json: () => Promise.resolve({}) })
		)
		await loadTranslations()
		expect(fetch).toHaveBeenCalledWith('/translations/en.json')
	})

	it('throws on HTTP error', async () => {
		globalThis.fetch = vi.fn(() =>
			Promise.resolve({ ok: false, status: 404, statusText: 'Not Found' })
		)
		await expect(loadTranslations('/bad.json')).rejects.toThrow('Failed: /bad.json 404')
	})

	it('clears old translations before setting new ones', async () => {
		setTranslations({ old: 'value' })
		globalThis.fetch = vi.fn(() =>
			Promise.resolve({ ok: true, json: () => Promise.resolve({ new: 'value' }) })
		)
		await loadTranslations('/test.json')
		expect(translate('new')).toBe('value')
		expect(translate('old')).toBe('old') // missing, returns key
	})
})

describe('useTranslation', () => {
	it('returns t, loadTranslations and setTranslations', () => {
		const { t, loadTranslations: load, setTranslations: set } = useTranslation()
		expect(t).toBe(translate)
		expect(load).toBe(loadTranslations)
		expect(set).toBe(setTranslations)
	})

	it('t() works the same as translate()', () => {
		const { t } = useTranslation()
		setTranslations({ test: 'works' })
		expect(t('test')).toBe('works')
	})
})

describe('plugin install', () => {
	it('sets $t on globalProperties', () => {
		const app = { config: { globalProperties: {} } }
		plugin.install(app)
		expect(app.config.globalProperties.$t).toBe(translate)
	})

	it('accepts initial translations', () => {
		const app = { config: { globalProperties: {} } }
		plugin.install(app, { hello: 'world' })
		expect(translate('hello')).toBe('world')
	})
})
