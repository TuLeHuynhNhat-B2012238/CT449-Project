import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/TheHome.vue'),
  },{
    path: '/cart',
    name: 'cart',
    component: () => import('@/components/CartList.vue'),
  },
  {
    path: '/cameras',
    name: 'cameras',
    component: () => import('@/components/CameraList.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/TheFormLogin.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/TheFormRegister.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
