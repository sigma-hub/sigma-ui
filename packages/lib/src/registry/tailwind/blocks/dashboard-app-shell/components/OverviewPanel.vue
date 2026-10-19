<script setup lang="ts">
import type { ActivityItem, Highlight } from '../data';

defineProps<{
  highlights: Highlight[];
  activityTitle: string;
  activity: ActivityItem[];
}>();
</script>

<template>
  <div class="flex flex-1 flex-col gap-4 p-4">
    <div class="grid gap-4 md:grid-cols-3">
      <section
        v-for="highlight in highlights"
        :key="highlight.label"
        class="rounded-xl border bg-card p-4 text-card-foreground"
      >
        <p class="text-sm text-muted-foreground">
          {{ highlight.label }}
        </p>
        <p class="mt-2 text-2xl font-semibold tracking-tight">
          {{ highlight.value }}
        </p>
        <p class="mt-1 text-xs text-muted-foreground">
          {{ highlight.detail }}
        </p>
      </section>
    </div>
    <section class="flex-1 rounded-xl border bg-card p-4 text-card-foreground">
      <h2 class="text-sm font-medium">
        {{ activityTitle }}
      </h2>
      <ul class="mt-4 grid gap-3">
        <li
          v-for="item in activity"
          :key="item.title"
          class="flex items-center justify-between gap-4 text-sm"
        >
          <span>{{ item.title }}</span>
          <span class="text-muted-foreground">{{ item.detail }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>
