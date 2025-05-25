import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./styles/global.css";

const app = createApp(App);

// Configurar Pinia
const pinia = createPinia();
app.use(pinia);

// Montar a aplicação
app.mount("#app");
