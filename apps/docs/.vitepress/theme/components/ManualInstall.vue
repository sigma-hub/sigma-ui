<script setup lang="ts">
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@ui/registry/tailwind/ui/accordion';
</script>

<template>
  <Accordion
    type="single"
    :collapsible="true"
  >
    <AccordionItem
      value="manual-installation"
      class="border-none"
    >
      <AccordionTrigger>
        Manual Installation
      </AccordionTrigger>
      <AccordionContent>
        <slot />
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
