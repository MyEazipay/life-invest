import { createApp } from 'vue'
import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';
import './style.css'
import App from './App.vue';
import router from './router';

const pinia = createPinia();
pinia.use(piniaPluginPersistedState)

createApp(App).use(router).use(pinia).mount('#app')
