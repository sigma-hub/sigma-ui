<script setup lang="ts">
import { SearchIcon } from '@lucide/vue';
import { computed, ref } from 'vue';
import { refDebounced } from '@vueuse/core';
import { Input } from '@ui/registry/css/ui/input';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@ui/registry/css/ui/resizable';
import { Separator } from '@ui/registry/css/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/registry/css/ui/tabs';
import { TooltipProvider } from '@ui/registry/css/ui/tooltip';
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
      class="mail-inbox"
    >
      <ResizablePanel
        :default-size="20"
        :collapsed-size="4"
        collapsible
        :min-size="15"
        :max-size="24"
        class="mail-inbox__folders"
        @expand="collapsed = false"
        @collapse="collapsed = true"
      >
        <div
          class="mail-inbox__account-bar"
          :class="{ 'mail-inbox__account-bar--collapsed': collapsed }"
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
          class="mail-inbox__list-pane"
        >
          <div class="mail-inbox__list-header">
            <h1 class="mail-inbox__title">
              {{ inboxTitle }}
            </h1>
            <TabsList class="mail-inbox__tabs">
              <TabsTrigger value="all">
                {{ allMailLabel }}
              </TabsTrigger>
              <TabsTrigger value="unread">
                {{ unreadLabel }}
              </TabsTrigger>
            </TabsList>
          </div>
          <Separator />
          <form class="mail-inbox__search">
            <SearchIcon class="mail-inbox__search-icon" />
            <Input
              v-model="searchValue"
              :placeholder="searchPlaceholder"
              class="mail-inbox__search-input"
            />
          </form>
          <TabsContent
            value="all"
            class="mail-inbox__tab"
          >
            <MailList
              v-model:selected-mail="selectedMail"
              :items="filteredMails"
            />
          </TabsContent>
          <TabsContent
            value="unread"
            class="mail-inbox__tab"
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

<style>
.mail-inbox {
  height: 100svh;
  align-items: stretch;
}

.mail-inbox__account-bar {
  display: flex;
  height: calc(var(--spacing) * 13);
  align-items: center;
  padding: 0 calc(var(--spacing) * 2);
}

.mail-inbox__account-bar--collapsed {
  justify-content: center;
  padding: 0;
}

.mail-inbox__list-pane {
  display: flex;
  height: 100%;
  flex-direction: column;
}

.mail-inbox__list-header {
  display: flex;
  align-items: center;
  padding: calc(var(--spacing) * 2) calc(var(--spacing) * 4);
}

.mail-inbox__title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
}

.mail-inbox__tabs {
  margin-left: auto;
}

.mail-inbox__search {
  position: relative;
  padding: calc(var(--spacing) * 4);
}

.mail-inbox__search-icon {
  position: absolute;
  top: 1.65rem;
  left: calc(var(--spacing) * 6);
  width: calc(var(--spacing) * 4);
  height: calc(var(--spacing) * 4);
  color: var(--muted-foreground);
}

.mail-inbox__search-input {
  padding-left: calc(var(--spacing) * 8);
}

.mail-inbox__tab {
  min-height: 0;
  flex: 1;
  margin: 0;
}
</style>
