<script setup lang="ts">
import { ref, watch } from 'vue';
import { useJobs } from '@/api/usejobs';
import JobItem from '@/components/JobItem.vue';
import SearchInput from '@/components/SearchInput.vue';
import useSavedJobs from '@/hooks/usesavedjobs';
import usePagination from '@/hooks/usepagination';
import useFilterJobs from '@/hooks/usefilterjobs';
import PaginationControls from '@/components/PaginationControls.vue';
import { AppLayout, BaseText, SwitchButton } from '@fcgtalent/meerkit';

const showOnlySavedJobs = ref(false);
const searchQuery = ref('');

const { data, isLoading, isError } = useJobs();
const { savedJobIds } = useSavedJobs();
const filteredJobs = useFilterJobs(data, searchQuery, showOnlySavedJobs, savedJobIds);
const pagination = usePagination(filteredJobs, 9);

const pageBoundaryCheck = () => {
  if (pagination.currentPage > pagination.pageCount) {
    pagination.currentPage = pagination.pageCount;
  }

  if (pagination.currentPage <= 0) {
    pagination.currentPage = 1;
  }
};

const onPreviousPage = () => {
  pagination.currentPage--;
  pageBoundaryCheck();
};

const onNextPage = () => {
  pagination.currentPage++;
  pageBoundaryCheck();
};

const onSearchBlur = () => {
  pageBoundaryCheck();
};

const onSearchClear = () => {
  pageBoundaryCheck();
  searchQuery.value = '';
};

watch(showOnlySavedJobs, pageBoundaryCheck);
</script>

<template>
  <AppLayout narrow>
    <BaseText size="xxl" heading>Jobs</BaseText>

    <div class="header">
      <SearchInput
        v-model="searchQuery"
        :disabled="filteredJobs?.length === 0"
        @blur="onSearchBlur"
        @clear="onSearchClear"
      />
      <SwitchButton
        label="Filter saved"
        name="filterSaved"
        :checked="showOnlySavedJobs"
        @update:checked="showOnlySavedJobs = !showOnlySavedJobs"
      />
      <PaginationControls
        :currentPage="pagination.currentPage"
        :pageCount="pagination.pageCount"
        @onPreviousPage="onPreviousPage"
        @onNextPage="onNextPage"
      />
    </div>

    <BaseText v-if="isLoading">Loading...</BaseText>
    <BaseText v-else-if="isError">Error loading jobs</BaseText>
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
  </AppLayout>
</template>

<style scoped>
.header {
  display: flex;
  flex-direction: column;
  align-items: start;
  align-content: start;
  justify-items: start;
  justify-content: start;
  width: fit-content;
  gap: 1em;
  margin-top: 1.5em;
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
