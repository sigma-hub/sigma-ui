<script setup lang="ts">
import { Button } from '@ui/registry/css/ui/button';
import { Checkbox } from '@ui/registry/css/ui/checkbox';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@ui/registry/css/ui/field';
import { Input } from '@ui/registry/css/ui/input';
import { Textarea } from '@ui/registry/css/ui/textarea';
</script>

<template>
  <form
    class="example-field-form"
    @submit.prevent
  >
    <FieldGroup>
      <FieldSet>
        <FieldLegend>Profile</FieldLegend>
        <FieldDescription>This information is shown on your public profile.</FieldDescription>
        <FieldGroup>
          <Field>
            <FieldLabel for="field-demo-name">
              Full name
            </FieldLabel>
            <Input
              id="field-demo-name"
              autocomplete="name"
              placeholder="Jane Doe"
            />
          </Field>
          <Field>
            <FieldLabel for="field-demo-username">
              Username
            </FieldLabel>
            <Input
              id="field-demo-username"
              autocomplete="username"
              placeholder="jane"
            />
            <FieldDescription>Letters, numbers, and dashes only.</FieldDescription>
          </Field>
          <Field>
            <FieldLabel for="field-demo-bio">
              Bio
            </FieldLabel>
            <Textarea
              id="field-demo-bio"
              placeholder="Tell us a little about yourself"
            />
          </Field>
        </FieldGroup>
      </FieldSet>
      <FieldSeparator />
      <Field orientation="horizontal">
        <Checkbox id="field-demo-newsletter" />
        <FieldLabel
          for="field-demo-newsletter"
          class="example-field-form__label"
        >
          Send me product updates
        </FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Button type="submit">
          Save
        </Button>
        <Button
          variant="outline"
          type="button"
        >
          Cancel
        </Button>
      </Field>
    </FieldGroup>
  </form>
</template>

<style>
@layer components {
  .example-field-form {
    width: 100%;
    max-width: 28rem;
  }

  .example-field-form .example-field-form__label {
    font-weight: 400;
  }
}
</style>
