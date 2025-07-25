<script setup lang="ts">
import { h } from 'vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { toast } from '@ui/registry/tailwind/ui/toaster';
import { Button } from '@ui/registry/tailwind/ui/button';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@ui/registry/tailwind/ui/form';
import { Switch } from '@ui/registry/tailwind/ui/switch';

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
    description: h('pre', { class: 'mt-2 rounded-md bg-muted/50 p-4' }, h('code', {}, JSON.stringify(values, null, 2))),
  });
});
</script>

<template>
  <form
    class="w-full space-y-6"
    @submit="onSubmit"
  >
    <div>
      <h3 class="mb-4 text-lg font-medium">
        Email Notifications
      </h3>

      <div class="space-y-4">
        <FormField
          v-slot="{ value, handleChange }"
          name="marketing_emails"
        >
          <FormItem class="flex flex-row items-center justify-between rounded-lg border p-4">
            <div class="space-y-0.5">
              <FormLabel class="text-base">
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
          <FormItem class="flex flex-row items-center justify-between rounded-lg border p-4">
            <div class="space-y-0.5">
              <FormLabel class="text-base">
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
    <Button type="submit">
      Submit
    </Button>
  </form>
</template>
