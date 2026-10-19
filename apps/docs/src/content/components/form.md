---
title: Form
description: Building forms with VeeValidate and any Standard Schema library, such as Zod, Valibot, or ArkType.
source: form
primitive: https://vee-validate.logaretm.com/v4/guide/overview/
---

## Preview

<ComponentPreview name="InputForm" />

## Installation

<ComponentInstall name="form" />

### Schema validation

The form validates with any [Standard Schema](https://standardschema.dev) library: Zod 4, Valibot, ArkType, and others. The examples on this page use Zod. Install it next to vee-validate:

```bash
npm install zod
```

`toTypedSchema` ships with the form component, so no `@vee-validate/zod` adapter is needed. That adapter only supports Zod 3, and it breaks on Zod 4 schemas that use `.default()`.

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

`FormControl` applies the right `id`, `aria-describedby`, and `aria-invalid` for the field state. Validation can use any Standard Schema library, such as [Zod](https://zod.dev), [Valibot](https://valibot.dev/), or [ArkType](https://arktype.io).

### Create a schema

`toTypedSchema` from the form component turns a Standard Schema into a vee-validate schema. It types the form values from the schema, including the input and output types, and fills initial values from defaults such as Zod's `.default()`.

```vue
<script setup lang="ts">
import * as z from 'zod';
import { toTypedSchema } from '@/components/ui/form';

const formSchema = toTypedSchema(z.object({
  username: z.string().min(2).max(50),
  newsletter: z.boolean().default(false),
}));
</script>
```

The same field with Valibot or ArkType:

```ts
import * as v from 'valibot';
import { type } from 'arktype';
import { toTypedSchema } from '@/components/ui/form';

const valibotSchema = toTypedSchema(v.object({
  username: v.pipe(v.string(), v.minLength(2), v.maxLength(50)),
}));

const arktypeSchema = toTypedSchema(type({
  username: '2 <= string <= 50',
}));
```

### Define the form

`useForm` is the recommended way to create the form, because the submitted values are typed from the schema. `<Form />` is the alternative when you want the schema on the component.

```vue
<script setup lang="ts">
import { useForm } from 'vee-validate';
import * as z from 'zod';
import { toTypedSchema } from '@/components/ui/form';

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
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, toTypedSchema } from '@/components/ui/form';
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
