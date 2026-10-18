<script setup lang="ts">
import { nextTick, ref, watch, useAttrs } from 'vue';
import { useForwardProps } from 'reka-ui';
import { ImageIcon, LoaderCircleIcon } from 'lucide-vue-next';
import { type ImageVariants, imageVariants } from '.';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

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
    data-slot="image"
    v-bind="delegatedAttrs()"
    :class="[
      $attrs.class ?? '',
      imageVariants({ shape }),
      {
        'sigma-ui-image--no-overflow': !glow,
      },
    ]"
    class="sigma-ui-image__container"
  >
    <div
      v-if="isError"
      class="sigma-ui-image__error animate-fade-in"
    >
      <slot name="fallback">
        <div
          class="sigma-ui-image__fallback-container"
        >
          <ImageIcon class="sigma-ui-image__fallback-icon" />
          no photo
        </div>
      </slot>
    </div>
    <div
      v-else
      class="sigma-ui-image__loader"
    >
      <div class="animate-fade-in">
        <LoaderCircleIcon
          v-if="isLoading"
          class="sigma-ui-image__spinner"
        />
      </div>
      <img
        v-show="!isLoading"
        v-if="glow && !isError && props.src"
        class="sigma-ui-image__img-glow animate-fade-in"
        v-bind="forwardedProps"
        @error="onError"
        @load="onLoad"
      >

      <img
        v-show="!isLoading"
        v-if="!isError && props.src"
        class="sigma-ui-image__img animate-fade-in"
        v-bind="forwardedProps"
        @error="onError"
        @load="onLoad"
      >
    </div>
  </div>
</template>

<style>
.sigma-ui-image__container {
  position: relative;
}

.sigma-ui-image {
  display: flex;
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  background-color: color-mix(in oklch, var(--secondary) 90%, transparent);
  color: var(--foreground);
  font-weight: normal;
  user-select: none;
}

.dark .sigma-ui-image {
  background-color: color-mix(in oklch, var(--secondary) 30%, transparent);
}

.sigma-ui-image--no-overflow {
  overflow: hidden;
}

.sigma-ui-image__error,
.sigma-ui-image__loader {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
}

.sigma-ui-image__fallback-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: color-mix(in oklch, var(--foreground) 50%, transparent);
  gap: calc(var(--spacing) * 1);
}

.sigma-ui-image__fallback-icon {
  width: 50%;
  max-width: 50px;
  height: 50%;
  max-height: 50px;
}

.sigma-ui-image__spinner {
  width: 20px;
  height: 20px;
  animation: sigma-ui-spin 1s linear infinite;
}

@keyframes sigma-ui-spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.sigma-ui-image__img-glow {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 110%;
  height: 110%;
  filter: blur(16px) brightness(200%) saturate(200%);
  object-fit: cover;
}

.sigma-ui-image__img {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (prefers-color-scheme: dark) {
  .sigma-ui-image__img-glow {
    filter: blur(16px) brightness(100%) saturate(200%);
  }
}

.sigma-ui-image-rounded,
.sigma-ui-image-rounded .sigma-ui-image__img,
.sigma-ui-image-rounded .sigma-ui-image__img-glow {
  border-radius: var(--radius);
}

.sigma-ui-image-circle,
.sigma-ui-image-circle .sigma-ui-image__img,
.sigma-ui-image-circle .sigma-ui-image__img-glow {
  border-radius: 50%;
}
</style>
