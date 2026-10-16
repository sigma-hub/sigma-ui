<script setup lang="ts">
import { Avatar } from '@ui/registry/css/ui/avatar';
import { Button } from '@ui/registry/css/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@ui/registry/css/ui/card';
import { Input } from '@ui/registry/css/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ui/registry/css/ui/select';
import { Separator } from '@ui/registry/css/ui/separator';
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Share this document</CardTitle>
      <CardDescription>
        Anyone with the link can view this document.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="cards-mix__gen-8">
        <Input
          value="http://example.com/link/to/document"
          read-only
        />
        <Button
          variant="secondary"
          class="cards-mix__gen-9"
        >
          Copy Link
        </Button>
      </div>
      <Separator class="cards-mix__gen-10" />
      <div class="cards-mix__gen-11">
        <h4 class="cards-mix__gen-12">
          People with access
        </h4>
        <div class="cards-mix__gen-13">
          <div class="cards-mix__gen-14">
            <div class="cards-mix__gen-15">
              <Avatar size="sm" />
              <div>
                <p class="cards-mix__gen-16">
                  Olivia Martin
                </p>
                <p class="cards-mix__gen-17">
                  m@example.com
                </p>
              </div>
            </div>
            <Select default-value="edit">
              <SelectTrigger class="cards-mix__gen-18">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="edit">
                  Can edit
                </SelectItem>
                <SelectItem value="view">
                  Can view
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="cards-mix__gen-14">
            <div class="cards-mix__gen-15">
              <Avatar size="sm" />

              <div>
                <p class="cards-mix__gen-16">
                  Isabella Nguyen
                </p>
                <p class="cards-mix__gen-17">
                  b@example.com
                </p>
              </div>
            </div>
            <Select default-value="view">
              <SelectTrigger class="cards-mix__gen-18">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="edit">
                  Can edit
                </SelectItem>
                <SelectItem value="view">
                  Can view
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="cards-mix__gen-14">
            <div class="cards-mix__gen-15">
              <Avatar size="sm" />

              <div>
                <p class="cards-mix__gen-16">
                  Sofia Davis
                </p>
                <p class="cards-mix__gen-17">
                  p@example.com
                </p>
              </div>
            </div>
            <Select default-value="view">
              <SelectTrigger class="cards-mix__gen-18">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="edit">
                  Can edit
                </SelectItem>
                <SelectItem value="view">
                  Can view
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
