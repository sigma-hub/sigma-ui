<script setup lang="ts">
import { h } from 'vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { toast } from '@ui/registry/css/ui/toaster';
import { Button } from '@ui/registry/css/ui/button';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ui/registry/css/ui/form';
import { Checkbox } from '@ui/registry/css/ui/checkbox';

const items = [
  {
    id: 'recents',
    label: 'Recents',
  },
  {
    id: 'home',
    label: 'Home',
  },
  {
    id: 'applications',
    label: 'Applications',
  },
  {
    id: 'desktop',
    label: 'Desktop',
  },
  {
    id: 'downloads',
    label: 'Downloads',
  },
  {
    id: 'documents',
    label: 'Documents',
  },
] as const;

const formSchema = toTypedSchema(z.object({
  items: z.array(z.string()).refine(value => value.some(item => item), {
    message: 'You have to select at least one item.',
  }),
}));

const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    items: ['recents', 'home'],
  },
});

const onSubmit = handleSubmit((values) => {
  toast('You submitted the following values:', {
    description: h('pre', { class: 'example-sigma-ui-checkbox-multiple__toast-pre' }, h('code', {}, JSON.stringify(values, null, 2))),
  });
});
</script>

<template>
  <form @submit="onSubmit">
    <FormField name="items">
      <FormItem class="example-sigma-ui-checkbox-multiple__header-item">
        <div class="example-sigma-ui-checkbox-multiple__header">
          <FormLabel class="example-sigma-ui-checkbox-multiple__title">
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
          type="checkbox"
          :value="item.id"
          :unchecked-value="false"
          name="items"
        >
          <FormItem class="example-sigma-ui-checkbox-multiple__item">
            <FormControl>
              <Checkbox
                :model-value="value.includes(item.id)"
                @update:model-value="handleChange"
              />
            </FormControl>
            <FormLabel class="example-sigma-ui-checkbox-multiple__label">
              {{ item.label }}
            </FormLabel>
          </FormItem>
        </FormField>
        <FormMessage />
      </FormItem>
    </FormField>

    <div class="example-sigma-ui-checkbox-multiple__footer">
      <Button type="submit">
        Submit
      </Button>
    </div>
  </form>
</template>

<style>
.example-sigma-ui-checkbox-multiple__header-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.example-sigma-ui-checkbox-multiple__header {
  margin-bottom: 0.5rem;
}

.example-sigma-ui-checkbox-multiple__title {
  font-size: 1rem;
}

.example-sigma-ui-checkbox-multiple__item {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
}

.example-sigma-ui-checkbox-multiple__label {
  font-weight: 400;
}

.example-sigma-ui-checkbox-multiple__footer {
  display: flex;
  justify-content: flex-start;
  margin-top: 1rem;
}

.example-sigma-ui-checkbox-multiple__toast-pre {
  margin-top: 0.5rem;
  border-radius: var(--radius);
  background-color: hsl(var(--muted) / 0.5);
  padding: 1rem;
}
</style>
