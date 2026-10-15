<script setup lang="ts">
const faqItems = [
  {
    value: 'auto-import',
    title: 'How are components registered?',
    content: 'sigma-ui-nuxt reads the exports of every components/ui/*/index.ts file and auto-imports them.',
  },
  {
    value: 'tailwind',
    title: 'Where does Tailwind come from?',
    content: 'The module registers @tailwindcss/vite because it is installed in this playground.',
  },
];
</script>

<template>
  <main class="mx-auto flex max-w-2xl flex-col gap-8 p-8">
    <header class="flex items-center gap-3">
      <h1 class="text-2xl font-semibold">
        sigma-ui-nuxt playground
      </h1>
      <Badge variant="secondary">
        Nuxt 4
      </Badge>
    </header>

    <Card>
      <CardHeader>
        <CardTitle>Auto-imported components</CardTitle>
        <CardDescription>
          Generated with <code>pnpm --filter sigma-ui-nuxt-playground components</code>.
        </CardDescription>
      </CardHeader>
      <CardContent class="flex gap-2">
        <Button>Default</Button>
        <Button variant="outline">
          Outline
        </Button>
        <Button variant="destructive">
          Destructive
        </Button>
      </CardContent>
    </Card>

    <Accordion
      type="single"
      collapsible
    >
      <AccordionItem
        v-for="item in faqItems"
        :key="item.value"
        :value="item.value"
      >
        <AccordionTrigger>{{ item.title }}</AccordionTrigger>
        <AccordionContent>{{ item.content }}</AccordionContent>
      </AccordionItem>
    </Accordion>
  </main>
</template>
