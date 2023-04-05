import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';
import { MeerIconsPlugin } from '@fcgtalent/meericons';
import './assets/main.css';

const app = createApp(App);
app.use(router);

app.use(MeerIconsPlugin);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      retry: 2,
    },
  },
});
app.use(VueQueryPlugin, { queryClient });

app.mount('#app');
