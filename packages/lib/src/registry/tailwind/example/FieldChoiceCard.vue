<script setup lang="ts">
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from '@ui/registry/tailwind/ui/field';
import { RadioGroup, RadioGroupItem } from '@ui/registry/tailwind/ui/radio-group';

const plans = [
  { value: 'starter', title: 'Starter', description: 'For personal projects. Up to 3 sites.' },
  { value: 'pro', title: 'Pro', description: 'For growing teams. Unlimited sites and analytics.' },
];
</script>

<template>
  <FieldSet class="w-full max-w-md">
    <FieldLegend variant="label">
      Plan
    </FieldLegend>
    <FieldDescription>You can change your plan at any time.</FieldDescription>
    <RadioGroup default-value="pro">
      <FieldLabel
        v-for="plan in plans"
        :key="plan.value"
        :for="`field-plan-${plan.value}`"
      >
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>{{ plan.title }}</FieldTitle>
            <FieldDescription>{{ plan.description }}</FieldDescription>
          </FieldContent>
          <RadioGroupItem
            :id="`field-plan-${plan.value}`"
            :value="plan.value"
          />
        </Field>
      </FieldLabel>
    </RadioGroup>
  </FieldSet>
</template>
