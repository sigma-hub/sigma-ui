<script setup lang="ts">
import { Button } from '@ui/registry/tailwind/ui/button';
import { Checkbox } from '@ui/registry/tailwind/ui/checkbox';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@ui/registry/tailwind/ui/field';
import { Input } from '@ui/registry/tailwind/ui/input';
import { Textarea } from '@ui/registry/tailwind/ui/textarea';
</script>

<template>
  <form
    class="w-full max-w-md"
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
          class="font-normal"
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
