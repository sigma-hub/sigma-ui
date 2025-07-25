<script setup lang="ts">
import { computed, h, ref } from 'vue';
import { CalendarDate, DateFormatter, getLocalTimeZone, parseDate, today } from '@internationalized/date';
import { toDate } from 'reka-ui/date';
import { CalendarIcon } from 'lucide-vue-next';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { toast } from '@ui/registry/tailwind/ui/toaster';
import { Calendar } from '@ui/registry/tailwind/ui/calendar';
import { Button } from '@ui/registry/tailwind/ui/button';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ui/registry/tailwind/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/registry/tailwind/ui/popover';
import { cn } from '@ui/utils';

const df = new DateFormatter('en-US', {
  dateStyle: 'long',
});

const formSchema = toTypedSchema(z.object({
  dob: z
    .string()
    .refine(v => v, { message: 'A date of birth is required.' }),
}));

const placeholder = ref();

const { handleSubmit, setFieldValue, values } = useForm({
  validationSchema: formSchema,
});

const value = computed({
  get: () => values.dob ? parseDate(values.dob) : undefined,
  set: val => val,
});

const onSubmit = handleSubmit((values) => {
  toast('You submitted the following values:', {
    description: h('pre', { class: 'mt-2 rounded-md bg-muted/50 p-4' }, h('code', {}, JSON.stringify(values, null, 2))),
  });
});
</script>

<template>
  <form
    class="space-y-8"
    @submit="onSubmit"
  >
    <FormField name="dob">
      <FormItem class="flex flex-col gap-2">
        <FormLabel>Date of birth</FormLabel>
        <Popover>
          <PopoverTrigger as-child>
            <FormControl>
              <Button
                variant="outline"
                :class="cn(
                  'w-[240px] ps-3 text-start font-normal',
                  !value && 'text-muted-foreground',
                )"
              >
                <span>{{ value ? df.format(toDate(value)) : "Pick a date" }}</span>
                <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
              </Button>
              <input hidden>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent class="w-auto p-0">
            <Calendar
              v-model:placeholder="placeholder"
              v-model="value"
              calendar-label="Date of birth"
              initial-focus
              :min-value="new CalendarDate(1900, 1, 1)"
              :max-value="today(getLocalTimeZone())"
              @update:model-value="(value) => {
                if (value) {
                  setFieldValue('dob', value.toString())
                }
                else {
                  setFieldValue('dob', undefined)
                }
              }"
            />
          </PopoverContent>
        </Popover>
        <FormDescription>
          Your date of birth is used to calculate your age.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit">
      Submit
    </Button>
  </Form>
</template>
