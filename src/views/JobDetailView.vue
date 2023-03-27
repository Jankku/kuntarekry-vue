<script setup lang="ts">
import PageContainer from '@/components/PageContainer.vue';
import type { JobAdvertisement } from '@/types';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const queryClient = useQueryClient();

const { data, isLoading, isError } = useQuery({
  staleTime: Infinity,
  queryKey: ['job', route.params.id],
  initialData: (queryClient.getQueryData(['jobs']) as JobAdvertisement[]).find(
    (job: JobAdvertisement) => job.jobAdvertisement?.id === route.params.id
  ),
});
</script>

<template>
  <PageContainer>
    <p v-if="isLoading">Loading...</p>
    <p v-if="isError">Error loading job</p>
    <p v-else-if="!data">Job not found</p>
    <div v-else>
      <div class="gridContainer">
        <button @click="() => router.back()" class="backButton">Back</button>
        <div class="content">
          <h1 class="title">{{ data.jobAdvertisement?.title }}</h1>
          <p class="description">{{ data.jobAdvertisement?.jobDesc }}</p>
        </div>
      </div>
    </div>
  </PageContainer>
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

.title {
  line-height: 1;
  padding-bottom: 1em;
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
