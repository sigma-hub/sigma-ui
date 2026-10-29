<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { TriangleAlertIcon } from '@lucide/vue';
import { Alert, AlertDescription, AlertTitle } from '@ui/registry/tailwind/ui/alert';
import { Button } from '@ui/registry/tailwind/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@ui/registry/tailwind/ui/dialog';
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
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Edit shortcut</DialogTitle>
        <DialogDescription>
          {{ command?.label }}<template v-if="command">
            · {{ command.scope }}
          </template>
        </DialogDescription>
      </DialogHeader>

      <div class="flex flex-col gap-3">
        <button
          type="button"
          class="flex h-20 w-full items-center justify-center rounded-lg border-2 border-dashed bg-muted/40 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          :class="{ 'border-ring bg-muted': isRecording }"
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
            class="text-muted-foreground"
          >
            {{ isRecording ? 'Press a key combination…' : 'No shortcut set' }}
          </span>
        </button>
        <p class="text-xs text-muted-foreground">
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

      <DialogFooter class="gap-2 sm:justify-between">
        <Button
          variant="ghost"
          :disabled="!recorder.binding.value"
          @click="recorder.reset(null)"
        >
          Clear
        </Button>
        <div class="flex flex-col-reverse gap-2 sm:flex-row">
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
