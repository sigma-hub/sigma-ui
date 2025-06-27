<script setup lang="ts">
import { h } from 'vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { vAutoAnimate } from '@formkit/auto-animate/vue';
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
import { Input } from '@ui/registry/tailwind/ui/input';

const formSchema = toTypedSchema(z.object({
  username: z.string().min(2).max(50),
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
    class="w-2/3 space-y-6"
    @submit="onSubmit"
  >
    <FormField
      v-slot="{ componentField }"
      name="username"
    >
      <FormItem
        v-auto-animate
      >
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="sigma-ui"
            v-bind="componentField"
          />
        </FormControl>
        <FormDescription>
          This is your public display name.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit">
      Submit
    </Button>
  </form>
</template>
