import { App } from 'vue'

declare module 'vue' {
  interface ComponentCustomProperties {
    $t: (key: string, defaultValue?: string | null) => string
  }
}

export interface TinyTranslationPlugin {
  install(app: App, translations?: Record<string, string>): void
}

export declare function translate(key: string, defaultValue?: string | null): string
export declare function loadTranslations(path?: string): Promise<void>
export declare function setTranslations(newTranslations: Record<string, string>): void
export declare function useTranslation(): {
  t: typeof translate
  loadTranslations: typeof loadTranslations
  setTranslations: typeof setTranslations
}

declare const plugin: TinyTranslationPlugin
export default plugin 