---
title: Accordion
description: Set of interactive collapsible sections.
source: apps/docs/src/lib/registry/tailwind/ui/accordion
primitive: https://www.reka-ui.com/docs/components/accordion.html
---

## Preview

<ComponentPreview name="Accordion" class="sm:max-w-[70%]" />

Displays `single` expanded item at once. Controllable by `defaultValue` prop.

## Installation

```bash
npx sigma-ui add accordion
```

## Examples

### Basic

<ComponentPreview name="AccordionBasic" />

Displays `single` item, collapsed by default (no `defaultValue` or `v-model` props specified).

### Multiple

<ComponentPreview name="AccordionMultiple" />

Displays `multiple` expanded items at once. Controllable programmatically by `v-model`.

## Notes

- Use `defaultValue` prop to simply define the open item by default or use `v-model` prop to fully control the opened item(s) programmatically.

- To display multiple expanded items at once, use `v-model: string[]` and `type="multiple"`.

- To display single expanded item at once, use `v-model: string` and `type="single"`.
