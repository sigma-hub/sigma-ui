import type { ComputedRef, Ref } from 'vue';
import { createContext } from 'reka-ui';

export const SIDEBAR_COOKIE_NAME = 'sidebar_state';
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
export const SIDEBAR_WIDTH = '16rem';
export const SIDEBAR_WIDTH_MOBILE = '18rem';
export const SIDEBAR_WIDTH_ICON = '3rem';
export const SIDEBAR_KEYBOARD_SHORTCUT = 'b';
export const SIDEBAR_MOBILE_BREAKPOINT = '(width < 48rem)';

export type SidebarState = 'expanded' | 'collapsed';

export interface SidebarContext {
  state: ComputedRef<SidebarState>;
  open: Ref<boolean>;
  setOpen: (value: boolean) => void;
  isMobile: Ref<boolean>;
  openMobile: Ref<boolean>;
  setOpenMobile: (value: boolean) => void;
  toggleSidebar: () => void;
}

export const [useSidebar, provideSidebarContext] = createContext<SidebarContext>('Sidebar');

export function readSidebarCookie(cookieName = SIDEBAR_COOKIE_NAME): boolean | undefined {
  if (typeof document === 'undefined') {
    return undefined;
  }

  const cookie = document.cookie
    .split('; ')
    .find(entry => entry.startsWith(`${cookieName}=`));

  if (!cookie) {
    return undefined;
  }

  return cookie.split('=')[1] === 'true';
}

export function writeSidebarCookie(value: boolean, cookieName = SIDEBAR_COOKIE_NAME) {
  if (typeof document === 'undefined') {
    return;
  }

  document.cookie = `${cookieName}=${value}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
}
