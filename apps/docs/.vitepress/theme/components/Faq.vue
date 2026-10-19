<script setup lang="ts">
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@ui/registry/tailwind/ui/accordion';

const items = [
  {
    value: '1',
    title: 'Why does the CLI copy components into the project instead of installing NPM modules?',
    content: `
      The CLI copies component source into your project. Each item is a shadcn registry item, served from /r/{style}/{name}.json.
      <br><br>
      An NPM package keeps the component in node_modules. Matching your design system then means props, slots, and CSS overrides.
      <br><br>
      The copied files are yours to edit.
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
