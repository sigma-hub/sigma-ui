<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { Button } from '@ui/registry/tailwind/ui/button';
import { createPlaygroundFiles, openInStackblitz } from '../utils/codeeditor';
import Tooltip from './Tooltip.vue';
import type { StyleSystem } from '@sigma-ui/shared/style-systems';

const props = defineProps<{
  name: string;
  code: string;
  styleSystem: StyleSystem;
  registryName?: string;
}>();

let openRequestId = 0;

async function handleClick() {
  const requestId = ++openRequestId;
  const { name, styleSystem, code, registryName } = props;
  const files = await createPlaygroundFiles(name, styleSystem, code, registryName ? [registryName] : []);

  if (requestId !== openRequestId) {
    return;
  }

  openInStackblitz(name, files);
}
</script>

<template>
  <div>
    <Tooltip :content="`Open ${name} in Stackblitz`">
      <Button
        :variant="'ghost'"
        :size="'icon'"
        @click="handleClick"
      >
        <Icon icon="simple-icons:stackblitz" />
      </Button>
    </Tooltip>
  </div>
</template>
