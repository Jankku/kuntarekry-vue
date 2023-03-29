<script setup lang="ts">
import { useRegions } from '@/api/useregions';
import RegionItem from '@/components/RegionItem.vue';

const { data, isLoading, isError } = useRegions();
</script>

<template>
  <div class="container">
    <h1 class="title">Regions</h1>
    <p v-if="isLoading">Loading...</p>
    <p v-else-if="isError">Error loading regions</p>
    <div v-else>
      <div class="jobContainer">
        <RegionItem v-for="region in data" :region="region" :key="region.id" />
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

.title {
  padding-bottom: 1em;
}
</style>
