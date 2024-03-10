module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    '@vue/typescript/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'prettier/prettier': ['error', { usePrettierrc: true }],
    'vue/html-indent': ['error', 2],
    'vue/multi-word-component-names': 'off',
    'vue/singleline-html-element-content-newline': 0,
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/no-v-html': 0,
    'vue/valid-v-slot': [
      'error',
      {
        allowModifiers: true,
      },
    ],
    quotes: ['error', 'single', { allowTemplateLiterals: true, avoidEscape: true }],
  },
  globals: {
    _: true,
  },
};
