<script setup lang="ts">
import type { Component } from 'vue';

defineProps<{
  title: string;
  description?: string;
  icon?: Component;
  wide?: boolean;
}>();
</script>

<template>
  <div class="overflow-hidden rounded-lg border bg-card text-card-foreground">
    <div class="flex flex-wrap items-center justify-between gap-x-4 gap-y-4 p-4">
      <div class="flex min-w-0 flex-1 basis-48 items-center gap-4">
        <component
          :is="icon"
          v-if="icon"
          class="size-5 shrink-0 text-muted-foreground"
          aria-hidden="true"
        />
        <div class="flex min-w-0 flex-col gap-0.5">
          <div class="flex flex-wrap items-center gap-2">
            <h4 class="text-sm leading-5 font-semibold">
              {{ title }}
            </h4>
            <slot name="title-suffix" />
          </div>
          <p
            v-if="description"
            class="text-sm text-muted-foreground"
          >
            {{ description }}
          </p>
        </div>
      </div>
      <div
        class="flex shrink-0 items-center gap-2"
        :class="{ 'w-full sm:w-auto': wide }"
      >
        <slot />
      </div>
    </div>
    <div
      v-if="$slots.nested"
      class="flex flex-col gap-3 border-t bg-muted/40 px-4 py-3"
    >
      <slot name="nested" />
    </div>
  </div>
</template>
