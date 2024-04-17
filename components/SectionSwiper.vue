<template>
  <div class="section-swiper">
    <Swiper
      :modules="modules"
      :slides-per-view="isScreenMobile ? 1 : isScreenTablet ? 2 : isScreenDesktop ? 3 : 4"
      :space-between="24"
      :navigation="swiperNavigation"
      :css-mode="true"
    >
      <SwiperSlide v-for="(card, id) in cards" :key="id">
        <SectionCard :card="card" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import type { Card } from '@/types';

withDefaults(defineProps<{ cards: Card[]; isDark?: boolean }>(), { isDark: false });

const isScreenMobile = useMediaQuery('(max-width: 599px)');
const isScreenTablet = useMediaQuery('(min-width: 600px) and (max-width: 1199px)');
const isScreenDesktop = useMediaQuery('(min-width: 1200px) and (max-width: 1440px)');

const swiperNavigation = computed(() => true as undefined);

const modules = [SwiperA11y, SwiperPagination, SwiperNavigation];
</script>

<style lang="scss" scoped>
.section-swiper {
  width: 100%;

  :deep(.swiper-button-prev),
  :deep(.swiper-button-next) {
    background-color: $black;
    top: 100%;
    color: $white;

    &::after {
      font-size: 3rem;
    }

    @include desktop {
      top: 47%;
    }

    @include desktop-lg {
      top: 51%;
    }
  }

  :deep(.swiper-button-prev) {
    left: 2px;

    @include tablet {
      left: 0;
    }
  }

  :deep(.swiper-button-next) {
    right: 1px;

    @include tablet {
      right: 0;
    }
  }

  :deep(.swiper-slide) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
