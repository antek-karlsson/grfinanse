<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useTitleStore } from '@/store/title';
import { useSectionsStore } from '@/store/sections';
import { useFooterStore } from '@/store/footer';

const { fetchTitleArray } = useTitleStore();
const { fetchSections } = useSectionsStore();
const { fetchFooter } = useFooterStore();

onMounted(async () => {
  await fetchTitleArray();
  await fetchSections();
  await fetchFooter();
});
</script>
