<script setup lang="ts">
import { useJobs } from '@/api/usejobs';
import JobItem from '@/components/JobItem.vue';
import PageContainer from '@/components/PageContainer.vue';
import SearchInput from '@/components/SearchInput.vue';
import { computed, ref } from 'vue';

const { data, isLoading, isError } = useJobs();

const searchQuery = ref('');
const filteredJobs = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  return (
    data.value?.filter(
      (job) =>
        job.jobAdvertisement.title.toLowerCase().includes(query) ||
        job.jobAdvertisement.profitCenter?.toLowerCase().includes(query)
    ) ?? data.value
  );
});
</script>

<template>
  <PageContainer>
    <h1 class="title">Jobs</h1>
    <SearchInput v-model="searchQuery" :disabled="filteredJobs?.length === 0" />
    <p v-if="isLoading">Loading...</p>
    <p v-else-if="isError">Error loading jobs</p>
    <div v-else>
      <div class="jobContainer">
        <transition-group name="jobs" :css="false">
          <JobItem v-for="job in filteredJobs" :job="job" :key="job.jobAdvertisement.id" />
        </transition-group>
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

.jobs-move,
.jobs-enter-active,
.jobs-leave-active {
  transition: all 0.5s ease;
}

.jobs-enter-from,
.jobs-leave-to {
  opacity: 0;
}

.jobs-leave-active {
  position: absolute;
}
</style>
