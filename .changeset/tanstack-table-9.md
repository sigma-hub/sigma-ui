---
"sigma-ui": patch
---

The data table block (`table-simple`) and the data table examples now install `@tanstack/vue-table` 9. They use `useTable` with a `features.ts` file that registers the table features, row models, and filter and sort functions they use. Sorting, filtering, pagination, row selection, column visibility, and pinning behave as before. Column pinning now uses `start` and `end` instead of `left` and `right`.
