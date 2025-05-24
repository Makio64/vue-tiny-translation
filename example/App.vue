<template>
  <div id="app">
    <!-- Loading Screen -->
    <div v-if="isLoading" class="loading-screen">
      <div class="loading-content">
        <div class="loading-spinner"></div>
        <p>Loading translations...</p>
      </div>
    </div>
    
    <!-- Main Content - Only show when translations are loaded -->
    <template v-else>
      <!-- Three.js Scene Container -->
      <div ref="threeContainer" class="three-scene"></div>
      
      <div class="app-container">
        <!-- GitHub Link -->
        <a href="https://github.com/makio64/vue3-tiny-translation" title="See the github repository" target="_blank" rel="noopener noreferrer" class="github-link">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.530.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
        </a>
        
        <header class="hero">
          <h1 class="hero-title">{{ $t('hero.title') }}</h1>
          <p class="hero-subtitle">{{ $t('hero.subtitle') }}</p>
          
          <div ref="languageFlags" class="language-flags">
            <button 
              v-for="lang in languages" 
              :key="lang.code"
              @click="changeLanguage(lang.code)"
              :class="['flag-btn', { active: currentLang === lang.code }]"
              :title="lang.name"
              :data-flag="lang.flag"
            >
              {{ lang.flag }}
            </button>
          </div>
        </header>

        <main class="features">
          <div ref="featureGrid" class="feature-grid">
            <div class="feature-card">
              <div class="feature-icon">🚀</div>
              <h3>{{ $t('features.tiny.title') }}</h3>
              <p>{{ $t('features.tiny.desc') }}</p>
            </div>
            
            <div class="feature-card" >
              <div class="feature-icon">⚡</div>
              <h3>{{ $t('features.reactive.title') }}</h3>
              <p>{{ $t('features.reactive.desc') }}</p>
            </div>
            
            <div class="feature-card" >
              <div class="feature-icon">🔧</div>
              <h3>{{ $t('features.simple.title') }}</h3>
              <p>{{ $t('features.simple.desc') }}</p>
              <a href="https://github.com/makio64/vue3-tiny-translation#readme" target="_blank" rel="noopener noreferrer" class="docs-btn">
                📖 {{ $t('docs.button') }}
              </a>
            </div>
            
            <div class="feature-card" >
              <div class="feature-icon">🌐</div>
              <h3>{{ $t('features.dynamic.title') }}</h3>
              <p>{{ $t('features.dynamic.desc') }}</p>
            </div>
            
            <div class="feature-card" >
              <div class="feature-icon">📦</div>
              <h3>{{ $t('features.typescript.title') }}</h3>
              <p>{{ $t('features.typescript.desc') }}</p>
            </div>
            
            <div class="feature-card demo-card">
              <div class="feature-icon">🎮</div>
              <h3>{{ $t('demo.title') }}</h3>
              <p>{{ $t('demo.desc') }}</p>
              <button @click="translateProgrammatically" class="demo-btn">
                {{ $t('demo.button') }}
              </button>
              <p v-if="programmaticResult" class="demo-result">
                {{ $t('demo.result') }}: <code>{{ programmaticResult }}</code>
              </p>
            </div>
          </div>
        </main>

        <footer class="footer">
          <p v-html="$t('footer.message')"></p>
        </footer>
      </div>
    </template>
  </div>
</template>

<script>
import { translate, loadTranslations } from 'vue3-tiny-translation'

