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
}>();

async function handleClick() {
  const files = await createPlaygroundFiles(props.name, props.styleSystem, props.code);
  openInStackblitz(props.name, files);
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
