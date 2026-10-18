<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue';
import { useClipboard, useTimeoutFn } from '@vueuse/core';
import { CheckIcon, CopyIcon } from '@lucide/vue';
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
  /** Text to copy. Defaults to the code of the `CodeBlockContent` in the same block, without diff markers and removed lines. */
  value?: string;
  /** How long the copied state lasts, in milliseconds. */
  timeout?: number;
  /** Accessible name of the button. */
  label?: string;
  /** Accessible name and announcement after a successful copy. */
  copiedLabel?: string;
  /** Announcement when the clipboard rejects the copy. */
  errorLabel?: string;
  /** Visual style of the button. */
  variant?: ButtonVariants['variant'];
  /** Size of the button. */
  size?: ButtonVariants['size'];
}>(), {
  value: undefined,
  timeout: 2000,
  label: 'Copy',
  copiedLabel: 'Copied',
  errorLabel: 'Copy failed',
  variant: 'ghost',
  size: 'icon-xs',
});

const emits = defineEmits<{
  /** Emitted after the text is written to the clipboard. */
  copy: [value: string];
  /** Emitted when the clipboard rejects the copy. */
  error: [error: unknown];
}>();

defineSlots<{
  /** Replaces the copy and check icons. */
  default?: (props: { copied: boolean }) => unknown;
}>();

const context = useCodeBlockContext();
const text = computed(() => props.value ?? context?.copyValue.value);
const { copy } = useClipboard({ legacy: true });
const copied = ref(false);
const announcement = ref('');
const reset = useTimeoutFn(() => {
  copied.value = false;
  announcement.value = '';
}, () => props.timeout, { immediate: false });

async function onClick() {
  const value = text.value;

  if (value === undefined) {
    return;
  }

  try {
    await copy(value);
    copied.value = true;
    announcement.value = props.copiedLabel;
    emits('copy', value);
  } catch (error) {
    copied.value = false;
    announcement.value = props.errorLabel;
    emits('error', error);
  }

  reset.start();
}
</script>

<template>
  <Button
    data-slot="code-block-copy-button"
    v-bind="delegatedAttrs()"
    type="button"
    :data-copied="copied || undefined"
    :variant="props.variant"
    :size="props.size"
    :aria-label="copied ? props.copiedLabel : props.label"
    :disabled="text === undefined || $attrs.disabled"
    class="sigma-ui-code-block__copy-button"
    :class="[$attrs.class]"
    @click="onClick"
  >
    <slot :copied="copied">
      <CheckIcon
        v-if="copied"
        aria-hidden="true"
      />
      <CopyIcon
        v-else
        aria-hidden="true"
      />
    </slot>
  </Button>
  <span
    class="sr-only"
    aria-live="polite"
  >{{ announcement }}</span>
</template>

<style>
.sigma-ui-code-block__copy-button {
  color: var(--muted-foreground);
}

.sigma-ui-code-block__copy-button:hover,
.sigma-ui-code-block__copy-button[data-copied] {
  color: var(--foreground);
}
</style>
