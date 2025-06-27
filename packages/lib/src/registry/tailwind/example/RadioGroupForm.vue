<script setup lang="ts">
import { h } from 'vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { toast } from '@ui/registry/tailwind/ui/toaster';
import { Button } from '@ui/registry/tailwind/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ui/registry/tailwind/ui/form';
import { RadioGroup, RadioGroupItem } from '@ui/registry/tailwind/ui/radio-group';

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
    description: h('pre', { class: 'mt-2 rounded-md bg-muted/50 p-4' }, h('code', {}, JSON.stringify(values, null, 2))),
  });
});
</script>

<template>
  <form
    class="flex flex-col gap-6 w-2/3"
    @submit="onSubmit"
  >
    <FormField
      v-slot="{ componentField }"
      type="radio"
      name="type"
    >
      <FormItem class="flex flex-col gap-3">
        <FormLabel>Notify me about...</FormLabel>
        <FormControl>
          <RadioGroup
            class="flex flex-col gap-2"
            v-bind="componentField"
          >
            <FormItem class="flex items-center gap-0 gap-x-3">
              <FormControl>
                <RadioGroupItem value="all" />
              </FormControl>
              <FormLabel class="font-normal">
                All new messages
              </FormLabel>
            </FormItem>
            <FormItem class="flex items-center gap-0 gap-x-3">
              <FormControl>
                <RadioGroupItem value="mentions" />
              </FormControl>
              <FormLabel class="font-normal">
                Direct messages and mentions
              </FormLabel>
            </FormItem>
            <FormItem class="flex items-center gap-0 gap-x-3">
              <FormControl>
                <RadioGroupItem value="none" />
              </FormControl>
              <FormLabel class="font-normal">
                Nothing
              </FormLabel>
            </FormItem>
          </RadioGroup>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button type="submit">
      Submit
    </Button>
  </form>
</template>
