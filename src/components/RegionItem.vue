<script setup lang="ts">
import type { Region } from '@/api/useregions';
import { BaseText } from '@fcgtalent/meerkit';

defineProps<{
  region: Region;
}>();
</script>

<template>
  <BaseText heading>{{ region.name }}</BaseText>
  <ul>
    <li v-for="child in region.childs" :key="child.id">
      <BaseText dense>
        {{ child.name }}
      </BaseText>
    </li>
  </ul>
</template>
