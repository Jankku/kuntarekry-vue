<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <button @click="() => router.back()">Back</button>
</template>

<style scoped>
button {
  letter-spacing: 0.05em;
  font-weight: 700;
  padding: 0.5em 1.25em;
  background-color: var(--color-background-mute);
  border: 2px solid #aaa;
  border-radius: 8px;
  color: var(--color-text);
}

button:hover {
  background-color: #eee;
  color: black;
}
</style>
