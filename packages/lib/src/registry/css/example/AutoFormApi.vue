<script setup lang="ts">
import * as z from 'zod';
import { h, onMounted, shallowRef } from 'vue';
import { toast } from '@ui/registry/css/ui/toaster';
import { Button } from '@ui/registry/css/ui/button';
import { AutoForm } from '@ui/registry/css/ui/auto-form';

const schema = shallowRef<z.ZodObject<any, any, any> | null>(null);

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
    description: h('pre', { class: 'example-sigma-ui-autoform__toast-pre' }, h('code', {}, JSON.stringify(values, null, 2))),
  });
}
</script>

<template>
  <div class="example-sigma-ui-autoform-api">
    <AutoForm
      v-if="schema"
      class="example-sigma-ui-autoform"
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

<style>
.example-sigma-ui-autoform-api {
  display: flex;
  justify-content: center;
  width: 100%;
}

.example-sigma-ui-autoform {
  width: 66.6%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.example-sigma-ui-autoform__toast-pre {
  margin-top: 0.5rem;
  border-radius: 0.375rem;
  background-color: hsl(var(--muted) / 0.5);
  padding: 1rem;
}
</style>
