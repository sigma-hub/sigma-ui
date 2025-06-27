<script setup lang="ts">
import { h } from 'vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { toast } from '@ui/registry/css/ui/toaster';
import {
  PinInput,
  PinInputGroup,
  PinInputInput,
} from '@ui/registry/css/ui/pin-input';
import { Button } from '@ui/registry/css/ui/button';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ui/registry/css/ui/form';

const formSchema = toTypedSchema(z.object({
  pin: z.array(z.coerce.string()).length(5, { message: 'Invalid input' }),
}));

const { handleSubmit, setFieldValue } = useForm({
  validationSchema: formSchema,
  initialValues: {
    pin: ['1', '2', '3'],
  },
});

const onSubmit = handleSubmit(({ pin }) => {
  toast('You submitted the following values:', {
    description: h('pre', { class: 'example-sigma-ui-pin-input-form__toast-pre' }, h('code', {}, JSON.stringify(pin.join(''), null, 2))),
  });
});

const handleComplete = (e: string[]) => console.log(e.join(''));
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
            @update:model-value="(arrStr) => {
              setFieldValue('pin', arrStr.filter(Boolean))
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
.example-sigma-ui-pin-input-form {
  width: 66%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.example-sigma-ui-pin-input-form__input {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.25rem;
}

.example-sigma-ui-pin-input-form__button {
  width: fit-content;
}

.example-sigma-ui-pin-input-form__toast-pre {
  margin-top: 0.5rem;
  border-radius: var(--radius);
  background-color: hsl(var(--muted) / 0.5);
  padding: 1rem;
}
</style>
