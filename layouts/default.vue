<template>
  <div>
    <main>
      <Navbar />
      <div class="content">
        <slot />
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
main {
  max-width: 100vw;
  min-height: 100vh;
  height: 100%;
  background-color: $main-bg;
  font-family: $poppins;
}

.content {
  margin-top: 145px;
}
</style>
