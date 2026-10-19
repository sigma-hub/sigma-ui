<script setup lang="ts">
import AppSidebar from './components/AppSidebar.vue';
import ChatPanel from './components/ChatPanel.vue';
import ConfigurationForm from './components/ConfigurationForm.vue';
import PlaygroundHeader from './components/PlaygroundHeader.vue';
</script>

<template>
  <div class="grid h-screen w-full pl-[56px]">
    <AppSidebar />
    <div class="flex flex-col">
      <PlaygroundHeader />
      <main class="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
        <ConfigurationForm />
        <ChatPanel />
      </main>
    </div>
  </div>
</template>
