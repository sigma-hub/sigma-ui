<script setup lang="ts">
import { h } from 'vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-vue-next';
import { toast } from '@ui/registry/css/ui/toaster';
import { Button } from '@ui/registry/css/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@ui/registry/css/ui/command';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ui/registry/css/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@ui/registry/css/ui/popover';

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
];

const formSchema = toTypedSchema(z.object({
  language: z.string({
    required_error: 'Please select a language.',
  }),
}));

const { handleSubmit, setFieldValue, values } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit((values) => {
  toast('You submitted the following values:', {
    description: h('pre', { class: 'example-sigma-ui-command-form__toast-pre' }, h('code', {}, JSON.stringify(values, null, 2))),
  });
});
</script>

<template>
  <form
    class="example-sigma-ui-command-form"
    @submit="onSubmit"
  >
    <FormField name="language">
      <FormItem class="example-sigma-ui-command-form__item">
        <FormLabel>Language</FormLabel>
        <Popover>
          <PopoverTrigger as-child>
            <FormControl>
              <Button
                variant="outline"
                role="combobox"
                class="example-sigma-ui-command-form__trigger"
                :class="{ 'example-sigma-ui-command-form__trigger--placeholder': !values.language }"
              >
                {{ values.language ? languages.find(
                  (language) => language.value === values.language,
                )?.label : 'Select language...' }}
                <ChevronsUpDownIcon class="example-sigma-ui-command-form__chevron" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent class="example-sigma-ui-command-form__content">
            <Command>
              <CommandInput placeholder="Search language..." />
              <CommandEmpty>Nothing found.</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  <CommandItem
                    v-for="language in languages"
                    :key="language.value"
                    :value="language.label"
                    @select="() => {
                      setFieldValue('language', language.value)
                    }"
                  >
                    <CheckIcon
                      class="example-sigma-ui-command-form__check"
                      :class="{ 'example-sigma-ui-command-form__check--selected': language.value === values.language }"
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

    <Button type="submit">
      Submit
    </Button>
  </form>
</template>

<style>
.example-sigma-ui-command-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.example-sigma-ui-command-form__item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.example-sigma-ui-command-form__trigger {
  display: flex;
  width: 200px;
  justify-content: space-between;
}

.example-sigma-ui-command-form__trigger--placeholder {
  color: hsl(var(--muted-foreground));
}

.example-sigma-ui-command-form__chevron {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  margin-left: 0.5rem;
  opacity: 0.5;
}

.example-sigma-ui-command-form__content {
  width: 200px;
  padding: 0;
}

.example-sigma-ui-command-form__check {
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
  opacity: 0;
}

.example-sigma-ui-command-form__check--selected {
  opacity: 1;
}

.example-sigma-ui-command-form__toast-pre {
  padding: 1rem;
  border-radius: var(--radius);
  margin-top: 0.5rem;
  background-color: hsl(var(--muted) / 50%);
}
</style>
