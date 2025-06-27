<script setup lang="ts">
import * as z from 'zod';
import { h } from 'vue';
import { toast } from '@ui/registry/tailwind/ui/toaster';
import { Button } from '@ui/registry/tailwind/ui/button';
import { AutoForm } from '@ui/registry/tailwind/ui/auto-form';

const schema = z.object({
  subObject: z.object({
    subField: z.string().optional().default('Sub Field'),
    numberField: z.number().optional().default(1),

    subSubObject: z
      .object({
        subSubField: z.string().default('Sub Sub Field'),
      })
      .describe('Sub Sub Object Description'),
  }),
  optionalSubObject: z
    .object({
      optionalSubField: z.string(),
      otherOptionalSubField: z.string(),
    })
    .optional(),
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
      subObject: {
        numberField: {
          inputProps: {
            type: 'number',
          },
        },
      },
    }"
    @submit="onSubmit"
  >
    <Button type="submit">
      Submit
    </Button>
  </AutoForm>
</template>
