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
import { Input } from '@ui/registry/css/ui/input';
import { Label } from '@ui/registry/css/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ui/registry/css/ui/select';
import { Textarea } from '@ui/registry/css/ui/textarea';
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Report an issue</CardTitle>
      <CardDescription>
        What area are you having problems with?
      </CardDescription>
    </CardHeader>
    <CardContent class="cards-mix__gen-13">
      <div class="cards-mix__gen-22">
        <div class="cards-mix__gen-23">
          <Label for="area">Area</Label>
          <Select default-value="billing">
            <SelectTrigger id="area">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="team">
                Team
              </SelectItem>
              <SelectItem value="billing">
                Billing
              </SelectItem>
              <SelectItem value="account">
                Account
              </SelectItem>
              <SelectItem value="deployments">
                Deployments
              </SelectItem>
              <SelectItem value="support">
                Support
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div class="cards-mix__gen-23">
          <Label for="area">Security Level</Label>
          <Select default-value="2">
            <SelectTrigger id="area">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">
                Severity 1 (Highest)
              </SelectItem>
              <SelectItem value="2">
                Severity 2
              </SelectItem>
              <SelectItem value="3">
                Severity 3
              </SelectItem>
              <SelectItem value="4">
                Severity 4 (Lowest)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div class="cards-mix__gen-23">
        <Label for="subject">Subject</Label>
        <Input
          id="subject"
          placeholder="I need help with..."
        />
      </div>
      <div class="cards-mix__gen-23">
        <Label for="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Please include all information relevant to your issue."
        />
      </div>
    </CardContent>
    <CardFooter class="cards-mix__gen-24">
      <Button variant="ghost">
        Cancel
      </Button>
      <Button>Submit</Button>
    </CardFooter>
  </Card>
</template>
