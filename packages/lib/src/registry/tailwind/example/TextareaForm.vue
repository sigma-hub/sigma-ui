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
import { Textarea } from '@ui/registry/tailwind/ui/textarea';

const formSchema = toTypedSchema(z.object({
  bio: z
    .string()
    .min(10, {
      message: 'Bio must be at least 10 characters.',
    })
    .max(160, {
      message: 'Bio must not be longer than 30 characters.',
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
    class="w-full space-y-6"
    @submit="onSubmit"
  >
    <FormField
      v-slot="{ componentField }"
      name="bio"
    >
      <FormItem>
        <FormLabel>Bio</FormLabel>
        <FormControl>
          <Textarea
            placeholder="Tell us a little bit about yourself"
            class="resize-none"
            v-bind="componentField"
          />
        </FormControl>
        <FormDescription>
          You can <span>@mention</span> other users and organizations.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit">
      Submit
    </Button>
  </form>
</template>
