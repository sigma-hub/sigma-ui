<script setup lang="ts">
import { type Ref, computed, ref, useAttrs } from 'vue';
import { useEventListener, useMediaQuery, useVModel } from '@vueuse/core';
import { TooltipProvider } from 'reka-ui';
import {
  SIDEBAR_COOKIE_NAME,
  SIDEBAR_KEYBOARD_SHORTCUT,
  SIDEBAR_MOBILE_BREAKPOINT,
  SIDEBAR_WIDTH,
  SIDEBAR_WIDTH_ICON,
  type SidebarState,
  provideSidebarContext,
  readSidebarCookie,
  writeSidebarCookie,
} from './utils';

interface SidebarProviderProps {
  /**
   * Initial open state on desktop when `open` is not controlled.
   * A previously persisted cookie value takes precedence.
   */
  defaultOpen?: boolean;
  /**
   * Controlled open state on desktop. Use with `v-model:open`.
   */
  open?: boolean;
  /**
   * Name of the cookie that persists the desktop open state between visits.
   * Set to an empty string to disable persistence.
   */
  cookieName?: string;
  /**
   * Key that toggles the sidebar together with `Ctrl` or `Cmd`.
   * Set to an empty string to disable the shortcut.
   */
  keyboardShortcut?: string;
}

defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = withDefaults(defineProps<SidebarProviderProps>(), {
  defaultOpen: true,
  open: undefined,
  cookieName: SIDEBAR_COOKIE_NAME,
  keyboardShortcut: SIDEBAR_KEYBOARD_SHORTCUT,
});

const emits = defineEmits<{
  /**
   * Emitted when the desktop open state changes.
   */
  'update:open': [open: boolean];
}>();

defineSlots<{
  /**
   * The sidebar and the main content of the layout.
   */
  default?: (props: { open: boolean; state: SidebarState; isMobile: boolean }) => unknown;
}>();

const isMobile = useMediaQuery(SIDEBAR_MOBILE_BREAKPOINT);
const openMobile = ref(false);

const open = useVModel(props, 'open', emits, {
  defaultValue: (props.cookieName ? readSidebarCookie(props.cookieName) : undefined) ?? props.defaultOpen,
  passive: true,
}) as Ref<boolean>;

const state = computed<SidebarState>(() => (open.value ? 'expanded' : 'collapsed'));

function setOpen(value: boolean) {
  open.value = value;

  if (props.cookieName) {
    writeSidebarCookie(value, props.cookieName);
  }
}

function setOpenMobile(value: boolean) {
  openMobile.value = value;
}

function toggleSidebar() {
  if (isMobile.value) {
    setOpenMobile(!openMobile.value);
  } else {
    setOpen(!open.value);
  }
}

const wrapper = ref<HTMLElement>();

useEventListener('keydown', (event: KeyboardEvent) => {
  if (!props.keyboardShortcut) {
    return;
  }

  const matchesShortcut = event.key.toLowerCase() === props.keyboardShortcut.toLowerCase() && (event.metaKey || event.ctrlKey);

  if (!matchesShortcut || !(event.target instanceof Node)) {
    return;
  }

  const providers = [...document.querySelectorAll('[data-slot="sidebar-wrapper"]')];
  const owner = providers.find(provider => provider.contains(event.target as Node)) ?? providers[0];

  if (owner !== wrapper.value) {
    return;
  }

  event.preventDefault();
  toggleSidebar();
});

provideSidebarContext({
  state,
  open,
  setOpen,
  isMobile,
  openMobile,
  setOpenMobile,
  toggleSidebar,
});
</script>

<template>
  <TooltipProvider :delay-duration="0">
    <div
      ref="wrapper"
      v-bind="delegatedAttrs"
      data-slot="sidebar-wrapper"
      class="sigma-ui-sidebar-wrapper"
      :style="{
        '--sidebar-width': SIDEBAR_WIDTH,
        '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
      }"
      :class="[$attrs.class]"
    >
      <slot
        :open="open"
        :state="state"
        :is-mobile="isMobile"
      />
    </div>
  </TooltipProvider>
</template>

<style>
.sigma-ui-sidebar-wrapper {
  display: flex;
  width: 100%;
  min-height: 100svh;
}

.sigma-ui-sidebar-wrapper:has(.sigma-ui-sidebar[data-variant="inset"]) {
  background-color: var(--sidebar);
}
</style>
