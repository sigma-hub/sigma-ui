<script setup lang="ts">
import { h } from 'vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { toast } from '@ui/registry/css/ui/toaster';
import { Button } from '@ui/registry/css/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ui/registry/css/ui/form';
import { RadioGroup, RadioGroupItem } from '@ui/registry/css/ui/radio-group';

const formSchema = toTypedSchema(z.object({
  type: z.enum(['all', 'mentions', 'none'], {
    required_error: 'You need to select a notification type.',
  }),
}));

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit((values) => {
  toast('You submitted the following values:', {
    description: h('pre', { class: 'example-sigma-ui-radio-group-form__toast-pre' }, h('code', {}, JSON.stringify(values, null, 2))),
  });
});
</script>

<template>
  <form
    class="example-sigma-ui-radio-group-form"
    @submit="onSubmit"
  >
    <FormField
      v-slot="{ componentField }"
      type="radio"
      name="type"
    >
      <FormItem class="example-sigma-ui-radio-group-form__group">
        <FormLabel>Notify me about...</FormLabel>
        <FormControl>
          <RadioGroup
            class="example-sigma-ui-radio-group-form__options"
            v-bind="componentField"
          >
            <FormItem class="example-sigma-ui-radio-group-form__option">
              <FormControl>
                <RadioGroupItem value="all" />
              </FormControl>
              <FormLabel class="example-sigma-ui-radio-group-form__label">
                All new messages
              </FormLabel>
            </FormItem>
            <FormItem class="example-sigma-ui-radio-group-form__option">
              <FormControl>
                <RadioGroupItem value="mentions" />
              </FormControl>
              <FormLabel class="example-sigma-ui-radio-group-form__label">
                Direct messages and mentions
              </FormLabel>
            </FormItem>
            <FormItem class="example-sigma-ui-radio-group-form__option">
              <FormControl>
                <RadioGroupItem value="none" />
              </FormControl>
              <FormLabel class="example-sigma-ui-radio-group-form__label">
                Nothing
              </FormLabel>
            </FormItem>
          </RadioGroup>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button
      type="submit"
      class="example-sigma-ui-radio-group-form__button"
    >
      Submit
    </Button>
  </form>
</template>

<style>
.example-sigma-ui-radio-group-form {
  display: flex;
  width: 66%;
  flex-direction: column;
  gap: 1.5rem;
}

.example-sigma-ui-radio-group-form__group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.example-sigma-ui-radio-group-form__options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.example-sigma-ui-radio-group-form__option {
  display: flex;
  align-items: center;
  margin-top: 0;
  gap: 0.75rem;
}

.example-sigma-ui-radio-group-form__label {
  font-weight: normal;
}

.example-sigma-ui-radio-group-form__button {
  width: fit-content;
}

.example-sigma-ui-radio-group-form__toast-pre {
  padding: 1rem;
  border-radius: var(--radius);
  margin-top: 0.5rem;
  background-color: hsl(var(--muted) / 50%);
}
</style>
