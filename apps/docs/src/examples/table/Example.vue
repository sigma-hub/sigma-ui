<script setup lang="ts">
import tasks from './data/tasks.json';
import DataTable from './components/DataTable.vue';
import UserNav from './components/UserNav.vue';
import { columns } from './components/columns';
import Card from '@ui/registry/tailwind/ui/card/Card.vue';
</script>

<template>
  <Card>
    <div class="flex h-full flex-1 flex-col space-y-8 p-8">
      <div class="flex items-center justify-between space-y-2">
        <div>
          <h2 class="text-2xl font-bold tracking-tight">
            Welcome back!
          </h2>
          <p class="text-muted-foreground">
            Here&apos;s a list of your tasks for this month!
          </p>
        </div>
        <div class="flex items-center space-x-2">
          <UserNav />
        </div>
      </div>
      <DataTable
        :data="tasks"
        :columns="columns"
      />
    </div>
  </Card>
</template>
