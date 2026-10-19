<script setup lang="ts">
import { ref, watch } from 'vue';
import { Icon } from '@iconify/vue';
import { Button } from '@ui/registry/tailwind/ui/button';
import { createPlaygroundFiles, makeCodeSandboxParams } from '../utils/codeeditor';
import Tooltip from './Tooltip.vue';
import type { StyleSystem } from '@sigma-ui/shared/style-systems';

const props = defineProps<{
  name: string;
  code: string;
  styleSystem: StyleSystem;
  registryName?: string;
}>();

const parameters = ref('');
let parametersRequestId = 0;

watch([() => props.code, () => props.styleSystem, () => props.name, () => props.registryName], async () => {
  const requestId = ++parametersRequestId;
  const { code, styleSystem, name, registryName } = props;

  if (import.meta.env.SSR || !code) {
    if (requestId === parametersRequestId) {
      parameters.value = '';
    }

    return;
  }

  const files = await createPlaygroundFiles(name, styleSystem, code, registryName ? [registryName] : []);

  if (requestId !== parametersRequestId) {
    return;
  }

  parameters.value = makeCodeSandboxParams(files);
}, { immediate: true });
</script>

<template>
  <form
    action="https://codesandbox.io/api/v1/sandboxes/define"
    method="POST"
    target="_blank"
  >
    <input
      type="hidden"
      name="query"
      value="file=src/App.vue"
    >
    <input
      type="hidden"
      name="environment"
      value="server"
    >
    <input
      type="hidden"
      name="hidedevtools"
      value="1"
    >
    <input
      type="hidden"
      name="parameters"
      :value="parameters"
    >

    <Tooltip :content="`Open ${name} in CodeSandbox`">
      <Button
        :variant="'ghost'"
        :size="'icon'"
        type="submit"
        :disabled="!parameters"
      >
        <Icon icon="ph-codesandbox-logo" />
      </Button>
    </Tooltip>
  </form>
</template>
