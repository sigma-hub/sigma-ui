<script setup lang="ts">
import { computed } from 'vue';
import { Kbd, KbdGroup } from '@ui/registry/tailwind/ui/kbd';
import { bindingToKeys } from '../shortcuts';

const props = defineProps<{
  binding: string | null;
  emptyLabel?: string;
}>();

const keys = computed(() => bindingToKeys(props.binding));
</script>

<template>
  <KbdGroup v-if="keys.length > 0">
    <Kbd
      v-for="(key, index) in keys"
      :key="`${key}-${index}`"
    >
      {{ key }}
    </Kbd>
  </KbdGroup>
  <span
    v-else
    class="text-sm text-muted-foreground"
  >
    {{ emptyLabel ?? 'Not set' }}
  </span>
</template>
