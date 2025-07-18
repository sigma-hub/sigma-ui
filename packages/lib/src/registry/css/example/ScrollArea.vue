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
  width: 12rem;
  height: 18rem;
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
}

.example-sigma-ui-scroll-area__content {
  padding: 1rem;
}

.example-sigma-ui-scroll-area__heading {
  margin-bottom: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1;
}

.example-sigma-ui-scroll-area__tag {
  font-size: 0.875rem;
}

.example-sigma-ui-scroll-area__separator {
  margin: 0.5rem 0;
}
</style>
