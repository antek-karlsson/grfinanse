<template>
  <div class="index">
    <Hero for-partner />
    <div class="index__sections">
      <Section v-for="(section, id) in sections" :key="id" :data="section" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { usePartnerSectionsStore } from '~/store/partnerSections';
import type { Section } from '~/types';

const store = usePartnerSectionsStore();

const sections = ref<Section[]>();

onMounted(() => {
  watch(
    store,
    () => {
      if (store.sections) {
        sections.value = store.sections.sort((a, b) => a.order - b.order);
      }
    },
    { immediate: true },
  );
});
</script>

<style lang="scss" scoped>
.index {
  &__sections {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
