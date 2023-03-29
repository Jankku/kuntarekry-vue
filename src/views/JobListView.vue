<script setup lang="ts">
import { useJobs } from '@/api/usejobs';
import JobItem from '@/components/JobItem.vue';
import SavedJobsCheckbox from '@/components/SavedJobsCheckbox.vue';
import SearchInput from '@/components/SearchInput.vue';
import useSavedJobs from '@/data/usesavedjobs';
import { computed, ref } from 'vue';

const { data, isLoading, isError } = useJobs();
const { savedJobIds } = useSavedJobs();

const showOnlySavedJobs = ref(false);
const searchQuery = ref('');

const filteredJobs = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  const results = data.value?.filter(
    (job) =>
      job.jobAdvertisement.title.toLowerCase().includes(query) ||
      job.jobAdvertisement.profitCenter?.toLowerCase().includes(query)
  );

  if (showOnlySavedJobs.value) {
    return results?.filter((job) => savedJobIds.value.has(job.jobAdvertisement.id));
  } else {
    return results;
  }
});
</script>

<template>
  <h1 class="title">Jobs</h1>
  <SearchInput v-model="searchQuery" :disabled="filteredJobs?.length === 0" />
  <SavedJobsCheckbox v-model="showOnlySavedJobs" />
  <p v-if="isLoading">Loading...</p>
  <p v-else-if="isError">Error loading jobs</p>
  <div v-else>
    <div class="jobContainer">
      <transition-group name="jobs" :css="false">
        <JobItem v-for="job in filteredJobs" :job="job" :key="job.jobAdvertisement.id" />
      </transition-group>
    </div>
  </div>
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
