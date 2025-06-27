<script setup lang="ts">
import { h, ref } from 'vue';
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
import { Slider } from '@ui/registry/tailwind/ui/slider';

const formSchema = toTypedSchema(z.object({
  duration: z.array(
    z.number().min(0).max(60),
  ),
}));

const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    duration: [30],
  },
});

const model = ref([30]);

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
      v-slot="{ componentField, value }"
      name="duration"
    >
      <FormItem class="space-y-2">
        <FormLabel>Duration</FormLabel>
        <FormControl>
          <Slider
            v-bind="componentField"
            v-model="model"
            :max="100"
            :min="0"
            :step="5"
          />
          <FormDescription class="flex justify-between">
            <span>How many minutes are you available?</span>
            <span>{{ value?.[0] }} min</span>
          </FormDescription>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button type="submit">
      Submit
    </Button>
  </form>
</template>
