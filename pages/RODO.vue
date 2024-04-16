<template>
  <div v-if="rodo" class="rodo" v-html="rodo" />
</template>

<script setup lang="ts">
import { useRodoStore } from '@/store/rodo';

const store = useRodoStore();
const rodo = ref();

onMounted(async () => {
  await store.fetchRodo();
  if (store.activeRodo) {
    rodo.value = store.activeRodo.rodo;
  }
});
</script>

<style lang="scss" scoped>
.rodo {
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

:deep(ul) {
  list-style: disc;
  @include text;
}

:deep(p) {
  @include text;
  align-self: flex-start;
}
</style>
