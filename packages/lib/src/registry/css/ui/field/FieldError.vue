<script setup lang="ts">
import { computed } from 'vue';
import type { FieldErrorItem } from '.';

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
    role="alert"
    data-slot="field-error"
    class="sigma-ui-field-error"
  >
    <slot v-if="slots.default" />
    <template v-else-if="messages.length === 1">
      {{ messages[0] }}
    </template>
    <ul
      v-else
      class="sigma-ui-field-error__list"
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

<style>
.sigma-ui-field-error {
  color: var(--destructive);
  font-size: 0.875rem;
  font-weight: 400;
}

.sigma-ui-field-error__list {
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0 0 0 1rem;
  gap: 0.25rem;
  list-style: disc;
}
</style>
