<script setup lang="ts" generic="Kind extends ApiTableKind">
import { computed } from 'vue';
import type { ApiTableItems, ApiTableKind } from '../types/api';

const props = defineProps<{
  kind: Kind;
  items: ApiTableItems[Kind];
}>();

interface TableRow {
  name: string;
  required: boolean;
  description: string;
  type: string;
  default?: string;
}

const TABLE_CONFIG: Record<ApiTableKind, { title: string; nameLabel: string; typeLabel: string; hasDefault: boolean }> = {
  props: { title: 'Props', nameLabel: 'Prop', typeLabel: 'Type', hasDefault: true },
  events: { title: 'Events', nameLabel: 'Event', typeLabel: 'Payload', hasDefault: false },
  slots: { title: 'Slots', nameLabel: 'Slot', typeLabel: 'Scope', hasDefault: false },
  methods: { title: 'Methods', nameLabel: 'Method', typeLabel: 'Type', hasDefault: false },
};

const config = computed(() => TABLE_CONFIG[props.kind]);

const rows = computed<TableRow[]>(() => props.items.map((item) => {
  if ('payload' in item) {
    return { name: item.name, required: false, description: item.description, type: item.payload };
  }

  if ('scope' in item) {
    return { name: item.name, required: false, description: item.description, type: item.scope };
  }

  if ('required' in item) {
    return { name: item.name, required: item.required, description: item.description, type: item.type, default: item.default };
  }

  return { name: item.name, required: false, description: item.description, type: item.type };
}));
</script>

<template>
  <div class="not-docs my-4">
    <h4 class="mb-2 text-sm font-semibold text-muted-foreground">
      {{ config.title }}
    </h4>
    <div class="overflow-x-auto rounded-md border">
      <table class="w-full border-collapse text-left text-sm">
        <thead class="bg-muted/50">
          <tr>
            <th class="w-[40%] px-4 py-2 font-medium">
              {{ config.nameLabel }}
            </th>
            <th class="px-4 py-2 font-medium">
              {{ config.typeLabel }}
            </th>
            <th
              v-if="config.hasDefault"
              class="w-[20%] px-4 py-2 font-medium"
            >
              Default
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in rows"
            :key="row.name"
            class="border-t align-top"
          >
            <td class="px-4 py-3">
              <div class="flex flex-wrap items-center gap-2">
                <code class="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-[13px] font-semibold text-foreground">{{ row.name }}</code>
                <span
                  v-if="row.required"
                  class="text-xs font-medium text-destructive"
                >required</span>
              </div>
              <div
                v-if="row.description"
                class="mt-2 text-muted-foreground [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-4 [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:text-[13px] [&_p]:m-0 [&_p+p]:mt-2"
                v-html="row.description"
              />
            </td>
            <td class="px-4 py-3">
              <code
                v-if="row.type"
                class="font-mono text-[13px] break-words whitespace-pre-wrap"
              >{{ row.type }}</code>
              <span
                v-else
                class="text-muted-foreground"
              >-</span>
            </td>
            <td
              v-if="config.hasDefault"
              class="px-4 py-3"
            >
              <code
                v-if="row.default"
                class="font-mono text-[13px] break-words"
              >{{ row.default }}</code>
              <span
                v-else
                class="text-muted-foreground"
              >-</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
