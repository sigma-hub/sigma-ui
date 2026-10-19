---
"sigma-ui": patch
---

`add` now warns when a dependency is installed at a major version the registry items do not support, such as zod 3 for the zod 4 forms, and offers to upgrade it instead of silently keeping it. `--yes` and non-interactive runs keep the installed version and print the upgrade command. The form component now ships `toTypedSchema` for any Standard Schema library (zod 4, valibot, arktype), so `@vee-validate/zod` is no longer needed.
