<script setup lang="ts">
defineProps<{ modelValue: string; disabled: boolean }>();
defineEmits<(value: string) => void>();
</script>

<template>
  <input type="search" placeholder="Search jobs..." :value="modelValue"
  @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  disabled:="disabled" />
</template>

<style scoped>
input {
  margin-bottom: 1em;
  padding: 0.5em;
}
</style>
