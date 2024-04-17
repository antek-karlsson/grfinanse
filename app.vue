<template>
  <NuxtLayout>
    <NuxtPage v-if="!isLoading" />
    <Loader v-else />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useTitleStore } from '@/store/title';
import { usePartnerTitleStore } from '@/store/partnerTitle';
import { useSectionsStore } from '@/store/sections';
import { usePartnerSectionsStore } from '@/store/partnerSections';
import { useFooterStore } from '@/store/footer';

const { fetchTitleArray } = useTitleStore();
const { fetchTitleArray: fetchPartnerTitleArray } = usePartnerTitleStore();
const { fetchSections } = useSectionsStore();
const { fetchSections: fetchPartnerSections } = usePartnerSectionsStore();
const { fetchFooter } = useFooterStore();

const isLoading = ref(true);

onMounted(async () => {
  await fetchTitleArray();
  await fetchSections();
  await fetchPartnerSections();
  await fetchFooter();
  await fetchPartnerTitleArray();

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
