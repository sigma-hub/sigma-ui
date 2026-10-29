export type ShortcutScope = 'Global' | 'Editor' | 'List';

export interface ShortcutCommand {
  id: string;
  label: string;
  group: string;
  scope: ShortcutScope;
  defaultBinding: string | null;
}

export type Bindings = Record<string, string | null>;

const MODIFIER_KEYS = new Set(['Control', 'Shift', 'Alt', 'Meta']);

const NAMED_KEYS: Record<string, string> = {
  ' ': 'Space',
  'ArrowUp': 'Up',
  'ArrowDown': 'Down',
  'ArrowLeft': 'Left',
  'ArrowRight': 'Right',
  'Escape': 'Esc',
  'Delete': 'Del',
};

/**
 * Returns the main key of a keyboard event, or null while only modifiers are held.
 * Letters and digits use `event.code`, so Shift or the keyboard layout does not change the name.
 */
export function getKeyName(event: KeyboardEvent): string | null {
  if (MODIFIER_KEYS.has(event.key)) {
    return null;
  }

  if (event.code.startsWith('Key')) {
    return event.code.slice(3);
  }

  if (event.code.startsWith('Digit')) {
    return event.code.slice(5);
  }

  if (event.key.length === 1) {
    return event.key.toUpperCase();
  }

  return NAMED_KEYS[event.key] ?? event.key;
}

export function getModifiers(event: KeyboardEvent): string[] {
  const modifiers: string[] = [];

  if (event.ctrlKey) {
    modifiers.push('Ctrl');
  }

  if (event.altKey) {
    modifiers.push('Alt');
  }

  if (event.shiftKey) {
    modifiers.push('Shift');
  }

  if (event.metaKey) {
    modifiers.push('Meta');
  }

  return modifiers;
}

/** Converts a keyboard event into a binding such as `Ctrl+Shift+P`, or null if no main key is pressed. */
export function eventToBinding(event: KeyboardEvent): string | null {
  const key = getKeyName(event);

  return key ? [...getModifiers(event), key].join('+') : null;
}

export function bindingToKeys(binding: string | null): string[] {
  if (!binding) {
    return [];
  }

  // A trailing "+" is the plus key itself, for example "Ctrl++".
  return binding.endsWith('+') ? [...binding.slice(0, -2).split('+').filter(Boolean), '+'] : binding.split('+');
}

/** Two commands conflict when they share a binding and can be active at the same time. */
export function findConflicts(
  commands: ShortcutCommand[],
  bindings: Bindings,
  commandId: string,
  binding: string | null,
): ShortcutCommand[] {
  const command = commands.find(item => item.id === commandId);

  if (!command || !binding) {
    return [];
  }

  return commands.filter((other) => {
    const overlaps = other.scope === command.scope || other.scope === 'Global' || command.scope === 'Global';

    return other.id !== commandId && bindings[other.id] === binding && overlaps;
  });
}
