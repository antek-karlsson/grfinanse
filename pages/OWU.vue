<template>
  <div v-if="owu" class="owu" v-html="owu" />
</template>

<script setup lang="ts">
import { useOwuStore } from '@/store/owu';

const store = useOwuStore();
const owu = ref();

onMounted(async () => {
  await store.fetchOwu();
  owu.value = store.activeOwu.content;
});
</script>

<style lang="scss" scoped>
.owu {
  background-color: $section-light-bg;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;
  @include section-padding;
}
:deep(h1) {
  @include sub-title;
}

:deep(h2) {
  @include sub-title;
}

:deep(ul),
:deep(ol) {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-left: 2rem;
  text-align: left;
}

:deep(ol) {
  list-style: decimal;
  @include text;
}
</style>
