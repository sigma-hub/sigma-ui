<script lang="ts" setup>
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@ui/registry/tailwind/ui/tooltip';
import { CheckIcon } from 'lucide-vue-next';
import type { Color } from '../types/colors';
import { colors } from '@/lib/registry';
import { useConfigStore } from '@/stores/config';

defineProps<{
  allColors: Color[];
}>();

const { config, setTheme } = useConfigStore();
</script>

<template>
  <div>
    <TooltipProvider
      v-for="(color, index) in allColors.slice(0, 4)"
      :key="index"
    >
      <Tooltip>
        <TooltipTrigger as-child>
          <button
            :key="index"
            class="flex h-[28px] w-[28px] items-center justify-center rounded-lg border-2 border-border text-xs"
            :class="
              color === config.theme
                ? 'border-primary'
                : 'border-transparent'
            "
            @click="setTheme(color)"
          >
            <span
              class="flex h-[20px] w-[20px] items-center justify-center rounded-sm"
              :style="{ backgroundColor: colors[color][6].rgb, opacity: 0.6 }"
            >
              <CheckIcon
                v-if="color === config.theme"
                class="h-4 w-4 text-white"
              />
            </span>
          </button>
        </TooltipTrigger>
        <TooltipContent
          align="center"
          :side-offset="1"
          class="capitalize bg-zinc-900 text-zinc-50"
        >
          {{ allColors[index] }}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
</template>
