<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import PageContainer from './components/PageContainer.vue';
</script>

<template>
  <PageContainer>
    <Navbar />
    <router-view v-slot="{ Component, route }">
      <keep-alive>
        <transition name="fade" mode="out-in">
          <div :key="route.path">
            <component :is="Component" />
          </div>
        </transition>
      </keep-alive>
    </router-view>
  </PageContainer>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
