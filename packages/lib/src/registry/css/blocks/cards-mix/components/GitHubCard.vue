<script setup lang="ts">
import { Button } from '@ui/registry/css/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@ui/registry/css/ui/card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@ui/registry/css/ui/dropdown-menu';
import { Separator } from '@ui/registry/css/ui/separator';
import { ChevronDownIcon, CircleIcon, PlusIcon, StarIcon } from 'lucide-vue-next';
</script>

<template>
  <Card>
    <CardHeader class="cards-mix__gen-39">
      <div class="cards-mix__gen-40">
        <CardTitle>sigma-ui</CardTitle>
        <CardDescription>
          Beautifully designed components built with Reka UI and Tailwind
          CSS.
        </CardDescription>
      </div>
      <div class="cards-mix__gen-41">
        <Button
          variant="secondary"
          class="cards-mix__gen-42"
        >
          <StarIcon class="cards-mix__gen-43" />
          Star
        </Button>
        <Separator
          orientation="vertical"
          class="cards-mix__gen-44"
        />
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button
              variant="secondary"
              class="cards-mix__gen-45"
            >
              <ChevronDownIcon class="cards-mix__gen-46" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            :align-offset="-5"
            class="cards-mix__gen-47"
          >
            <DropdownMenuLabel>Suggested Lists</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem :model-value="true">
              Future Ideas
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>My Stack</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Inspiration</DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <PlusIcon class="cards-mix__gen-43" /> Create List
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </CardHeader>
    <CardContent>
      <div class="cards-mix__gen-48">
        <div class="cards-mix__gen-49">
          <CircleIcon class="cards-mix__gen-50" />
          TypeScript
        </div>
        <div class="cards-mix__gen-49">
          <StarIcon class="cards-mix__gen-51" />
          20k
        </div>
        <div>Updated April 2023</div>
      </div>
    </CardContent>
  </Card>
</template>
