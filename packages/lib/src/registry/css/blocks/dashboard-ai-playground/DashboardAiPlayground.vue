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
@layer base, components;

@layer components {
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
    padding: calc(var(--spacing) * 4);
    gap: calc(var(--spacing) * 4);
  }

  @media (width >= 48rem) {
    .dashboard-ai-playground__main {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (width >= 64rem) {
    .dashboard-ai-playground__main {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
}
</style>
