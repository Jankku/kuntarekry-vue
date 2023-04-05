<script setup lang="ts">
import { debounce } from '@/util';
import { SearchField } from '@fcgtalent/meerkit';

defineProps<{ modelValue: string; disabled: boolean }>();
const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void;
  (event: 'blur'): void;
  (event: 'clear'): void;
}>();

const debouncedOnChange = debounce((value: string) => {
  emit('update:modelValue', value);
}, 300);
</script>

<template>
  <SearchField label-hidden type="text" name="search" label="Search" placeholder="Search jobs"
  :value="modelValue" @blur="() => emit('blur')" @clear="() => emit('clear')"
  @input="debouncedOnChange(($event.target as HTMLInputElement).value)" disabled:="disabled" />
</template>
