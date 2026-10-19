<script setup lang="ts">
import { h } from 'vue';
import { useForm } from 'vee-validate';
import * as z from 'zod';
import { vAutoAnimate } from '@formkit/auto-animate/vue';
import { toast } from '@ui/registry/css/ui/toaster';
import { Button } from '@ui/registry/css/ui/button';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, toTypedSchema } from '@ui/registry/css/ui/form';
import { Input } from '@ui/registry/css/ui/input';

const formSchema = toTypedSchema(z.object({
  username: z
    .string({ error: 'Username is required.' })
    .min(2, 'Username must be at least 2 characters.')
    .max(50, 'Username must not be longer than 50 characters.'),
}));

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit((values) => {
  toast('You submitted the following values:', {
    description: h('pre', { class: 'example-sigma-ui-form-animate__toast-pre' }, h('code', {}, JSON.stringify(values, null, 2))),
  });
});
</script>

<template>
  <form
    class="example-sigma-ui-form-animate"
    @submit="onSubmit"
  >
    <FormField
      v-slot="{ componentField }"
      name="username"
    >
      <FormItem
        v-auto-animate
      >
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="sigma-ui"
            v-bind="componentField"
          />
        </FormControl>
        <FormDescription>
          This is your public display name.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button
      type="submit"
      class="example-sigma-ui-form-animate__button"
    >
      Submit
    </Button>
  </form>
</template>

<style>
@layer components {
  .example-sigma-ui-form-animate {
    display: flex;
    width: 66%;
    flex-direction: column;
    gap: calc(var(--spacing) * 6);
  }

  .example-sigma-ui-form-animate__toast-pre {
    padding: calc(var(--spacing) * 4);
    border-radius: var(--radius);
    margin-top: calc(var(--spacing) * 2);
    background-color: color-mix(in oklch, var(--muted) 50%, transparent);
  }

  .example-sigma-ui-form-animate__button {
    width: fit-content;
  }
}
</style>
