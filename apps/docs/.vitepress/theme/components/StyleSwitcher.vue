<script setup lang="ts">
import { useConfigStore } from '@/stores/config';
import { Tabs, TabsList, TabsTrigger } from '@ui/registry/tailwind/ui/tabs';

const { config } = useConfigStore();
</script>

<template>
  <Tabs
    v-model="config.styleSystem"
    default-value="tailwind"
  >
    <TabsList class="h-8">
      <TabsTrigger
        value="tailwind"
      >
        Tailwind
      </TabsTrigger>
      <TabsTrigger
        value="css"
      >
        CSS
      </TabsTrigger>
    </TabsList>
  </Tabs>
</template>
