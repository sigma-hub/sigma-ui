<script setup lang="ts">
import { accountMenu, pageDescription, pageTitle, tasks, userMenuLabel } from './data';
import { columns } from './components/columns';
import TasksDataTable from './components/TasksDataTable.vue';
import UserMenu from './components/UserMenu.vue';
</script>

<template>
  <div class="flex h-full flex-1 flex-col gap-8 p-8">
    <div class="flex items-center justify-between gap-2">
      <div>
        <h2 class="text-2xl font-bold tracking-tight">
          {{ pageTitle }}
        </h2>
        <p class="text-muted-foreground">
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
