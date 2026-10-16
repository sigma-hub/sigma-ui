<script setup lang="ts">
import AppSidebar from './components/AppSidebar.vue';
import ChatPanel from './components/ChatPanel.vue';
import ConfigurationForm from './components/ConfigurationForm.vue';
import PlaygroundHeader from './components/PlaygroundHeader.vue';
</script>

<template>
  <div class="dashboard-ai-playground">
    <AppSidebar />
    <div class="dashboard-ai-playground__column">
      <PlaygroundHeader />
      <main class="dashboard-ai-playground__main">
        <ConfigurationForm />
        <ChatPanel />
      </main>
    </div>
  </div>
</template>

<style>
.dashboard-ai-playground {
  display: grid;
  width: 100%;
  height: 100vh;
  padding-left: 56px;
}

.dashboard-ai-playground__column {
  display: flex;
  min-width: 0;
  min-height: 0;
  flex-direction: column;
}

.dashboard-ai-playground__main {
  display: grid;
  overflow: auto;
  min-height: 0;
  flex: 1 1 0%;
  padding: 1rem;
  gap: 1rem;
}

@media (width >= 768px) {
  .dashboard-ai-playground__main {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (width >= 1024px) {
  .dashboard-ai-playground__main {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
