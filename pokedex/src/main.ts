import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';  // Importa o Pinia

const app = createApp(App);

// Configura o Pinia
const pinia = createPinia();
app.use(pinia);

app.mount('#app');
