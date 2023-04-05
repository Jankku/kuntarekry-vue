<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import { MeerkitConfigProvider, AppWrapper } from '@fcgtalent/meerkit';
import '@fcgtalent/meerkit/src/scss/main.scss';
</script>

<template>
  <MeerkitConfigProvider>
    <AppWrapper>
      <template #header>
        <NavBar />
      </template>
      <router-view v-slot="{ Component, route }">
        <keep-alive>
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </router-view>
    </AppWrapper>
  </MeerkitConfigProvider>
</template>
