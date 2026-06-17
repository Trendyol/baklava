<script setup lang="ts">
import DemoSection from "@/components/DemoSection.vue";
import { ref } from "vue";

const currentPage = ref(1);

const basicCode = `<bl-pagination
  current-page="1"
  total-items="100"
  items-per-page="10"
></bl-pagination>`;

const morePagesCode = `<bl-pagination
  current-page="5"
  total-items="500"
  items-per-page="10"
></bl-pagination>`;

const jumperCode = `<bl-pagination
  current-page="1"
  total-items="1500"
  items-per-page="10"
  has-jumper
  jumper-label="Go To"
></bl-pagination>`;

const selectCode = `<bl-pagination
  current-page="1"
  total-items="200"
  items-per-page="20"
  has-select
  select-label="Show"
></bl-pagination>`;

const customizationCode = `<bl-pagination
  current-page="1"
  total-items="1500"
  items-per-page="100"
  has-jumper
  jumper-label="Sayfaya Git"
  has-select
  select-label="Sayfa Başına"
></bl-pagination>

<script>
  const pagination = document.querySelector('bl-pagination');
  pagination.itemsPerPageOptions = [
    { text: '100 Sonuç', value: 100 },
    { text: '250 Sonuç', value: 250 },
    { text: '500 Sonuç', value: 500 },
    { text: '1000 Sonuç', value: 1000 }
  ];
<\/script>`;

const fullFeaturedCode = `<bl-pagination
  current-page="1"
  total-items="1500"
  items-per-page="10"
  has-jumper
  jumper-label="Go To"
  has-select
  select-label="Show"
></bl-pagination>`;

const rtlCode = `<div dir="rtl">
  <bl-pagination
    current-page="1"
    total-items="1500"
    items-per-page="10"
    has-jumper
    jumper-label="انتقل إلى"
    has-select
    select-label="عرض"
  ></bl-pagination>
</div>`;

const interactiveCode = `<script setup>
import { ref } from "vue";
const currentPage = ref(1);
<\/script>

<template>
  <bl-pagination
    :current-page="currentPage"
    total-items="100"
    items-per-page="10"
    @bl-change="currentPage = $event.detail.selectedPage"
  ></bl-pagination>
  <p>Current page: {{ currentPage }}</p>
</template>`;
</script>

<template>
  <div class="space-y-6">
    <!-- Introduction -->
    <div class="prose dark:prose-invert max-w-none mb-8">
      <p class="text-neutral-dark dark:text-neutral-light">
        The Pagination component enables the user to select a specific page from a range of pages.
        Number of content per page can also be selected by the user.
      </p>

      <h4 class="text-sm font-semibold text-neutral-darkest dark:text-white mt-4 mb-2">
        Key Features
      </h4>
      <ul class="text-sm text-neutral-dark dark:text-neutral-light list-disc pl-5 space-y-1">
        <li>Navigate to next/previous page or a selected page</li>
        <li>Optional page jumper for direct navigation</li>
        <li>Optional items per page selector</li>
        <li>Customizable labels for internationalization</li>
        <li>Emits events for page changes</li>
      </ul>
    </div>

    <!-- Simple Pagination -->
    <div class="mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Simple Pagination
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Use a simple pagination for navigating to the next or previous page or a selected page.
      </p>
    </div>

    <DemoSection title="Basic Pagination" :code="basicCode">
      <bl-pagination current-page="1" total-items="100" items-per-page="10"></bl-pagination>
    </DemoSection>

    <!-- More Pages -->
    <DemoSection title="More Pages" :code="morePagesCode">
      <bl-pagination current-page="5" total-items="500" items-per-page="10"></bl-pagination>
    </DemoSection>

    <!-- Jumper -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Jumper</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Use the jumper to directly go to a specific page. Enable it with <code>has-jumper</code>
        attribute and customize the label with <code>jumper-label</code>.
      </p>
    </div>

    <DemoSection title="With Page Jumper" :code="jumperCode">
      <bl-pagination
        current-page="1"
        total-items="1500"
        items-per-page="10"
        has-jumper
        jumper-label="Go To"
      ></bl-pagination>
    </DemoSection>

    <!-- Select -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Select</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Use the select helper to change the number of items per page. Enable it with
        <code>has-select</code> attribute and customize the label with <code>select-label</code>.
      </p>
    </div>

    <DemoSection title="With Items Per Page Selector" :code="selectCode">
      <bl-pagination
        current-page="1"
        total-items="200"
        items-per-page="20"
        has-select
        select-label="Show"
      ></bl-pagination>
    </DemoSection>

    <!-- Full Featured -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Full Featured
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Combine jumper and select for a full-featured pagination experience.
      </p>
    </div>

    <DemoSection title="Full Featured" :code="fullFeaturedCode">
      <bl-pagination
        current-page="1"
        total-items="1500"
        items-per-page="10"
        has-jumper
        jumper-label="Go To"
        has-select
        select-label="Show"
      ></bl-pagination>
    </DemoSection>

    <!-- Customization -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Customization
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        The labels and the texts of the jumper and select element are fully customizable. The
        default select options can also be changed via <code>itemsPerPageOptions</code> property.
      </p>
    </div>

    <DemoSection title="Turkish Localization" :code="customizationCode">
      <bl-pagination
        current-page="1"
        total-items="1500"
        items-per-page="100"
        has-jumper
        jumper-label="Sayfaya Git"
        has-select
        select-label="Sayfa Başına"
      ></bl-pagination>
    </DemoSection>

    <!-- RTL Support -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">RTL Support</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        The pagination component supports RTL (Right-to-Left) text direction. You can enable RTL
        mode by setting the <code>dir</code> attribute on a parent element.
      </p>
    </div>

    <DemoSection title="RTL Support" :code="rtlCode">
      <div class="flex flex-col gap-4">
        <div>
          <p class="text-sm text-neutral-dark mb-2">LTR (Left-to-Right)</p>
          <bl-pagination
            current-page="1"
            total-items="500"
            items-per-page="10"
            has-jumper
            jumper-label="Go To"
          ></bl-pagination>
        </div>
        <div dir="rtl">
          <p class="text-sm text-neutral-dark mb-2">RTL (Right-to-Left)</p>
          <bl-pagination
            current-page="1"
            total-items="500"
            items-per-page="10"
            has-jumper
            jumper-label="انتقل إلى"
          ></bl-pagination>
        </div>
      </div>
    </DemoSection>

    <!-- Interactive -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Interactive Demo
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Test the <code>bl-change</code> event with this interactive example. The event provides
        <code>selectedPage</code> and <code>itemsPerPage</code> in the detail.
      </p>
    </div>

    <DemoSection title="Interactive" :code="interactiveCode">
      <div class="space-y-4">
        <bl-pagination
          :current-page="currentPage"
          total-items="100"
          items-per-page="10"
          @bl-change="currentPage = ($event as CustomEvent).detail.selectedPage"
        ></bl-pagination>
        <p class="text-neutral-dark">
          Current page: <strong class="text-primary">{{ currentPage }}</strong>
        </p>
      </div>
    </DemoSection>
  </div>
</template>
