<script setup lang="ts">
import * as z from 'zod';
import { h } from 'vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { toast } from '@ui/registry/tailwind/ui/toaster';
import { Button } from '@ui/registry/tailwind/ui/button';
import { AutoForm } from '@ui/registry/tailwind/ui/auto-form';

const schema = z.object({
  username: z.string(),
});

const form = useForm({
  validationSchema: toTypedSchema(schema),
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
    :form="form"
    @submit="onSubmit"
  >
    <Button type="submit">
      Submit
    </Button>
  </AutoForm>
</template>
