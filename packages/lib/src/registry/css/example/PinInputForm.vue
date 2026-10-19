<script setup lang="ts">
import { h } from 'vue';
import { useForm } from 'vee-validate';
import * as z from 'zod';
import { toast } from '@ui/registry/css/ui/toaster';
import {
  PinInput,
  PinInputGroup,
  PinInputInput,
} from '@ui/registry/css/ui/pin-input';
import { Button } from '@ui/registry/css/ui/button';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, toTypedSchema } from '@ui/registry/css/ui/form';

const formSchema = toTypedSchema(z.object({
  pin: z.array(z.coerce.number()).length(5, { error: 'Invalid input' }),
}));

const { handleSubmit, setFieldValue } = useForm({
  validationSchema: formSchema,
  initialValues: {
    pin: [1, 2, 3],
  },
});

const onSubmit = handleSubmit(({ pin }) => {
  toast('You submitted the following values:', {
    description: h('pre', { class: 'example-sigma-ui-pin-input-form__toast-pre' }, h('code', {}, JSON.stringify(pin.join(''), null, 2))),
  });
});

const handleComplete = (digits: (number | undefined)[]) => console.log(digits.join(''));
</script>

<template>
  <form
    class="example-sigma-ui-pin-input-form"
    @submit="onSubmit"
  >
    <FormField
      v-slot="{ componentField, value }"
      name="pin"
    >
      <FormItem>
        <FormLabel>OTP</FormLabel>
        <FormControl>
          <PinInput
            id="pin-input"
            v-model="value!"
            placeholder="○"
            class="example-sigma-ui-pin-input-form__input"
            otp
            type="number"
            :name="componentField.name"
            @complete="handleComplete"
            @update:model-value="(digits) => {
              setFieldValue('pin', digits.filter((digit) => digit !== undefined))
            }"
          >
            <PinInputGroup>
              <PinInputInput
                v-for="(id, index) in 5"
                :key="id"
                :index="index"
              />
            </PinInputGroup>
          </PinInput>
        </FormControl>
        <FormDescription>
          Allows users to input a sequence of one-character alphanumeric inputs.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button class="example-sigma-ui-pin-input-form__button">
      Submit
    </Button>
  </form>
</template>

<style>
@layer base, components;

@layer components {
  .example-sigma-ui-pin-input-form {
    display: flex;
    width: 66%;
    flex-direction: column;
    margin-right: auto;
    margin-left: auto;
    gap: calc(var(--spacing) * 6);
  }

  .example-sigma-ui-pin-input-form__input {
    display: flex;
    align-items: center;
    margin-top: calc(var(--spacing) * 1);
    gap: calc(var(--spacing) * 2);
  }

  .example-sigma-ui-pin-input-form__button {
    width: fit-content;
  }

  .example-sigma-ui-pin-input-form__toast-pre {
    padding: calc(var(--spacing) * 4);
    border-radius: var(--radius);
    margin-top: calc(var(--spacing) * 2);
    background-color: color-mix(in oklch, var(--muted) 50%, transparent);
  }
}
</style>
