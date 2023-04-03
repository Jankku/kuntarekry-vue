<script setup lang="ts">
defineProps<{ modelValue: boolean }>();
const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void;
}>();

const onToggle = (value: boolean) => emit('update:modelValue', value);
</script>

<template>
  <div>
    <label for="checkbox">Filter saved</label>
    <input
      type="checkbox"
      name="checkbox"
      id="checkbox"
      :value="modelValue"
      @input="onToggle(($event.target as HTMLInputElement).checked)"
    />
  </div>
</template>

<style scoped>
label {
  padding-right: 0.5em;
}
</style>
