<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  currentPage: number;
  pageCount: number;
}>();

const emit = defineEmits<{
  (event: 'onPreviousPage'): void;
  (event: 'onNextPage'): void;
}>();

const pageIndicator = computed(() => {
  return `Page ${props.currentPage}/${props.pageCount}`;
});
</script>

<template>
  <div>
    <button @click="emit('onPreviousPage')">⬅️</button>
    <button @click="emit('onNextPage')">➡️</button>
    <p>{{ pageIndicator }}</p>
  </div>
</template>

<style scoped>
div {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25em;
}
p {
  font-weight: 500;
  padding: 0.2em;
}
</style>
