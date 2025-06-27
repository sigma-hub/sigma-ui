<script setup lang="ts">
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@ui/registry/tailwind/ui/accordion';

const items = [
  {
    value: '1',
    title: 'Why is it using GOAT installation method instead of NPM modules?',
    content: `
      Because GOAT is superior to NPM when it comes to distributing components. 
      <br><br>
      When you install components as NPM dependencies to your project, their style is coupled with their implementation, making it difficult to customize the components to your style system.
      <br><br>
      This library gives you the building blocks to create your own components that match your design system.
      <br><br>
      I wanted to create this installation method for a long time. So long that some people got ahead of me and created first implementations of it before me. Now, finally the time has come for the GOAT to shine.
    `,
  },
  {
    value: '2',
    title: 'How is this different from UI libraries like Vuetify, Quasar, etc?',
    content: `
      Most UI libraries give you components with some design system baked in. It's very difficult to customize them (or even impossible, things like backdrop filters on animated components in Vuetify).
      <br><br>
      This library gives you the building blocks to create your own components that match your design system.
    `,
  },
  {
    value: '3',
    title: 'Which frameworks are supported?',
    content: 'Currently, it works with Vue (vite), Nuxt, Laravel, Astro.',
  },
  {
    value: '4',
    title: 'Can I use these components in my project?',
    content: 'Yes. Free to use in personal and commercial projects. Attribution is not required but very appreciated. If you can, spread the word about this library to other people, it would help this project to grow and evolve.',
  },
];
</script>

<template>
  <Accordion type="multiple">
    <AccordionItem
      v-for="item in items"
      :key="item.value"
      :value="item.value"
    >
      <AccordionTrigger>
        {{ item.title }}
      </AccordionTrigger>
      <AccordionContent v-html="item.content" />
    </AccordionItem>
  </Accordion>
</template>

<style scoped>
.vp-doc h3:not(:where(.not-docs *)) {
  margin: 0;
  font-size: 18px;
}
</style>
