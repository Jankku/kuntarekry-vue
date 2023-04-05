<script setup lang="ts">
import { useRegions } from '@/api/useregions';
import RegionItem from '@/components/RegionItem.vue';
import { AppLayout, BaseText } from '@fcgtalent/meerkit';

const { data, isLoading, isError } = useRegions();
</script>

<template>
  <AppLayout narrow>
    <div class="titleWrapper">
      <BaseText heading size="xxl" id="asd">Regions</BaseText>
    </div>
    <BaseText v-if="isLoading">Loading...</BaseText>
    <BaseText v-else-if="isError">Error loading regions</BaseText>
    <div v-else>
      <RegionItem v-for="region in data" :region="region" :key="region.id" />
    </div>
  </AppLayout>
</template>

<style scoped>
.titleWrapper {
  padding-bottom: 1em;
}
</style>
