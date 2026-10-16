<script setup lang="ts">
import { accountMenu, pageDescription, pageTitle, tasks, userMenuLabel } from './data';
import { columns } from './components/columns';
import TasksDataTable from './components/TasksDataTable.vue';
import UserMenu from './components/UserMenu.vue';
</script>

<template>
  <div class="tasks-table">
    <div class="tasks-table__header">
      <div>
        <h2 class="tasks-table__title">
          {{ pageTitle }}
        </h2>
        <p class="tasks-table__description">
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
.tasks-table {
  display: flex;
  height: 100%;
  flex: 1;
  flex-direction: column;
  padding: 2rem;
  gap: 2rem;
}

.tasks-table__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.tasks-table__title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 2rem;
}

.tasks-table__description {
  margin: 0;
  color: var(--muted-foreground);
}
</style>
