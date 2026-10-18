<script setup lang="ts">
import { h } from 'vue';
import { type DateValue, getLocalTimeZone, today } from '@internationalized/date';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { toast } from '@ui/registry/tailwind/ui/toaster';
import { Button } from '@ui/registry/tailwind/ui/button';
import { DateField } from '@ui/registry/tailwind/ui/date-field';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ui/registry/tailwind/ui/form';

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
    description: h('pre', { class: 'mt-2 rounded-md bg-muted/50 p-4' }, h('code', {}, JSON.stringify({ dob: values.dob.toString() }, null, 2))),
  });
});
</script>

<template>
  <form
    class="flex max-w-xs flex-col gap-6"
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
      class="w-fit"
    >
      Submit
    </Button>
  </form>
</template>
