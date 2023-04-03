<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import PageContainer from './components/PageContainer.vue';
</script>

<template>
  <PageContainer>
    <NavBar />
    <router-view v-slot="{ Component, route }">
      <keep-alive>
        <component :is="Component" :key="route.path" />
      </keep-alive>
    </router-view>
  </PageContainer>
</template>
