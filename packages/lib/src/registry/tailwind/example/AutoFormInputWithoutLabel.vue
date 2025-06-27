<script setup lang="ts">
import * as z from 'zod';
import { h } from 'vue';
import { toast } from '@ui/registry/tailwind/ui/toaster';
import { Button } from '@ui/registry/tailwind/ui/button';
import { AutoForm, AutoFormField } from '@ui/registry/tailwind/ui/auto-form';

const schema = z.object({
  username: z.string(),
});

function onSubmit(values: Record<string, any>) {
  toast('You submitted the following values:', {
    description: h('pre', { class: 'mt-2 rounded-md bg-muted/50 p-4' }, h('code', {}, JSON.stringify(values, null, 2))),
  });
}
</script>

<template>
  <AutoForm
    class="w-2/3 space-y-6"
    :schema="schema"
    :field-config="{
      username: {
        hideLabel: true,
      },
    }"
    @submit="onSubmit"
  >
    <template #username="slotProps">
      <div class="flex items-start gap-3">
        <div class="flex-1">
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
