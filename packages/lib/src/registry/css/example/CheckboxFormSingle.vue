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
import { Checkbox } from '@ui/registry/css/ui/checkbox';

const formSchema = toTypedSchema(z.object({
  mobile: z.boolean().refine(val => val === true, {
    message: 'You must check this checkbox to proceed',
  }),
}));

const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    mobile: false,
  },
});

const onSubmit = handleSubmit((values) => {
  toast('You submitted the following values:', {
    description: h('pre', { class: 'example-sigma-ui-checkbox-form__toast-pre' }, h('code', {}, JSON.stringify(values, null, 2))),
  });
});
</script>

<template>
  <form
    class="example-sigma-ui-checkbox-form"
    @submit="onSubmit"
  >
    <FormField
      v-slot="{ value, handleChange, errorMessage }"
      type="checkbox"
      name="mobile"
    >
      <FormItem class="example-sigma-ui-checkbox-form__item">
        <FormControl>
          <Checkbox
            :model-value="value"
            @update:model-value="handleChange"
          />
        </FormControl>
        <div class="example-sigma-ui-checkbox-form__content">
          <FormLabel>I accept the terms and conditions</FormLabel>
          <FormDescription>
            You must accept our terms and conditions before proceeding with your submission.
          </FormDescription>
          <FormMessage>
            {{ errorMessage }}
          </FormMessage>
        </div>
      </FormItem>
    </FormField>
    <Button type="submit">
      Submit
    </Button>
  </form>
</template>

<style>
.example-sigma-ui-checkbox-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.example-sigma-ui-checkbox-form__item {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 1rem;
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
  gap: 0.75rem;
}

.example-sigma-ui-checkbox-form__content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  line-height: 1;
}

.example-sigma-ui-checkbox-form__toast-pre {
  padding: 0.5rem;
  border-radius: var(--radius-md);
  margin-top: 0.5rem;
  background-color: hsl(var(--muted) / 50%);
}
</style>
