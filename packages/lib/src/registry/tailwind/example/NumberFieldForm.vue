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
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@ui/registry/tailwind/ui/number-field';

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
    description: h('pre', { class: 'mt-2 rounded-md bg-muted/50 p-4' }, h('code', {}, JSON.stringify(values, null, 2))),
  });
});
</script>

<template>
  <form
    class="w-2/3 space-y-6"
    @keypress.enter.prevent
    @submit.prevent="onSubmit"
  >
    <FormField name="payment">
      <FormItem>
        <FormLabel>Payment</FormLabel>
        <NumberField
          v-model="payment"
          v-bind="paymentAttrs"
          class="gap-2"
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
    <Button type="submit">
      Submit
    </Button>
  </form>
</template>
