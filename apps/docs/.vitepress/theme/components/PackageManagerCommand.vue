<script setup lang="ts">
import { computed } from 'vue';
import { useClipboard } from '@vueuse/core';
import { CheckIcon, CopyIcon, TerminalIcon } from '@lucide/vue';
import { INSTALL_COMMANDS, PACKAGE_MANAGERS, RUN_COMMANDS, convertNpmCommand, useSelectedPackageManager } from '../utils/package-manager';

const props = defineProps<{
  /** An npm-flavoured command, converted for the other package managers (used by the markdown fence plugin). */
  command?: string;
  run?: string;
  install?: string;
  dev?: boolean;
}>();

const selectedPackageManager = useSelectedPackageManager();
const { copy, copied } = useClipboard({ copiedDuring: 2000 });

const command = computed(() => {
  const packageManager = selectedPackageManager.value;

  if (props.command) {
    return convertNpmCommand(props.command)?.[packageManager] ?? props.command;
  }

  if (props.install) {
    return [INSTALL_COMMANDS[packageManager], props.dev ? '-D' : '', props.install].filter(Boolean).join(' ');
  }

  return `${RUN_COMMANDS[packageManager]} ${props.run ?? ''}`.trim();
});
</script>

<template>
  <!-- The frame clips, only the <pre> scrolls, so the copy button stays pinned. -->
  <div class="language-sh package-manager-command has-title not-docs">
    <div class="flex h-(--code-header-height) items-center gap-2 border-b px-3">
      <TerminalIcon class="size-3.5 text-muted-foreground" />
      <div
        role="tablist"
        aria-label="Package manager"
        class="flex gap-0.5"
      >
        <button
          v-for="packageManager in PACKAGE_MANAGERS"
          :key="packageManager"
          role="tab"
          type="button"
          :aria-selected="packageManager === selectedPackageManager"
          class="h-7 rounded-md border border-transparent px-2.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground aria-selected:border-border aria-selected:bg-background aria-selected:text-foreground"
          @click="selectedPackageManager = packageManager"
        >
          {{ packageManager }}
        </button>
      </div>
    </div>
    <button
      type="button"
      class="copy-command"
      :aria-label="copied ? 'Copied' : 'Copy command'"
      :title="copied ? 'Copied' : 'Copy command'"
      @click="copy(command)"
    >
      <CheckIcon
        v-if="copied"
        class="size-3.5"
      />
      <CopyIcon
        v-else
        class="size-3.5"
      />
    </button>
    <pre class="shiki"><code><span
      v-for="(line, index) in command.split('\n')"
      :key="index"
      class="line"
    ><span class="pm-command">{{ line }}</span></span></code></pre>
  </div>
</template>

<style scoped>
.copy-command {
  position: absolute;
  top: calc((var(--code-header-height) - 1px - var(--code-button-size)) / 2);
  right: 0.5rem;
  z-index: 3;
  display: flex;
  width: var(--code-button-size);
  height: var(--code-button-size);
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  color: var(--muted-foreground);
  background-color: var(--code-bg);
  transition: color 0.15s, background-color 0.15s;
}

.copy-command:hover,
.copy-command:focus-visible {
  color: var(--foreground);
  background-color: var(--code-highlight);
}

.pm-command {
  color: var(--code-fg);
}
</style>
