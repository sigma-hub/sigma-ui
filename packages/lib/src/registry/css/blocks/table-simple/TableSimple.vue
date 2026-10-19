<script setup lang="ts">
import { accountMenu, pageDescription, pageTitle, tasks, userMenuLabel } from './data';
import { columns } from './components/columns';
import TasksDataTable from './components/TasksDataTable.vue';
import UserMenu from './components/UserMenu.vue';
</script>

<template>
  <div class="table-simple">
    <div class="table-simple__header">
      <div>
        <h2 class="table-simple__title">
          {{ pageTitle }}
        </h2>
        <p class="table-simple__description">
          {{ pageDescription }}
        </p>
      </div>
      <UserMenu
        :entries="accountMenu"
        :trigger-label="userMenuLabel"
      />
    </div>
    <TasksDataTable
      :data="tasks"
      :columns="columns"
    />
  </div>
</template>

<style>
@layer base, components;

@layer components {
  .table-simple {
    display: flex;
    min-height: 100%;
    flex: 1;
    flex-direction: column;
    padding: calc(var(--spacing) * 8);
    gap: calc(var(--spacing) * 8);
  }

  .table-simple__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: calc(var(--spacing) * 2);
  }

  .table-simple__title {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: -0.025em;
    line-height: 2rem;
  }

  .table-simple__description {
    margin: 0;
    color: var(--muted-foreground);
  }
}
</style>
