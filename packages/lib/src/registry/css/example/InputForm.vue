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
import { Input } from '@ui/registry/css/ui/input';

const formSchema = toTypedSchema(z.object({
  username: z.string().min(2).max(50),
}));

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit((values) => {
  toast('You submitted the following values:', {
    description: h('pre', { class: 'example-sigma-ui-form__toast-pre' }, h('code', {}, JSON.stringify(values, null, 2))),
  });
});
</script>

<template>
  <form
    class="example-sigma-ui-form"
    @submit="onSubmit"
  >
    <FormField
      v-slot="{ componentField }"
      name="username"
    >
      <FormItem>
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
      class="example-sigma-ui-form__button"
    >
      Submit
    </Button>
  </form>
</template>

<style>
.example-sigma-ui-form {
  display: flex;
  width: 66%;
  flex-direction: column;
  gap: calc(var(--spacing) * 6);
}

.example-sigma-ui-form__button {
  width: fit-content;
}

.example-sigma-ui-form__toast-pre {
  padding: calc(var(--spacing) * 4);
  border-radius: var(--radius);
  margin-top: calc(var(--spacing) * 2);
  background-color: color-mix(in oklch, var(--muted) 50%, transparent);
}
</style>
