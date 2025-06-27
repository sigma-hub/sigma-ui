<script setup lang="ts">
import * as z from 'zod';
import { h } from 'vue';
import { toast } from '@ui/registry/css/ui/toaster';
import { Button } from '@ui/registry/css/ui/button';
import { AutoForm } from '@ui/registry/css/ui/auto-form';

const schema = z
  .object({
    password: z.string(),
    confirm: z.string(),
  })
  .refine(data => data.password === data.confirm, {
    message: 'Passwords must match.',
    path: ['confirm'],
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
    @submit="onSubmit"
  >
    <Button type="submit">
      Submit
    </Button>
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
</style>
