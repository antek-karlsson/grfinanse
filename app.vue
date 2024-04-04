<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useTitleStore } from '@/store/title';
import { useSectionsStore } from '@/store/sections';

const { fetchTitleArray } = useTitleStore();
const { fetchSections } = useSectionsStore();

onMounted(async () => {
  await fetchTitleArray();
  await fetchSections();
});
</script>

<style scoped></style>
