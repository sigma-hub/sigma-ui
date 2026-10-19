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
      class="dashboard-mail"
    >
      <ResizablePanel
        :default-size="20"
        :collapsed-size="4"
        collapsible
        :min-size="15"
        :max-size="24"
        class="dashboard-mail__folders"
        @expand="collapsed = false"
        @collapse="collapsed = true"
      >
        <div
          class="dashboard-mail__account-bar"
          :class="{ 'dashboard-mail__account-bar--collapsed': collapsed }"
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
          class="dashboard-mail__list-pane"
        >
          <div class="dashboard-mail__list-header">
            <h1 class="dashboard-mail__title">
              {{ inboxTitle }}
            </h1>
            <TabsList class="dashboard-mail__tabs">
              <TabsTrigger value="all">
                {{ allMailLabel }}
              </TabsTrigger>
              <TabsTrigger value="unread">
                {{ unreadLabel }}
              </TabsTrigger>
            </TabsList>
          </div>
          <Separator />
          <form class="dashboard-mail__search">
            <SearchIcon class="dashboard-mail__search-icon" />
            <Input
              v-model="searchValue"
              :placeholder="searchPlaceholder"
              class="dashboard-mail__search-input"
            />
          </form>
          <TabsContent
            value="all"
            class="dashboard-mail__tab"
          >
            <MailList
              v-model:selected-mail="selectedMail"
              :items="filteredMails"
            />
          </TabsContent>
          <TabsContent
            value="unread"
            class="dashboard-mail__tab"
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
@layer base, components;

@layer components {
  .dashboard-mail {
    height: 100svh;
    align-items: stretch;
  }

  .dashboard-mail__account-bar {
    display: flex;
    height: calc(var(--spacing) * 13);
    align-items: center;
    padding: 0 calc(var(--spacing) * 2);
  }

  .dashboard-mail__account-bar--collapsed {
    justify-content: center;
    padding: 0;
  }

  .dashboard-mail__list-pane {
    display: flex;
    height: 100%;
    flex-direction: column;
  }

  .dashboard-mail__list-header {
    display: flex;
    align-items: center;
    padding: calc(var(--spacing) * 2) calc(var(--spacing) * 4);
  }

  .dashboard-mail__title {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 700;
  }

  .dashboard-mail__tabs {
    margin-left: auto;
  }

  .dashboard-mail__search {
    position: relative;
    padding: calc(var(--spacing) * 4);
  }

  .dashboard-mail__search-icon {
    position: absolute;
    top: 1.65rem;
    left: calc(var(--spacing) * 6);
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
    color: var(--muted-foreground);
  }

  .dashboard-mail__search-input {
    padding-left: calc(var(--spacing) * 8);
  }

  .dashboard-mail__tab {
    min-height: 0;
    flex: 1;
    margin: 0;
  }
}
</style>
