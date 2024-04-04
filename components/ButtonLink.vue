<template>
  <component :is="tag" :class="classes" :v-bind="$attrs" :target="target">
    <slot />
  </component>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    variant: 'primary' | 'secondary';
  }>(),
  {
    variant: 'primary',
  },
);

const attrs = useAttrs();

const tag = computed(() => {
  if (attrs.href) {
    return 'a';
  } else {
    return attrs.to ? defineNuxtLink({}) : 'button';
  }
});

const classes = computed(() => ['button-link', `button-link--${props.variant}`]);

const target = computed(() => (attrs.href ? '_blank' : '_self'));
</script>

<style lang="scss" scoped>
.button-link {
  max-width: 233px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 24px;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.5;
  text-decoration: none;
  border: 2px solid;
  transition: all 0.2s;

  @media (hover: hover) {
    &:hover {
      cursor: pointer;
    }
  }

  &:disabled {
    cursor: not-allowed;
  }

  @include tablet {
    min-width: 180px;
    max-width: 240px;
  }

  &--primary {
    background-color: $primary;
    border-color: $primary;
    color: $white;

    @media (hover: hover) {
      &:hover {
        background-color: $white;
        color: $primary;
      }
    }

    &:focus-visible {
      background-color: $white;
      color: $primary;
    }
  }

  &--secondary {
    background-color: $secondary;
    border-color: $secondary;
    color: $section-dark-bg;

    @media (hover: hover) {
      &:hover {
        background-color: $section-dark-bg;
        color: $secondary;
      }
    }

    &:focus-visible {
      background-color: $section-dark-bg;
      color: $secondary;
    }
  }
}
</style>
