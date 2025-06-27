<script setup lang="ts">
import { h } from 'vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-vue-next';
import { toast } from '@ui/registry/tailwind/ui/toaster';
import { cn } from '@ui/utils';
import { Button } from '@ui/registry/tailwind/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@ui/registry/tailwind/ui/command';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ui/registry/tailwind/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@ui/registry/tailwind/ui/popover';

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
    description: h('pre', { class: 'mt-2 rounded-md bg-muted/50 p-4' }, h('code', {}, JSON.stringify(values, null, 2))),
  });
});
</script>

<template>
  <form
    class="space-y-6"
    @submit="onSubmit"
  >
    <FormField name="language">
      <FormItem class="flex flex-col gap-2">
        <FormLabel>Language</FormLabel>
        <Popover>
          <PopoverTrigger as-child>
            <FormControl>
              <Button
                variant="outline"
                role="combobox"
                :class="cn('w-[200px] justify-between', !values.language && 'text-muted-foreground')"
              >
                {{ values.language ? languages.find(
                  (language) => language.value === values.language,
                )?.label : 'Select language...' }}
                <ChevronsUpDownIcon class="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent class="w-[200px] p-0">
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
                      :class="cn('mr-2 h-4 w-4', language.value === values.language ? 'opacity-100' : 'opacity-0')"
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
