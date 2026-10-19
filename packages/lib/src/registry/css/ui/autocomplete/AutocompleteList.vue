<script setup lang="ts">
import { useAttrs } from 'vue';

import type { ComboboxContentEmits, ComboboxContentProps } from 'reka-ui';
import { AutocompleteContent, AutocompletePortal, AutocompleteViewport, useForwardPropsEmits } from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = withDefaults(defineProps<ComboboxContentProps>(), {
  position: 'popper',
  align: 'center',
  sideOffset: 4,
  collisionPadding: 8,
});
const emits = defineEmits<ComboboxContentEmits>();
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <AutocompletePortal>
    <AutocompleteContent
      data-slot="autocomplete-list"
      class="sigma-ui-autocomplete-list"
      v-bind="{ ...forwarded, ...delegatedAttrs() }"
      :class="[$attrs.class]"
    >
      <AutocompleteViewport>
        <slot />
      </AutocompleteViewport>
    </AutocompleteContent>
  </AutocompletePortal>
</template>

<style>
@layer components {
  .sigma-ui-autocomplete-list {
    z-index: 50;
    display: flex;
    overflow: hidden;
    width: var(--reka-combobox-trigger-width);
    min-width: calc(var(--spacing) * 32);
    max-height: min(var(--reka-combobox-content-available-height, 18rem), 18rem);
    flex-direction: column;
    padding: calc(var(--spacing) * 1);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background-color: var(--popover);
    box-shadow: var(--shadow-md);
    backdrop-filter: blur(var(--backdrop-filter-blur));
    color: var(--popover-foreground);
    outline: none;
    transform-origin: var(--reka-combobox-content-transform-origin);
  }

  .sigma-ui-autocomplete-list[data-state="open"] {
    animation: sigma-ui-autocomplete-in 150ms ease-out;
  }

  .sigma-ui-autocomplete-list[data-state="closed"] {
    animation: sigma-ui-autocomplete-out 150ms ease-in;
  }

  @keyframes sigma-ui-autocomplete-in {
    from {
      opacity: 0;
    }
  }

  @keyframes sigma-ui-autocomplete-out {
    to {
      opacity: 0;
    }
  }
}
</style>
