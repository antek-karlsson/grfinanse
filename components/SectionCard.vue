<template>
  <div class="section-card">
    <div class="section-card__content">
      <img v-if="card.value.card.image" class="section-card__image" :src="imgUrl" :alt="card.value.card.title" />
      <h4 class="section-card__title">{{ card.value.card.title }}</h4>
      <p class="section-card__text">{{ card.value.card.text }}</p>
      <ButtonLink
        v-if="showButton"
        class="section-card__button"
        :href="card.value.card.link.url"
        :variant="buttonVariant"
      >
        {{ card.value.card.link.text }}
      </ButtonLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Card } from '@/types';

const props = withDefaults(defineProps<{ card: Card; isDark?: boolean }>(), { isDark: false });

const { getImgUrl } = useFirebase();

const imgUrl = ref<string>();

const showButton = computed(() => !!props.card.value.card.link?.text && !!props.card.value.card.link?.url);
const buttonVariant = computed(() => (props.isDark ? 'secondary' : 'primary'));

onMounted(async () => {
  let url: string;

  if (props.card.value.card.image) {
    url = await getImgUrl(props.card.value.card.image);
    imgUrl.value = url;
  }
});
</script>

<style lang="scss" scoped>
.section-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.4rem;
  width: 34rem;

  &__image {
    width: 100%;
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 2.4rem;
    padding: 2.4rem;
  }

  &__title {
    @include sub-title-card;
  }

  &__text {
    @include text-card;
  }

  &__button {
    width: 100%;
  }
}
</style>
