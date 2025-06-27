<script setup lang="ts">
</script>

<template>
  <a
    href="/"
    class="animate-fade-in mr-4 md:mr-2 lg:mr-6 flex items-center lg:space-x1 xl:space-x-2"
  >
    <VPImage
      alt="Logo"
      width="36"
      height="36"
      class="block"
      :image="{
        dark: '/sigma-ui-logo-white.png',
        light: '/sigma-ui-logo-black.png',
      }"
    />
    <span class="font-bold">
      SIGMA-UI
    </span>
  </a>
</template>
