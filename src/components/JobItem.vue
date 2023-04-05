<script setup lang="ts">
import type { Job } from '@/api/usejobs';
import { BaseCard, BaseText } from '@fcgtalent/meerkit';
import { computed } from 'vue';

const props = defineProps<{
  job: Job;
}>();

const title = computed(() => props.job.jobAdvertisement.title?.slice(0, 50) ?? 'Ei otsikkoa');
const employer = computed(() => props.job.jobAdvertisement.profitCenter ?? 'Ei työnantajaa');

const jobDesc = computed(() => props.job.jobAdvertisement.jobDesc);
const description = computed(() =>
  jobDesc.value ? `${jobDesc.value.slice(0, 100)}...` : 'Ei kuvausta'
);
</script>

<template>
  <BaseCard :to="`/${job.jobAdvertisement.id}`">
    <template #header>
      <div class="contentContainer">
        <BaseText heading class="title">{{ title }}</BaseText>
        <BaseText size="sm" class="employer">{{ employer }}</BaseText>
        <BaseText class="description">{{ description }}</BaseText>
      </div>
    </template>
  </BaseCard>
</template>

<style scoped>
.employer {
  padding-bottom: 0.5em;
}
.contentContainer {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
</style>
