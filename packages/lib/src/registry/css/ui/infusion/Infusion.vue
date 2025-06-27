<script setup lang="ts">
interface Props {
  src: string;
}

const props = withDefaults(defineProps<Props>(), {
  src: '',
});
</script>

<template>
  <img
    class="fixed z-[100] top-0 left-0 w-[100vw] h-[100vh] opacity-20 dark:opacity-30 pointer-events-none object-cover"
    :src="props.src"
  >
</template>
