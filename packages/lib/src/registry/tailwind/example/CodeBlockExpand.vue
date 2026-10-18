<script setup lang="ts">
import { FileCodeIcon } from 'lucide-vue-next';
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockExpandButton,
  CodeBlockFooter,
  CodeBlockHeader,
  CodeBlockTitle,
  useHighlightedCode,
} from '@ui/registry/tailwind/ui/code-block';

const code = `import { computed, ref } from 'vue';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export function useCart() {
  const items = ref<CartItem[]>([]);

  const total = computed(() => items.value.reduce((sum, item) => sum + item.price * item.quantity, 0));
  const count = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0));

  function add(item: Omit<CartItem, 'quantity'>) {
    const existing = items.value.find(entry => entry.id === item.id);

    if (existing) {
      existing.quantity++;
      return;
    }

    items.value.push({ ...item, quantity: 1 });
  }

  function remove(id: string) {
    items.value = items.value.filter(item => item.id !== id);
  }

  return { items, total, count, add, remove };
}`;

const { lines } = useHighlightedCode(code, 'ts');
</script>

<template>
  <CodeBlock>
    <CodeBlockHeader>
      <CodeBlockTitle>
        <FileCodeIcon />
        stores/cart.ts
      </CodeBlockTitle>
      <CodeBlockActions>
        <CodeBlockCopyButton />
      </CodeBlockActions>
    </CodeBlockHeader>
    <CodeBlockContent
      :code="code"
      :lines="lines"
      language="ts"
      line-numbers
      :collapsed-height="240"
      :max-height="480"
    />
    <CodeBlockFooter>
      <CodeBlockExpandButton />
    </CodeBlockFooter>
  </CodeBlock>
</template>
