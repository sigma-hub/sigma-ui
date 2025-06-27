<script setup lang="ts">
import { CheckIcon, PlusIcon, SendIcon } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@ui/registry/css/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@ui/registry/css/ui/dialog';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@ui/registry/css/ui/command';
import { Avatar } from '@ui/registry/css/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@ui/registry/css/ui/tooltip';
import { Button } from '@ui/registry/css/ui/button';
import { Input } from '@ui/registry/css/ui/input';

const input = ref('');
const inputLength = computed(() => input.value.trim().length);
const users = ref([
  {
    name: 'Olivia Martin',
    email: 'm@example.com',
  },
  {
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
  },
  {
    name: 'Emma Wilson',
    email: 'emma@example.com',
  },
  {
    name: 'Jackson Lee',
    email: 'lee@example.com',
  },
  {
    name: 'William Kim',
    email: 'will@email.com',
  },
]);

type User = (typeof users.value)[number];

const messages = ref([
  { role: 'agent', content: 'Hi, how can I help you today?' },
  { role: 'user', content: 'Hey, I\'m having trouble with my account.' },
  { role: 'agent', content: 'What seems to be the problem?' },
  { role: 'user', content: 'I can\'t log in.' },
]);

const open = ref(false);
const selectedUsers = ref<User[]>([]);
const search = ref('');

const filteredUsers = computed(() => users.value.filter(user => user.name.toLowerCase().includes(search.value.toLowerCase())));
</script>

