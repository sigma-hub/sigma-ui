<script setup lang="ts">
import { h } from 'vue';
import { Time } from '@internationalized/date';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { toast } from '@ui/registry/tailwind/ui/toaster';
import { Button } from '@ui/registry/tailwind/ui/button';
import { TimeField } from '@ui/registry/tailwind/ui/time-field';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ui/registry/tailwind/ui/form';

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
    description: h('pre', { class: 'mt-2 rounded-md bg-muted/50 p-4' }, h('code', {}, JSON.stringify({ time: values.time.toString() }, null, 2))),
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
      class="w-fit"
    >
      Submit
    </Button>
  </form>
</template>
