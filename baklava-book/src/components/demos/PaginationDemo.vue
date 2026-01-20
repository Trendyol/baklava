<script setup lang="ts">
import { ref } from "vue";

const currentPage = ref(1);
</script>

<template>
  <div class="space-y-8">
    <!-- Basic -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Basic Pagination</h4>
      <bl-pagination current-page="1" total-items="100" items-per-page="10"></bl-pagination>
    </div>

    <!-- Different Sizes -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">More Pages</h4>
      <bl-pagination current-page="5" total-items="500" items-per-page="10"></bl-pagination>
    </div>

    <!-- With Items Per Page Options -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">With Items Per Page Selector</h4>
      <bl-pagination
        current-page="1"
        total-items="200"
        items-per-page="20"
        has-select
      ></bl-pagination>
    </div>

    <!-- Jumper -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">With Page Jumper</h4>
      <bl-pagination
        current-page="1"
        total-items="1000"
        items-per-page="10"
        has-jumper
      ></bl-pagination>
    </div>

    <!-- Interactive -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Interactive Demo</h4>
      <div class="space-y-4">
        <bl-pagination
          :current-page="currentPage"
          total-items="100"
          items-per-page="10"
          @bl-change="currentPage = $event.detail.selectedPage"
        ></bl-pagination>
        <p class="text-neutral-dark">
          Current page: <strong class="text-primary">{{ currentPage }}</strong>
        </p>
      </div>
    </div>
  </div>
</template>
