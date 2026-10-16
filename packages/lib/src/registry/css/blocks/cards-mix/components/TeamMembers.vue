<script setup lang="ts">
import { ref } from 'vue';
import { ChevronDownIcon } from 'lucide-vue-next';
import { Avatar } from '@ui/registry/css/ui/avatar';
import { Button } from '@ui/registry/css/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@ui/registry/css/ui/card';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@ui/registry/css/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@ui/registry/css/ui/popover';

const sofiaRole = ref('Owner');
const jacksonRole = ref('Member');
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Team Members</CardTitle>
      <CardDescription>
        Invite your team members to collaborate.
      </CardDescription>
    </CardHeader>
    <CardContent class="cards-mix__gen-13">
      <div class="cards-mix__gen-14">
        <div class="cards-mix__gen-15">
          <Avatar size="sm" />

          <div>
            <p class="cards-mix__gen-16">
              Sofia Davis
            </p>
            <p class="cards-mix__gen-17">
              m@example.com
            </p>
          </div>
        </div>
        <Popover>
          <PopoverTrigger as-child>
            <Button
              variant="outline"
              class="cards-mix__gen-4"
            >
              {{ sofiaRole }}
              <ChevronDownIcon class="cards-mix__gen-66" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            class="cards-mix__gen-67"
            align="end"
          >
            <Command v-model="sofiaRole">
              <CommandInput placeholder="Select new role..." />
              <CommandList>
                <CommandEmpty>No roles found.</CommandEmpty>
                <CommandGroup>
                  <CommandItem
                    value="Viewer"
                    class="cards-mix__gen-68"
                  >
                    <p>Viewer</p>
                    <p class="cards-mix__gen-17">
                      Can view and comment.
                    </p>
                  </CommandItem>
                  <CommandItem
                    value="Developer"
                    class="cards-mix__gen-68"
                  >
                    <p>Developer</p>
                    <p class="cards-mix__gen-17">
                      Can view, comment and edit.
                    </p>
                  </CommandItem>
                  <CommandItem
                    value="Billing"
                    class="cards-mix__gen-68"
                  >
                    <p>Billing</p>
                    <p class="cards-mix__gen-17">
                      Can view, comment and manage billing.
                    </p>
                  </CommandItem>
                  <CommandItem
                    value="Owner"
                    class="cards-mix__gen-68"
                  >
                    <p>Owner</p>
                    <p class="cards-mix__gen-17">
                      Admin-level access to all resources.
                    </p>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div class="cards-mix__gen-14">
        <div class="cards-mix__gen-15">
          <Avatar size="sm" />

          <div>
            <p class="cards-mix__gen-16">
              Jackson Lee
            </p>
            <p class="cards-mix__gen-17">
              p@example.com
            </p>
          </div>
        </div>
        <Popover>
          <PopoverTrigger as-child>
            <Button
              variant="outline"
              class="cards-mix__gen-4"
            >
              {{ jacksonRole }}
              <ChevronDownIcon class="cards-mix__gen-66" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            class="cards-mix__gen-67"
            align="end"
          >
            <Command v-model="jacksonRole">
              <CommandInput placeholder="Select new role..." />
              <CommandList>
                <CommandEmpty>No roles found.</CommandEmpty>
                <CommandGroup>
                  <CommandItem
                    value="Viewer"
                    class="cards-mix__gen-68"
                  >
                    <p>Viewer</p>
                    <p class="cards-mix__gen-17">
                      Can view and comment.
                    </p>
                  </CommandItem>
                  <CommandItem
                    value="Developer"
                    class="cards-mix__gen-68"
                  >
                    <p>Developer</p>
                    <p class="cards-mix__gen-17">
                      Can view, comment and edit.
                    </p>
                  </CommandItem>
                  <CommandItem
                    value="Billing"
                    class="cards-mix__gen-68"
                  >
                    <p>Billing</p>
                    <p class="cards-mix__gen-17">
                      Can view, comment and manage billing.
                    </p>
                  </CommandItem>
                  <CommandItem
                    value="Owner"
                    class="cards-mix__gen-68"
                  >
                    <p>Owner</p>
                    <p class="cards-mix__gen-17">
                      Admin-level access to all resources.
                    </p>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </CardContent>
  </Card>
</template>
