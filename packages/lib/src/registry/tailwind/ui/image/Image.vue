<script setup lang="ts">
import { nextTick, ref, watch, computed, useAttrs } from 'vue';
import { useForwardProps } from 'reka-ui';
import { ImageIcon, LoaderCircleIcon } from 'lucide-vue-next';
import { type ImageVariants, imageVariants } from '.';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

type Emits = {
  /** Emitted when the image finishes loading. */
  load: [];
  /** Emitted when the image fails to load. */
  error: [];
};

const props = withDefaults(defineProps<{
  /** Image URL; the fallback is shown when it is empty or fails to load. */
  src?: string;
  /** Alternative text for the image. */
  alt?: string;
  /** Renders a blurred, saturated copy of the image behind it as a glow effect. */
  glow?: boolean;
  /** Corner style of the image. */
  shape?: ImageVariants['shape'];
}>(), {
  alt: 'image',
  shape: 'rounded',
});

const emit = defineEmits<Emits>();

defineSlots<{
  /** Replaces the default "no photo" placeholder shown when the image is missing or fails to load. */
  fallback: () => any;
}>();

const forwardedProps = useForwardProps(props);

const isError = ref(false);
const isLoading = ref(true);

watch(() => props.src, (value) => {
  if (!value) {
    nextTick(() => {
      isError.value = true;
      isLoading.value = false;
    });
  } else {
    isError.value = false;
    isLoading.value = true;
  }
}, { immediate: true });

function onError() {
  emit('error');
  isError.value = true;
}

function onLoad() {
  emit('load');
  isError.value = false;
  isLoading.value = false;
}
</script>

<template>
  <div
    v-bind="delegatedAttrs"
    :class="[
      cn(imageVariants({ shape }), $attrs.class ?? ''),
      {
        'overflow-hidden': !glow,
      },
    ]"
    class="relative"
    data-slot="image"
  >
    <div
      v-if="isError"
      class="animate-fade-in flex items-center justify-center w-full h-full"
    >
      <slot name="fallback">
        <div
          class="flex flex-col gap-1 items-center justify-center text-foreground/50"
        >
          <ImageIcon class="w-[50%] max-w-[50px] h-[50%] max-h-[50px]" />
          no photo
        </div>
      </slot>
    </div>
    <div
      v-else
      class="flex items-center justify-center w-full h-full"
    >
      <div class="animate-fade-in">
        <LoaderCircleIcon
          v-if="isLoading"
          class="animate-spin w-[20px] h-[20px]"
        />
      </div>
      <img
        v-show="!isLoading"
        v-if="glow && !isError && props.src"
        class="z-1 animate-fade-in absolute left-0 top-[2%] w-full h-full scale-105 object-cover blur-lg brightness-200 saturate-200 dark:brightness-100 rounded-md"
        v-bind="forwardedProps"
        @error="onError"
        @load="onLoad"
      >
      <img
        v-show="!isLoading"
        v-if="!isError && props.src"
        class="z-2 relative animate-fade-in w-full h-full object-cover rounded-md"
        v-bind="forwardedProps"
        @error="onError"
        @load="onLoad"
      >
    </div>
  </div>
</template>
