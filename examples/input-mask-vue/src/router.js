import { createRouter, createWebHistory } from 'vue-router';
import Home from './Home.vue';
import IMask from './examples/imask/IMask.vue';
import Maskito from './examples/maskito/Maskito.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/imask',
      name: 'IMask',
      component: IMask,
    },
    {
      path: '/maskito',
      name: 'Maskito',
      component: Maskito,
    },
  ],
});

export default router;
