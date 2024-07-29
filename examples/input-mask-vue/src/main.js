import { createApp } from 'vue';
import { setIconPath } from '@trendyol/baklava';

setIconPath('https://cdn.jsdelivr.net/npm/@trendyol/baklava-icons@latest/icons');

import App from './App.vue';

import router from './router';

import '@trendyol/baklava/dist/themes/default.css';
import './style.css';

const app =
createApp(App)

app.use(router);

app.mount('#app');
