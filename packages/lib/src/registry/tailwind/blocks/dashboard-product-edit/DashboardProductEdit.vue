<script setup lang="ts">
import { Button } from '@ui/registry/tailwind/ui/button';
import AppHeader from './components/AppHeader.vue';
import AppSidebar from './components/AppSidebar.vue';
import ArchiveProductCard from './components/ArchiveProductCard.vue';
import ProductCategoryCard from './components/ProductCategoryCard.vue';
import ProductDetailsCard from './components/ProductDetailsCard.vue';
import ProductImagesCard from './components/ProductImagesCard.vue';
import ProductStatusCard from './components/ProductStatusCard.vue';
import ProductStockCard from './components/ProductStockCard.vue';
import ProductToolbar from './components/ProductToolbar.vue';
</script>

<template>
  <div class="flex min-h-screen w-full flex-col bg-muted/40">
    <AppSidebar />
    <div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <AppHeader />
      <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div class="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <ProductToolbar />
          <div class="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div class="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <ProductDetailsCard />
              <ProductStockCard />
              <ProductCategoryCard />
            </div>
            <div class="grid auto-rows-max items-start gap-4 lg:gap-8">
              <ProductStatusCard />
              <ProductImagesCard />
              <ArchiveProductCard />
            </div>
          </div>
          <div class="flex items-center justify-center gap-2 md:hidden">
            <Button
              variant="outline"
              size="sm"
            >
              Discard
            </Button>
            <Button size="sm">
              Save Product
            </Button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
