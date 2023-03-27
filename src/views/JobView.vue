<script setup lang="ts">
import JobItem from '@/components/home/JobItem.vue';
import PageContainer from '@/components/PageContainer.vue';
import type { JobAdvertisement } from '@/types';
import { useQuery } from '@tanstack/vue-query';
import axios from '../axios';

const getJobAds = async (): Promise<JobAdvertisement[]> => {
  const response = await axios.get('/portal-api/recruitment/open-jobs');
  return response.data.jobAdvertisements.slice(0, 50);
};

const { data, isLoading, isError } = useQuery({ queryKey: ['jobs'], queryFn: getJobAds });
</script>

<template>
  <PageContainer>
    <h1 class="title">Jobs</h1>
    <p v-if="isLoading">Loading...</p>
    <p v-else-if="isError">Error loading jobs</p>
    <div v-else class="jobContainer">
      <JobItem v-for="(job, index) in data" :job="job" :key="index" />
    </div>
  </PageContainer>
</template>

<style scoped>
.title {
  padding-bottom: 1em;
}

@media screen and (max-width: 768px) {
  main {
    padding: 2em;
  }
}

.jobContainer {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr));
  justify-content: center;
  gap: 0.5em;
}
</style>
