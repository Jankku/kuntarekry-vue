<script setup lang="ts">
import { ButtonResponsive, NumberBadge } from '@fcgtalent/meerkit';

const props = defineProps<{
  currentPage: number;
  pageCount: number;
}>();

const emit = defineEmits<{
  (event: 'onPreviousPage'): void;
  (event: 'onNextPage'): void;
}>();
</script>

<template>
  <div>
    <ButtonResponsive title="Previous page" icon="arrow-left-3" @click="emit('onPreviousPage')" />
    <ButtonResponsive title="Next page" icon="arrow-right-3" @click="emit('onNextPage')" />
    <NumberBadge :count="props.currentPage" :total="props.pageCount" />
  </div>
</template>
