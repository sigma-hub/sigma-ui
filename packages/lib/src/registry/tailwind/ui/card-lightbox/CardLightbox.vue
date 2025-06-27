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
  <div class="mx-auto w-full max-w-[990px] flex flex-col @container/card-lightbox">
    <ul class="grid grid-cols-1 gap-2.5 p-0 m-0 list-none @lg/card-lightbox:grid-cols-10 @lg/card-lightbox:gap-5">
      <motion.button
        v-for="card in props.items"
        :key="card.id"
        :data-open="openId === card.id"
        :class="[
          'relative p-0 overflow-hidden focus-visible:rounded-[20px] focus-visible:shadow-[0_0_0_2px_hsl(var(--background)),_0_0_0_4px_hsl(var(--ring))] focus-visible:outline-none',
          'h-[280px] w-full col-span-1',
          '@lg/card-lightbox:h-[420px]',
          card.theme === 'dark' ? 'group theme-dark' : '',
          (props.items.findIndex(item => item.id === card.id) + 1) % 4 === 1 || (props.items.findIndex(item => item.id === card.id) + 1) % 4 === 0
            ? '@lg/card-lightbox:col-span-6'
            : '@lg/card-lightbox:col-span-4',
        ]"
        @click="() => open(card.id)"
      >
        <motion.div
          class="relative pointer-events-auto select-none rounded-[20px] bg-card overflow-hidden w-full h-full m-auto animate-fade-in"
          :layout-id="`card-container-${card.id}`"
        >
          <motion.div
            class="relative overflow-hidden h-full w-full"
            :layout-id="`card-image-container-${card.id}`"
          >
            <motion.img
              class="absolute inset-0 z-10 w-full h-full object-cover pointer-events-none"
              :src="card.image"
              alt=""
            />
            <div
              :class="[
                'absolute inset-0 z-10 pointer-events-none',
                card.theme === 'dark'
                  ? 'bg-linear-[160deg,rgba(255,255,255,0.95)_-8%,rgba(255,255,255,0)_30%]'
                  : 'bg-linear-[160deg,rgba(0,0,0,0.95)_-8%,rgba(0,0,0,0)_30%]'
              ]"
            />
          </motion.div>
          <motion.div
            class="absolute top-0 left-0 z-20 max-w-[300px] p-5 text-left"
            :layout-id="`title-container-${card.id}`"
            layout="position"
          >
            <span
              :class="[
                'px-2 py-1 rounded-[12px] text-[12px] uppercase backdrop-blur-[8px]',
                'text-white bg-white/10 group-[.theme-dark]:text-black/90 group-[.theme-dark]:bg-black/10'
              ]"
            >
              {{ card.category }}
            </span>
            <h2
              :class="[
                'my-2 text-[20px] font-semibold',
                'text-white group-[.theme-dark]:text-black/90'
              ]"
            >
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
        class="fixed inset-0 z-50 backdrop-blur-[12px] bg-black/20 [will-change:opacity]"
        @click="close"
      />
    </AnimatePresence>
    <AnimatePresence>
      <div
        v-if="openId"
        :class="[
          'fixed inset-0 z-[51] w-full h-full pointer-events-none flex flex-col justify-center items-center p-0 lg:p-[40px_0]',
          props.items.find(item => item.id === openId)?.theme === 'dark' ? 'group theme-dark' : '',
        ]"
      >
        <motion.div
          class="relative pointer-events-auto select-none bg-card overflow-hidden m-auto overflow-y-auto w-screen max-w-full h-screen rounded-none lg:w-auto lg:max-w-[700px] lg:h-[70dvh] lg:rounded-[20px]"
          :layout-id="`card-container-${openId}`"
        >
          <motion.div
            class="relative overflow-hidden w-full h-[280px] lg:h-[420px]"
            :layout-id="`card-image-container-${openId}`"
          >
            <motion.img
              class="absolute inset-0 z-10 w-full h-full object-cover pointer-events-none"
              :src="props.items.find(item => item.id === openId)?.image"
              alt=""
              :layout-id="`card-image-${openId}`"
              :initial="{ opacity: 0, filter: 'blur(12px)' }"
              :animate="{ opacity: 1, filter: 'blur(0px)' }"
              :exit="{ opacity: 0, filter: 'blur(12px)' }"
              :transition="{ duration: 0.5 }"
            />
            <div
              :class="[
                'absolute inset-0 z-10 pointer-events-none',
                props.items.find(item => item.id === openId)?.theme === 'dark'
                  ? 'bg-linear-[160deg,rgba(255,255,255,0.95)_-8%,rgba(255,255,255,0)_30%]'
                  : 'bg-linear-[160deg,rgba(0,0,0,0.95)_-8%,rgba(0,0,0,0)_30%]'
              ]"
            />
            <motion.div
              class="absolute top-0 left-0 z-20 p-5"
              :layout-id="`title-container-${openId}`"
              layout="position"
            >
              <span
                :class="[
                  'px-2 py-1 rounded-[12px] text-[12px] uppercase backdrop-blur-[8px]',
                  'text-white bg-white/10 group-[.theme-dark]:text-black/90 group-[.theme-dark]:bg-black/10'
                ]"
              >
                {{ props.items.find(item => item.id === openId)?.category }}
              </span>
              <h2
                :class="[
                  'my-2 text-[20px] font-semibold',
                  'text-white group-[.theme-dark]:text-black/90'
                ]"
              >
                {{ props.items.find(item => item.id === openId)?.title }}
              </h2>
            </motion.div>
            <motion.div
              class="absolute top-0 right-0 z-20 p-5 cursor-pointer"
              @click="close"
            >
              <XIcon class="stroke-white group-[.theme-dark]:stroke-black/90" />
            </motion.div>
          </motion.div>
          <motion.div
            class="p-[35px] max-w-[700px] w-screen text-primary"
          >
            <div v-html="props.items.find(item => item.id === openId)?.content" />
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  </div>
</template>
