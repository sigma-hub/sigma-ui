---
title: Blocks
description: Copy-paste building blocks for common application layouts.
---

Blocks are multi-file layouts you add with the CLI the same way you add components:

```bash
npx sigma-ui add login-simple
```

They land in your blocks directory (next to `components/ui` by default) with the components they depend on.

## Auth

Login and signup layouts.

- [Auth](/blocks/auth)

## Dashboard

Application shells, sidebars, a mail client, and data-heavy screens.

- [Dashboard](/blocks/dashboard)

## Table

A filterable data table.

- [Table](/blocks/table)

## Settings

Settings pages and profile forms.

- [Settings](/blocks/settings)

## Derived from Sigma File Manager

These blocks are derived from patterns in [Sigma File Manager](https://github.com/aleksey-hoffman/sigma-file-manager), a free, open source desktop file manager. Each one is added the same way as any other block, and comes in both the CSS and Tailwind styles.

| Block | Add it with | What it is |
| --- | --- | --- |
| [`settings-sfm-list`](/blocks/settings#settings-sfm-list) | `npx sigma-ui add settings-sfm-list` | A preferences page with a category nav, search, and rows for switches, selects, steppers, and buttons. |
| [`settings-sfm-shortcuts`](/blocks/settings#settings-sfm-shortcuts) | `npx sigma-ui add settings-sfm-shortcuts` | A keyboard shortcuts editor that records new key combinations and warns about conflicts. |
| [`dashboard-sfm-activity-center`](/blocks/dashboard#dashboard-sfm-activity-center) | `npx sigma-ui add dashboard-sfm-activity-center` | A header button with a live job count and a popover of running and finished jobs. |
| [`dashboard-sfm-marketplace`](/blocks/dashboard#dashboard-sfm-marketplace) | `npx sigma-ui add dashboard-sfm-marketplace` | A browse, installed, and updates gallery for integrations or plugins. |
| [`dashboard-sfm-command-palette`](/blocks/dashboard#dashboard-sfm-command-palette) | `npx sigma-ui add dashboard-sfm-command-palette` | A Cmd+K or Ctrl+K command palette with recent commands and key hints. |
| [`dashboard-sfm-changelog`](/blocks/dashboard#dashboard-sfm-changelog) | `npx sigma-ui add dashboard-sfm-changelog` | A what's new dialog with a version list and notes grouped by change type. |

The data in these blocks is placeholder content. Replace it with your own data and wire the actions (cancel, install, rebind, run) to your app.
