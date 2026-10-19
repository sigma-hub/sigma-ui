<script setup lang="ts">
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel } from '@ui/registry/tailwind/ui/field';
import { Input } from '@ui/registry/tailwind/ui/input';
</script>

<template>
  <FieldGroup class="w-full max-w-xl">
    <Field orientation="responsive">
      <FieldContent>
        <FieldLabel for="field-responsive-name">
          Display name
        </FieldLabel>
        <FieldDescription>Shown next to your comments.</FieldDescription>
      </FieldContent>
      <Input
        id="field-responsive-name"
        autocomplete="name"
        placeholder="Jane Doe"
        class="@md/field-group:max-w-[260px]"
      />
    </Field>
    <Field orientation="responsive">
      <FieldContent>
        <FieldLabel for="field-responsive-email">
          Email
        </FieldLabel>
        <FieldDescription>Where we send receipts.</FieldDescription>
      </FieldContent>
      <Input
        id="field-responsive-email"
        autocomplete="email"
        type="email"
        placeholder="jane@example.com"
        class="@md/field-group:max-w-[260px]"
      />
    </Field>
  </FieldGroup>
</template>
