<script setup lang="ts">
import { ButtonElement } from '@fcgtalent/meerkit';
</script>

<template>
  <nav>
    <ButtonElement dense type="flat" title="Jobs" icon="briefcase-2" href="/" />
    <ButtonElement dense type="flat" title="Regions" icon="sphere" href="/regions" />
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  align-items: center;
  height: 4rem;
  padding: 0.5rem 1rem 0.5rem 1rem;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}
</style>
