<template>
  <div class="hero">
    <div class="hero__content">
      <h1 class="hero__title">{{ title }}</h1>
      <h2 v-if="subtitle">{{ subtitle }}</h2>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { collection } from 'firebase/firestore';
import { ref as storageRef } from 'firebase/storage';
import { useFirebaseStorage } from 'vuefire';

const db = useFirestore();
const storage = useFirebaseStorage();

const titleCol = useCollection(collection(db, 'title'));

const activeItem = computed(() => titleCol.value.find((item) => item.active));

const title = computed(() => activeItem.value.title);
const background = computed(() => activeItem.value.background);
const textColor = computed(() => activeItem.value.text_color);
const subtitle = computed(() => activeItem.value.subtitle);

const bgFileRef = storageRef(storage, background.value);
const { url, refresh } = useStorageFileUrl(bgFileRef);
const bgImgUrl = computed(() => `url(${url.value})`);

watch(background, async () => {
  await refresh();
});

onMounted(async () => {
  await nextTick();
  await refresh();
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
