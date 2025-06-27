<script setup lang="ts">
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@ui/registry/css/ui/accordion';

const accordionItems = [
  { value: 'item-1', title: 'Is it accessible?', content: 'Yes. It adheres to the WAI-ARIA design pattern.' },
  { value: 'item-2', title: 'Is it unstyled?', content: 'It\'s minimally styled, giving you freedom to easily customize it to your design system.' },
  { value: 'item-3', title: 'Can it be animated?', content: 'Yes, the animation is fully controllable.' },
];
</script>

<template>
  <Accordion
    class="example-sigma-ui-accordion"
    type="single"
    collapsible
    default-value="item-1"
  >
    <AccordionItem
      v-for="item in accordionItems"
      :key="item.value"
      :value="item.value"
    >
      <AccordionTrigger>
        {{ item.title }}
      </AccordionTrigger>
      <AccordionContent>
        {{ item.content }}
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>

<style>
.example-sigma-ui-accordion {
  width: 100%;
}
</style>
