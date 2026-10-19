<script setup lang="ts">
import { h } from 'vue';
import { useForm } from 'vee-validate';
import * as z from 'zod';
import { toast } from '@ui/registry/css/ui/toaster';
import { Button } from '@ui/registry/css/ui/button';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, toTypedSchema } from '@ui/registry/css/ui/form';
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@ui/registry/css/ui/number-field';

const MIN_PAYMENT = 10;
const MAX_PAYMENT = 5000;

const formSchema = toTypedSchema(z.object({
  payment: z
    .number()
    .min(MIN_PAYMENT, `Min ${MIN_PAYMENT} euros to send payment`)
    .max(MAX_PAYMENT, `Max ${MAX_PAYMENT} euros to send payment`),
}));

const { handleSubmit, defineField } = useForm({
  validationSchema: formSchema,
  initialValues: {
    payment: MIN_PAYMENT,
  },
});

const [payment, paymentAttrs] = defineField('payment');

const onSubmit = handleSubmit((values) => {
  toast('You submitted the following values:', {
    description: h('pre', { class: 'example-sigma-ui-number-field-form__toast-pre' }, h('code', {}, JSON.stringify(values, null, 2))),
  });
});
</script>

<template>
  <form
    class="example-sigma-ui-number-field-form"
    @keypress.enter.prevent
    @submit.prevent="onSubmit"
  >
    <FormField name="payment">
      <FormItem>
        <FormLabel>Payment</FormLabel>
        <NumberField
          v-model="payment"
          v-bind="paymentAttrs"
          class="example-sigma-ui-number-field-form__field"
          :min="MIN_PAYMENT"
          :format-options="{
            style: 'currency',
            currency: 'EUR',
            currencyDisplay: 'code',
            currencySign: 'accounting',
          }"
        >
          <NumberFieldContent>
            <NumberFieldDecrement />
            <FormControl>
              <NumberFieldInput />
            </FormControl>
            <NumberFieldIncrement />
          </NumberFieldContent>
        </NumberField>
        <FormDescription>
          Enter value between {{ MIN_PAYMENT }} and {{ MAX_PAYMENT }}.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button
      type="submit"
      class="example-sigma-ui-number-field-form__button"
    >
      Submit
    </Button>
  </form>
</template>

<style>
@layer base, components;

@layer components {
  .example-sigma-ui-number-field-form {
    display: flex;
    width: 66%;
    flex-direction: column;
    gap: calc(var(--spacing) * 6);
  }

  .example-sigma-ui-number-field-form__field {
    gap: calc(var(--spacing) * 2);
  }

  .example-sigma-ui-number-field-form__button {
    width: fit-content;
  }

  .example-sigma-ui-number-field-form__toast-pre {
    padding: calc(var(--spacing) * 4);
    border-radius: var(--radius);
    margin-top: calc(var(--spacing) * 2);
    background-color: color-mix(in oklch, var(--muted) 50%, transparent);
  }
}
</style>
