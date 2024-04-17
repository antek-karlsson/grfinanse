<template>
  <div class="hero">
    <div class="hero__content">
      <h1 class="hero__title">{{ title }}</h1>
      <h2 v-if="subtitle" class="hero__subtitle">{{ subtitle }}</h2>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTitleStore } from '~/store/title';
import { usePartnerTitleStore } from '~/store/partnerTitle';
import type { Title } from '~/types';

const props = withDefaults(
  defineProps<{
    forPartner: boolean;
  }>(),
  {
    forPartner: false,
  },
);

const titleStore = useTitleStore();
const partnerTitleStore = usePartnerTitleStore();
const { getImgUrl } = useFirebase();

const titleObject = ref<Title>();
const bgImgUrl = ref<string>();

const title = computed(() => titleObject.value?.title);
const background = computed(() => titleObject.value?.background);
const subtitle = computed(() => titleObject.value?.subtitle);
const textColor = computed(() => titleObject.value?.text_color);

onMounted(() => {
  if (props.forPartner) {
    watch(
      partnerTitleStore,
      async () => {
        if (partnerTitleStore.activeTitle) {
          titleObject.value = partnerTitleStore.activeTitle;
          const url = await getImgUrl(background.value);
          bgImgUrl.value = `url(${url})`;
        }
      },
      { immediate: true },
    );
  } else {
    watch(
      titleStore,
      async () => {
        if (titleStore.activeTitle) {
          titleObject.value = titleStore.activeTitle;
          const url = await getImgUrl(background.value);
          bgImgUrl.value = `url(${url})`;
        }
      },
      { immediate: true },
    );
  }
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
    font-size: 3.6rem;
    font-weight: bold;

    @include tablet {
      font-size: 4.8rem;
    }

    @include desktop {
      font-size: 6.4rem;
    }
  }

  &__subtitle {
    color: v-bind(textColor);
    font-size: 1.4rem;

    @include tablet {
      font-size: 1.8rem;
    }

    @include desktop {
      font-size: 2.4rem;
    }
  }
}
</style>
