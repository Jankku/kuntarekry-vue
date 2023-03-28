import { createRouter, createWebHistory, RouterView } from 'vue-router';
import { h } from 'vue';
import JobListView from '../views/JobListView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (from.name === 'details' && to.name === 'jobs') {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ ...savedPosition, behavior: 'smooth' });
        }, 300);
      });
    }
  },
  routes: [
    {
      path: '/',
      name: 'jobs',
      component: { render: () => h(RouterView) },
      children: [
        {
          path: '',
          name: 'jobs',
          component: JobListView,
        },
        {
          path: ':id',
          name: 'details',
          component: () => import('../views/JobDetailView.vue'),
        },
      ],
    },
    {
      path: '/regions',
      name: 'Regions',
      component: () => import('../views/RegionListView.vue'),
    },
  ],
});

export default router;
