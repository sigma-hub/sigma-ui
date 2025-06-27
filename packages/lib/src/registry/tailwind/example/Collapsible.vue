<script setup lang="ts">
import { MinusIcon, PlusIcon } from 'lucide-vue-next';
import { ref } from 'vue';
import { Button } from '@ui/registry/tailwind/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@ui/registry/tailwind/ui/collapsible';

const isOpen = ref(false);
</script>

<template>
  <Collapsible
    v-model:open="isOpen"
    class="flex flex-col w-[350px] gap-2"
  >
    <div class="flex items-center justify-between space-x-4 px-4">
      <h4 class="text-sm font-semibold">
        Header
      </h4>
      <CollapsibleTrigger as-child>
        <Button
          variant="ghost"
          size="sm"
          class="w-9 p-0"
        >
          <MinusIcon
            v-if="isOpen"
            class="h-4 w-4"
          />
          <PlusIcon
            v-else
            class="h-4 w-4"
          />
          <span class="sr-only">Toggle</span>
        </Button>
      </CollapsibleTrigger>
    </div>
    <div class="rounded-md border px-4 py-3 font-mono text-sm">
      Component 1
    </div>
    <CollapsibleContent class="space-y-2">
      <div class="rounded-md border px-4 py-3 font-mono text-sm">
        Component 2
      </div>
      <div class="rounded-md border px-4 py-3 font-mono text-sm">
        Component 3
      </div>
    </CollapsibleContent>
  </Collapsible>
</template>
