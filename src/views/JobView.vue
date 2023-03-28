<script setup lang="ts">
import { useJobs } from '@/api/usejobs';
import JobItem from '@/components/JobItem.vue';
import PageContainer from '@/components/PageContainer.vue';

const { data, isLoading, isError } = useJobs();
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
