<script setup lang="ts">
import { useJobs } from '@/api/usejobs';
import JobItem from '@/components/JobItem.vue';
import PageContainer from '@/components/PageContainer.vue';
import SearchInput from '@/components/SearchInput.vue';
import { computed, ref } from 'vue';

const { data, isLoading, isError } = useJobs();

const searchQuery = ref('');
const filteredJobs = computed(
  () =>
    data.value?.filter(
      (job) =>
        job.jobAdvertisement.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        job.jobAdvertisement.profitCenter?.toLowerCase().includes(searchQuery.value.toLowerCase())
    ) ?? data.value
);
</script>

<template>
  <PageContainer>
    <h1 class="title">Jobs</h1>
    <SearchInput v-model="searchQuery" :disabled="filteredJobs?.length === 0" />
    <p v-if="isLoading">Loading...</p>
    <p v-else-if="isError">Error loading jobs</p>
    <div v-else>
      <div class="jobContainer">
        <JobItem v-for="(job, index) in filteredJobs" :job="job" :key="index" />
      </div>
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
