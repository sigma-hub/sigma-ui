<script setup lang="ts">
import { computed, ref } from 'vue';
import { CheckIcon, ChevronsUpDownIcon, CirclePlusIcon } from 'lucide-vue-next';
import { Avatar } from '@ui/registry/css/ui/avatar';
import { Button } from '@ui/registry/css/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@ui/registry/css/ui/command';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@ui/registry/css/ui/dialog';
import { Input } from '@ui/registry/css/ui/input';
import { Label } from '@ui/registry/css/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/registry/css/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/registry/css/ui/select';
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
          class="dashboard-overview__team-button"
        >
          <Avatar
            size="xs"
            class="dashboard-overview__team-avatar"
          />
          {{ selectedTeam.label }}
          <ChevronsUpDownIcon class="dashboard-overview__team-chevron" />
        </Button>
      </PopoverTrigger>
      <PopoverContent class="dashboard-overview__team-popover">
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
                  class="dashboard-overview__team-avatar"
                />
                {{ team.label }}
                <CheckIcon
                  class="dashboard-overview__team-check"
                  :class="{ 'dashboard-overview__team-check--active': selectedTeam.value === team.value }"
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
                  <CirclePlusIcon class="dashboard-overview__create-icon" />
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
      <div class="dashboard-overview__team-fields">
        <div class="dashboard-overview__team-field">
          <Label for="team-name">{{ nameLabel }}</Label>
          <Input
            id="team-name"
            :placeholder="namePlaceholder"
          />
        </div>
        <div class="dashboard-overview__team-field">
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
                <span class="dashboard-overview__plan-label">{{ plan.label }}</span>
                -
                <span class="dashboard-overview__plan-detail">{{ plan.detail }}</span>
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

<style>
.dashboard-overview__team-button,
.dashboard-overview__team-popover {
  width: 200px;
}

.dashboard-overview__team-button {
  justify-content: space-between;
}

.dashboard-overview__team-popover {
  padding: 0;
}

.dashboard-overview__team-avatar {
  margin-right: calc(var(--spacing) * 2);
}

.dashboard-overview__team-chevron,
.dashboard-overview__team-check,
.dashboard-overview__create-icon {
  width: calc(var(--spacing) * 4);
  height: calc(var(--spacing) * 4);
}

.dashboard-overview__team-chevron {
  flex-shrink: 0;
  margin-left: auto;
  opacity: 0.5;
}

.dashboard-overview__team-check {
  margin-left: auto;
  opacity: 0;
}

.dashboard-overview__team-check--active {
  opacity: 1;
}

.dashboard-overview__create-icon {
  width: calc(var(--spacing) * 5);
  height: calc(var(--spacing) * 5);
  margin-right: calc(var(--spacing) * 2);
}

.dashboard-overview__team-fields {
  display: grid;
  padding: calc(var(--spacing) * 2) 0;
  gap: calc(var(--spacing) * 4);
}

.dashboard-overview__team-field {
  display: grid;
  gap: calc(var(--spacing) * 2);
}

.dashboard-overview__plan-label {
  font-weight: 500;
}

.dashboard-overview__plan-detail {
  color: var(--muted-foreground);
}
</style>
