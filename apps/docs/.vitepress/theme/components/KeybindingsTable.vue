<script setup lang="ts">
import { capitalize } from 'vue';

defineProps<{
  type: 'prop' | 'emit' | 'slot' | 'method';
  data: { name: string; description: string; type: string; required: boolean }[];
}>();
</script>

<template>
  <div>
    <table class="w-full">
      <thead>
        <tr class="m-0 border-t p-0 even:bg-muted">
          <th
            class="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
          >
            Button
          </th>
          <th
            class="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in data"
          :key="index"
          class="m-0 border-t p-0 even:bg-muted"
        >
          <td
            class="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
          >
            <div class="bg-primary/10 w-[fit-content] py-0.5 px-2 rounded-md">
              {{ item.name }}
            </div>
          </td>
          <td
            class="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
          >
            {{ item.description }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
