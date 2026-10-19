---
title: Tabs
description: A set of layered sections of content, known as tab panels, that are displayed one at a time.
source: tabs
primitive: https://reka-ui.com/docs/components/tabs
---

## Preview

<ComponentPreview name="Tabs" />

## Installation

<ComponentInstall name="tabs" />

## Usage

```vue
<script setup lang="ts">
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
</script>

<template>
  <Tabs default-value="account">
    <TabsList>
      <TabsTrigger value="account">
        Account
      </TabsTrigger>
      <TabsTrigger value="password">
        Password
      </TabsTrigger>
    </TabsList>
    <TabsContent value="account">
      Make changes to your account here.
    </TabsContent>
    <TabsContent value="password">
      Change your password here.
    </TabsContent>
  </Tabs>
</template>
```

- Each `TabsTrigger` shows the `TabsContent` with the same `value`.
- Use `defaultValue` to select a tab initially, or `v-model` to control the active tab.

## Examples

### Controlled

Bind `v-model` to read or change the active tab from outside the component.

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

const activeTab = ref('account');
</script>

<template>
  <p>Active tab: {{ activeTab }}</p>
  <Tabs v-model="activeTab">
    <TabsList>
      <TabsTrigger value="account">
        Account
      </TabsTrigger>
      <TabsTrigger value="password">
        Password
      </TabsTrigger>
    </TabsList>
    <TabsContent value="account">
      Make changes to your account here.
    </TabsContent>
    <TabsContent value="password">
      Change your password here.
    </TabsContent>
  </Tabs>
</template>
```

## API Reference

<!-- @include: @/content/meta/tabs.md -->

## Accessibility

Adheres to the [Tabs WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/). Reka UI handles the roles, the selected state, and the roving focus between triggers.

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | When focus moves onto the tabs, focuses the active trigger. When a trigger is focused, moves focus to the active content. |
| <kbd>ArrowDown</kbd> | Moves focus to the next trigger, depending on `orientation`, and activates its associated content. |
| <kbd>ArrowRight</kbd> | Moves focus to the next trigger, depending on `orientation`, and activates its associated content. |
| <kbd>ArrowUp</kbd> | Moves focus to the previous trigger, depending on `orientation`, and activates its associated content. |
| <kbd>ArrowLeft</kbd> | Moves focus to the previous trigger, depending on `orientation`, and activates its associated content. |
| <kbd>Home</kbd> | Moves focus to the first trigger and activates its associated content. |
| <kbd>End</kbd> | Moves focus to the last trigger and activates its associated content. |
