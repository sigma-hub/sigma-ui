<script setup lang="ts">
import { h } from 'vue';
import { type DateValue, getLocalTimeZone, today } from '@internationalized/date';
import { useForm } from 'vee-validate';
import * as z from 'zod';
import { toast } from '@ui/registry/css/ui/toaster';
import { Button } from '@ui/registry/css/ui/button';
import { DateField } from '@ui/registry/css/ui/date-field';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, toTypedSchema } from '@ui/registry/css/ui/form';

const formSchema = toTypedSchema(z.object({
  dob: z
    .custom<DateValue>(value => value != null, 'A date of birth is required.')
    .refine(value => value.compare(today(getLocalTimeZone())) <= 0, 'A date of birth can\'t be in the future.'),
}));

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit((values) => {
  toast('You submitted the following values:', {
    description: h('pre', { class: 'example-sigma-ui-date-field-form__toast-pre' }, h('code', {}, JSON.stringify({ dob: values.dob.toString() }, null, 2))),
  });
});
</script>

<template>
  <form
    class="example-sigma-ui-date-field-form"
    @submit.prevent="onSubmit"
  >
    <FormField
      v-slot="{ componentField }"
      name="dob"
    >
      <FormItem>
        <FormLabel>Date of birth</FormLabel>
        <FormControl>
          <DateField
            v-bind="componentField"
            :max-value="today(getLocalTimeZone())"
          />
        </FormControl>
        <FormDescription>
          Your date of birth is used to calculate your age.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button
      type="submit"
      class="example-sigma-ui-date-field-form__button"
    >
      Submit
    </Button>
  </form>
</template>

<style>
.example-sigma-ui-date-field-form {
  display: flex;
  max-width: 20rem;
  flex-direction: column;
  gap: calc(var(--spacing) * 6);
}

.example-sigma-ui-date-field-form__button {
  width: fit-content;
}

.example-sigma-ui-date-field-form__toast-pre {
  padding: calc(var(--spacing) * 4);
  border-radius: var(--radius);
  margin-top: calc(var(--spacing) * 2);
  background-color: color-mix(in oklch, var(--muted) 50%, transparent);
}
</style>
