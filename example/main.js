import { createApp } from 'vue'
import TinyTranslation from 'vue-tiny-translation'
import App from './App.vue'

const app = createApp(App)

// Install the plugin without initial translations
// Translations will be loaded dynamically in App.vue
app.use(TinyTranslation)

app.mount('#app') 