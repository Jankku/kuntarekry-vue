<script setup lang="ts">
import { useJobs } from '@/api/usejobs';
import { useRegions } from '@/api/useregions';
import {
  AccordionList,
  AccordionListItem,
  AppLayout,
  BaseText,
  DetailList,
  DetailListItem,
} from '@fcgtalent/meerkit';

const { data, isLoading, isError } = useRegions();
const { data: jobs } = useJobs();

const calculateRegionJobCount = (regionName: string) => {
  return (
    jobs.value?.filter(
      (job) => job.jobAdvertisement.location?.toLowerCase() === regionName.toLowerCase()
    ).length ?? 0
  );
};
</script>

<template>
  <AppLayout narrow>
    <div class="titleWrapper">
      <BaseText heading size="xxl">Regions</BaseText>
    </div>
    <BaseText v-if="isLoading">Loading...</BaseText>
    <BaseText v-else-if="isError">Error loading regions</BaseText>
    <div v-else>
      <AccordionList>
        <AccordionListItem
          v-for="region in data"
          :key="region.id"
          :index="region.id"
          :title="region.name"
        >
          <DetailList class="detailList">
            <DetailListItem
              v-for="child in region.childs"
              :key="child.id"
              :label="child.name"
              :value="`${calculateRegionJobCount(child.name)} jobs`"
            />
          </DetailList>
        </AccordionListItem>
      </AccordionList>
    </div>
  </AppLayout>
</template>

<style scoped>
.detailList {
  margin-left: 2em;
  margin-bottom: 1em;
}
.titleWrapper {
  padding-bottom: 1em;
}
</style>
