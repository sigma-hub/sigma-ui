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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ui/registry/css/ui/select';

const formSchema = toTypedSchema(z.object({
  email: z
    .string({
      required_error: 'Please select an email to display.',
    })
    .email(),
}));

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit((values) => {
  toast('You submitted the following values:', {
    description: h('pre', { class: 'example-sigma-ui-select-form__toast-pre' }, h('code', {}, JSON.stringify(values, null, 2))),
  });
});
</script>

<template>
  <form
    class="example-sigma-ui-select-form"
    @submit="onSubmit"
  >
    <FormField
      v-slot="{ componentField }"
      name="email"
    >
      <FormItem>
        <FormLabel>Email</FormLabel>

        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select a verified email to display" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="m@example.com">
                m@example.com
              </SelectItem>
              <SelectItem value="m@google.com">
                m@google.com
              </SelectItem>
              <SelectItem value="m@support.com">
                m@support.com
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormDescription>
          You can manage email addresses in your
          <a href="/examples/forms">email settings</a>.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button
      type="submit"
      class="example-sigma-ui-select-form__submit"
    >
      Submit
    </Button>
  </form>
</template>

<style>
.example-sigma-ui-select-form {
  width: 66%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.example-sigma-ui-select-form__submit {
  width: fit-content;
}

.example-sigma-ui-select-form__toast-pre {
  margin-top: 0.5rem;
  border-radius: var(--radius);
  background-color: hsl(var(--muted) / 0.5);
  padding: 1rem;
}
</style>
