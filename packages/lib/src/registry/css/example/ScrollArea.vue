<script setup lang="ts">
import { ScrollArea } from '@ui/registry/css/ui/scroll-area';
import { Separator } from '@ui/registry/css/ui/separator';

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`,
);
</script>

<template>
  <ScrollArea class="example-sigma-ui-scroll-area">
    <div class="example-sigma-ui-scroll-area__content">
      <h4 class="example-sigma-ui-scroll-area__heading">
        Tags
      </h4>

      <div
        v-for="tag in tags"
        :key="tag"
        class="example-sigma-ui-scroll-area__tag-container"
      >
        <div class="example-sigma-ui-scroll-area__tag">
          {{ tag }}
        </div>
        <Separator class="example-sigma-ui-scroll-area__separator" />
      </div>
    </div>
  </ScrollArea>
</template>

<style>
.example-sigma-ui-scroll-area {
  width: calc(var(--spacing) * 48);
  height: calc(var(--spacing) * 72);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

.example-sigma-ui-scroll-area__content {
  padding: calc(var(--spacing) * 4);
}

.example-sigma-ui-scroll-area__heading {
  margin-bottom: calc(var(--spacing) * 4);
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1;
}

.example-sigma-ui-scroll-area__tag {
  font-size: 0.875rem;
}

.example-sigma-ui-scroll-area__separator {
  margin: calc(var(--spacing) * 2) 0;
}
</style>
