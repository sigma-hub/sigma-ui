<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';
import { useForwardProps } from 'reka-ui';
import { ImageIcon, LoaderCircleIcon } from 'lucide-vue-next';
import { type ImageVariants, imageVariants } from '.';

type Emits = {
  load: [];
  error: [];
};

const props = withDefaults(defineProps<{
  src?: string;
  alt?: string;
  glow?: boolean;

  shape?: ImageVariants['shape'];
}>(), {
  alt: 'image',
  shape: 'rounded',
});

const emit = defineEmits<Emits>();

defineSlots<{
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
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: normal;
  color: hsl(var(--foreground));
  user-select: none;
  flex-shrink: 0;
  background-color: hsl(var(--secondary) / 90%);
}

.dark .sigma-ui-image {
  background-color: hsl(var(--secondary) / 30%);
}

.sigma-ui-image--no-overflow {
  overflow: hidden;
}

.sigma-ui-image__error,
.sigma-ui-image__loader {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.sigma-ui-image__fallback-container {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-items: center;
  justify-content: center;
  color: hsl(var(--foreground) / 50%);
}

.sigma-ui-image__fallback-icon {
  width: 50%;
  max-width: 50px;
  height: 50%;
  max-height: 50px;
}

.sigma-ui-image__spinner {
  animation: spin 1s linear infinite;
  width: 20px;
  height: 20px;
}

.sigma-ui-image__img-glow {
  width: 110%;
  height: 110%;
  object-fit: cover;
  position: absolute;
  left: 0;
  top: 0;
  filter: blur(16px) brightness(200%) saturate(200%);
  z-index: 1;
}

.sigma-ui-image__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: relative;
  z-index: 2;
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
