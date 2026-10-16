<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { cn } from '@ui/utils';
import type { FieldErrorItem } from '.';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

interface FieldErrorProps {
  /**
   * Error messages to show. Accepts strings or objects with a `message`, such as validation library issues. Duplicates are removed.
   */
  errors?: FieldErrorItem[];
}

const props = defineProps<FieldErrorProps>();

const slots = defineSlots<{
  /**
   * Custom error content. Replaces the `errors` list.
   */
  default?: () => unknown;
}>();

const messages = computed(() => {
  const uniqueMessages = new Set<string>();

  for (const error of props.errors ?? []) {
    const message = typeof error === 'string' ? error : error?.message;

    if (message) {
      uniqueMessages.add(message);
    }
  }

  return [...uniqueMessages];
});
</script>

<template>
  <div
    v-if="slots.default || messages.length"
    v-bind="delegatedAttrs"
    role="alert"
    data-slot="field-error"
    :class="cn('text-sm font-normal text-destructive', $attrs.class ?? '')"
  >
    <slot v-if="slots.default" />
    <template v-else-if="messages.length === 1">
      {{ messages[0] }}
    </template>
    <ul
      v-else
      class="ml-4 flex list-disc flex-col gap-1"
    >
      <li
        v-for="message in messages"
        :key="message"
      >
        {{ message }}
      </li>
    </ul>
  </div>
</template>
