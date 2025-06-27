<script setup lang="ts">
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@ui/registry/css/ui/resizable';
</script>

<template>
  <ResizablePanelGroup
    id="handle-demo-group-1"
    direction="horizontal"
    class="example-sigma-ui-resizable-handle"
  >
    <ResizablePanel
      id="handle-demo-panel-1"
      :default-size="25"
    >
      <div class="example-sigma-ui-resizable-handle__panel">
        <span class="example-sigma-ui-resizable-handle__text">Sidebar</span>
      </div>
    </ResizablePanel>
    <ResizableHandle
      id="handle-demo-handle-1"
      with-handle
    />
    <ResizablePanel
      id="handle-demo-panel-2"
      :default-size="75"
    >
      <div class="example-sigma-ui-resizable-handle__panel">
        <span class="example-sigma-ui-resizable-handle__text">Content</span>
      </div>
    </ResizablePanel>
  </ResizablePanelGroup>
</template>

<style>
.example-sigma-ui-resizable-handle {
  min-height: 200px;
  max-width: 28rem;
  border-radius: var(--radius);
  border: 1px solid hsl(var(--border));
}

.example-sigma-ui-resizable-handle__panel {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.example-sigma-ui-resizable-handle__text {
  font-weight: 600;
}
</style>
