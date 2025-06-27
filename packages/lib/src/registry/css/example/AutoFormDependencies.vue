<script setup lang="ts">
import * as z from 'zod';
import { h } from 'vue';
import { toast } from '@ui/registry/css/ui/toaster';
import { DependencyType } from '../ui/auto-form/interface';
import { Button } from '@ui/registry/css/ui/button';
import { AutoForm } from '@ui/registry/css/ui/auto-form';

const schema = z.object({
  age: z.number(),
  parentsAllowed: z.boolean().optional(),
  vegetarian: z.boolean().optional(),
  mealOptions: z.enum(['Pasta', 'Salad', 'Beef Wellington']).optional(),
});

function onSubmit(values: Record<string, any>) {
  toast('You submitted the following values:', {
    description: h('pre', { class: 'example-sigma-ui-autoform__toast-pre' }, h('code', {}, JSON.stringify(values, null, 2))),
  });
}
</script>

<template>
  <AutoForm
    class="example-sigma-ui-autoform"
    :schema="schema"
    :field-config="{
      age: {
        description:
          'Setting this below 18 will require parents consent.',
      },
      parentsAllowed: {
        label: 'Did your parents allow you to register?',
      },
      vegetarian: {
        label: 'Are you a vegetarian?',
        description:
          'Setting this to true will remove non-vegetarian food options.',
      },
      mealOptions: {
        component: 'radio',
      },
    }"
    :dependencies="[
      {
        sourceField: 'age',
        type: DependencyType.HIDES,
        targetField: 'parentsAllowed',
        when: (age) => age >= 18,
      },
      {
        sourceField: 'age',
        type: DependencyType.REQUIRES,
        targetField: 'parentsAllowed',
        when: (age) => age < 18,
      },
      {
        sourceField: 'vegetarian',
        type: DependencyType.SETS_OPTIONS,
        targetField: 'mealOptions',
        when: (vegetarian) => vegetarian,
        options: ['Pasta', 'Salad'],
      },
    ]"
    @submit="onSubmit"
  >
    <Button type="submit">
      Submit
    </Button>
  </AutoForm>
</template>

<style>
.example-sigma-ui-autoform {
  width: 66.6%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.example-sigma-ui-autoform__toast-pre {
  margin-top: 0.5rem;
  border-radius: 0.375rem;
  background-color: hsl(var(--muted) / 0.5);
  padding: 1rem;
}
</style>
