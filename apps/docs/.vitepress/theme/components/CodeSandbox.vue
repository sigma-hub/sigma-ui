<script setup lang="ts">
import { ref, toRefs, watch } from 'vue';
import { Icon } from '@iconify/vue';
import { Button } from '@ui/registry/tailwind/ui/button';
import { makeCodeSandboxParams } from '../utils/codeeditor';
import Tooltip from './Tooltip.vue';
import type { StyleSystem } from '@/lib/registry/style-system';

const props = defineProps<{
  name: string;
  code: string;
  styleSystem: StyleSystem;
}>();

const { code } = toRefs(props);
const sources = ref<Record<string, string>>({});

watch(code, () => {
  sources.value['App.vue'] = code.value;
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
      :value="makeCodeSandboxParams(name, styleSystem, sources)"
    >

    <Tooltip :content="`Open ${name} in CodeSandbox`">
      <Button
        :variant="'ghost'"
        :size="'icon'"
        type="submit"
      >
        <Icon icon="ph-codesandbox-logo" />
      </Button>
    </Tooltip>
  </form>
</template>
