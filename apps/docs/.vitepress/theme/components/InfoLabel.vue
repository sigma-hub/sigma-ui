<script setup lang="ts">
type Props = {
  text: string;
};

const props = withDefaults(defineProps<Props>(), {
  text: 'Alpha',
});
</script>

<template>
  <span
    class="
      rounded-md text-white bg-[#4394b4] dark:bg-[#154e64] px-[6px] py-[2px] text-xs leading-none no-underline group-hover:no-underline
    "
  >
    {{ props.text }}
  </span>
</template>
