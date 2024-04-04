// https://nuxt.com/docs/api/configuration/nuxt-config

import { defineNuxtConfig } from 'nuxt/config';
import eslintPlugin from 'vite-plugin-eslint';

export default defineNuxtConfig({
  app: {
    head: {
      title: 'GR Finanse',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'GR Finanse',
        },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: 'anonymous',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;800&display=swap',
        },
        { rel: 'icon', type: 'image/png', href: '/favicon.ico' },
      ],
    },
  },
  css: ['@/assets/scss/common/index.scss'],
  vite: {
    plugins: [eslintPlugin({ failOnError: false })],
    build: {
      target: 'esnext',
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "assets/scss/global/main.scss";',
        },
      },
    },
  },
  imports: {
    dirs: ['composables/**'],
  },
  typescript: {
    typeCheck: true,
    strict: false,
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL,
      firebaseApiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID,
    },
  },
  modules: ['@pinia/nuxt', 'nuxt-swiper', '@vueuse/nuxt'],
  devtools: { enabled: true },
});
