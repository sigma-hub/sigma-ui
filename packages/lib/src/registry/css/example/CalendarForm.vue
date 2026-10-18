<script setup lang="ts">
import { computed, h, ref } from 'vue';
import { CalendarDate, DateFormatter, getLocalTimeZone, parseDate, today } from '@internationalized/date';
import { toDate } from 'reka-ui/date';
import { CalendarIcon } from '@lucide/vue';
import { useForm } from 'vee-validate';
import { z } from 'zod';
import { toast } from '@ui/registry/css/ui/toaster';
import { Calendar } from '@ui/registry/css/ui/calendar';
import { Button } from '@ui/registry/css/ui/button';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, toTypedSchema } from '@ui/registry/css/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/registry/css/ui/popover';

const df = new DateFormatter('en-US', {
  dateStyle: 'long',
});

const formSchema = toTypedSchema(z.object({
  dob: z
    .string({ error: 'A date of birth is required.' })
    .refine(v => v, { error: 'A date of birth is required.' }),
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
    description: h('pre', { class: 'example-sigma-ui-calendar-form__toast-pre' }, h('code', {}, JSON.stringify(values, null, 2))),
  });
});
</script>

<template>
  <form
    class="example-sigma-ui-calendar-form"
    @submit="onSubmit"
  >
    <FormField name="dob">
      <FormItem class="example-sigma-ui-calendar-form__item">
        <FormLabel>Date of birth</FormLabel>
        <Popover>
          <PopoverTrigger as-child>
            <FormControl>
              <Button
                variant="outline"
                class="example-sigma-ui-calendar-form__button"
                :class="[!value && 'example-sigma-ui-calendar-form__button--placeholder']"
              >
                <span>{{ value ? df.format(toDate(value)) : "Pick a date" }}</span>
                <CalendarIcon class="example-sigma-ui-calendar-form__button-icon" />
              </Button>
              <input hidden>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent class="example-sigma-ui-calendar-form__popover">
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
    <Button
      type="submit"
      class="example-sigma-ui-calendar-form__submit-button"
    >
      Submit
    </Button>
  </form>
</template>

<style>
.example-sigma-ui-calendar-form {
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 8);
}

.example-sigma-ui-calendar-form__item {
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 2);
}

.example-sigma-ui-calendar-form__button {
  width: 240px;
  padding-left: calc(var(--spacing) * 3);
  font-weight: normal;
  text-align: start;
}

.example-sigma-ui-calendar-form__button--placeholder {
  color: var(--muted-foreground);
}

.example-sigma-ui-calendar-form__button-icon {
  width: calc(var(--spacing) * 4);
  height: calc(var(--spacing) * 4);
  margin-left: auto;
  opacity: 0.5;
}

.example-sigma-ui-calendar-form__submit-button {
  width: fit-content;
}

.example-sigma-ui-calendar-form__popover {
  padding: 0;
}

.example-sigma-ui-calendar-form__toast-pre {
  padding: calc(var(--spacing) * 4);
  border-radius: var(--radius);
  margin-top: calc(var(--spacing) * 2);
  background-color: color-mix(in oklch, var(--muted) 50%, transparent);
}
</style>