<template>
  <Card>
    <CardHeader class="example-sigma-ui-card-chat__header">
      <div class="example-sigma-ui-card-chat__user">
        <Avatar size="sm" />
        <div class="example-sigma-ui-card-chat__user-info">
          <p class="example-sigma-ui-card-chat__user-name">
            Sofia Davis
          </p>
          <p class="example-sigma-ui-card-chat__user-email">
            m@example.com
          </p>
        </div>
      </div>
      <TooltipProvider>
        <Tooltip :delay-duration="200">
          <TooltipTrigger as-child>
            <Button
              variant="outline"
              class="example-sigma-ui-card-chat__new-message"
              @click="open = true"
            >
              <PlusIcon class="example-sigma-ui-card-chat__new-message-icon" />
            </Button>
          </TooltipTrigger>
          <TooltipContent :side-offset="10">
            New message
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </CardHeader>
    <CardContent>
      <div class="example-sigma-ui-card-chat__messages">
        <div
          v-for="(message, index) in messages"
          :key="index"
          class="example-sigma-ui-card-chat__message"
          :class="[
            message.role === 'user' ? 'example-sigma-ui-card-chat__message--user' : 'example-sigma-ui-card-chat__message--agent',
          ]"
        >
          {{ message.content }}
        </div>
      </div>
    </CardContent>
    <CardFooter>
      <form
        class="example-sigma-ui-card-chat__form"
        @submit.prevent="() => {
          if (inputLength === 0) {
            return
          }
          messages.push({
            role: 'user',
            content: input,
          })
          input = ''
        }"
      >
        <Input
          v-model="input"
          placeholder="Type a message..."
          class="example-sigma-ui-card-chat__input"
        />
        <Button
          class="example-sigma-ui-card-chat__send"
          :disabled="inputLength === 0"
        >
          <SendIcon class="example-sigma-ui-card-chat__send-icon" />
          <span class="sr-only">Send</span>
        </Button>
      </form>
    </CardFooter>
  </Card>

  <Dialog v-model:open="open">
    <DialogContent class="example-sigma-ui-card-chat__dialog">
      <DialogHeader class="example-sigma-ui-card-chat__dialog-header">
        <DialogTitle>New message</DialogTitle>
        <DialogDescription>
          Invite a user to this thread. This will create a new group message.
        </DialogDescription>
      </DialogHeader>
      <Command class="example-sigma-ui-card-chat__command">
        <CommandInput
          v-model="search"
          placeholder="Search user..."
        />
        <CommandList>
          <CommandEmpty>No users found.</CommandEmpty>
          <CommandGroup class="example-sigma-ui-card-chat__command-group">
            <CommandItem
              v-for="user in filteredUsers"
              :key="user.email"
              :value="user"
              class="example-sigma-ui-card-chat__command-item"
              @select="() => {
                const index = selectedUsers.findIndex(u => u === user)
                if (index !== -1) {
                  selectedUsers.splice(index, 1)
                }
                else {
                  selectedUsers.push(user)
                }
              }"
            >
              <Avatar size="sm" />
              <div class="example-sigma-ui-card-chat__command-user">
                <p class="example-sigma-ui-card-chat__command-user-name">
                  {{ user.name }}
                </p>
                <p class="example-sigma-ui-card-chat__command-user-email">
                  {{ user.email }}
                </p>
              </div>
              <CheckIcon
                v-if="selectedUsers.includes(user)"
                class="example-sigma-ui-card-chat__command-check"
              />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
      <DialogFooter class="example-sigma-ui-card-chat__dialog-footer">
        <div
          v-if="selectedUsers.length > 0"
          class="example-sigma-ui-card-chat__selected-users"
        >
          <Avatar
            v-for="user in selectedUsers"
            :key="user.email"
            class="example-sigma-ui-card-chat__selected-avatar"
          />
        </div>
        <p
          v-else
          class="example-sigma-ui-card-chat__empty-selection"
        >
          Select users to add to this thread.
        </p>
        <Button
          :disabled="selectedUsers.length < 2"
          @click="open = false"
        >
          Continue
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<style>
.example-sigma-ui-card-chat__header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.example-sigma-ui-card-chat__user {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.example-sigma-ui-card-chat__user-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.example-sigma-ui-card-chat__user-name {
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1;
}

.example-sigma-ui-card-chat__user-email {
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
}

.example-sigma-ui-card-chat__new-message {
  border-radius: var(--radius-full);
  padding: 0.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.example-sigma-ui-card-chat__new-message-icon {
  width: 1rem;
  height: 1rem;
}

.example-sigma-ui-card-chat__messages {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.example-sigma-ui-card-chat__message {
  max-width: 75%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-radius: var(--radius);
  padding: 0.75rem;
  font-size: 0.875rem;
}

.example-sigma-ui-card-chat__message--agent {
  background-color: hsl(var(--muted));
}

.example-sigma-ui-card-chat__message--user {
  margin-left: auto;
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}

.example-sigma-ui-card-chat__form {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 0.5rem;
}

.example-sigma-ui-card-chat__input {
  flex: 1;
}

.example-sigma-ui-card-chat__send {
  padding: 0.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.example-sigma-ui-card-chat__send-icon {
  width: 1rem;
  height: 1rem;
}

.example-sigma-ui-card-chat__dialog {
  gap: 0;
  padding: 0;
  outline: none;
}

.example-sigma-ui-card-chat__dialog-header {
  padding: 1.25rem 1rem 1rem 1rem;
}

.example-sigma-ui-card-chat__command {
  overflow: hidden;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-top: 1px solid hsl(var(--border));
}

.example-sigma-ui-card-chat__command-group {
  padding: 0.5rem;
}

.example-sigma-ui-card-chat__command-item {
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
}

.example-sigma-ui-card-chat__command-user {
  margin-left: 0.5rem;
}

.example-sigma-ui-card-chat__command-user-name {
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1;
}

.example-sigma-ui-card-chat__command-user-email {
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
}

.example-sigma-ui-card-chat__command-check {
  margin-left: auto;
  width: 1.25rem;
  height: 1.25rem;
  color: hsl(var(--primary));
}

.example-sigma-ui-card-chat__dialog-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid hsl(var(--border));
  padding: 1rem;
}

.example-sigma-ui-card-chat__selected-users {
  display: flex;
  margin-left: -0.5rem;
  overflow: hidden;
}

.example-sigma-ui-card-chat__selected-avatar {
  display: inline-block;
  border: 2px solid hsl(var(--background));
}

.example-sigma-ui-card-chat__empty-selection {
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
}
</style>
