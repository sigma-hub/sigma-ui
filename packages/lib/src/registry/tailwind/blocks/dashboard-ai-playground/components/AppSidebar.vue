<script setup lang="ts">
import { TriangleIcon } from 'lucide-vue-next';
import { Button } from '@ui/registry/tailwind/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@ui/registry/tailwind/ui/tooltip';
import { primaryNavItems, secondaryNavItems } from '../data';
</script>

<template>
  <aside class="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
    <div class="border-b p-2">
      <Button
        variant="outline"
        size="icon"
        aria-label="Home"
      >
        <TriangleIcon class="size-5 fill-foreground" />
      </Button>
    </div>
    <nav class="grid gap-1 p-2">
      <TooltipProvider
        v-for="item in primaryNavItems"
        :key="item.label"
      >
        <Tooltip>
          <TooltipTrigger as-child>
            <Button
              variant="ghost"
              size="icon"
              :class="['rounded-lg', { 'bg-muted': item.isActive }]"
              :aria-label="item.label"
            >
              <component
                :is="item.icon"
                class="size-5"
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent
            side="right"
            :side-offset="5"
          >
            {{ item.label }}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </nav>
    <nav class="mt-auto grid gap-1 p-2">
      <TooltipProvider
        v-for="item in secondaryNavItems"
        :key="item.label"
      >
        <Tooltip>
          <TooltipTrigger as-child>
            <Button
              variant="ghost"
              size="icon"
              class="mt-auto rounded-lg"
              :aria-label="item.label"
            >
              <component
                :is="item.icon"
                class="size-5"
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent
            side="right"
            :side-offset="5"
          >
            {{ item.label }}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </nav>
  </aside>
</template>
