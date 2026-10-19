<script setup lang="ts">
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel } from '@ui/registry/css/ui/field';
import { Input } from '@ui/registry/css/ui/input';
</script>

<template>
  <FieldGroup class="example-field-responsive">
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
        class="example-field-responsive__input"
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
        class="example-field-responsive__input"
      />
    </Field>
  </FieldGroup>
</template>

<style>
@layer components {
  .example-field-responsive {
    max-width: 36rem;
  }

  @container field-group (width >= 28rem) {
    .example-field-responsive .example-field-responsive__input {
      max-width: 260px;
    }
  }
}
</style>
