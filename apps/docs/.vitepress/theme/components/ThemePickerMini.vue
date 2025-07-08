<script lang="ts" setup>
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@ui/registry/tailwind/ui/tooltip';
import { CheckIcon } from 'lucide-vue-next';
import { baseColors } from '../../../src/lib/registry/colors';
import { colors } from '@/lib/registry';
import { useConfigStore } from '@/stores/config';

const { config, setTheme } = useConfigStore();
</script>

<template>
  <div>
    <TooltipProvider
      v-for="(color, index) in baseColors.filter(color => ['zinc', 'red', 'blue', 'green'].includes(color.name))"
      :key="index"
    >
      <Tooltip>
        <TooltipTrigger as-child>
          <button
            :key="index"
            class="flex h-[28px] w-[28px] items-center justify-center rounded-lg border-2 border-border text-xs"
            :class="
              color.name === config.theme
                ? 'border-primary'
                : 'border-transparent'
            "
            @click="setTheme(color.name)"
          >
            <span
              class="flex h-[20px] w-[20px] items-center justify-center rounded-sm"
              :style="{ backgroundColor: colors[color.name][6].rgb, opacity: 0.6 }"
            >
              <CheckIcon
                v-if="color.name === config.theme"
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
          {{ color.label }}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
</template>
