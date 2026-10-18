<script setup lang="ts">
import { computed, nextTick, useAttrs, useTemplateRef } from 'vue';
import { ChevronDownIcon } from 'lucide-vue-next';
import { Button, type ButtonVariants } from '@ui/registry/css/ui/button';
import { useCodeBlockContext } from '@ui/registry/shared/ui/code-block/code-block-state';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = withDefaults(defineProps<{
  /** Text while the block is collapsed. */
  expandLabel?: string;
  /** Text while the block is expanded. */
  collapseLabel?: string;
  /** Visual style of the button. */
  variant?: ButtonVariants['variant'];
  /** Size of the button. */
  size?: ButtonVariants['size'];
}>(), {
  expandLabel: 'Show more',
  collapseLabel: 'Show less',
  variant: 'ghost',
  size: 'xs',
});

defineSlots<{
  /** Replaces the label and the chevron. */
  default?: (props: { expanded: boolean }) => unknown;
}>();

const context = useCodeBlockContext();
const expanded = computed(() => context?.expanded.value ?? false);
const button = useTemplateRef<{ $el?: HTMLElement }>('button');

async function toggle() {
  if (!context) {
    return;
  }

  const collapsing = expanded.value;
  context.setExpanded(!collapsing);

  if (collapsing) {
    await nextTick();
    const block = button.value?.$el?.closest?.('[data-slot="code-block"]');
    block?.scrollIntoView({ block: 'nearest' });
  }
}
</script>

<template>
  <Button
    v-if="context?.collapsible.value"
    ref="button"
    data-slot="code-block-expand-button"
    v-bind="delegatedAttrs()"
    type="button"
    :data-state="expanded ? 'open' : 'closed'"
    :variant="props.variant"
    :size="props.size"
    :aria-expanded="expanded"
    :aria-controls="context.contentId.value"
    class="sigma-ui-code-block__expand-button"
    :class="[$attrs.class]"
    @click="toggle"
  >
    <slot :expanded="expanded">
      {{ expanded ? props.collapseLabel : props.expandLabel }}
      <ChevronDownIcon
        class="sigma-ui-code-block__expand-icon"
        aria-hidden="true"
      />
    </slot>
  </Button>
</template>

<style>
.sigma-ui-code-block__expand-button {
  color: var(--muted-foreground);
}

.sigma-ui-code-block__expand-button:hover {
  color: var(--foreground);
}

.sigma-ui-code-block__expand-icon {
  transition: transform 150ms ease;
}

.sigma-ui-code-block__expand-button[data-state='open'] .sigma-ui-code-block__expand-icon {
  transform: rotate(180deg);
}

@media (prefers-reduced-motion: reduce) {
  .sigma-ui-code-block__expand-icon {
    transition: none;
  }
}
</style>
