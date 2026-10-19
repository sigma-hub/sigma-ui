<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { WrapTextIcon } from '@lucide/vue';
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
  /** Accessible name of the toggle. Its pressed state is announced separately. */
  label?: string;
  /** Visual style of the button. */
  variant?: ButtonVariants['variant'];
  /** Size of the button. */
  size?: ButtonVariants['size'];
}>(), {
  label: 'Wrap lines',
  variant: 'ghost',
  size: 'icon-xs',
});

defineSlots<{
  /** Replaces the wrap icon. */
  default?: (props: { wrap: boolean }) => unknown;
}>();

const context = useCodeBlockContext();
const wrap = computed(() => context?.wrap.value ?? false);

function toggle() {
  context?.setWrap(!wrap.value);
}
</script>

<template>
  <Button
    data-slot="code-block-wrap-button"
    v-bind="delegatedAttrs()"
    type="button"
    :data-state="wrap ? 'on' : 'off'"
    :variant="props.variant"
    :size="props.size"
    :aria-label="props.label"
    :aria-pressed="wrap"
    :disabled="!context || $attrs.disabled"
    class="sigma-ui-code-block__wrap-button"
    :class="[$attrs.class]"
    @click="toggle"
  >
    <slot :wrap="wrap">
      <WrapTextIcon aria-hidden="true" />
    </slot>
  </Button>
</template>

<style>
@layer components {
  .sigma-ui-code-block__wrap-button {
    color: var(--muted-foreground);
  }

  .sigma-ui-code-block__wrap-button:hover,
  .sigma-ui-code-block__wrap-button[data-state='on'] {
    color: var(--foreground);
  }

  .sigma-ui-code-block__wrap-button[data-state='on'] {
    background-color: var(--accent);
  }
}
</style>
