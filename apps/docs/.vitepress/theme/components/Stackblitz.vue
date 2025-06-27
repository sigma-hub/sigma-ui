<script setup lang="ts">
import { ref, toRefs, watch } from 'vue';
import { Icon } from '@iconify/vue';
import { Button } from '@ui/registry/tailwind/ui/button';
import { makeStackblitzParams } from '../utils/codeeditor';
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

function handleClick() {
  makeStackblitzParams(props.name, props.styleSystem, sources.value);
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
