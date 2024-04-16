<template>
  <div ref="navbar" :class="['navbar', { hidden: !isNavVisible }]">
    <div class="navbar__content">
      <div class="navbar__header">
        <div class="navbar__logo">
          <NuxtLink to="/"><img src="/img/logo.svg" alt="GR Finanse" /></NuxtLink>
        </div>
        <NavButton
          v-show="isScreenMobile"
          class="navbar__menu-icon"
          type="menu"
          :is-nav-open="isNavOpen"
          @click="toggleMobileNav"
        />
      </div>
      <ClientOnly>
        <template v-if="!isScreenMobile">
          <div class="navbar__links">
            <NuxtLink :class="['navbar__link', { 'navbar__link--active': currentRoute === '/klient' }]" to="/klient">
              Dla klientów
            </NuxtLink>
            <NuxtLink :class="['navbar__link', { 'navbar__link--active': currentRoute === '/partner' }]" to="/partner">
              Dla partnerów
            </NuxtLink>
            <NuxtLink :class="['navbar__link', { 'navbar__link--active': currentRoute === '/OWU' }]" to="/OWU">
              OWU
            </NuxtLink>
            <NuxtLink :class="['navbar__link', { 'navbar__link--active': currentRoute === '/RODO' }]" to="/RODO">
              RODO
            </NuxtLink>
          </div>
        </template>
        <template v-if="isScreenMobile">
          <div class="navbar__links--mobile" :class="isNavOpen ? 'open' : 'closed'">
            <NuxtLink :class="['navbar__link', { 'navbar__link--active': currentRoute === '/klient' }]" to="/klient">
              Dla klientów
            </NuxtLink>
            <NuxtLink :class="['navbar__link', { 'navbar__link--active': currentRoute === '/partner' }]" to="/partner">
              Dla partnerów
            </NuxtLink>
            <NuxtLink :class="['navbar__link', { 'navbar__link--active': currentRoute === '/OWU' }]" to="/OWU">
              OWU
            </NuxtLink>
            <NuxtLink :class="['navbar__link', { 'navbar__link--active': currentRoute === '/RODO' }]" to="/RODO">
              RODO
            </NuxtLink>
          </div>
        </template>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
const navbar = ref<HTMLElement>();
const isNavOpen = ref(false);
const isNavVisible = ref(true);
const lastScrollPosition = ref(0);

const isScreenMobile = useMediaQuery('(max-width: 599px)');
const route = useRoute();

const currentRoute = computed(() => route.path);
const navbarHeight = computed(() => navbar.value?.getBoundingClientRect().height || 0);

function toggleMobileNav() {
  isNavOpen.value = !isNavOpen.value;
}

function onScroll() {
  const currentScrollPosition = window.scrollY;
  if (currentScrollPosition < 0 || Math.abs(currentScrollPosition - lastScrollPosition.value) < navbarHeight.value) {
    return;
  }

  isNavVisible.value = currentScrollPosition < lastScrollPosition.value;
  lastScrollPosition.value = currentScrollPosition;
}

watch(currentRoute, () => {
  isNavOpen.value = false;
});

watch(isScreenMobile, () => {
  !isScreenMobile && isNavOpen.value === true ? (isNavOpen.value = false) : (isNavOpen.value = false);
});

onMounted(() => {
  window.addEventListener('scroll', onScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
});
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: $section-light-bg;
  z-index: 2;
  transform: translate3d(0, 0, 0);
  transition: 0.3s all ease-out;

  &__content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 2.5rem;

    @include tablet {
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      gap: 2.4rem;
    }

    @include tablet-landscape {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      padding: 3.2rem 6.4rem;
    }
  }

  &__header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @include tablet {
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }

    @include desktop {
      justify-content: flex-start;
    }
  }

  &__menu-icon {
    align-self: center;
  }

  &__links {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 3rem;

    &--mobile {
      width: 100%;
      height: 100vh;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-end;
      position: absolute;
      top: 12.4rem;
      background-color: $section-light-bg;
      z-index: 100;
      padding: 2.5rem;
    }
  }

  &__link {
    text-decoration: none;
    color: $black;
    font-weight: 500;
    font-size: 1.8rem;
    padding: 1rem;
    transition: all 0.4s ease-out;
    white-space: nowrap;

    @media (hover: hover) {
      &:hover {
        opacity: 0.5;
        border-bottom: 1px solid $black;
      }
    }

    &--active {
      border-bottom: 1px solid $black;
    }
  }
}

.navbar.hidden {
  transform: translate3d(0, -100%, 0);
}

.open {
  display: flex;
}

.closed {
  display: none;
}
</style>
