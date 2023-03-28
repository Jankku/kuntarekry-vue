<script setup lang="ts">
import { useRegions } from '@/api/useregions';
import RegionItem from '@/components/RegionItem.vue';

const { data, isLoading, isError } = useRegions();
</script>

<template>
  <h1 class="title">Regions</h1>
  <p v-if="isLoading">Loading...</p>
  <p v-else-if="isError">Error loading regions</p>
  <div v-else>
    <div class="jobContainer">
      <RegionItem v-for="region in data" :region="region" :key="region.id" />
    </div>
  </div>
</template>

<style scoped>
.title {
  padding-bottom: 1em;
}
</style>
