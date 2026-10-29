<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { TriangleAlertIcon } from '@lucide/vue';
import { Alert, AlertDescription, AlertTitle } from '@ui/registry/css/ui/alert';
import { Button } from '@ui/registry/css/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@ui/registry/css/ui/dialog';
import KeybindingDisplay from './KeybindingDisplay.vue';
import { findConflicts } from '../shortcuts';
import type { Bindings, ShortcutCommand } from '../shortcuts';
import { useKeyRecorder } from '../useKeyRecorder';

const props = defineProps<{
  command: ShortcutCommand | null;
  commands: ShortcutCommand[];
  bindings: Bindings;
}>();

const open = defineModel<boolean>('open', { default: false });

const emit = defineEmits<{
  save: [payload: { id: string; binding: string | null; replaceIds: string[] }];
}>();

const recorder = useKeyRecorder();
const isRecording = ref(false);

const currentBinding = computed(() => (props.command ? props.bindings[props.command.id] ?? null : null));
const hasChanged = computed(() => recorder.binding.value !== currentBinding.value);
const conflicts = computed(() => {
  return props.command ? findConflicts(props.commands, props.bindings, props.command.id, recorder.binding.value) : [];
});
const conflictNames = computed(() => conflicts.value.map(item => item.label).join(', '));
const previewKeys = computed(() => recorder.heldModifiers.value);

watch(open, (isOpen) => {
  if (isOpen) {
    recorder.reset(currentBinding.value);
  }
});

function save() {
  if (!props.command) {
    return;
  }

  emit('save', {
    id: props.command.id,
    binding: recorder.binding.value,
    replaceIds: conflicts.value.map(item => item.id),
  });
  open.value = false;
}
</script>

<template>
  <Dialog v-model:open="open">
    <DialogContent class="settings-sfm-shortcuts__dialog">
      <DialogHeader>
        <DialogTitle>Edit shortcut</DialogTitle>
        <DialogDescription>
          {{ command?.label }}<template v-if="command">
            · {{ command.scope }}
          </template>
        </DialogDescription>
      </DialogHeader>

      <div class="settings-sfm-shortcuts__body">
        <button
          type="button"
          class="settings-sfm-shortcuts__recorder"
          :class="{ 'settings-sfm-shortcuts__recorder--active': isRecording }"
          :aria-label="`Shortcut recorder for ${command?.label ?? 'command'}. Press the new key combination.`"
          @keydown="recorder.onKeydown"
          @keyup="recorder.onKeyup"
          @focus="isRecording = true"
          @blur="isRecording = false"
        >
          <KeybindingDisplay
            v-if="recorder.binding.value || previewKeys.length > 0"
            :binding="previewKeys.length > 0 ? previewKeys.join('+') : recorder.binding.value"
          />
          <span
            v-else
            class="settings-sfm-shortcuts__recorder-hint"
          >
            {{ isRecording ? 'Press a key combination…' : 'No shortcut set' }}
          </span>
        </button>
        <p class="settings-sfm-shortcuts__hint">
          Click the box and press the keys you want to use. Tab and Esc keep working so you can leave the box.
        </p>

        <Alert
          v-if="conflicts.length > 0"
          variant="destructive"
        >
          <TriangleAlertIcon />
          <AlertTitle>Shortcut already in use</AlertTitle>
          <AlertDescription>
            {{ conflictNames }} already uses this shortcut. Saving will remove it from there.
          </AlertDescription>
        </Alert>
      </div>

      <DialogFooter class="settings-sfm-shortcuts__footer">
        <Button
          variant="ghost"
          :disabled="!recorder.binding.value"
          @click="recorder.reset(null)"
        >
          Clear
        </Button>
        <div class="settings-sfm-shortcuts__footer-actions">
          <Button
            variant="outline"
            @click="open = false"
          >
            Cancel
          </Button>
          <Button
            :disabled="!hasChanged"
            @click="save"
          >
            {{ conflicts.length > 0 ? 'Reassign' : 'Save' }}
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<style>
@layer base, components;

@layer components {
  .settings-sfm-shortcuts__body {
    display: flex;
    flex-direction: column;
    gap: calc(var(--spacing) * 3);
  }

  .settings-sfm-shortcuts__recorder {
    display: flex;
    width: 100%;
    height: calc(var(--spacing) * 20);
    align-items: center;
    justify-content: center;
    border: 2px dashed var(--border);
    border-radius: var(--radius);
    background-color: color-mix(in oklch, var(--muted) 40%, transparent);
    color: var(--foreground);
    font-size: 0.875rem;
    outline: none;
  }

  .settings-sfm-shortcuts__recorder:focus-visible {
    border-color: var(--ring);
    box-shadow: 0 0 0 3px color-mix(in oklch, var(--ring) 50%, transparent);
  }

  .settings-sfm-shortcuts__recorder--active {
    border-color: var(--ring);
    background-color: var(--muted);
  }

  .settings-sfm-shortcuts__recorder-hint {
    color: var(--muted-foreground);
  }

  .settings-sfm-shortcuts__hint {
    margin: 0;
    color: var(--muted-foreground);
    font-size: 0.75rem;
    line-height: 1rem;
  }

  .settings-sfm-shortcuts__footer.settings-sfm-shortcuts__footer {
    gap: calc(var(--spacing) * 2);
  }

  .settings-sfm-shortcuts__footer-actions {
    display: flex;
    flex-direction: column-reverse;
    gap: calc(var(--spacing) * 2);
  }

  @media (width >= 40rem) {
    .settings-sfm-shortcuts__dialog.settings-sfm-shortcuts__dialog {
      max-width: 28rem;
    }

    .settings-sfm-shortcuts__footer.settings-sfm-shortcuts__footer {
      justify-content: space-between;
    }

    .settings-sfm-shortcuts__footer-actions {
      flex-direction: row;
    }
  }
}
</style>
