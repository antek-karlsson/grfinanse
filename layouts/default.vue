<template>
  <div>
    <main>
      <slot />
      <!-- TODO: Create footer component -->
      <!-- <Footer />  -->
    </main>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
main {
  max-width: 100vw;
  min-height: 100vh;
  background-color: $main-bg;
  font-family: $poppins;
}
</style>
