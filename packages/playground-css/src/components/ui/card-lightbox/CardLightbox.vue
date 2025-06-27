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
          class="card-lightbox__card-content"
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
  margin: 0 auto;
  width: 100%;
  max-width: 990px;
  display: flex;
  flex-direction: column;
  container-type: inline-size;
}

.card-lightbox,
.card-lightbox * {
  box-sizing: border-box;
}

.card-lightbox__grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 20px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.card-lightbox__card {
  position: relative;
  padding: 0px;
  height: 420px;
  grid-column: span 4;
  box-sizing: border-box;
  overflow: hidden;
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
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, rgba(0, 0, 0, 0.95) -8%, rgba(0, 0, 0, 0) 30%);
  z-index: 1;
  pointer-events: none;
}

.theme-dark .card-lightbox__image-overlay {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.95) -8%, rgba(255, 255, 255, 0) 30%);
  z-index: 1;
  pointer-events: none;
}

.card-lightbox__expanded-container {
  width: 100%;
  height: 100%;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  top: 0;
  left: 0;
  right: 0;
  position: fixed;
  z-index: 51;
  overflow: hidden;
  padding: 40px 0;
  justify-content: center;
  align-items: center;
}

.card-lightbox__card-content,
.card-lightbox__expanded-content {
  pointer-events: auto;
  user-select: none;
  position: relative;
  border-radius: 20px;
  background: hsl(var(--card));
  overflow: hidden;
  width: 100%;
  height: 100%;
  margin: 0 auto;
}

.card-lightbox__expanded-content {
  width: unset;
  max-width: 700px;
  overflow: hidden;
  pointer-events: auto;
  overflow-y: auto;
  height: 70dvh;
}

.card-lightbox__card-image-container,
.card-lightbox__expanded-image-container {
  overflow: hidden;
  height: 420px;
  position: relative;
  width: 100%;
}

.card-lightbox__card-image,
.card-lightbox__expanded-image {
  z-index: 1;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  transform: none;
}

.card-lightbox__card-title-container {
  z-index: 2;
  position: absolute;
  top: 0px;
  left: 0px;
  max-width: 300px;
  padding: 20px;
  text-align: left;
}

.card-lightbox__expanded-title-container {
  z-index: 2;
  position: absolute;
  top: 0;
  left: 0;
  padding: 20px;
}

.card-lightbox__expanded-close-button {
  z-index: 2;
  position: absolute;
  top: 0;
  right: 0;
  padding: 20px;
  cursor: pointer;
}

.card-lightbox__card-title,
.card-lightbox__expanded-title {
  color: hsl(0 0% 100%);
  margin: 8px 0;
  font-size: 20px;
  font-weight: 600;
}

.card-lightbox__card-category,
.card-lightbox__expanded-category {
  color: hsl(0 0% 100%);
  background: hsl(0 0% 100% / 0.12);
  backdrop-filter: blur(8px);
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  text-transform: uppercase;
}

.theme-dark .card-lightbox__card-category,
.theme-dark .card-lightbox__expanded-category {
  background: hsl(240 10% 3.9% / 0.2);
}

.card-lightbox__expanded-overlay {
  inset: 0;
  z-index: 50;
  position: fixed;
  backdrop-filter: blur(12px);
  background: rgba(0, 0, 0, 0.2);
  will-change: opacity;
}

.card-lightbox__expanded-body {
  padding: 35px;
  max-width: 700px;
  width: 100vw;
}

.theme-dark .card-lightbox__card-category,
.theme-dark .card-lightbox__card-title,
.theme-dark .card-lightbox__expanded-title-container,
.theme-dark .card-lightbox__expanded-title,
.theme-dark .card-lightbox__expanded-category {
  color: hsl(240 10% 3.9% / 0.9);
}

.theme-dark svg {
  stroke: hsl(240 10% 3.9% / 0.9);
}

.theme-light svg {
  stroke: hsl(0 0% 100%);
}

.card-lightbox__expanded-body {
  color: hsl(var(--primary));
}

@media only screen and (max-width: 990px) {
  .card-lightbox__expanded-container {
    padding: 0;
  }

  .card-lightbox__expanded-content {
    overflow: hidden;
    pointer-events: auto;
    overflow-y: auto;
    width: 100vw;
    max-width: 100vw;
    height: 100dvh;
    border-radius: 0;
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
    padding-left: 10px;
    padding-right: 10px;
  }

  .card-lightbox__grid {
    gap: 10px;
    grid-template-columns: 1fr;
  }

  .card-lightbox__card {
    grid-column: auto / auto;
    height: 280px;
    width: 100%;
  }

  .card-lightbox__card:nth-child(4n + 1),
  .card-lightbox__card:nth-child(4n + 4) {
    grid-column: auto / auto;
  }

  .card-lightbox__card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    inset: 0;
  }
}
</style>
