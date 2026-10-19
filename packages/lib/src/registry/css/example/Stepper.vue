<script setup lang="ts">
import { Stepper, StepperDescription, StepperIndicator, StepperItem, StepperSeparator, StepperTitle, StepperTrigger } from '@ui/registry/css/ui/stepper';

const steps = [
  { step: 1, title: 'Account', description: 'Your details' },
  { step: 2, title: 'Workspace', description: 'Name and plan' },
  { step: 3, title: 'Invite', description: 'Add teammates' },
];
</script>

<template>
  <Stepper class="example-stepper">
    <StepperItem
      v-for="step in steps"
      :key="step.step"
      :step="step.step"
      class="example-stepper__item"
    >
      <StepperTrigger>
        <StepperIndicator>{{ step.step }}</StepperIndicator>
        <StepperTitle>{{ step.title }}</StepperTitle>
        <StepperDescription>{{ step.description }}</StepperDescription>
      </StepperTrigger>
      <StepperSeparator
        v-if="step.step < steps.length"
        class="example-stepper__separator"
      />
    </StepperItem>
  </Stepper>
</template>

<style>
@layer components {
  .example-stepper {
    width: 100%;
    max-width: 36rem;
  }

  .example-stepper .example-stepper__item {
    position: relative;
    flex: 1;
  }

  .example-stepper .example-stepper__separator {
    position: absolute;
    top: calc(var(--spacing) * 5);
    right: 0;
    left: calc(50% + 1.25rem);
    flex: none;
  }
}
</style>
