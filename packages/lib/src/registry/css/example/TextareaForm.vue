<script setup lang="ts">
import { h } from 'vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { toast } from '@ui/registry/css/ui/toaster';
import { Button } from '@ui/registry/css/ui/button';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ui/registry/css/ui/form';
import { Textarea } from '@ui/registry/css/ui/textarea';

const formSchema = toTypedSchema(z.object({
  bio: z
    .string()
    .min(10, {
      message: 'Bio must be at least 10 characters.',
    })
    .max(160, {
      message: 'Bio must not be longer than 30 characters.',
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
.example-sigma-ui-textarea-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.example-sigma-ui-textarea-form__item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.example-sigma-ui-textarea-form__input {
  resize: none;
}

.example-sigma-ui-textarea-form__button {
  width: fit-content;
}

.example-sigma-ui-textarea-form__toast-pre {
  margin-top: 0.5rem;
  border-radius: var(--radius);
  background-color: hsl(var(--muted) / 0.5);
  padding: 1rem;
  color: hsl(var(--foreground));
}
</style>
