<script setup lang="ts">
import { CardLightbox } from '@ui/registry/tailwind/ui/card-lightbox';
import type { Item } from '@ui/registry/tailwind/ui/card-lightbox';

const items: Item[] = [
  {
    id: '0',
    category: 'Game',
    title: 'Explore the Sky Castle of Aeridor',
    content: `
      <p>
        Embark on an epic journey to Aeridor, the majestic castle floating amongst the clouds. Unravel ancient mysteries and face daunting challenges in this breathtaking sky realm.
      </p>
      <p>
        Master arcane arts, battle mythical creatures, and forge alliances to claim your destiny in the kingdom above the world. Are you ready to ascend?
      </p>
    `,
    theme: 'light',
    image: 'https://cdn.leonardo.ai/users/18ba1701-0a8b-497c-8b48-cc2d4ea2f4e2/generations/e645fe1e-e812-4153-9d97-6bf2a6d9d1e0/4830f995-7c0c-4a8c-893f-9a7df3d5e6fe.jpg?w=512',
  },
  {
    id: '1',
    category: 'Game',
    title: 'Summon the Void Walker',
    content: `
      <p>
        Delve into forbidden knowledge and summon entities from beyond the veil. Master dark rituals to command otherworldly power.
      </p>
      <p>
        Harness the shadows, confront ancient horrors, and rewrite reality itself. But beware, for power demands a price.
      </p>
      <p>
        Will you control the void, or will it consume you?
      </p>
    `,
    theme: 'dark',
    image: 'https://cdn.leonardo.ai/users/18ba1701-0a8b-497c-8b48-cc2d4ea2f4e2/generations/1cc4807e-6672-4eff-8c9c-a890c8d3aa7c/e268d66a-ddce-4c0b-9f53-fab156c0f0df.jpg?w=512',
  },
  {
    id: '2',
    category: 'Game',
    title: 'Ascend the Cyber Spire',
    content: `
      <p>
        Navigate the towering structures of Neo-Veridia, a city reaching for the stars. Outsmart corporate security and rival climbers.
      </p>
      <p>
        Utilize high-tech gear, traverse perilous heights, and uncover the secrets hidden within the city's metallic heart.
      </p>
    `,
    theme: 'light',
    image: 'https://cdn.leonardo.ai/users/18ba1701-0a8b-497c-8b48-cc2d4ea2f4e2/generations/8eaf76f8-1554-4c70-830b-9fa5b3f12622/a6359710-f784-4661-9b39-c666fb20644b.jpg?w=512',
  },
  {
    id: '3',
    category: 'App',
    title: 'The Chronomancer\'s Apprentice',
    content: `
      <p>
        Join Elara, a young apprentice wielding a time-altering hat, on a quest through fractured timelines. Solve paradoxes and restore temporal order.
      </p>
      <p>
        Manipulate time, overcome clockwork automatons, and confront the forces threatening to unravel history itself.
      </p>
      <p>
        The past, present, and future are in your hands... and on your head.
      </p>
    `,
    theme: 'dark',
    image: 'https://cdn.leonardo.ai/users/18ba1701-0a8b-497c-8b48-cc2d4ea2f4e2/generations/9d82f1b5-b490-4a0b-aaed-25a0ab6f4177/4dfddcc1-d9b3-4d12-b45f-60e8aea794e2.jpg?w=512',
  },
];
</script>

<template>
  <CardLightbox :items="items" />
</template>
