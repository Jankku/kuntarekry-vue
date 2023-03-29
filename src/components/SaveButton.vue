<script setup lang="ts"></script>

<template>
  <button>
    <slot />
  </button>
</template>

<style scoped>
button {
  letter-spacing: 0.05em;
  font-weight: 700;
  padding: 0.5em 1.25em;
  background-color: #6fce8f;
  border: 2px solid #64b980;
  border-radius: 8px;
}

button:hover {
  background-color: #62b67e;
}
</style>
