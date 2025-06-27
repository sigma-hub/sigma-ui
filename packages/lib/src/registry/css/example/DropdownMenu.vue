<script setup lang="ts">
import {
  CloudIcon,
  CreditCardIcon,
  GithubIcon,
  KeyboardIcon,
  LifeBuoyIcon,
  LogOutIcon,
  MailIcon,
  MessageSquareIcon,
  PlusCircleIcon,
  PlusIcon,
  SettingsIcon,
  UserIcon,
  UserPlusIcon,
  UsersIcon,
} from 'lucide-vue-next';
import { Button } from '@ui/registry/css/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@ui/registry/css/ui/dropdown-menu';
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline">
        Open
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="example-sigma-ui-dropdown__content">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <UserIcon class="example-sigma-ui-dropdown__icon" />
          <span>Profile</span>
          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCardIcon class="example-sigma-ui-dropdown__icon" />
          <span>Billing</span>
          <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SettingsIcon class="example-sigma-ui-dropdown__icon" />
          <span>Settings</span>
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <KeyboardIcon class="example-sigma-ui-dropdown__icon" />
          <span>Keyboard shortcuts</span>
          <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <UsersIcon class="example-sigma-ui-dropdown__icon" />
          <span>Team</span>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <UserPlusIcon class="example-sigma-ui-dropdown__icon" />
            <span>Invite users</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent class="example-sigma-ui-dropdown__subcontent">
              <DropdownMenuItem>
                <MailIcon class="example-sigma-ui-dropdown__icon" />
                <span>Email</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageSquareIcon class="example-sigma-ui-dropdown__icon" />
                <span>Message</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <PlusCircleIcon class="example-sigma-ui-dropdown__icon" />
                <span>More...</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem>
          <PlusIcon class="example-sigma-ui-dropdown__icon" />
          <span>New Team</span>
          <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <GithubIcon class="example-sigma-ui-dropdown__icon" />
        <span>GitHub</span>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <LifeBuoyIcon class="example-sigma-ui-dropdown__icon" />
        <span>Support</span>
      </DropdownMenuItem>
      <DropdownMenuItem disabled>
        <CloudIcon class="example-sigma-ui-dropdown__icon" />
        <span>API</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <LogOutIcon class="example-sigma-ui-dropdown__icon" />
        <span>Log out</span>
        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<style>
.example-sigma-ui-dropdown__content {
  width: 14rem;
}

.example-sigma-ui-dropdown__subcontent {
  width: 12rem;
}

.example-sigma-ui-dropdown__icon {
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
}
</style>
