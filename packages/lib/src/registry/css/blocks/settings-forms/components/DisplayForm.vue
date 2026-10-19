<script setup lang="ts">
import { h } from 'vue';
import { useForm } from 'vee-validate';
import * as z from 'zod';
import { toast } from '@ui/registry/css/ui/toaster';
import { Button } from '@ui/registry/css/ui/button';
import { Checkbox } from '@ui/registry/css/ui/checkbox';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, toTypedSchema } from '@ui/registry/css/ui/form';
import { Separator } from '@ui/registry/css/ui/separator';

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
    error: 'You have to select at least one item.',
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
  <div class="settings-forms__section">
    <h3 class="settings-forms__section-title">
      Display
    </h3>
    <p class="settings-forms__section-description">
      Turn items on or off to control what's displayed in the app.
    </p>
  </div>
  <Separator />
  <form @submit="onSubmit">
    <FormField name="items">
      <FormItem>
        <div class="settings-forms__display-intro">
          <FormLabel class="settings-forms__switch-label">
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
          <FormItem class="settings-forms__checkbox-row">
            <FormControl>
              <Checkbox
                :model-value="value.includes(item.id)"
                @update:model-value="(checked) => toggleItem(handleChange, value, item.id, checked)"
              />
            </FormControl>
            <FormLabel class="settings-forms__choice">
              {{ item.label }}
            </FormLabel>
          </FormItem>
        </FormField>
        <FormMessage />
      </FormItem>
    </FormField>
    <div class="settings-forms__display-actions">
      <Button type="submit">
        Update display
      </Button>
    </div>
  </form>
</template>

<style>
@layer base, components;

@layer components {
  .settings-forms__display-intro {
    margin-bottom: calc(var(--spacing) * 4);
  }

  .settings-forms__display-actions {
    display: flex;
    justify-content: flex-start;
    margin-top: calc(var(--spacing) * 4);
  }
}
</style>
