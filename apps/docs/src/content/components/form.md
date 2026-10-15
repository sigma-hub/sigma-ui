---
title: Form
description: Building forms with VeeValidate and Zod.
source: form
primitive: https://vee-validate.logaretm.com/v4/guide/overview/
---

## Preview

<ComponentPreview name="InputForm" />

## Installation

<ComponentInstall name="form" />

### Schema validation

The examples on this page validate with Zod. Install it next to vee-validate:

```bash
npm install zod @vee-validate/zod
```

## Usage

`<Form />` and `<FormField />` wrap [vee-validate](https://vee-validate.logaretm.com/v4/). A field is built from these parts:

```vue
<FormField v-slot="{ componentField }" name="username">
  <FormItem>
    <FormLabel>Username</FormLabel>
    <FormControl>
      <Input v-bind="componentField" />
    </FormControl>
    <FormDescription />
    <FormMessage />
  </FormItem>
</FormField>
```

`FormControl` applies the right `id`, `aria-describedby`, and `aria-invalid` for the field state. Validation can use Zod, [Yup](https://github.com/jquense/yup), or [Valibot](https://valibot.dev/).

### Create a schema

`toTypedSchema` types the form values from the Zod schema, including the input and output types.

```vue
<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

const formSchema = toTypedSchema(z.object({
  username: z.string().min(2).max(50),
}));
</script>
```

### Define the form

`useForm` is the recommended way to create the form, because the submitted values are typed from the schema. `<Form />` is the alternative when you want the schema on the component.

```vue
<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

const formSchema = toTypedSchema(z.object({
  username: z.string().min(2).max(50),
}));

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit((values) => {
  console.log('Form submitted!', values);
});
</script>

<template>
  <form @submit="onSubmit">
    <!-- fields -->
  </form>
</template>
```

The same schema passed to `<Form>`:

```vue
<template>
  <Form :validation-schema="formSchema" @submit="onSubmit">
    <!-- fields -->
  </Form>
</template>
```

### Build the fields

Bind each input with the `componentField` slot prop. `FormMessage` renders the error for that field.

```vue
<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = toTypedSchema(z.object({
  username: z.string().min(2).max(50),
}));

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit((values) => {
  console.log('Form submitted!', values);
});
</script>

<template>
  <form @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="username">
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input type="text" placeholder="sigma-ui" v-bind="componentField" />
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
```

A native `<input>` uses the `field` slot prop instead of `componentField`:

```vue
<FormField v-slot="{ field }" name="username">
  <FormItem>
    <FormLabel>Username</FormLabel>
    <FormControl>
      <input placeholder="sigma-ui" v-bind="field">
    </FormControl>
    <FormMessage />
  </FormItem>
</FormField>
```

## Examples

The same `FormField` pattern works with the other fields:

- [Checkbox](/components/checkbox#form)
- [Date Picker](/components/date-picker#form)
- [Input](/components/input#form)
- [Radio Group](/components/radio-group#form)
- [Select](/components/select#form)
- [Slider](/components/slider#form)
- [Switch](/components/switch#form)
- [Textarea](/components/textarea#form)

### Auto animate

[FormKit AutoAnimate](https://auto-animate.formkit.com/) can animate fields as errors appear.

<ComponentPreview name="InputFormAutoAnimate" />

## API Reference

<!-- @include: @/content/meta/form.md -->

## Accessibility

`FormLabel` and `FormControl` connect the label to the input. `FormMessage` is referenced with `aria-describedby`, and invalid fields get `aria-invalid`. Keep one label per field, and do not remove `FormMessage` if you still want the error announced.

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | Moves focus to the next field or button. |
| <kbd>Shift</kbd> + <kbd>Tab</kbd> | Moves focus to the previous field or button. |
| <kbd>Enter</kbd> | Submits the form when focus is on a single-line field or the submit button. |
