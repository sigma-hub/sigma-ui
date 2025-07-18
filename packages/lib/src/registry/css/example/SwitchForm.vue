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
} from '@ui/registry/css/ui/form';
import { Switch } from '@ui/registry/css/ui/switch';

const formSchema = toTypedSchema(z.object({
  marketing_emails: z.boolean().default(false).optional(),
  security_emails: z.boolean(),
}));

const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    security_emails: true,
  },
});

const onSubmit = handleSubmit((values) => {
  toast('You submitted the following values:', {
    description: h('pre', { class: 'example-sigma-ui-switch-form__toast-pre' }, h('code', {}, JSON.stringify(values, null, 2))),
  });
});
</script>

<template>
  <form
    class="example-sigma-ui-switch-form"
    @submit="onSubmit"
  >
    <div class="example-sigma-ui-switch-form__section">
      <h3 class="example-sigma-ui-switch-form__title">
        Email Notifications
      </h3>

      <div class="example-sigma-ui-switch-form__fields">
        <FormField
          v-slot="{ value, handleChange }"
          name="marketing_emails"
        >
          <FormItem class="example-sigma-ui-switch-form__field-item">
            <div class="example-sigma-ui-switch-form__field-content">
              <FormLabel class="example-sigma-ui-switch-form__label">
                Marketing emails
              </FormLabel>
              <FormDescription>
                Receive emails about new products, features, and more.
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                :model-value="value"
                @update:model-value="handleChange"
              />
            </FormControl>
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ value, handleChange }"
          name="security_emails"
        >
          <FormItem class="example-sigma-ui-switch-form__field-item">
            <div class="example-sigma-ui-switch-form__field-content">
              <FormLabel class="example-sigma-ui-switch-form__label">
                Security emails
              </FormLabel>
              <FormDescription>
                Receive emails about your account security.
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                :model-value="value"
                disabled
                aria-readonly
                @update:model-value="handleChange"
              />
            </FormControl>
          </FormItem>
        </FormField>
      </div>
    </div>
    <Button
      type="submit"
      class="example-sigma-ui-switch-form__submit"
    >
      Submit
    </Button>
  </form>
</template>

<style>
.example-sigma-ui-switch-form {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 1.5rem;
}

.example-sigma-ui-switch-form__title {
  margin-bottom: 1rem;
  font-size: 1.125rem;
  font-weight: 500;
}

.example-sigma-ui-switch-form__fields {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.example-sigma-ui-switch-form__field-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
}

.example-sigma-ui-switch-form__field-content {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.example-sigma-ui-switch-form__label {
  font-size: 1rem;
}

.example-sigma-ui-switch-form__submit {
  width: fit-content;
}

.example-sigma-ui-switch-form__toast-pre {
  padding: 1rem;
  border-radius: var(--radius);
  margin-top: 0.5rem;
  background-color: hsl(var(--muted) / 50%);
}
</style>
