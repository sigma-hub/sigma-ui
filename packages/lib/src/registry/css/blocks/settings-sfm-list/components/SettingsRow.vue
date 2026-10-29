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
  <div class="settings-sfm-list__row">
    <div class="settings-sfm-list__row-main">
      <div class="settings-sfm-list__row-header">
        <component
          :is="icon"
          v-if="icon"
          class="settings-sfm-list__row-icon"
          aria-hidden="true"
        />
        <div class="settings-sfm-list__row-text">
          <div class="settings-sfm-list__row-title-row">
            <h4 class="settings-sfm-list__row-title">
              {{ title }}
            </h4>
            <slot name="title-suffix" />
          </div>
          <p
            v-if="description"
            class="settings-sfm-list__row-description"
          >
            {{ description }}
          </p>
        </div>
      </div>
      <div
        class="settings-sfm-list__row-control"
        :class="{ 'settings-sfm-list__row-control--wide': wide }"
      >
        <slot />
      </div>
    </div>
    <div
      v-if="$slots.nested"
      class="settings-sfm-list__row-nested"
    >
      <slot name="nested" />
    </div>
  </div>
</template>

<style>
@layer base, components;

@layer components {
  .settings-sfm-list__row {
    overflow: hidden;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    background-color: var(--card);
    color: var(--card-foreground);
  }

  .settings-sfm-list__row-main {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding: calc(var(--spacing) * 4);
    gap: calc(var(--spacing) * 4);
  }

  .settings-sfm-list__row-header {
    display: flex;
    min-width: 0;
    flex: 1;
    flex-basis: calc(var(--spacing) * 48);
    align-items: center;
    gap: calc(var(--spacing) * 4);
  }

  .settings-sfm-list__row-icon {
    width: calc(var(--spacing) * 5);
    height: calc(var(--spacing) * 5);
    flex-shrink: 0;
    color: var(--muted-foreground);
  }

  .settings-sfm-list__row-text {
    display: flex;
    min-width: 0;
    flex-direction: column;
    gap: calc(var(--spacing) * 0.5);
  }

  .settings-sfm-list__row-title-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: calc(var(--spacing) * 2);
  }

  .settings-sfm-list__row-title {
    margin: 0;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.25rem;
  }

  .settings-sfm-list__row-description {
    margin: 0;
    color: var(--muted-foreground);
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  .settings-sfm-list__row-control {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    gap: calc(var(--spacing) * 2);
  }

  .settings-sfm-list__row-control--wide {
    width: 100%;
  }

  @media (width >= 40rem) {
    .settings-sfm-list__row-control--wide {
      width: auto;
    }
  }

  .settings-sfm-list__row-nested {
    display: flex;
    flex-direction: column;
    padding: calc(var(--spacing) * 3) calc(var(--spacing) * 4);
    border-top: 1px solid var(--border);
    background-color: color-mix(in oklch, var(--muted) 40%, transparent);
    gap: calc(var(--spacing) * 3);
  }
}
</style>
