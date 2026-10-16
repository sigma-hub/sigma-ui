<script setup lang="ts">
import { computed, ref } from 'vue';
import { CheckIcon, ChevronsUpDownIcon, CirclePlusIcon } from 'lucide-vue-next';
import { Avatar } from '@ui/registry/tailwind/ui/avatar';
import { Button } from '@ui/registry/tailwind/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@ui/registry/tailwind/ui/command';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@ui/registry/tailwind/ui/dialog';
import { Input } from '@ui/registry/tailwind/ui/input';
import { Label } from '@ui/registry/tailwind/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/registry/tailwind/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/registry/tailwind/ui/select';
import type { PlanOption, Team, TeamGroup } from '../data';

const props = defineProps<{
  groups: TeamGroup[];
  plans: PlanOption[];
  searchPlaceholder: string;
  emptyLabel: string;
  createLabel: string;
  dialogTitle: string;
  dialogDescription: string;
  nameLabel: string;
  namePlaceholder: string;
  planLabel: string;
  planPlaceholder: string;
  cancelLabel: string;
  continueLabel: string;
}>();

const open = ref(false);
const showNewTeamDialog = ref(false);
const selectedTeam = ref<Team>(props.groups[0]?.teams[0] ?? { label: '', value: '' });
const search = ref('');

const filteredGroups = computed(() => props.groups
  .map(group => ({
    ...group,
    teams: group.teams.filter(team => team.label.toLowerCase().includes(search.value.toLowerCase())),
  }))
  .filter(group => group.label.toLowerCase().includes(search.value.toLowerCase()) || group.teams.length > 0));

function selectTeam(team: Team) {
  selectedTeam.value = team;
  open.value = false;
}

function openCreateTeam() {
  open.value = false;
  showNewTeamDialog.value = true;
}

function closeCreateTeam() {
  showNewTeamDialog.value = false;
}
</script>

<template>
  <Dialog v-model:open="showNewTeamDialog">
    <Popover v-model:open="open">
      <PopoverTrigger as-child>
        <Button
          variant="outline"
          role="combobox"
          :aria-expanded="open"
          aria-label="Select a team"
          class="w-[200px] justify-between"
        >
          <Avatar
            size="xs"
            class="mr-2"
          />
          {{ selectedTeam.label }}
          <ChevronsUpDownIcon class="ml-auto size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput
              v-model="search"
              :placeholder="searchPlaceholder"
            />
            <CommandEmpty>{{ emptyLabel }}</CommandEmpty>
            <CommandGroup
              v-for="group in filteredGroups"
              :key="group.label"
              :heading="group.label"
            >
              <CommandItem
                v-for="team in group.teams"
                :key="team.value"
                :value="team.value"
                @select="selectTeam(team)"
              >
                <Avatar
                  size="xs"
                  class="mr-2"
                />
                {{ team.label }}
                <CheckIcon
                  class="ml-auto size-4"
                  :class="selectedTeam.value === team.value ? 'opacity-100' : 'opacity-0'"
                />
              </CommandItem>
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <DialogTrigger as-child>
                <CommandItem
                  value="create-team"
                  @select="openCreateTeam"
                >
                  <CirclePlusIcon class="mr-2 size-5" />
                  {{ createLabel }}
                </CommandItem>
              </DialogTrigger>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ dialogTitle }}</DialogTitle>
        <DialogDescription>
          {{ dialogDescription }}
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-2">
        <div class="grid gap-2">
          <Label for="team-name">{{ nameLabel }}</Label>
          <Input
            id="team-name"
            :placeholder="namePlaceholder"
          />
        </div>
        <div class="grid gap-2">
          <Label for="team-plan">{{ planLabel }}</Label>
          <Select>
            <SelectTrigger id="team-plan">
              <SelectValue :placeholder="planPlaceholder" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="plan in plans"
                :key="plan.value"
                :value="plan.value"
              >
                <span class="font-medium">{{ plan.label }}</span>
                -
                <span class="text-muted-foreground">{{ plan.detail }}</span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter>
        <Button
          variant="outline"
          @click="closeCreateTeam"
        >
          {{ cancelLabel }}
        </Button>
        <Button
          type="button"
          @click="closeCreateTeam"
        >
          {{ continueLabel }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
