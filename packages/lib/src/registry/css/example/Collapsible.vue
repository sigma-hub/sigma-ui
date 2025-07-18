<script setup lang="ts">
import { MinusIcon, PlusIcon } from 'lucide-vue-next';
import { ref } from 'vue';
import { Button } from '@ui/registry/css/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@ui/registry/css/ui/collapsible';

const isOpen = ref(false);
</script>

<template>
  <Collapsible
    v-model:open="isOpen"
    class="example-sigma-ui-collapsible"
  >
    <div class="example-sigma-ui-collapsible__header">
      <h4 class="example-sigma-ui-collapsible__title">
        Header
      </h4>
      <CollapsibleTrigger as-child>
        <Button
          variant="ghost"
          size="sm"
          class="example-sigma-ui-collapsible__trigger"
        >
          <MinusIcon
            v-if="isOpen"
            class="example-sigma-ui-collapsible__icon"
          />
          <PlusIcon
            v-else
            class="example-sigma-ui-collapsible__icon"
          />
          <span class="sr-only">Toggle</span>
        </Button>
      </CollapsibleTrigger>
    </div>
    <div class="example-sigma-ui-collapsible__component">
      Component 1
    </div>
    <CollapsibleContent class="example-sigma-ui-collapsible__content">
      <div class="example-sigma-ui-collapsible__component">
        Component 2
      </div>
      <div class="example-sigma-ui-collapsible__component">
        Component 3
      </div>
    </CollapsibleContent>
  </Collapsible>
</template>

<style>
.example-sigma-ui-collapsible {
  display: flex;
  width: 350px;
  flex-direction: column;
  gap: 0.5rem;
}

.example-sigma-ui-collapsible__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
}

.example-sigma-ui-collapsible__title {
  font-size: 0.875rem;
  font-weight: 600;
}

.example-sigma-ui-collapsible__trigger {
  width: 2.25rem;
  padding: 0;
}

.example-sigma-ui-collapsible__icon {
  width: 1rem;
  height: 1rem;
}

.example-sigma-ui-collapsible__component {
  padding: 0.75rem 1rem;
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
  font-family: var(--font-mono);
  font-size: 0.875rem;
}

.example-sigma-ui-collapsible__content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
