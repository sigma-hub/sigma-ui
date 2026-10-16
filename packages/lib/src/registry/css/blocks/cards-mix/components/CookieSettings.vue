<script setup lang="ts">
import { Button } from '@ui/registry/css/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@ui/registry/css/ui/card';
import { Label } from '@ui/registry/css/ui/label';
import { Switch } from '@ui/registry/css/ui/switch';
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Cookie Settings</CardTitle>
      <CardDescription>Manage your cookie settings here.</CardDescription>
    </CardHeader>
    <CardContent class="cards-mix__gen-13">
      <div class="cards-mix__gen-19">
        <Label
          for="necessary"
          class="cards-mix__gen-20"
        >
          <span>Strictly Necessary</span>
          <span class="cards-mix__gen-21">
            These cookies are essential in order to use the website and use
            its features.
          </span>
        </Label>
        <Switch
          id="necessary"
          :model-value="true"
        />
      </div>
      <div class="cards-mix__gen-19">
        <Label
          for="functional"
          class="cards-mix__gen-20"
        >
          <span>Functional Cookies</span>
          <span class="cards-mix__gen-21">
            These cookies allow the website to provide personalized
            functionality.
          </span>
        </Label>
        <Switch id="functional" />
      </div>
      <div class="cards-mix__gen-19">
        <Label
          for="performance"
          class="cards-mix__gen-20"
        >
          <span>Performance Cookies</span>
          <span class="cards-mix__gen-21">
            These cookies help to improve the performance of the website.
          </span>
        </Label>
        <Switch id="performance" />
      </div>
    </CardContent>
    <CardFooter>
      <Button
        variant="outline"
        class="cards-mix__gen-1"
      >
        Save preferences
      </Button>
    </CardFooter>
  </Card>
</template>
