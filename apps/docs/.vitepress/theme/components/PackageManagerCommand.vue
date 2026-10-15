<script setup lang="ts">
import { computed } from 'vue';
import { useClipboard, useStorage } from '@vueuse/core';
import { CheckIcon, CopyIcon } from 'lucide-vue-next';

const props = defineProps<{
  run?: string;
  install?: string;
  dev?: boolean;
}>();

const PACKAGE_MANAGERS = ['npm', 'pnpm', 'yarn', 'bun'] as const;
type PackageManager = typeof PACKAGE_MANAGERS[number];

const RUN_COMMANDS: Record<PackageManager, string> = {
  npm: 'npx',
  pnpm: 'pnpm dlx',
  yarn: 'yarn dlx',
  bun: 'bunx --bun',
};

const INSTALL_COMMANDS: Record<PackageManager, string> = {
  npm: 'npm install',
  pnpm: 'pnpm add',
  yarn: 'yarn add',
  bun: 'bun add',
};

const selectedPackageManager = useStorage<PackageManager>('package-manager', 'npm', undefined, { initOnMounted: true });
const { copy, copied } = useClipboard();

const command = computed(() => {
  const packageManager = selectedPackageManager.value;

  if (props.install) {
    return [INSTALL_COMMANDS[packageManager], props.dev ? '-D' : '', props.install].filter(Boolean).join(' ');
  }

  return `${RUN_COMMANDS[packageManager]} ${props.run ?? ''}`.trim();
});
</script>

<template>
  <div class="not-docs my-4 overflow-hidden rounded-lg border bg-secondary-foreground text-white dark:bg-secondary">
    <div class="flex items-center justify-between border-b border-white/10 px-2">
      <div
        role="tablist"
        aria-label="Package manager"
        class="flex"
      >
        <button
          v-for="packageManager in PACKAGE_MANAGERS"
          :key="packageManager"
          role="tab"
          type="button"
          :aria-selected="packageManager === selectedPackageManager"
          class="relative px-3 py-2 font-mono text-xs text-white/60 transition-colors hover:text-white aria-selected:text-white aria-selected:after:absolute aria-selected:after:inset-x-2 aria-selected:after:-bottom-px aria-selected:after:h-0.5 aria-selected:after:bg-white"
          @click="selectedPackageManager = packageManager"
        >
          {{ packageManager }}
        </button>
      </div>
      <button
        type="button"
        class="flex h-7 w-7 items-center justify-center rounded-md text-white/60 transition-colors hover:bg-white/10 hover:text-white"
        :aria-label="copied ? 'Copied' : 'Copy command'"
        @click="copy(command)"
      >
        <CheckIcon
          v-if="copied"
          class="h-4 w-4"
        />
        <CopyIcon
          v-else
          class="h-4 w-4"
        />
      </button>
    </div>
    <pre class="overflow-x-auto px-4 !py-3 font-mono text-sm text-white"><code>{{ command }}</code></pre>
  </div>
</template>
