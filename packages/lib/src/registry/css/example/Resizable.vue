<script setup lang="ts">
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@ui/registry/css/ui/resizable';
</script>

<template>
  <ResizablePanelGroup
    id="demo-group-1"
    direction="horizontal"
    class="example-sigma-ui-resizable"
  >
    <ResizablePanel
      id="demo-panel-1"
      :default-size="50"
    >
      <div class="example-sigma-ui-resizable__panel">
        <span class="example-sigma-ui-resizable__text">One</span>
      </div>
    </ResizablePanel>
    <ResizableHandle id="demo-handle-1" />
    <ResizablePanel
      id="demo-panel-2"
      :default-size="50"
    >
      <ResizablePanelGroup
        id="demo-group-2"
        direction="vertical"
        class="example-sigma-ui-resizable__nested-group"
      >
        <ResizablePanel
          id="demo-panel-3"
          :default-size="25"
        >
          <div class="example-sigma-ui-resizable__panel">
            <span class="example-sigma-ui-resizable__text">Two</span>
          </div>
        </ResizablePanel>
        <ResizableHandle id="demo-handle-2" />
        <ResizablePanel
          id="demo-panel-4"
          :default-size="75"
        >
          <div class="example-sigma-ui-resizable__panel">
            <span class="example-sigma-ui-resizable__text">Three</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </ResizablePanel>
  </ResizablePanelGroup>
</template>

<style>
.example-sigma-ui-resizable {
  max-width: 28rem;
  min-height: 200px;
  border-radius: var(--radius);
  border: 1px solid hsl(var(--border));
}

.example-sigma-ui-resizable__nested-group {
  height: 100%;
}

.example-sigma-ui-resizable__panel {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  height: 100%;
}

.example-sigma-ui-resizable__text {
  font-weight: 600;
}
</style>
