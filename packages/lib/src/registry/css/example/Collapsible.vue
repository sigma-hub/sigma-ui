<script setup lang="ts">
import { MinusIcon, PlusIcon } from '@lucide/vue';
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
          <span class="sigma-ui-sr-only">Toggle</span>
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
@layer components {
  .example-sigma-ui-collapsible {
    display: flex;
    width: 350px;
    flex-direction: column;
    gap: calc(var(--spacing) * 2);
  }

  .example-sigma-ui-collapsible__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 calc(var(--spacing) * 4);
  }

  .example-sigma-ui-collapsible__title {
    font-size: 0.875rem;
    font-weight: 600;
  }

  .example-sigma-ui-collapsible__trigger {
    width: calc(var(--spacing) * 9);
    padding: 0;
  }

  .example-sigma-ui-collapsible__icon {
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
  }

  .example-sigma-ui-collapsible__component {
    padding: calc(var(--spacing) * 3) calc(var(--spacing) * 4);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    font-family: var(--font-mono);
    font-size: 0.875rem;
  }

  .example-sigma-ui-collapsible__content {
    display: flex;
    flex-direction: column;
    gap: calc(var(--spacing) * 2);
  }

  .sigma-ui-sr-only {
    position: absolute;
    overflow: hidden;
    width: 1px;
    height: 1px;
    padding: 0;
    border-width: 0;
    margin: -1px;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
  }
}
</style>
