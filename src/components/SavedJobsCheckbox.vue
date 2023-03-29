<script setup lang="ts">
defineProps<{ modelValue: boolean }>();
const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void;
}>();

const onToggle = (value: boolean) => emit('update:modelValue', value);
</script>

<template>
  <label for="checkbox">Show saved only</label>
  <input
    type="checkbox"
    name="checkbox"
    id="checkbox"
    :value="modelValue"
    @input="onToggle(($event.target as HTMLInputElement).checked)"
  />
</template>

<style scoped>
label {
  margin: 1em 0.5em 0em 1em;
}
</style>
