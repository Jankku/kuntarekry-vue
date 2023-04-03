<script setup lang="ts">
import { ref } from 'vue';
import { useJobs } from '@/api/usejobs';
import JobItem from '@/components/JobItem.vue';
import SavedJobsCheckbox from '@/components/SavedJobsCheckbox.vue';
import SearchInput from '@/components/SearchInput.vue';
import useSavedJobs from '@/hooks/usesavedjobs';
import usePagination from '@/hooks/usepagination';
import useFilterJobs from '@/hooks/usefilterjobs';
import PaginationControls from '@/components/PaginationControls.vue';

const showOnlySavedJobs = ref(false);
const searchQuery = ref('');

const { data, isLoading, isError } = useJobs();
const { savedJobIds } = useSavedJobs();
const filteredJobs = useFilterJobs(data, searchQuery, showOnlySavedJobs, savedJobIds);
const pagination = usePagination(filteredJobs, 9);

const onPreviousPage = () => {
  if (pagination.currentPage > 1) {
    pagination.currentPage--;
  }
};

const onNextPage = () => {
  if (pagination.currentPage < pagination.pageCount) {
    pagination.currentPage++;
  }
};
</script>

<template>
  <div class="container">
    <h1 class="title">Jobs</h1>

    <div class="header">
      <SearchInput v-model="searchQuery" :disabled="filteredJobs?.length === 0" />
      <SavedJobsCheckbox v-model="showOnlySavedJobs" />
      <PaginationControls
        :currentPage="pagination.currentPage"
        :pageCount="pagination.pageCount"
        @onPreviousPage="onPreviousPage"
        @onNextPage="onNextPage"
      />
    </div>

    <p v-if="isLoading">Loading...</p>
    <p v-else-if="isError">Error loading jobs</p>
    <div v-else>
      <div class="jobContainer">
        <transition-group name="jobs" :css="false">
          <JobItem
            v-for="job in pagination.currentItems"
            :job="job"
            :key="job.jobAdvertisement.id"
          />
        </transition-group>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media screen and (max-width: 768px) {
  .container {
    padding: 0 1em;
  }
}

.header {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1em;
  margin-bottom: 1em;
}

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
