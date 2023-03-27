import { createRouter, createWebHistory } from 'vue-router';
import JobView from '../views/JobView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'jobs',
      component: JobView,
    },
    {
      path: '/:id',
      name: 'details',
      component: () => import('../views/JobDetailView.vue'),
    },
  ],
});

export default router;