export default {
  name: 'App',
  data() {
    return {
      currentLang: 'en',
      programmaticResult: null,
      threeScene: null, // Will hold the 3D scene instance
      isLoading: true,
      languages: [
        { code: 'fr', name: 'Français', flag: '🇫🇷' },
        { code: 'es', name: 'Español', flag: '🇪🇸' },
        { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
        { code: 'it', name: 'Italiano', flag: '🇮🇹' },
        { code: 'ja', name: '日本語', flag: '🇯🇵' },
        { code: 'ko', name: '한국어', flag: '🇰🇷' },
        { code: 'zh', name: '中文', flag: '🇨🇳' },
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'tw', name: '繁體中文', flag: '🇹🇼' },
        { code: 'hk', name: '繁體中文', flag: '🇭🇰' },
        { code: 'us', name: 'American English', flag: '🇺🇸' },
        { code: 'pt', name: 'Português', flag: '🇧🇷' },
        { code: 'ar', name: 'العربية', flag: '🇸🇦' },
        { code: 'ps', name: 'العربية الفلسطينية', flag: '🇵🇸' },
        { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
        { code: 'el', name: 'Ελληνικά', flag: '🇬🇷' },
        { code: 'th', name: 'ไทย', flag: '🇹🇭' },
        { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
        { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
        { code: 'da', name: 'Dansk', flag: '🇩🇰' },
        { code: 'fi', name: 'Suomi', flag: '🇫🇮' },
        { code: 'no', name: 'Norsk', flag: '🇳🇴' },
        { code: 'cs', name: 'Čeština', flag: '🇨🇿' },
        { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
        { code: 'uk', name: 'Українська', flag: '🇺🇦' },
        { code: 'ru', name: 'Русский', flag: '🇷🇺' },
        { code: 'pl', name: 'Polski', flag: '🇵🇱' },
        { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
        { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
        { code: 'ca', name: 'Canadian English', flag: '🇨🇦' },
        { code: 'au', name: 'Australian English', flag: '🇦🇺' },
        { code: 'il', name: 'עברית', flag: '🇮🇱' },
        { code: 'ir', name: 'فارسی', flag: '🇮🇷' }
      ]
    }
  },
  async mounted() {
    // Detect browser language and default to English
    const browserLang = navigator.language.split('-')[0] // 'en-US' -> 'en'
    const supportedLanguages = ['en', 'us', 'es', 'fr', 'de', 'zh', 'tw', 'hk', 'ja', 'ko', 'pt', 'ar', 'ps', 'hi', 'it', 'el', 'th', 'vi', 'id', 'da', 'fi', 'no', 'cs', 'nl', 'uk', 'ru', 'pl', 'tr', 'sv', 'ca', 'au', 'il', 'ir']
    const language = supportedLanguages.includes(browserLang) ? browserLang : 'en'
    
    this.currentLang = language
    await this.loadLanguage(language)
    
    // Load and initialize 3D scene after translations are ready
    this.$nextTick(async () => {
      await this.init3DScene()
    })
  },
  
  beforeUnmount() {
    if (this.threeScene) {
      this.threeScene.destroy()
    }
  },
  
  methods: {
    async loadLanguage(language) {
      try {
        await loadTranslations(`/translations/${language}.json`)
        console.log(`✓ Translations loaded for: ${language}`)
      } catch (error) {
        console.warn(`⚠ Could not load translations for ${language}, falling back to English`)
        if (language !== 'en') {
          await loadTranslations('/translations/en.json')
          this.currentLang = 'en'
        }
      } finally {
        this.isLoading = false
      }
    },
    
    async changeLanguage(langCode) {
      this.currentLang = langCode
      this.programmaticResult = null // Clear demo result when changing language
      await this.loadLanguage(langCode)
    },
    
    translateProgrammatically() {
      this.programmaticResult = translate('demo.api_result', 'API call result!')
    },
    
    async init3DScene() {
      try {
        // Dynamically import the 3D scene module
        const { ThreeScene } = await import('./threeScene.js')
        
        // Initialize the 3D scene with the container and languages
        if (this.$refs.threeContainer) {
          this.threeScene = new ThreeScene(this.$refs.threeContainer, this.languages)
          this.threeScene.init()
          console.log('✓ 3D Scene loaded and initialized')
        }
      } catch (error) {
        console.warn('⚠ Could not load 3D scene:', error)
        // App continues to work without 3D functionality
      }
    }
  }
}
</script>

<style>
:root {
  --bg-dark: rgba(40, 40, 40, 0.6);
  --bg-darker: rgba(50, 50, 50, 0.7);
  --bg-button: rgba(60, 60, 60, 0.8);
  --bg-button-hover: rgba(80, 80, 80, 0.8);
  --border-subtle: rgba(60, 60, 60, 0.5);
  --border-light: rgba(100, 100, 100, 0.3);
  --text-primary: #e8e8e8;
  --text-secondary: #aaa;
  --text-muted: #888;
  --transition: all 0.2s ease;
  --border-radius: 6px;
  --spacing: 20px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.loading-screen {
  position: fixed;
  inset: 0;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2a2a2a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  color: var(--text-primary);
}

.loading-content {
  text-align: center;
  font-family: 'JetBrains Mono', 'Fira Code', 'Monaco', 'Cascadia Code', monospace;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top: 3px solid var(--text-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-content p {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

#app {
  font-family: 'JetBrains Mono', 'Fira Code', 'Monaco', 'Cascadia Code', monospace;
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2a2a2a 100%);
  color: #e6e6e6;
  position: relative;
  user-select: none;
}

.three-scene {
  position: fixed;
  inset: 0;
  z-index: 1;
}

.floating-flag,
.floating-feature {
  color: rgba(255, 255, 255, 0.6);
  user-select: none;
  opacity: 0.8;
  transition: opacity 0.3s ease;
  will-change: transform;
}

.floating-flag:hover,
.floating-feature:hover {
  opacity: 1;
}

.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing);
  position: relative;
  z-index: 10;
  user-select: none;
  pointer-events: none;
}

.github-link {
  position: fixed;
  top: var(--spacing);
  right: var(--spacing);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: rgba(60, 60, 60, 0.9);
  border-radius: 50%;
  color: #e6e6e6;
  text-decoration: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-light);
  pointer-events: auto;
}

.github-link:hover {
  background: var(--bg-button-hover);
  transform: scale(1.1);
  color: #fff;
  border-color: rgba(120, 120, 120, 0.5);
}

.hero {
  text-align: center;
  padding: 40px var(--spacing);
  color: white;
}

.hero-title {
  font-size: 2.2rem;
  line-height: 1.2;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--text-primary);
}

.hero-subtitle {
  font-size: 1rem;
  color: var(--text-muted);
  margin: 0 auto 32px;
  max-width: 500px;
  min-height: 60px;
  line-height: 1.5;
}

.language-flags {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  margin: 24px auto 0;
  max-width: 500px;
}

.flag-btn {
  background: rgba(0, 0, 0, 0.75);
  border: 1px solid var(--border-light);
  border-radius: var(--border-radius);
  width: 44px;
  height: 36px;
  font-size: 16px;
  cursor: pointer;
  transition: var(--transition);
  pointer-events: auto;
}

.flag-btn:hover {
  background: rgba(80, 80, 80, 0.4);
  border-color: rgba(120, 120, 120, 0.7);
}

.flag-btn.active {
  background: rgba(100, 100, 100, 0.7);
  border-color: rgba(140, 140, 140, 0.8);
}

.features {
  padding: 32px var(--spacing);
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  max-width: 900px;
  margin: 0 auto;
}

.feature-card {
  background: var(--bg-dark);
  border-radius: 8px;
  padding: var(--spacing);
  text-align: left;
  border: 1px solid var(--border-subtle);
  transition: var(--transition);
}

.feature-card:hover {
  background: var(--bg-darker);
  border-color: rgba(0, 0, 0, 0.7);
}

.feature-icon {
  font-size: 1.5rem;
  margin-bottom: 12px;
  opacity: 0.8;
}

.feature-card h3 {
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 8px;
  color: var(--text-primary);
}

.feature-card p {
  color: var(--text-secondary);
  line-height: 1.4;
  font-size: 0.9rem;
}

.demo-card {
  background: var(--bg-darker);
  border: 1px solid rgba(70, 70, 70, 0.5);
  color: white;
}

.demo-card h3,
.demo-card p {
  color: var(--text-primary);
}

.demo-btn,
.docs-btn {
  background: var(--bg-button);
  color: #ccc;
  border: 1px solid rgba(80, 80, 80, 0.7);
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 400;
  margin-top: 12px;
  transition: var(--transition);
  font-size: 0.9rem;
  pointer-events: auto;
  text-decoration: none;
  display: inline-block;
}

.demo-btn:hover,
.docs-btn:hover {
  background: var(--bg-button-hover);
  border-color: rgba(100, 100, 100, 0.8);
  color: #fff;
}

.docs-btn:hover {
  transform: translateY(-1px);
}

.demo-result {
  margin-top: 12px;
  padding: 12px;
  background: rgba(30, 30, 30, 0.8);
  border-radius: 4px;
  border: 1px solid var(--border-subtle);
}

.demo-result code {
  background: rgba(50, 50, 50, 0.8);
  color: #ddd;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: inherit;
  font-size: 0.85rem;
}

.footer {
  text-align: center;
  padding: 24px var(--spacing);
  color: #666;
  font-size: 0.8rem;
}

.footer a {
  color: var(--text-secondary);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: var(--transition);
  pointer-events: auto;
}

.footer a:hover {
  color: #ccc;
  border-bottom-color: var(--text-secondary);
}

.attribution {
  margin-top: 8px;
  font-size: 0.75rem;
}

.attribution a {
  color: var(--text-muted);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: var(--transition);
}

.attribution a:hover {
  color: #ccc;
  border-bottom-color: var(--text-muted);
}

@media (max-width: 768px) {
  .hero-title { font-size: 2rem; }
  .hero-subtitle { font-size: 0.9rem; }
  .feature-grid { grid-template-columns: 1fr; gap: 12px; }
  .language-flags { gap: 6px; }
  .flag-btn { width: 36px; height: 28px; font-size: 14px; }
}
</style> 