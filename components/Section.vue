<template>
  <div
    :class="[
      'section',
      {
        'section--dark': data.is_dark,
        'section--w-bg-image': data.background,
        'section--cards-no-swiper': showCards && !showSwiper,
      },
    ]"
  >
    <template v-if="showCards && showSwiper">
      <SectionSwiper :cards="allCards" />
    </template>
    <template v-if="showCards && !showSwiper">
      <SectionCard v-for="(card, id) in allCards" :key="id" :card="card" />
    </template>
    <template v-if="!showCards">
      <img v-if="showImage" class="section__image" :src="imgUrl" :alt="data.title" />
      <div :class="['section__content', { 'section__content--single': !showImage }]">
        <h3 v-if="data.title" class="section__title">{{ data.title }}</h3>
        <h4 v-if="data.subtitle" class="section__subtitle">{{ data.subtitle }}</h4>
        <p class="section__text">{{ data.text }}</p>
        <ButtonLink v-if="showButton" class="section__button" :href="data.link.url" :variant="buttonVariant">
          {{ data.link.text }}</ButtonLink
        >
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core';
import type { Section } from '@/types';

interface Props {
  data: Section;
}

const props = defineProps<Props>();

const { getImgUrl } = useFirebase();

const isDesktop = useMediaQuery('(min-width: 1024px)');
const isSwiperMobile = useMediaQuery('(max-width: 599px)');
const isSwiperTablet = useMediaQuery('(min-width: 600px) and (max-width: 1199px)');
const isSwiperDesktop = useMediaQuery('(min-width: 1200px) and (max-width: 1440px)');

const imgUrl = ref<string>();
const bgImgUrl = ref<string>();

const flexDirection = computed(() => {
  if (props.data.image_left && isDesktop.value) {
    return 'row';
  }

  if (props.data.image_right && isDesktop.value) {
    return 'row-reverse';
  }
  return 'column';
});

const buttonVariant = computed(() => (props.data.is_dark ? 'secondary' : 'primary'));

const showButton = computed(() => !!props.data.link.text && !!props.data.link.url);

const showImage = computed(() => !!props.data.image_left || !!props.data.image_right);

const allCards = computed(() => props.data.card || props.data.cards);

const showCards = computed(() => {
  if (!allCards.value.length) {
    return false;
  }

  for (const obj of allCards.value) {
    for (const key in obj.value) {
      if (obj.value[key] === null) {
        return false;
      }
    }
  }

  return true;
});

const showSwiper = computed(() => {
  switch (true) {
    case !showCards.value:
      return false;
    case !!showCards.value && isSwiperMobile.value:
      return allCards.value.length > 1;
    case !!showCards.value && isSwiperTablet.value:
      return allCards.value.length > 2;
    case !!showCards.value && isSwiperDesktop.value:
      return allCards.value.length > 3;
    default:
      return allCards.value.length > 4;
  }
});

const background = computed(() =>
  props.data.background
    ? `linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.45) 100%), ${bgImgUrl.value} center/cover no-repeat`
    : props.data.is_dark
      ? '#4d4d4d'
      : '#f9f6f6',
);

onMounted(async () => {
  let url: string;

  if (props.data.image_left) {
    url = await getImgUrl(props.data.image_left);
    imgUrl.value = url;
  } else if (props.data.image_right) {
    url = await getImgUrl(props.data.image_right);
    imgUrl.value = url;
  } else if (props.data.background) {
    url = await getImgUrl(props.data.background);
    bgImgUrl.value = `url(${url})`;
  }
});
</script>

<style lang="scss" scoped>
.section {
  $r: &;
  width: 100%;
  min-height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: v-bind(flexDirection);
  gap: 3.2rem;
  background: v-bind(background);
  @include section-padding;

  @include tablet {
    gap: 4.8rem;
  }

  @include desktop {
    gap: 6.4rem;
  }

  &--cards-no-swiper {
    flex-direction: row;
    justify-content: space-evenly;
  }

  &--w-bg-image {
    color: $white;
  }

  &--dark {
    background: v-bind(background);
    color: $white;

    #{$r}__subtitle {
      color: $primary;
    }
  }

  &__image {
    width: 100%;
    height: auto;

    @include desktop {
      max-width: 50%;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2.4rem;
    text-align: center;

    @include tablet {
      gap: 3.2rem;
    }

    @include desktop {
      justify-content: flex-start;
      align-items: flex-start;
      gap: 4.8rem;
      text-align: left;
    }

    &--single {
      @include desktop {
        justify-content: center;
        align-items: center;
        text-align: center;
      }
    }
  }

  &__title {
    @include title;
  }

  &__subtitle {
    @include sub-title;
  }

  &__text {
    @include text;
  }

  &__button {
    align-self: center;
  }
}
</style>
