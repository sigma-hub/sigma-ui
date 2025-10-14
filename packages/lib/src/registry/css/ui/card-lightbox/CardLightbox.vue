<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import type { Item } from './types';
import { XIcon } from 'lucide-vue-next';

type Props = {
  items: Item[];
};

const props = defineProps<Props>();

const openId = ref<string | null>(null);

onMounted(() => {
  document.addEventListener('keydown', handleEscKeydown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscKeydown);
});

function getTheme(id: string) {
  return props.items.find(item => item.id === id)?.theme;
}

function open(id: string) {
  openId.value = id;
}

function close() {
  openId.value = null;
}

function handleEscKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    close();
  }
}
</script>

<template>
  <div class="card-lightbox">
    <ul class="card-lightbox__grid">
      <motion.button
        v-for="card in props.items"
        :key="card.id"
        :data-open="openId === card.id"
        :class="[
          'card-lightbox__card',
          {
            'theme-dark': getTheme(card.id) === 'dark',
            'theme-light': getTheme(card.id) === 'light'
          }
        ]"
        @click="() => open(card.id)"
      >
        <motion.div
          class="card-lightbox__card-content animate-fade-in"
          :layout-id="`card-container-${card.id}`"
        >
          <motion.div
            class="card-lightbox__card-image-container"
            :layout-id="`card-image-container-${card.id}`"
          >
            <motion.img
              class="card-lightbox__card-image"
              :src="card.image"
              alt=""
            />
            <div class="card-lightbox__image-overlay" />
          </motion.div>
          <motion.div
            class="card-lightbox__card-title-container"
            :layout-id="`title-container-${card.id}`"
            layout="position"
          >
            <span class="card-lightbox__card-category">{{ card.category }}</span>
            <h2 class="card-lightbox__card-title">
              {{ card.title }}
            </h2>
          </motion.div>
        </motion.div>
      </motion.button>
    </ul>
    <AnimatePresence>
      <motion.div
        v-if="openId"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :exit="{ opacity: 0 }"
        :transition="{ duration: 0.2 }"
        style="pointer-events: auto"
        class="card-lightbox__expanded-overlay"
        @click="close"
      />
    </AnimatePresence>
    <AnimatePresence>
      <div
        v-if="openId"
        :class="[
          'card-lightbox__expanded-container',
          {
            'theme-dark': getTheme(openId) === 'dark',
            'theme-light': getTheme(openId) === 'light'
          }
        ]"
      >
        <motion.div
          class="card-lightbox__expanded-content"
          :layout-id="`card-container-${openId}`"
        >
          <motion.div
            class="card-lightbox__expanded-image-container"
            :layout-id="`card-image-container-${openId}`"
          >
            <motion.img
              class="card-lightbox__expanded-image"
              :src="props.items.find(item => item.id === openId)?.image"
              alt=""
              :layout-id="`card-image-${openId}`"
              :initial="{ opacity: 0, filter: 'blur(12px)' }"
              :animate="{ opacity: 1, filter: 'blur(0px)' }"
              :exit="{ opacity: 0, filter: 'blur(12px)' }"
              :transition="{ duration: 0.5 }"
            />
            <div class="card-lightbox__image-overlay" />
            <motion.div
              class="card-lightbox__expanded-title-container"
              :layout-id="`title-container-${openId}`"
              layout="position"
            >
              <span class="card-lightbox__expanded-category">{{ props.items.find(item => item.id === openId)?.category }}</span>
              <h2 class="card-lightbox__expanded-title">
                {{ props.items.find(item => item.id === openId)?.title }}
              </h2>
            </motion.div>
            <motion.div
              class="card-lightbox__expanded-close-button"
              @click="close"
            >
              <XIcon />
            </motion.div>
          </motion.div>
          <motion.div class="card-lightbox__expanded-body">
            <div v-html="props.items.find(item => item.id === openId)?.content" />
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  </div>
</template>

<style scoped>
.card-lightbox {
  display: flex;
  width: 100%;
  max-width: 990px;
  flex-direction: column;
  margin: 0 auto;
  container-type: inline-size;
}

.card-lightbox,
.card-lightbox * {
  box-sizing: border-box;
}

.card-lightbox__grid {
  display: grid;
  padding: 0;
  margin: 0;
  gap: 20px;
  grid-template-columns: repeat(10, 1fr);
  list-style: none;
}

.card-lightbox__card {
  position: relative;
  overflow: hidden;
  height: 420px;
  box-sizing: border-box;
  padding: 0;
  grid-column: span 4;
}

