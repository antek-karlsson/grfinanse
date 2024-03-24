<template>
  <div class="hero">
    <div class="hero__content">
      <h1 class="hero__title">{{ title }}</h1>
      <h2 v-if="subtitle">{{ subtitle }}</h2>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTitleStore } from '~/store/title';
import type { Title } from '~/types';

const store = useTitleStore();
const { getImgUrl } = useFirebase();

const url = ref<string>();

const titleObject = ref<Title>();
const bgImgUrl = ref<string>();

const title = computed(() => titleObject.value?.title);
const background = computed(() => titleObject.value?.background);
const subtitle = computed(() => titleObject.value?.subtitle);
const textColor = computed(() => titleObject.value?.text_color);

onMounted(() => {
  watch(
    store,
    async () => {
      if (store.activeTitle) {
        titleObject.value = store.activeTitle;
        url.value = await getImgUrl(background.value);
        bgImgUrl.value = `url(${url.value})`;
      }
    },
    { immediate: true },
  );
});
</script>

<style lang="scss" scoped>
.hero {
  position: relative;
  width: 100%;
  min-height: 50vh;
  height: 100%;
  background: v-bind(bgImgUrl) center/cover no-repeat;

  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  &__title {
    color: v-bind(textColor);
    font-size: 5.6rem;
    font-weight: bold;
  }
}
</style>
