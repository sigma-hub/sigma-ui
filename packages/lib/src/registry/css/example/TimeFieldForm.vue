<script setup lang="ts">
import { h } from 'vue';
import { Time } from '@internationalized/date';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { toast } from '@ui/registry/css/ui/toaster';
import { Button } from '@ui/registry/css/ui/button';
import { TimeField } from '@ui/registry/css/ui/time-field';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ui/registry/css/ui/form';

const opensAt = new Time(9);
const closesAt = new Time(17);

const formSchema = toTypedSchema(z.object({
  time: z
    .custom<Time>(value => value != null, 'A delivery time is required.')
    .refine(value => value.compare(opensAt) >= 0 && value.compare(closesAt) <= 0, 'Deliveries run from 9:00 AM to 5:00 PM.'),
}));

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit((values) => {
  toast('You submitted the following values:', {
    description: h('pre', { class: 'example-sigma-ui-time-field-form__toast-pre' }, h('code', {}, JSON.stringify({ time: values.time.toString() }, null, 2))),
  });
});
</script>

<template>
  <form
    class="example-sigma-ui-time-field-form"
    @submit.prevent="onSubmit"
  >
    <FormField
      v-slot="{ componentField }"
      name="time"
    >
      <FormItem>
        <FormLabel>Delivery time</FormLabel>
        <FormControl>
          <TimeField
            v-bind="componentField"
          />
        </FormControl>
        <FormDescription>
          Deliveries run from 9:00 AM to 5:00 PM.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button
      type="submit"
      class="example-sigma-ui-time-field-form__button"
    >
      Submit
    </Button>
  </form>
</template>

<style>
.example-sigma-ui-time-field-form {
  display: flex;
  max-width: 20rem;
  flex-direction: column;
  gap: 1.5rem;
}

.example-sigma-ui-time-field-form__button {
  width: fit-content;
}

.example-sigma-ui-time-field-form__toast-pre {
  padding: 1rem;
  border-radius: var(--radius);
  margin-top: 0.5rem;
  background-color: color-mix(in oklch, var(--muted) 50%, transparent);
}
</style>
