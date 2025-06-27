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
  FormMessage,
} from '@ui/registry/tailwind/ui/form';
import { Checkbox } from '@ui/registry/tailwind/ui/checkbox';

const formSchema = toTypedSchema(z.object({
  mobile: z.boolean().refine(value => value === true, {
    message: 'You must check this checkbox to proceed',
  }),
}));

const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    mobile: false,
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
    class="flex flex-col gap-6"
    @submit="onSubmit"
  >
    <FormField
      v-slot="{ value, handleChange, errorMessage }"
      type="checkbox"
      name="mobile"
    >
      <FormItem class="flex flex-row items-start gap-x-3 space-y-0 rounded-md border p-4">
        <FormControl>
          <Checkbox
            :model-value="value"
            @update:model-value="handleChange"
          />
        </FormControl>
        <div class="space-y-1 leading-none">
          <FormLabel>I accept the terms and conditions</FormLabel>
          <FormDescription>
            You must accept our terms and conditions before proceeding with your submission.
          </FormDescription>
          <FormMessage>
            {{ errorMessage }}
          </FormMessage>
        </div>
      </FormItem>
    </FormField>
    <Button type="submit">
      Submit
    </Button>
  </form>
</template>
