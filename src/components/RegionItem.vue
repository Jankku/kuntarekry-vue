<script setup lang="ts">
import type { Region } from '@/api/useregions';

defineProps<{
  region: Region;
}>();
</script>

<template>
  <p>{{ region.name }}</p>
  <ul>
    <li v-for="child in region.childs" :key="child.id">
      {{ child.name }}
    </li>
  </ul>
</template>

<style scoped>
ul {
  margin-left: 1em;
}
</style>
