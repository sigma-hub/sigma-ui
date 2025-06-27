<script setup lang="ts">
import * as z from 'zod';
import { h, onMounted, shallowRef } from 'vue';
import { toast } from '@ui/registry/tailwind/ui/toaster';
import { Button } from '@ui/registry/tailwind/ui/button';
import { AutoForm } from '@ui/registry/tailwind/ui/auto-form';

const schema = shallowRef<z.ZodObject< any, any, any > | null>(null);

onMounted(() => {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then((data) => {
      schema.value = z.object({
        user: z.enum(data.map((user: any) => user.name)),
      });
    });
});

function onSubmit(values: Record<string, any>) {
  toast('You submitted the following values:', {
    description: h('pre', { class: 'mt-2 rounded-md bg-muted/50 p-4' }, h('code', {}, JSON.stringify(values, null, 2))),
  });
}
</script>

<template>
  <div class="flex justify-center w-full">
    <AutoForm
      v-if="schema"
      class="w-2/3 space-y-6"
      :schema="schema"
      @submit="onSubmit"
    >
      <Button type="submit">
        Submit
      </Button>
    </AutoForm>

    <div v-else>
      Loading...
    </div>
  </div>
</template>
