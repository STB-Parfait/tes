import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // <--- NOSSO MAPA!

// createApp(App).mount('#app') // Linha antiga
createApp(App).use(router).mount('#app') // <--- LINHA NOVA!