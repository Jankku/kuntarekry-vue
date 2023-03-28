import { createRouter, createWebHistory } from 'vue-router';
import JobListView from '../views/JobListView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'jobs',
      component: JobListView,
    },
    {
      path: '/:id',
      name: 'details',
      component: () => import('../views/JobDetailView.vue'),
    },
    {
      path: '/regions',
      name: 'Regions',
      component: () => import('../views/RegionListView.vue'),
    },
  ],
});

export default router;
