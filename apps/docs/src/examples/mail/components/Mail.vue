<script lang="ts" setup>
import {
  ArrowLeftIcon,
  SearchIcon,
} from '@lucide/vue';
import { computed, ref } from 'vue';
import { createReusableTemplate, refDebounced, useMediaQuery } from '@vueuse/core';
import type { Mail } from '../data/mails';
import AccountSwitcher from './AccountSwitcher.vue';
import MailList from './MailList.vue';
import MailDisplay from './MailDisplay.vue';
import Nav, { type LinkProp } from './Nav.vue';
import { cn } from '@ui/utils';
import { Separator } from '@ui/registry/tailwind/ui/separator';
import { Input } from '@ui/registry/tailwind/ui/input';
import { Button } from '@ui/registry/tailwind/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@ui/registry/tailwind/ui/tabs';
import { TooltipProvider } from '@ui/registry/tailwind/ui/tooltip';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@ui/registry/tailwind/ui/resizable';

interface MailProps {
  accounts: {
    label: string;
    email: string;
    icon: string;
  }[];
  mails: Mail[];
  defaultLayout?: number[];
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

const props = withDefaults(defineProps<MailProps>(), {
  defaultCollapsed: false,
  defaultLayout: () => [265, 440, 655],
});

const isCollapsed = ref(props.defaultCollapsed);
// Three resizable panes do not fit a phone, so narrow screens show the list or the open message.
const isWide = useMediaQuery('(min-width: 768px)');
const isMailOpenOnNarrow = ref(false);
const [DefineMailListPane, MailListPane] = createReusableTemplate();

function openMail(id: string | undefined) {
  selectedMail.value = id;
  isMailOpenOnNarrow.value = Boolean(id);
}

const selectedMail = ref<string | undefined>(props.mails[0].id);
const searchValue = ref('');
const debouncedSearch = refDebounced(searchValue, 250);

const filteredMailList = computed(() => {
  let output: Mail[] = [];
  const searchValue = debouncedSearch.value?.trim();

  if (!searchValue) {
    output = props.mails;
  } else {
    output = props.mails.filter((item) => {
      return item.name.includes(debouncedSearch.value)
        || item.email.includes(debouncedSearch.value)
        || item.name.includes(debouncedSearch.value)
        || item.subject.includes(debouncedSearch.value)
        || item.text.includes(debouncedSearch.value);
    });
  }

  return output;
});

const unreadMailList = computed(() => filteredMailList.value.filter(item => !item.read));

const selectedMailData = computed(() => props.mails.find(item => item.id === selectedMail.value));

const links: LinkProp[] = [
  {
    title: 'Inbox',
    label: '128',
    icon: 'lucide:inbox',
    variant: 'default',
  },
  {
    title: 'Drafts',
    label: '9',
    icon: 'lucide:file',
    variant: 'ghost',
  },
  {
    title: 'Sent',
    label: '',
    icon: 'lucide:send',
    variant: 'ghost',
  },
  {
    title: 'Junk',
    label: '23',
    icon: 'lucide:archive',
    variant: 'ghost',
  },
  {
    title: 'Trash',
    label: '',
    icon: 'lucide:trash',
    variant: 'ghost',
  },
  {
    title: 'Archive',
    label: '',
    icon: 'lucide:archive',
    variant: 'ghost',
  },
];

const links2: LinkProp[] = [
  {
    title: 'Social',
    label: '972',
    icon: 'lucide:user-2',
    variant: 'ghost',
  },
  {
    title: 'Updates',
    label: '342',
    icon: 'lucide:alert-circle',
    variant: 'ghost',
  },
  {
    title: 'Forums',
    label: '128',
    icon: 'lucide:message-square',
    variant: 'ghost',
  },
  {
    title: 'Shopping',
    label: '8',
    icon: 'lucide:shopping-cart',
    variant: 'ghost',
  },
  {
    title: 'Promotions',
    label: '21',
    icon: 'lucide:archive',
    variant: 'ghost',
  },
];

function onCollapse() {
  isCollapsed.value = true;
}

function onExpand() {
  isCollapsed.value = false;
}
</script>

<template>
  <DefineMailListPane>
    <Tabs default-value="all">
      <div class="flex items-center px-4 py-2">
        <h1 class="text-xl font-bold">
          Inbox
        </h1>
        <TabsList class="ml-auto">
          <TabsTrigger
            value="all"
            class="text-gray-600 dark:text-gray-200"
          >
            All mail
          </TabsTrigger>
          <TabsTrigger
            value="unread"
            class="text-gray-600 dark:text-gray-200"
          >
            Unread
          </TabsTrigger>
        </TabsList>
      </div>
      <Separator />
      <div class="p-4">
        <form>
          <div class="relative">
            <SearchIcon class="absolute left-2 top-2.5 size-4 text-muted-foreground" />
            <Input
              v-model="searchValue"
              placeholder="Search"
              class="pl-8"
            />
          </div>
        </form>
      </div>
      <TabsContent
        value="all"
        class="m-0"
      >
        <MailList
          :selected-mail="selectedMail"
          :items="filteredMailList"
          @update:selected-mail="openMail"
        />
      </TabsContent>
      <TabsContent
        value="unread"
        class="m-0"
      >
        <MailList
          :selected-mail="selectedMail"
          :items="unreadMailList"
          @update:selected-mail="openMail"
        />
      </TabsContent>
    </Tabs>
  </DefineMailListPane>
  <TooltipProvider :delay-duration="0">
    <div
      v-if="!isWide"
      class="flex h-[800px] flex-col overflow-hidden"
    >
      <template v-if="isMailOpenOnNarrow">
        <div class="flex items-center px-2 py-2">
          <Button
            variant="ghost"
            size="sm"
            @click="isMailOpenOnNarrow = false"
          >
            <ArrowLeftIcon class="size-4" />
            Inbox
          </Button>
        </div>
        <Separator />
        <div class="min-h-0 flex-1 overflow-y-auto">
          <MailDisplay :mail="selectedMailData" />
        </div>
      </template>
      <div
        v-else
        class="min-h-0 flex-1 overflow-y-auto"
      >
        <MailListPane />
      </div>
    </div>
    <ResizablePanelGroup
      v-else
      id="resize-panel-group-1"
      direction="horizontal"
      class="h-full max-h-[800px] items-stretch"
    >
      <ResizablePanel
        id="resize-panel-1"
        :default-size="defaultLayout[0]"
        :collapsed-size="navCollapsedSize"
        collapsible
        :min-size="15"
        :max-size="20"
        :class="cn(isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out')"
        @expand="onExpand"
        @collapse="onCollapse"
      >
        <div :class="cn('flex h-[52px] items-center justify-center', isCollapsed ? 'h-[52px]' : 'px-2')">
          <AccountSwitcher
            :is-collapsed="isCollapsed"
            :accounts="accounts"
          />
        </div>
        <Separator />
        <Nav
          :is-collapsed="isCollapsed"
          :links="links"
        />
        <Separator />
        <Nav
          :is-collapsed="isCollapsed"
          :links="links2"
        />
      </ResizablePanel>
      <ResizableHandle
        id="resize-handle-1"
        with-handle
      />
      <ResizablePanel
        id="resize-panel-2"
        :default-size="defaultLayout[1]"
        :min-size="30"
      >
        <MailListPane />
      </ResizablePanel>
      <ResizableHandle
        id="resiz-handle-2"
        with-handle
      />
      <ResizablePanel
        id="resize-panel-3"
        :default-size="defaultLayout[2]"
      >
        <MailDisplay :mail="selectedMailData" />
      </ResizablePanel>
    </ResizablePanelGroup>
  </TooltipProvider>
</template>
