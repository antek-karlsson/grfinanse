<template>
  <div v-if="footer" class="footer">
    <div class="footer__logos">
      <a v-for="logo in logos" :key="logo.name" :href="logo.link">
        <img :src="logo.image" :alt="logo.name" />
      </a>
    </div>
    <div class="footer__divider" />
    <div class="footer__contact">
      <div class="footer__contact-section">
        <p>{{ footer.contact.title }}</p>
        <p>{{ footer.contact.street }}</p>
      </div>
      <div class="footer__contact-section">
        <p>{{ footer.contact.city }}</p>
        <p>{{ footer.contact.zip_code }}</p>
      </div>
      <div class="footer__contact-section">
        <a :href="`tel:${footer.contact.telephone}`">{{ footer.contact.telephone }}</a>
        <a :href="`mailto:${footer.contact.email}`">{{ footer.contact.email }}</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFooterStore } from '@/store/footer';
import type { Footer } from '@/types';

const store = useFooterStore();
const { getImgUrl } = useFirebase();

const footer = ref<Footer>();
const logos = ref<Footer['logos'][number]['value'][]>();

onMounted(() => {
  watch(store, async () => {
    if (store.activeFooter) {
      footer.value = store.activeFooter;
      const logoValues = footer.value.logos.map((logo) => logo.value);
      const items: Footer['logos'][number]['value'][] = [];
      for (const logo of logoValues) {
        const item = { name: logo.name, image: await getImgUrl(logo.image), link: logo.link };

        if (item) {
          items.push(item);
        }
      }

      logos.value = items;
    }
  });
});
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.4rem;
  background-color: $section-light-bg;
  @include section-padding;

  &__logos {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2.4rem;

    @include desktop {
      flex-direction: row;
    }
  }

  &__divider {
    width: 100%;
    border: 1px solid $primary;
  }

  &__contact {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 2.4rem;
    @include sub-title;

    a {
      color: $primary;
      text-decoration: none;
    }

    @include desktop {
      flex-direction: row;
    }
  }

  &__contact-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 1.2rem;
  }

  &__nav {
    display: flex;
    gap: 24px;

    a {
      font-size: 1.2rem;
      display: block;
      color: $primary;
      text-decoration: none;
    }
  }
}
</style>
