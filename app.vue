<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useTitleStore } from '@/store/title';
const { fetchTitleArray } = useTitleStore();

onMounted(async () => {
  await fetchTitleArray();
});
</script>

<style scoped></style>
