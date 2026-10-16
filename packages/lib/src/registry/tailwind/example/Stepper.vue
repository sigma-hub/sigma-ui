<script setup lang="ts">
import { Stepper, StepperDescription, StepperIndicator, StepperItem, StepperSeparator, StepperTitle, StepperTrigger } from '@ui/registry/tailwind/ui/stepper';

const steps = [
  { step: 1, title: 'Account', description: 'Your details' },
  { step: 2, title: 'Workspace', description: 'Name and plan' },
  { step: 3, title: 'Invite', description: 'Add teammates' },
];
</script>

<template>
  <Stepper class="w-full max-w-xl">
    <StepperItem
      v-for="step in steps"
      :key="step.step"
      :step="step.step"
      class="relative flex-1"
    >
      <StepperTrigger>
        <StepperIndicator>{{ step.step }}</StepperIndicator>
        <StepperTitle>{{ step.title }}</StepperTitle>
        <StepperDescription>{{ step.description }}</StepperDescription>
      </StepperTrigger>
      <StepperSeparator
        v-if="step.step < steps.length"
        class="absolute top-5 right-0 left-[calc(50%+1.25rem)]"
      />
    </StepperItem>
  </Stepper>
</template>
