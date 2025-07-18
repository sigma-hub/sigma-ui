<script setup lang="ts">
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@ui/registry/css/ui/resizable';
</script>

<template>
  <ResizablePanelGroup
    id="vertical-demo-group-1"
    direction="vertical"
    class="example-sigma-ui-resizable-vertical"
  >
    <ResizablePanel
      id="vertical-demo-panel-1"
      :default-size="25"
    >
      <div class="example-sigma-ui-resizable-vertical__panel">
        <span class="example-sigma-ui-resizable-vertical__text">Header</span>
      </div>
    </ResizablePanel>
    <ResizableHandle id="vertical-demo-handle-1" />
    <ResizablePanel
      id="vertical-demo-panel-2"
      :default-size="75"
    >
      <div class="example-sigma-ui-resizable-vertical__panel">
        <span class="example-sigma-ui-resizable-vertical__text">Content</span>
      </div>
    </ResizablePanel>
  </ResizablePanelGroup>
</template>

<style>
.example-sigma-ui-resizable-vertical {
  max-width: 28rem;
  min-height: 200px;
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
}

.example-sigma-ui-resizable-vertical__panel {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.example-sigma-ui-resizable-vertical__text {
  font-weight: 600;
}
</style>
