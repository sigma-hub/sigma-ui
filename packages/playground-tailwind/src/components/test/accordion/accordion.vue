<script setup lang="ts">
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const defaultValue = 'item-1';

const accordionItems = [
  { value: 'item-1', title: 'Is it accessible?', content: 'Yes. It adheres to the WAI-ARIA design pattern.' },
  { value: 'item-2', title: 'Is it unstyled?', content: 'Yes. It\'s unstyled by default, giving you freedom over the look and feel.' },
  { value: 'item-3', title: 'Can it be animated?', content: 'Yes. You can use the transition prop to configure the animation.' },
];
</script>

<template>
  <div>
    <h1>Accordion</h1>
    <div class="w-full">
      <Accordion
        type="multiple"
        class="w-full"
        collapsible
        :default-value="defaultValue"
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
    </div>
  </div>
</template>
