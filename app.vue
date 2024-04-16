<template>
  <NuxtLayout>
    <NuxtPage v-if="!isLoading" />
    <Loader v-else />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useTitleStore } from '@/store/title';
import { useSectionsStore } from '@/store/sections';
import { useFooterStore } from '@/store/footer';

const { fetchTitleArray } = useTitleStore();
const { fetchSections } = useSectionsStore();
const { fetchFooter } = useFooterStore();

const isLoading = ref(true);

onMounted(async () => {
  await fetchTitleArray();
  await fetchSections();
  await fetchFooter();

  const imageLoadPromises = Array.from(document.images).map((img) =>
    img.complete && img.naturalHeight !== 0
      ? Promise.resolve(true)
      : new Promise((resolve) => {
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
        }),
  );

  Promise.all(imageLoadPromises).then((results) => {
    isLoading.value = !results.every(Boolean);
  });
});
</script>
