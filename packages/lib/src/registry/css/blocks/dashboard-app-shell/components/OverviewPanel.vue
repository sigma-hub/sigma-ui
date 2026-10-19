<script setup lang="ts">
import type { ActivityItem, Highlight } from '../data';

defineProps<{
  highlights: Highlight[];
  activityTitle: string;
  activity: ActivityItem[];
}>();
</script>

<template>
  <div class="dashboard-app-shell__body">
    <div class="dashboard-app-shell__grid">
      <section
        v-for="highlight in highlights"
        :key="highlight.label"
        class="dashboard-app-shell__card"
      >
        <p class="dashboard-app-shell__card-label">
          {{ highlight.label }}
        </p>
        <p class="dashboard-app-shell__card-value">
          {{ highlight.value }}
        </p>
        <p class="dashboard-app-shell__card-detail">
          {{ highlight.detail }}
        </p>
      </section>
    </div>
    <section class="dashboard-app-shell__activity">
      <h2 class="dashboard-app-shell__activity-title">
        {{ activityTitle }}
      </h2>
      <ul class="dashboard-app-shell__activity-list">
        <li
          v-for="item in activity"
          :key="item.title"
          class="dashboard-app-shell__activity-item"
        >
          <span>{{ item.title }}</span>
          <span class="dashboard-app-shell__activity-detail">{{ item.detail }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<style>
@layer base, components;

@layer components {
  .dashboard-app-shell__body {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: calc(var(--spacing) * 4);
    gap: calc(var(--spacing) * 4);
  }

  .dashboard-app-shell__grid {
    display: grid;
    gap: calc(var(--spacing) * 4);
  }

  .dashboard-app-shell__card,
  .dashboard-app-shell__activity {
    padding: calc(var(--spacing) * 4);
    border: 1px solid var(--border);
    border-radius: calc(var(--radius) + 4px);
    background-color: var(--card);
    color: var(--card-foreground);
  }

  .dashboard-app-shell__card-label,
  .dashboard-app-shell__card-detail,
  .dashboard-app-shell__activity-detail {
    color: var(--muted-foreground);
  }

  .dashboard-app-shell__card-label,
  .dashboard-app-shell__activity-title {
    margin: 0;
    font-size: 0.875rem;
  }

  .dashboard-app-shell__card-value {
    margin: calc(var(--spacing) * 2) 0 0;
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: -0.025em;
  }

  .dashboard-app-shell__card-detail {
    margin: calc(var(--spacing) * 1) 0 0;
    font-size: 0.75rem;
  }

  .dashboard-app-shell__activity {
    flex: 1;
  }

  .dashboard-app-shell__activity-title {
    font-weight: 500;
  }

  .dashboard-app-shell__activity-list {
    display: grid;
    padding: 0;
    margin: calc(var(--spacing) * 4) 0 0;
    gap: calc(var(--spacing) * 3);
    list-style: none;
  }

  .dashboard-app-shell__activity-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.875rem;
    gap: calc(var(--spacing) * 4);
  }

  @media (width >= 48rem) {
    .dashboard-app-shell__grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}
</style>