.card-lightbox__card:focus-visible {
  border-radius: 20px;
  box-shadow:
    0 0 0 2px hsl(var(--background)),
    0 0 0 4px hsl(var(--ring));
  outline: none;
}

.card-lightbox__card:nth-child(4n + 1),
.card-lightbox__card:nth-child(4n + 4) {
  grid-column: span 6;
}

.theme-light .card-lightbox__image-overlay {
  position: absolute;
  z-index: 1;
  background: linear-gradient(160deg, rgb(0 0 0 / 95%) -8%, rgb(0 0 0 / 0%) 30%);
  content: '';
  inset: 0;
  pointer-events: none;
}

.theme-dark .card-lightbox__image-overlay {
  position: absolute;
  z-index: 1;
  background: linear-gradient(160deg, rgb(255 255 255 / 95%) -8%, rgb(255 255 255 / 0%) 30%);
  content: '';
  inset: 0;
  pointer-events: none;
}

.card-lightbox__expanded-container {
  position: fixed;
  z-index: 51;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
  pointer-events: none;
}

.card-lightbox__card-content,
.card-lightbox__expanded-content {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  margin: 0 auto;
  background: hsl(var(--background));
  pointer-events: auto;
  user-select: none;
}

.card-lightbox__expanded-content {
  overflow: hidden;
  width: unset;
  max-width: 700px;
  height: 70dvh;
  overflow-y: auto;
  pointer-events: auto;
}

.card-lightbox__card-image-container,
.card-lightbox__expanded-image-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 420px;
}

.card-lightbox__card-image,
.card-lightbox__expanded-image {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
  transform: none;
}

.card-lightbox__card-title-container {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  max-width: 300px;
  padding: 20px;
  text-align: left;
}

.card-lightbox__expanded-title-container {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  padding: 20px;
}

.card-lightbox__expanded-close-button {
  position: absolute;
  z-index: 2;
  top: 0;
  right: 0;
  padding: 20px;
  cursor: pointer;
}

.card-lightbox__card-title,
.card-lightbox__expanded-title {
  margin: 8px 0;
  color: hsl(0deg 0% 100%);
  font-size: 20px;
  font-weight: 600;
}

.card-lightbox__card-category,
.card-lightbox__expanded-category {
  padding: 4px 8px;
  border-radius: 12px;
  backdrop-filter: blur(8px);
  background: hsl(0deg 0% 100% / 12%);
  color: hsl(0deg 0% 100%);
  font-size: 12px;
  text-transform: uppercase;
}

.theme-dark .card-lightbox__card-category,
.theme-dark .card-lightbox__expanded-category {
  background: hsl(240deg 10% 3.9% / 20%);
}

.card-lightbox__expanded-overlay {
  position: fixed;
  z-index: 50;
  backdrop-filter: blur(12px);
  background: rgb(0 0 0 / 20%);
  inset: 0;
  will-change: opacity;
}

.card-lightbox__expanded-body {
  width: 100vw;
  max-width: 700px;
  padding: 35px;
  color: hsl(var(--primary));
}

.theme-dark .card-lightbox__card-category,
.theme-dark .card-lightbox__card-title,
.theme-dark .card-lightbox__expanded-title-container,
.theme-dark .card-lightbox__expanded-title,
.theme-dark .card-lightbox__expanded-category {
  color: hsl(240deg 10% 3.9% / 90%);
}

.theme-dark svg {
  stroke: hsl(240deg 10% 3.9% / 90%);
}

.theme-light svg {
  stroke: hsl(0deg 0% 100%);
}

@media only screen and (width <= 990px) {
  .card-lightbox__expanded-container {
    padding: 0;
  }

  .card-lightbox__expanded-content {
    overflow: hidden;
    width: 100vw;
    max-width: 100vw;
    height: 100dvh;
    border-radius: 0;
    overflow-y: auto;
    pointer-events: auto;
  }

  .card-lightbox__card-image-container,
  .card-lightbox__expanded-image-container {
    height: 280px;
  }
}

@container (max-width: 600px) {
  #sandbox {
    align-items: stretch;
  }

  .card-lightbox {
    padding: 60px 20px;
    padding-right: 10px;
    padding-left: 10px;
  }

  .card-lightbox__grid {
    gap: 10px;
    grid-template-columns: 1fr;
  }

  .card-lightbox__card {
    width: 100%;
    height: 280px;
    grid-column: auto / auto;
  }

  .card-lightbox__card:nth-child(4n + 1),
  .card-lightbox__card:nth-child(4n + 4) {
    grid-column: auto / auto;
  }

  .card-lightbox__card-image {
    position: absolute;
    width: 100%;
    height: 100%;
    inset: 0;
    object-fit: cover;
  }
}
</style>
