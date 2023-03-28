<script setup lang="ts">
import PageContainer from '@/components/PageContainer.vue';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { useRoute } from 'vue-router';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import type { Job } from '@/api/usejobs';
import BackButton from '@/components/BackButton.vue';

dayjs.extend(LocalizedFormat);

const route = useRoute();
const queryClient = useQueryClient();

const { data, isLoading, isError } = useQuery({
  staleTime: Infinity,
  queryKey: ['job', route.params.id],
  initialData: (queryClient.getQueryData(['jobs']) as Job[]).find(
    (job: Job) => job.jobAdvertisement?.id === route.params.id
  ),
});
</script>

<template>
  <p v-if="isLoading">Loading...</p>
  <p v-if="isError">Error loading job</p>
  <p v-else-if="!data">Job not found</p>
  <div v-else>
    <div class="gridContainer">
      <div class="backButton">
        <BackButton />
      </div>
      <div class="content">
        <div class="header">
          <p class="employer">{{ data.jobAdvertisement?.profitCenter }}</p>
          <h1 class="title">{{ data.jobAdvertisement?.title }}</h1>
          <p class="date">
            {{ dayjs(data.jobAdvertisement.publicationStarts).format('L') }}—{{
              dayjs(data.jobAdvertisement.publicationEnds).format('L')
            }}
          </p>
        </div>

        <p class="description">{{ data.jobAdvertisement?.jobDesc }}</p>
      </div>
    </div>
  </div>
</template>

<style>
.gridContainer {
  display: grid;
  grid: 1fr;
  padding: 1em;
}

.backButton {
  margin: 0.5em;
  grid-row: 1;
  grid-column: 1;
  width: min-content;
}

.content {
  grid-row: 2;
  grid-column: 1;
}

.header {
  padding-bottom: 1em;
}

.employer {
  font-size: 1.2rem;
  opacity: 0.8;
}

.title {
  line-height: 1;
  padding-bottom: 0.3em;
}

.date {
  opacity: 0.8;
}

.description {
  line-height: 1.5;
}

@media screen and (min-width: 768px) {
  .gridContainer {
    display: grid;
    grid: 1fr 9fr / 1fr 9fr;
  }

  .backButton {
    margin: 0.5em;
    grid-row: 1;
    grid-column: 1;
  }

  .content {
    grid-row: 2;
    grid-column: 2;
  }
}
</style>
