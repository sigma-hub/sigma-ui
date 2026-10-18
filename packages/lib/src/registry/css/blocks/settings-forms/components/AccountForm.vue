<script setup lang="ts">
import type { DateValue } from '@internationalized/date';
import { h, ref } from 'vue';
import * as z from 'zod';
import { toDate } from 'reka-ui/date';
import { CalendarDate, DateFormatter, getLocalTimeZone, today } from '@internationalized/date';
import { CalendarIcon, CheckIcon, ChevronsUpDownIcon } from 'lucide-vue-next';
import { toast } from '@ui/registry/css/ui/toaster';
import { Button } from '@ui/registry/css/ui/button';
import { Calendar } from '@ui/registry/css/ui/calendar';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@ui/registry/css/ui/command';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, toTypedSchema } from '@ui/registry/css/ui/form';
import { Input } from '@ui/registry/css/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/registry/css/ui/popover';
import { Separator } from '@ui/registry/css/ui/separator';

const open = ref(false);
const dateValue = ref<DateValue>();
const placeholder = ref<DateValue>();

const languages = [
  { label: 'English', value: 'en' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
  { label: 'Spanish', value: 'es' },
  { label: 'Portuguese', value: 'pt' },
  { label: 'Russian', value: 'ru' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Korean', value: 'ko' },
  { label: 'Chinese', value: 'zh' },
] as const;

const formatter = new DateFormatter('en-US', {
  dateStyle: 'long',
});

const accountFormSchema = toTypedSchema(z.object({
  name: z
    .string({
      error: 'Required.',
    })
    .min(2, {
      error: 'Name must be at least 2 characters.',
    })
    .max(30, {
      error: 'Name must not be longer than 30 characters.',
    }),
  dob: z.iso.datetime().optional().refine(date => date !== undefined, 'Please select a valid date.'),
  language: z.string({ error: 'Please select a language.' }).min(1, 'Please select a language.'),
}));

function formatDob(date: DateValue | undefined) {
  if (!date) {
    return 'Pick a date';
  }

  return formatter.format(toDate(date, getLocalTimeZone()));
}

function applyDob(setFieldValue: (field: string, value: string | undefined) => void, next?: DateValue) {
  dateValue.value = next;
  setFieldValue('dob', next ? toDate(next).toISOString() : undefined);
}

function applyLanguage(setFieldValue: (field: string, value: string) => void, language: string) {
  setFieldValue('language', language);
  open.value = false;
}

function onSubmit(values: Record<string, unknown>) {
  toast('You submitted the following values:', {
    description: h('pre', { class: 'settings-forms__toast' }, h('code', {}, JSON.stringify(values, null, 2))),
  });
}
</script>

<template>
  <div class="settings-forms__section">
    <h3 class="settings-forms__section-title">
      Account
    </h3>
    <p class="settings-forms__section-description">
      Update your account settings. Set your preferred language and timezone.
    </p>
  </div>
  <Separator />
  <Form
    v-slot="{ setFieldValue }"
    :validation-schema="accountFormSchema"
    class="settings-forms__form"
    @submit="onSubmit"
  >
    <FormField
      v-slot="{ componentField }"
      name="name"
    >
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="Your name"
            autocomplete="name"
            v-bind="componentField"
          />
        </FormControl>
        <FormDescription>
          This is the name that will be displayed on your profile and in emails.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField
      v-slot="{ field, value }"
      name="dob"
    >
      <FormItem class="settings-forms__stack">
        <FormLabel>Date of birth</FormLabel>
        <Popover>
          <PopoverTrigger as-child>
            <FormControl>
              <Button
                variant="outline"
                class="settings-forms__date-button"
                :class="{ 'settings-forms__date-button--empty': !value }"
              >
                <CalendarIcon class="settings-forms__field-icon" />
                <span>{{ value ? formatDob(dateValue) : 'Pick a date' }}</span>
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent class="settings-forms__date-popover">
            <Calendar
              v-model:placeholder="placeholder"
              v-model="dateValue"
              calendar-label="Date of birth"
              initial-focus
              :min-value="new CalendarDate(1900, 1, 1)"
              :max-value="today(getLocalTimeZone())"
              @update:model-value="(next) => applyDob(setFieldValue, next)"
            />
          </PopoverContent>
        </Popover>
        <FormDescription>
          Your date of birth is used to calculate your age.
        </FormDescription>
        <FormMessage />
      </FormItem>
      <input
        type="hidden"
        v-bind="field"
      >
    </FormField>

    <FormField
      v-slot="{ value }"
      name="language"
    >
      <FormItem class="settings-forms__stack">
        <FormLabel>Language</FormLabel>
        <Popover v-model:open="open">
          <PopoverTrigger as-child>
            <FormControl>
              <Button
                variant="outline"
                role="combobox"
                class="settings-forms__language-button"
                :class="{ 'settings-forms__language-button--empty': !value }"
                :aria-expanded="open"
              >
                {{ value ? languages.find(language => language.value === value)?.label : 'Select language...' }}
                <ChevronsUpDownIcon class="settings-forms__language-icon" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent class="settings-forms__language-popover">
            <Command>
              <CommandInput placeholder="Search language..." />
              <CommandEmpty>No language found.</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  <CommandItem
                    v-for="language in languages"
                    :key="language.value"
                    :value="language.label"
                    @select="applyLanguage(setFieldValue, language.value)"
                  >
                    <CheckIcon
                      class="settings-forms__check"
                      :class="{ 'settings-forms__check--active': value === language.value }"
                    />
                    {{ language.label }}
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <FormDescription>
          This is the language that will be used in the dashboard.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <div class="settings-forms__actions">
      <Button type="submit">
        Update account
      </Button>
    </div>
  </Form>
</template>

<style>
.settings-forms__stack {
  display: flex;
  flex-direction: column;
}

.settings-forms__date-button.settings-forms__date-button {
  width: 240px;
  justify-content: flex-start;
  font-weight: 400;
  text-align: left;
}

.settings-forms__date-button--empty,
.settings-forms__language-button--empty {
  color: var(--muted-foreground);
}

.settings-forms__field-icon,
.settings-forms__check {
  width: calc(var(--spacing) * 4);
  height: calc(var(--spacing) * 4);
  margin-right: calc(var(--spacing) * 2);
}

.settings-forms__field-icon {
  opacity: 0.5;
}

.settings-forms__date-popover,
.settings-forms__language-popover {
  padding: 0;
}

.settings-forms__language-button.settings-forms__language-button,
.settings-forms__language-popover {
  width: 200px;
}

.settings-forms__language-button.settings-forms__language-button {
  justify-content: space-between;
}

.settings-forms__language-icon {
  width: calc(var(--spacing) * 4);
  height: calc(var(--spacing) * 4);
  flex-shrink: 0;
  margin-left: calc(var(--spacing) * 2);
  opacity: 0.5;
}

.settings-forms__check {
  opacity: 0;
}

.settings-forms__check--active {
  opacity: 1;
}
</style>
