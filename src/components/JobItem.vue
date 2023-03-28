<script setup lang="ts">
import type { Job } from '@/api/usejobs';

defineProps<{
  job: Job;
}>();
</script>

<template>
  <router-link :to="`/${job.jobAdvertisement.id}`" class="link">
    <div class="card">
      <p class="employer">{{ job.jobAdvertisement?.profitCenter }}</p>
      <p class="title">{{ job.jobAdvertisement.title.slice(0, 50) }}</p>
      <p class="desc">{{ job.jobAdvertisement.jobDesc?.slice(0, 100) }}...</p>
    </div>
  </router-link>
</template>

<style scoped>
.link {
  text-decoration: none;
  color: inherit;
}

.card {
  min-height: 100%;
  border-radius: 0.5rem;
  border: 1px solid #505050;
  padding: 1rem;
}

.card:hover {
  border: 1px solid #aaa;
}

.employer {
  opacity: 0.8;
  font-size: 1rem;
}

.title {
  font-size: 1.2rem;
  font-weight: 600;
  padding-bottom: 0.3em;
}
</style>
