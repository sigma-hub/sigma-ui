<script lang="ts" setup>
import type { Component } from 'vue';
import { ChevronRightIcon } from 'lucide-vue-next';
import {
  Breadcrumb,
  BreadcrumbItem as BreadcrumbItemComponent,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '.';

export interface BreadcrumbItem {
  label?: string;
  icon?: string | Component;
  url?: string;
  route?: any;
  target?: string;
  active?: boolean;
}

interface ActionProps {

  'aria-current'?: 'page' | 'step' | 'location' | 'date' | 'time' | boolean;
}

const props = defineProps<{
  home?: BreadcrumbItem;
  model?: BreadcrumbItem[];
}>();

function getActionProps(item: BreadcrumbItem, isLast: boolean): ActionProps {
  const isActive = item.active || isLast;
  return {
    'class': `cursor-pointer flex items-center ${isActive ? 'text-foreground font-medium' : 'text-muted-foreground'}`,
    'aria-current': isActive ? 'page' : undefined,
  };
}
</script>

<template>
  <Breadcrumb :class="$attrs.class">
    <BreadcrumbList>
      <BreadcrumbItemComponent v-if="home">
        <slot
          name="home"
          :item="home"
          :props="{ action: getActionProps(home, false) }"
        >
          <BreadcrumbLink
            v-if="home.route"
            :to="home.route"
            class="flex items-center gap-2"
            v-bind="getActionProps(home, false)"
          >
            <component
              :is="home.icon"
              v-if="home.icon"
              class="h-4 w-4"
            />
            <span>{{ home.label }}</span>
          </BreadcrumbLink>
          <BreadcrumbLink
            v-else-if="home.url"
            :href="home.url"
            :target="home.target"
            class="flex items-center gap-2"
            v-bind="getActionProps(home, false)"
          >
            <component
              :is="home.icon"
              v-if="home.icon"
              class="h-4 w-4"
            />
            <span v-if="home.label">{{ home.label }}</span>
          </BreadcrumbLink>
        </slot>
      </BreadcrumbItemComponent>

      <BreadcrumbSeparator v-if="home && model?.length">
        <slot name="separator">
          <ChevronRightIcon />
        </slot>
      </BreadcrumbSeparator>

      <template
        v-for="(item, index) in (model || [])"
        :key="index"
      >
        <BreadcrumbItemComponent>
          <slot
            name="item"
            :item="item"
            :props="{ action: getActionProps(item, index === (model?.length || 0) - 1) }"
          >
            <BreadcrumbLink
              v-if="item.route"
              :to="item.route"
              class="flex items-center gap-2"
              v-bind="getActionProps(item, index === (model?.length || 0) - 1)"
            >
              <component
                :is="item.icon"
                v-if="item.icon"
                class="h-4 w-4"
              />
              <span>{{ item.label }}</span>
            </BreadcrumbLink>
            <BreadcrumbLink
              v-else-if="item.url"
              :href="item.url"
              :target="item.target"
              class="flex items-center gap-2"
              v-bind="getActionProps(item, index === (model?.length || 0) - 1)"
            >
              <component
                :is="item.icon"
                v-if="item.icon"
                class="h-4 w-4"
              />
              <span>{{ item.label }}</span>
            </BreadcrumbLink>
            <BreadcrumbPage
              v-else
              v-bind="getActionProps(item, index === (model?.length || 0) - 1)"
            >
              <div class="flex items-center gap-2">
                <component
                  :is="item.icon"
                  v-if="item.icon"
                  class="h-4 w-4"
                />
                <span>{{ item.label }}</span>
              </div>
            </BreadcrumbPage>
          </slot>
        </BreadcrumbItemComponent>

        <BreadcrumbSeparator v-if="index < (model?.length || 0) - 1">
          <slot name="separator">
            <ChevronRightIcon />
          </slot>
        </BreadcrumbSeparator>
      </template>
    </BreadcrumbList>
  </Breadcrumb>
</template>
