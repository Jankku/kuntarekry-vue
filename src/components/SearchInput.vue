<script setup lang="ts">
import { debounce } from '@/util';

defineProps<{ modelValue: string; disabled: boolean }>();
const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void;
}>();

const debouncedOnChange = debounce((value: string) => {
  emit('update:modelValue', value);
}, 300);
</script>

<template>
  <input type="search" placeholder="Search jobs..." :value="modelValue"
  @input="debouncedOnChange(($event.target as HTMLInputElement).value)" disabled:="disabled" />
</template>

<style scoped>
input {
  margin-bottom: 1em;
  padding: 0.5em;
}
</style>
