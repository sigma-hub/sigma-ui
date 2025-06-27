<script setup lang="ts">
import * as z from 'zod';
import { h } from 'vue';
import { toast } from '@ui/registry/tailwind/ui/toaster';
import { Button } from '@ui/registry/tailwind/ui/button';
import { AutoForm } from '@ui/registry/tailwind/ui/auto-form';

const schema = z.object({
  guestListName: z.string(),
  invitedGuests: z
    .array(
      z.object({
        name: z.string(),
        age: z.coerce.number(),
      }),
    )
    .describe('Guests invited to the party'),
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
    @submit="onSubmit"
  >
    <Button type="submit">
      Submit
    </Button>
  </AutoForm>
</template>
