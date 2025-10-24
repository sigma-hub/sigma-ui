---
title: Calendar
description: A date field component that allows users to enter and edit date.
source: packages/lib/src/registry/tailwind/ui/calendar
primitive: https://www.reka-ui.com/docs/components/calendar.html
---

## Preview

<ComponentPreview name="Calendar" size="lg" />

## Related

- [Range Calendar](./range-calendar)
- [Date Picker](./date-picker)

## Dependencies

- [@internationalized/date](https://react-spectrum.adobe.com/internationalized/date/index.html): solves problems with internationalization. See [Dates & Times in Reka](https://reka-ui.com/docs/guides/dates) for more details.

## Installation

```bash
npx sigma-ui add calendar
```

## Examples

### Form

<ComponentPreview name="CalendarForm" />

### Month & Year Selects

<ComponentPreview name="CalendarWithSelect" size="lg" />

### Localization

The locale can be changed with the `locale` prop. You can also format the month selector using the `formatter` composable:

```ts
const locale = 'fr'
formatter.setLocale(locale)
```

```vue
<CalendarRoot :locale="locale">
```

<ComponentPreview name="CalendarLocalization" size="lg" />
