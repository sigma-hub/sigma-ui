<script setup lang="ts">
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@ui/registry/css/ui/accordion';
</script>

<template>
  <Accordion
    class="example-sigma-ui-accordion"
    type="single"
    collapsible
  >
    <AccordionItem value="item-1">
      <AccordionTrigger>Is it accessible?</AccordionTrigger>
      <AccordionContent>
        Yes. It adheres to the WAI-ARIA design pattern.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>

<style>
.example-sigma-ui-accordion {
  width: 100%;
}
</style>
