<script setup lang="ts">
import { h } from 'vue';
import { useForm } from 'vee-validate';
import * as z from 'zod';
import { toast } from '@ui/registry/tailwind/ui/toaster';
import {
  PinInput,
  PinInputGroup,
  PinInputInput,
} from '@ui/registry/tailwind/ui/pin-input';
import { Button } from '@ui/registry/tailwind/ui/button';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, toTypedSchema } from '@ui/registry/tailwind/ui/form';

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
    description: h('pre', { class: 'mt-2 rounded-md bg-muted/50 p-4' }, h('code', {}, JSON.stringify(pin.join(''), null, 2))),
  });
});

const handleComplete = (digits: (number | undefined)[]) => console.log(digits.join(''));
</script>

<template>
  <form
    class="w-2/3 space-y-6 mx-auto"
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
            class="flex gap-2 items-center mt-1"
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

    <Button>Submit</Button>
  </form>
</template>
