<script setup lang="ts">
import { h } from 'vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { toast } from '@ui/registry/tailwind/ui/toaster';
import { Button } from '@ui/registry/tailwind/ui/button';
import { Checkbox } from '@ui/registry/tailwind/ui/checkbox';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@ui/registry/tailwind/ui/form';
import { Separator } from '@ui/registry/tailwind/ui/separator';

const items = [
  { id: 'recents', label: 'Recents' },
  { id: 'home', label: 'Home' },
  { id: 'applications', label: 'Applications' },
  { id: 'desktop', label: 'Desktop' },
  { id: 'downloads', label: 'Downloads' },
  { id: 'documents', label: 'Documents' },
] as const;

const displayFormSchema = toTypedSchema(z.object({
  items: z.array(z.string()).refine(value => value.some(item => item), {
    message: 'You have to select at least one item.',
  }),
}));

const { handleSubmit } = useForm({
  validationSchema: displayFormSchema,
  initialValues: {
    items: ['recents', 'home'],
  },
});

const onSubmit = handleSubmit((values) => {
  toast('You submitted the following values:', {
    description: h('pre', { class: 'settings-forms__toast' }, h('code', {}, JSON.stringify(values, null, 2))),
  });
});

function toggleItem(handleChange: (next: string[]) => void, value: string[], itemId: string, checked: boolean | 'indeterminate') {
  handleChange(checked ? [...value, itemId] : value.filter(id => id !== itemId));
}
</script>

<template>
  <div>
    <h3 class="text-lg font-medium">
      Display
    </h3>
    <p class="text-sm text-muted-foreground">
      Turn items on or off to control what's displayed in the app.
    </p>
  </div>
  <Separator />
  <form @submit="onSubmit">
    <FormField name="items">
      <FormItem>
        <div class="mb-4">
          <FormLabel class="text-base">
            Sidebar
          </FormLabel>
          <FormDescription>
            Select the items you want to display in the sidebar.
          </FormDescription>
        </div>
        <FormField
          v-for="item in items"
          v-slot="{ value, handleChange }"
          :key="item.id"
          name="items"
        >
          <FormItem class="flex flex-row items-start gap-3 space-y-0">
            <FormControl>
              <Checkbox
                :model-value="value.includes(item.id)"
                @update:model-value="(checked) => toggleItem(handleChange, value, item.id, checked)"
              />
            </FormControl>
            <FormLabel class="font-normal">
              {{ item.label }}
            </FormLabel>
          </FormItem>
        </FormField>
        <FormMessage />
      </FormItem>
    </FormField>
    <div class="mt-4 flex justify-start">
      <Button type="submit">
        Update display
      </Button>
    </div>
  </form>
</template>
