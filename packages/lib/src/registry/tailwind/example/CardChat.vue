<script setup lang="ts">
import { CheckIcon, PlusIcon, SendIcon } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@ui/registry/tailwind/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@ui/registry/tailwind/ui/dialog';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@ui/registry/tailwind/ui/command';
import { Avatar } from '@ui/registry/tailwind/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@ui/registry/tailwind/ui/tooltip';
import { Button } from '@ui/registry/tailwind/ui/button';
import { Input } from '@ui/registry/tailwind/ui/input';
import { cn } from '@ui/utils';

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
    <CardHeader class="flex flex-row items-center justify-between">
      <div class="flex items-center space-x-4">
        <Avatar size="sm" />

        <div>
          <p class="text-sm font-medium leading-none">
            Sofia Davis
          </p>
          <p class="text-sm text-muted-foreground">
            m@example.com
          </p>
        </div>
      </div>
      <TooltipProvider>
        <Tooltip :delay-duration="200">
          <TooltipTrigger as-child>
            <Button
              variant="outline"
              class="rounded-full p-2.5 flex items-center justify-center"
              @click="open = true"
            >
              <PlusIcon class="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent :side-offset="10">
            New message
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </CardHeader>
    <CardContent>
      <div class="space-y-4">
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="cn(
            'flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm',
            message.role === 'user' ? 'ml-auto bg-primary text-primary-foreground' : 'bg-muted',
          )"
        >
          {{ message.content }}
        </div>
      </div>
    </CardContent>
    <CardFooter>
      <form
        class="flex w-full items-center space-x-2"
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
          class="flex-1"
        />
        <Button
          class="p-2.5 flex items-center justify-center"
          :disabled="inputLength === 0"
        >
          <SendIcon class="w-4 h-4" />
          <span class="sr-only">Send</span>
        </Button>
      </form>
    </CardFooter>
  </Card>

  <Dialog v-model:open="open">
    <DialogContent class="gap-0 p-0 outline-hidden">
      <DialogHeader class="px-4 pb-4 pt-5">
        <DialogTitle>New message</DialogTitle>
        <DialogDescription>
          Invite a user to this thread. This will create a new group
          message.
        </DialogDescription>
      </DialogHeader>
      <Command class="overflow-hidden rounded-t-none border-t">
        <CommandInput
          v-model="search"
          placeholder="Search user..."
        />
        <CommandList>
          <CommandEmpty>No users found.</CommandEmpty>
          <CommandGroup class="p-2">
            <CommandItem
              v-for="user in filteredUsers"
              :key="user.email"
              :value="user"
              class="flex items-center px-2"
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

              <div class="ml-2">
                <p class="text-sm font-medium leading-none">
                  {{ user.name }}
                </p>
                <p class="text-sm text-muted-foreground">
                  {{ user.email }}
                </p>
              </div>
              <CheckIcon
                v-if="selectedUsers.includes(user)"
                class="ml-auto flex h-5 w-5 text-primary"
              />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
      <DialogFooter class="flex items-center border-t p-4 sm:justify-between">
        <div
          v-if="selectedUsers.length > 0"
          class="flex -space-x-2 overflow-hidden"
        >
          <Avatar
            v-for="user in selectedUsers"
            :key="user.email"
            class="inline-block border-2 border-background"
            size="sm"
          />
        </div>

        <p
          v-else
          class="text-sm text-muted-foreground"
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
