<script setup lang="ts">
import { h, ref } from 'vue';
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
import { Slider } from '@ui/registry/css/ui/slider';

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
    description: h('pre', { class: 'example-sigma-ui-slider-form__toast-pre' }, h('code', {}, JSON.stringify(values, null, 2))),
  });
});
</script>

<template>
  <form
    class="example-sigma-ui-slider-form"
    @submit="onSubmit"
  >
    <FormField
      v-slot="{ componentField, value }"
      name="duration"
    >
      <FormItem
        class="example-sigma-ui-slider-form__field-item"
      >
        <FormLabel>Duration</FormLabel>
        <FormControl>
          <Slider
            v-bind="componentField"
            v-model="model"
            :max="100"
            :min="0"
            :step="5"
          />
          <FormDescription class="example-sigma-ui-slider-form__description">
            <span>How many minutes are you available?</span>
            <span>{{ value?.[0] }} min</span>
          </FormDescription>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button
      type="submit"
      class="example-sigma-ui-slider-form__submit"
    >
      Submit
    </Button>
  </form>
</template>

<style>
.example-sigma-ui-slider-form {
  width: 66%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.example-sigma-ui-slider-form__field-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.example-sigma-ui-slider-form__description {
  display: flex;
  justify-content: space-between;
}

.example-sigma-ui-slider-form__submit {
  width: fit-content;
}

.example-sigma-ui-slider-form__toast-pre {
  margin-top: 0.5rem;
  border-radius: var(--radius);
  background-color: hsl(var(--muted) / 0.5);
  padding: 1rem;
}
</style>
