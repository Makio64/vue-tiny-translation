import { App } from 'vue'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $t: (key: string, defaultValue?: string | null) => string
  }
}

export interface TinyTranslationPlugin {
  install(app: App, translations?: Record<string, string>): void
}

export declare function translate(key: string, defaultValue?: string | null): string
export declare function loadTranslations(path?: string): Promise<void>

declare const plugin: TinyTranslationPlugin
export default plugin 