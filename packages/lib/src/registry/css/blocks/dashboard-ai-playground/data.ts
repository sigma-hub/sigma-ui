import type { Component } from 'vue';
import { BirdIcon, BookIcon, BotIcon, Code2Icon, LifeBuoyIcon, MicIcon, PaperclipIcon, RabbitIcon, Settings2Icon, SquareTerminalIcon, SquareUserIcon, TurtleIcon } from '@lucide/vue';

export interface NavItem {
  label: string;
  icon: Component;
  isActive?: boolean;
}

export interface ModelOption {
  value: string;
  name: string;
  description: string;
  icon: Component;
}

export interface RoleOption {
  value: string;
  label: string;
}

export interface ParameterField {
  id: string;
  label: string;
  placeholder: string;
}

export interface ChatAction {
  label: string;
  tooltip: string;
  icon: Component;
}

export const primaryNavItems: NavItem[] = [
  { label: 'Playground', icon: SquareTerminalIcon, isActive: true },
  { label: 'Models', icon: BotIcon },
  { label: 'API', icon: Code2Icon },
  { label: 'Documentation', icon: BookIcon },
  { label: 'Settings', icon: Settings2Icon },
];

export const secondaryNavItems: NavItem[] = [
  { label: 'Help', icon: LifeBuoyIcon },
  { label: 'Account', icon: SquareUserIcon },
];

export const modelOptions: ModelOption[] = [
  {
    value: 'genesis',
    name: 'Genesis',
    description: 'Our fastest model for general use cases.',
    icon: RabbitIcon,
  },
  {
    value: 'explorer',
    name: 'Explorer',
    description: 'Performance and speed for efficiency.',
    icon: BirdIcon,
  },
  {
    value: 'quantum',
    name: 'Quantum',
    description: 'The most powerful model for complex computations.',
    icon: TurtleIcon,
  },
];

export const roleOptions: RoleOption[] = [
  { value: 'system', label: 'System' },
  { value: 'user', label: 'User' },
  { value: 'assistant', label: 'Assistant' },
];

export const temperatureField: ParameterField = {
  id: 'temperature',
  label: 'Temperature',
  placeholder: '0.4',
};

export const samplingFields: ParameterField[] = [
  { id: 'top-p', label: 'Top P', placeholder: '0.7' },
  { id: 'top-k', label: 'Top K', placeholder: '0.0' },
];

export const chatActions: ChatAction[] = [
  { label: 'Attach file', tooltip: 'Attach File', icon: PaperclipIcon },
  { label: 'Use Microphone', tooltip: 'Use Microphone', icon: MicIcon },
];
