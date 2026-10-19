<script setup lang="ts">
import { h } from 'vue';
import { useForm } from 'vee-validate';
import * as z from 'zod';
import { toast } from '@ui/registry/css/ui/toaster';
import { Button } from '@ui/registry/css/ui/button';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, toTypedSchema } from '@ui/registry/css/ui/form';
import { Textarea } from '@ui/registry/css/ui/textarea';

const formSchema = toTypedSchema(z.object({
  bio: z
    .string({ error: 'Bio is required.' })
    .min(10, {
      error: 'Bio must be at least 10 characters.',
    })
    .max(160, {
      error: 'Bio must not be longer than 160 characters.',
    }),
}));

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit((values) => {
  toast('You submitted the following values:', {
    description: h('pre', { class: 'example-sigma-ui-textarea-form__toast-pre' }, h('code', {}, JSON.stringify(values, null, 2))),
  });
});
</script>

<template>
  <form
    class="example-sigma-ui-textarea-form"
    @submit="onSubmit"
  >
    <FormField
      v-slot="{ componentField }"
      name="bio"
    >
      <FormItem class="example-sigma-ui-textarea-form__item">
        <FormLabel>Bio</FormLabel>
        <FormControl>
          <Textarea
            placeholder="Tell us a little bit about yourself"
            class="example-sigma-ui-textarea-form__input"
            v-bind="componentField"
          />
        </FormControl>
        <FormDescription>
          You can <span>@mention</span> other users and organizations.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button
      type="submit"
      class="example-sigma-ui-textarea-form__button"
    >
      Submit
    </Button>
  </form>
</template>

<style>
@layer components {
  .example-sigma-ui-textarea-form {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: calc(var(--spacing) * 6);
  }

  .example-sigma-ui-textarea-form__item {
    display: flex;
    flex-direction: column;
    gap: calc(var(--spacing) * 2);
  }

  .example-sigma-ui-textarea-form__input {
    resize: none;
  }

  .example-sigma-ui-textarea-form__button {
    width: fit-content;
  }

  .example-sigma-ui-textarea-form__toast-pre {
    padding: calc(var(--spacing) * 4);
    border-radius: var(--radius);
    margin-top: calc(var(--spacing) * 2);
    background-color: color-mix(in oklch, var(--muted) 50%, transparent);
    color: var(--foreground);
  }
}
</style>
