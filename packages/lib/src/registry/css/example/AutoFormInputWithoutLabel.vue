<script setup lang="ts">
import * as z from 'zod';
import { h } from 'vue';
import { toast } from '@ui/registry/css/ui/toaster';
import { Button } from '@ui/registry/css/ui/button';
import { AutoForm, AutoFormField } from '@ui/registry/css/ui/auto-form';

const schema = z.object({
  username: z.string(),
});

function onSubmit(values: Record<string, any>) {
  toast('You submitted the following values:', {
    description: h('pre', { class: 'example-sigma-ui-autoform__toast-pre' }, h('code', {}, JSON.stringify(values, null, 2))),
  });
}
</script>

<template>
  <AutoForm
    class="example-sigma-ui-autoform"
    :schema="schema"
    :field-config="{
      username: {
        hideLabel: true,
      },
    }"
    @submit="onSubmit"
  >
    <template #username="slotProps">
      <div class="example-sigma-ui-autoform__field-row">
        <div class="example-sigma-ui-autoform__field-container">
          <AutoFormField v-bind="slotProps" />
        </div>
        <div>
          <Button type="submit">
            Update
          </Button>
        </div>
      </div>
    </template>
  </AutoForm>
</template>

<style>
.example-sigma-ui-autoform {
  width: 66.6%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.example-sigma-ui-autoform__toast-pre {
  margin-top: 0.5rem;
  border-radius: 0.375rem;
  background-color: hsl(var(--muted) / 0.5);
  padding: 1rem;
}

.example-sigma-ui-autoform__field-row {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.example-sigma-ui-autoform__field-container {
  flex: 1;
}
</style>
