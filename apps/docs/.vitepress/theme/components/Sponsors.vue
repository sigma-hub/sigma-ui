<script setup lang="ts">
import { CalendarDaysIcon } from 'lucide-vue-next';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@ui/registry/tailwind/ui/hover-card';
</script>

<template>
  <div class="py-3 bg-muted/0 sticky top-0 left-0 w-[220px] rounded-lg">
    <div class="mt-4 flex flex-col gap-2">
      <div>
        Sponsors
      </div>
      <div class="w-[250px] flex flex-col gap-2 text-sm text-muted-foreground">
        <HoverCard
          :open-delay="0"
          :close-delay="0"
        >
          <HoverCardTrigger as-child>
            <a
              href="https://github.com/aleksey-hoffman/sigma-file-manager"
              target="_blank"
              class="cursor-pointer flex items-center gap-4 bg-muted/20 border rounded-lg"
            >
              <div class="px-3 py-3 flex items-center gap-3 top-0 left-0 ">
                <VPImage
                  alt="Logo"
                  width="24"
                  height="24"
                  class="block"
                  :image="{
                    dark: '/sfm-logo.png',
                    light: '/sfm-logo.png',
                  }"
                />
                <div class="font-semibold text-foreground/80 dark:text-muted-foreground">
                  Sigma File Manager
                </div>
              </div>
            </a>
          </HoverCardTrigger>
          <HoverCardContent class="w-80">
            <div class="flex justify-between space-x-4">
              <div class="space-y-1">
                <a
                  href="https://github.com/aleksey-hoffman/sigma-file-manager"
                  class="text-xs text-muted-foreground"
                >
                  github.com/aleksey-hoffman/sigma-file-manager
                </a>

                <p class="text-sm font-semibold">
                  A free, open-source file manager app, made by the creator of Sigma-UI.
                </p>
                <VPImage
                  alt="Dashboard"
                  width="1280"
                  height="1214"
                  class="block my-2 rounded-sm"
                  :image="{
                    dark: '/sigma-file-manager-main.png',
                    light: '/sigma-file-manager-main.png',
                  }"
                />
                <div class="flex items-center pt-2">
                  <CalendarDaysIcon class="mr-4 h-8 w-8 " />
                  <span class="text-xs text-muted-foreground">
                    Sponsoring myself, until someone sponsors this project ☺️
                  </span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
      <div class="mt-2">
        Support this project
      </div>
      <div class="w-[250px] flex flex-col gap-2 text-sm text-muted-foreground">
        <HoverCard
          :open-delay="0"
          :close-delay="0"
        >
          <HoverCardTrigger as-child>
            <a
              href="https://patreon.com/sigma_ui"
              target="_blank"
              class="cursor-pointer bg-muted/20 border rounded-lg"
            >
              <div class="px-2 py-2 flex flex-col gap-2">
                <div class="flex items-center gap-3 top-0 left-0">
                  <VPImage
                    alt="Logo"
                    width="16"
                    height="16"
                    class="block"
                    :image="{
                      dark: '/patreon-logo-white.png',
                      light: '/patreon-logo-black.png',
                    }"
                  />
                  <div class="font-semibold text-foreground/80 dark:text-muted-foreground">
                    Patreon
                  </div>
                </div>
              </div>
            </a>
          </HoverCardTrigger>
          <HoverCardContent class="w-80">
            <div class="flex justify-between space-x-4">
              <div class="space-y-1">
                <a
                  href="https://patreon.com/sigma_ui"
                  class="text-xs text-muted-foreground"
                >
                  patreon.com/sigma_ui
                </a>

                <p class="text-sm font-semibold">
                  Support the project on Patreon on a monthly basis and get rewards.
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
        <HoverCard
          :open-delay="0"
          :close-delay="0"
        >
          <HoverCardTrigger as-child>
            <a
              href="https://www.donationalerts.com/r/sigma_dev"
              target="_blank"
              class="cursor-pointer bg-muted/20 border rounded-lg"
            >
              <div class="px-2 py-2 flex flex-col gap-2">
                <div class="flex items-center gap-3 top-0 left-0">
                  <VPImage
                    alt="Logo"
                    width="16"
                    height="16"
                    class="block"
                    :image="{
                      dark: '/da-logo-white.png',
                      light: '/da-logo-black.png',
                    }"
                  />
                  <div class="font-semibold text-foreground/80 dark:text-muted-foreground">
                    Donation Alerts
                  </div>
                </div>
              </div>
            </a>
          </HoverCardTrigger>
          <HoverCardContent class="w-80">
            <div class="flex justify-between space-x-4">
              <div class="space-y-1">
                <a
                  href="https://www.donationalerts.com/r/sigma_dev"
                  class="text-xs text-muted-foreground"
                >
                  donationalerts.com/r/sigma_dev
                </a>

                <p class="text-sm font-semibold">
                  Support the project on Donation Alerts with a one-time donation.
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
        <div class="text-muted-foreground dark:text-muted-foreground/80 text-xs border-t-[1px] pt-2 border-muted-foreground/10">
          Current supporters: <span class="bg-muted/70 px-2 py-0.5 rounded-sm">0</span> people
        </div>
      </div>
    </div>
  </div>
</template>
