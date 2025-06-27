import type { Component } from 'vue';

export type Example = {
  name: 'mix'
    | 'mail'
    | 'dashboard'
    | 'cards'
    | 'table'
    | 'forms'
    | 'music'
    | 'authentication';
  component: Component;
  code: string;
};
