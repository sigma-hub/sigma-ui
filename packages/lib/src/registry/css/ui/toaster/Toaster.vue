<script lang="ts" setup>
import { Toaster, type ToasterProps } from 'vue-sonner';

const props = defineProps<ToasterProps>();
</script>

<template>
  <Toaster
    class="sigma-ui-toaster"
    v-bind="props"
    :toast-options="{
      ...props.toastOptions,
      unstyled: true,
      classes: {
        toast: 'sigma-ui-toast',
        description: 'sigma-ui-toast__description',
        actionButton: 'sigma-ui-toast__action-button',
        cancelButton: 'sigma-ui-toast__cancel-button',
      },
    }"
  />
</template>

<style>
.sigma-ui-toaster {
  z-index: 60;
  position: fixed;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 420px;
  pointer-events: auto;
}

.sigma-ui-toast {
  width: 100%;
  cursor: default;
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  border-radius: var(--radius);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.sigma-ui-toast[data-type="default"] {
  padding: 0.75rem 1rem;
  border: 1px solid hsl(var(--border));
}

.sigma-ui-toast[data-type="default"] [data-content] {
  display: flex;
  flex: 1;
}

.sigma-ui-toast[data-type="default"] .sigma-ui-toast__description {
  width: 100%;
}

.sigma-ui-toast[data-type="default"] .sigma-ui-toast__action-button {
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}

.sigma-ui-toast[data-type="default"] .sigma-ui-toast__action-button:hover {
  opacity: 0.9;
}

.sigma-ui-toast[data-type="default"] .sigma-ui-toast__cancel-button {
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  background-color: hsl(var(--muted));
  color: hsl(var(--muted-foreground));
}

.sigma-ui-toast[data-type="default"] .sigma-ui-toast__cancel-button:hover {
  opacity: 0.9;
}
</style>
