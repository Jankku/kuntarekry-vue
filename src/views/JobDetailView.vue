<script setup lang="ts">
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { useRoute, useRouter } from 'vue-router';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import type { Job } from '@/api/usejobs';
import useSavedJobs from '@/hooks/usesavedjobs';
import { computed } from 'vue';
import { AppLayout, BaseText, ButtonElement } from '@fcgtalent/meerkit';

dayjs.extend(LocalizedFormat);

const router = useRouter();
const route = useRoute();
const queryClient = useQueryClient();
const { savedJobIds, saveJob } = useSavedJobs();

const { data, isLoading, isError } = useQuery({
  staleTime: Infinity,
  queryKey: ['job', route.params.id],
  initialData: (queryClient.getQueryData(['jobs']) as Job[])?.find(
    (job: Job) => job.jobAdvertisement?.id === route.params.id
  ),
});

const isSaved = computed(() => savedJobIds.value.has(route.params.id as string));
</script>

<template>
  <AppLayout narrow>
    <BaseText v-if="isLoading">Loading...</BaseText>
    <BaseText v-if="isError">Error loading job</BaseText>
    <BaseText v-else-if="!data">Job not found</BaseText>
    <div v-else>
      <div class="gridContainer">
        <div class="backButton">
          <ButtonElement
            type="flat"
            icon="arrow-left-3"
            title="Back"
            @click="() => router.back()"
          />
        </div>
        <div class="content">
          <div class="header">
            <BaseText class="employer">{{ data.jobAdvertisement?.profitCenter }}</BaseText>
            <BaseText heading size="xxl" class="title">{{ data.jobAdvertisement?.title }}</BaseText>
            <BaseText>
              {{ dayjs(data.jobAdvertisement.publicationStarts).format('L') }}—{{
                dayjs(data.jobAdvertisement.publicationEnds).format('L')
              }}
            </BaseText>
          </div>
          <div class="description">
            <ButtonElement
              type="primary"
              :title="isSaved ? 'Unsave' : 'Save'"
              @click="() => saveJob(route.params.id as string)"
            />
            <BaseText>{{ data.jobAdvertisement?.jobDesc }}</BaseText>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<style>
.gridContainer {
  display: grid;
  grid: 1fr;
}

.backButton {
  grid-row: 1;
  grid-column: 1;
}

.content {
  grid-row: 2;
  grid-column: 1;
}

.header {
  padding-bottom: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.25em;
}

.description {
  display: flex;
  flex-direction: column;
  align-items: start;
}

@media screen and (min-width: 768px) {
  .gridContainer {
    display: grid;
    grid: 1fr 9fr / 1fr 9fr;
  }

  .backButton {
    grid-row: 1;
    grid-column: 1;
  }

  .content {
    grid-row: 2;
    grid-column: 2;
  }
}
</style>
