import type { Component } from 'vue';

export interface Item {
  id: string;
  category: string;
  title: string;
  content: string | Component;
  theme: 'light' | 'dark';
  image: string;
}
