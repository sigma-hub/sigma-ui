<script setup lang="ts">
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@ui/registry/css/ui/context-menu';
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger class="example-sigma-ui-context__trigger">
      Right click here
    </ContextMenuTrigger>
    <ContextMenuContent class="example-sigma-ui-context__content">
      <ContextMenuItem inset>
        Back
        <ContextMenuShortcut>⌘[</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem
        inset
        disabled
      >
        Forward
        <ContextMenuShortcut>⌘]</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem inset>
        Reload
        <ContextMenuShortcut>⌘R</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuSub>
        <ContextMenuSubTrigger inset>
          More Tools
        </ContextMenuSubTrigger>
        <ContextMenuSubContent class="example-sigma-ui-context__subcontent">
          <ContextMenuItem>
            Save Page As...
            <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>Create Shortcut...</ContextMenuItem>
          <ContextMenuItem>Name Window...</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Developer Tools</ContextMenuItem>
        </ContextMenuSubContent>
      </ContextMenuSub>
      <ContextMenuSeparator />
      <ContextMenuCheckboxItem :model-value="true">
        Show Bookmarks Bar
        <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
      </ContextMenuCheckboxItem>
      <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
      <ContextMenuSeparator />
      <ContextMenuRadioGroup model-value="pedro">
        <ContextMenuLabel inset>
          People
        </ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuRadioItem value="pedro">
          Pedro Duarte
        </ContextMenuRadioItem>
        <ContextMenuRadioItem value="colm">
          Colm Tuite
        </ContextMenuRadioItem>
      </ContextMenuRadioGroup>
    </ContextMenuContent>
  </ContextMenu>
</template>

<style>
.example-sigma-ui-context__trigger {
  display: flex;
  height: 150px;
  width: 300px;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius);
  border: 1px dashed hsl(var(--border));
  font-size: 0.875rem;
}

.example-sigma-ui-context__content {
  width: 16rem;
}

.example-sigma-ui-context__subcontent {
  width: 12rem;
}
</style>
