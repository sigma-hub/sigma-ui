<script setup lang="ts">
import { SearchIcon } from '@lucide/vue';
import { computed, ref } from 'vue';
import { refDebounced } from '@vueuse/core';
import { Input } from '@ui/registry/tailwind/ui/input';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@ui/registry/tailwind/ui/resizable';
import { Separator } from '@ui/registry/tailwind/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/registry/tailwind/ui/tabs';
import { TooltipProvider } from '@ui/registry/tailwind/ui/tooltip';
import AccountSwitcher from './components/AccountSwitcher.vue';
import FolderNav from './components/FolderNav.vue';
import MailDisplay from './components/MailDisplay.vue';
import MailList from './components/MailList.vue';
import {
  accounts,
  allMailLabel,
  archiveLabel,
  categoryFolders,
  emptySelectionLabel,
  forwardLabel,
  inboxTitle,
  junkLabel,
  mails,
  moreLabel,
  muteLabel,
  primaryFolders,
  replyAllLabel,
  replyLabel,
  replyToLabel,
  searchPlaceholder,
  sendLabel,
  snoozeLabel,
  snoozeTitle,
  trashLabel,
  unreadLabel,
} from './data';

const collapsed = ref(false);
const selectedMail = ref(mails[0]?.id);
const searchValue = ref('');
const debouncedSearch = refDebounced(searchValue, 250);

const filteredMails = computed(() => {
  const query = debouncedSearch.value.trim();

  if (!query) {
    return mails;
  }

  return mails.filter(mail => mail.name.includes(query)
    || mail.email.includes(query)
    || mail.subject.includes(query)
    || mail.text.includes(query));
});

const unreadMails = computed(() => filteredMails.value.filter(mail => !mail.read));
const selectedMailData = computed(() => mails.find(mail => mail.id === selectedMail.value));
</script>

<template>
  <TooltipProvider :delay-duration="0">
    <ResizablePanelGroup
      direction="horizontal"
      class="h-svh items-stretch"
    >
      <ResizablePanel
        :default-size="20"
        :collapsed-size="4"
        collapsible
        :min-size="15"
        :max-size="24"
        @expand="collapsed = false"
        @collapse="collapsed = true"
      >
        <div
          class="flex h-[52px] items-center"
          :class="collapsed ? 'justify-center' : 'px-2'"
        >
          <AccountSwitcher
            :collapsed="collapsed"
            :accounts="accounts"
          />
        </div>
        <Separator />
        <FolderNav
          :collapsed="collapsed"
          :links="primaryFolders"
        />
        <Separator />
        <FolderNav
          :collapsed="collapsed"
          :links="categoryFolders"
        />
      </ResizablePanel>
      <ResizableHandle with-handle />
      <ResizablePanel
        :default-size="32"
        :min-size="28"
      >
        <Tabs
          default-value="all"
          class="flex h-full flex-col"
        >
          <div class="flex items-center px-4 py-2">
            <h1 class="text-xl font-bold">
              {{ inboxTitle }}
            </h1>
            <TabsList class="ml-auto">
              <TabsTrigger value="all">
                {{ allMailLabel }}
              </TabsTrigger>
              <TabsTrigger value="unread">
                {{ unreadLabel }}
              </TabsTrigger>
            </TabsList>
          </div>
          <Separator />
          <form class="p-4">
            <div class="relative">
              <SearchIcon class="absolute top-2.5 left-2 size-4 text-muted-foreground" />
              <Input
                v-model="searchValue"
                :placeholder="searchPlaceholder"
                class="pl-8"
              />
            </div>
          </form>
          <TabsContent
            value="all"
            class="m-0 min-h-0 flex-1"
          >
            <MailList
              v-model:selected-mail="selectedMail"
              :items="filteredMails"
            />
          </TabsContent>
          <TabsContent
            value="unread"
            class="m-0 min-h-0 flex-1"
          >
            <MailList
              v-model:selected-mail="selectedMail"
              :items="unreadMails"
            />
          </TabsContent>
        </Tabs>
      </ResizablePanel>
      <ResizableHandle with-handle />
      <ResizablePanel :default-size="48">
        <MailDisplay
          :mail="selectedMailData"
          :empty-selection-label="emptySelectionLabel"
          :send-label="sendLabel"
          :mute-label="muteLabel"
          :reply-to-label="replyToLabel"
          :snooze-title="snoozeTitle"
          :archive-label="archiveLabel"
          :junk-label="junkLabel"
          :trash-label="trashLabel"
          :snooze-label="snoozeLabel"
          :reply-label="replyLabel"
          :reply-all-label="replyAllLabel"
          :forward-label="forwardLabel"
          :more-label="moreLabel"
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  </TooltipProvider>
</template>
