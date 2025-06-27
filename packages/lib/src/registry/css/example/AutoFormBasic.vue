<script setup lang="ts">
import * as z from 'zod';
import { h } from 'vue';
import { toast } from '@ui/registry/css/ui/toaster';
import { Button } from '@ui/registry/css/ui/button';
import { AutoForm, AutoFormField } from '@ui/registry/css/ui/auto-form';

enum Sports {
  Football = 'Football/Soccer',
  Basketball = 'Basketball',
  Baseball = 'Baseball',
  Hockey = 'Hockey (Ice)',
  None = 'I don\'t like sports',
}

const schema = z.object({
  username: z
    .string({
      required_error: 'Username is required.',
    })
    .min(2, {
      message: 'Username must be at least 2 characters.',
    }),
  password: z
    .string({
      required_error: 'Password is required.',
    })
    .min(8, {
      message: 'Password must be at least 8 characters.',
    }),
  favouriteNumber: z.coerce
    .number({
      invalid_type_error: 'Favourite number must be a number.',
    })
    .min(1, {
      message: 'Favourite number must be at least 1.',
    })
    .max(10, {
      message: 'Favourite number must be at most 10.',
    })
    .default(1)
    .optional(),
  acceptTerms: z
    .boolean()
    .refine(value => value, {
      message: 'You must accept the terms and conditions.',
      path: ['acceptTerms'],
    }),
  sendMeMails: z.boolean().optional(),
  birthday: z.coerce.date().optional(),
  color: z.enum(['red', 'green', 'blue']).optional(),
  marshmallows: z.enum(['not many', 'a few', 'a lot', 'too many']),
  sports: z.nativeEnum(Sports).describe('What is your favourite sport?'),
  bio: z
    .string()
    .min(10, {
      message: 'Bio must be at least 10 characters.',
    })
    .max(160, {
      message: 'Bio must not be longer than 30 characters.',
    })
    .optional(),
  customParent: z.string().optional(),
  file: z.string().optional(),
});

const fieldConfig = {
  password: {
    label: 'Your secure password',
    inputProps: {
      type: 'password',
      placeholder: '••••••••',
    },
  },
  favouriteNumber: {
    description: 'Your favourite number between 1 and 10.',
  },
  acceptTerms: {
    label: 'Accept terms and conditions.',
    inputProps: {
      required: true,
    },
  },
  birthday: {
    description: 'We need your birthday to send you a gift.',
  },
  sendMeMails: {
    component: 'switch',
  },
  bio: {
    component: 'textarea',
  },
  marshmallows: {
    label: 'How many marshmallows fit in your mouth?',
    component: 'radio',
  },
  file: {
    label: 'Text file',
    component: 'file',
  },
};

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
    :field-config="fieldConfig"
    @submit="onSubmit"
  >
    <template #acceptTerms="slotProps">
      <AutoFormField v-bind="slotProps" />
      <div class="example-sigma-ui-autoform__terms">
        I agree to the <button class="example-sigma-ui-autoform__terms-link">
          terms and conditions
        </button>.
      </div>
    </template>

    <template #customParent="slotProps">
      <div class="example-sigma-ui-autoform__custom-parent">
        <AutoFormField
          v-bind="slotProps"
          class="example-sigma-ui-autoform__custom-field"
        />
        <Button type="button">
          Check
        </Button>
      </div>
    </template>

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

.example-sigma-ui-autoform__terms {
  margin-top: 0.5rem !important;
  font-size: 0.875rem;
}

.example-sigma-ui-autoform__terms-link {
  color: hsl(var(--primary));
  text-decoration: underline;
}

.example-sigma-ui-autoform__custom-parent {
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
}

.example-sigma-ui-autoform__custom-field {
  width: 100%;
}
</style>
