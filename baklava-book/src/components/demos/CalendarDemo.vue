<script setup lang="ts">
import DemoSection from "@/components/DemoSection.vue";
import { ref } from "vue";

const selectedDate = ref<Date | null>(null);
const selectedDates = ref<Date[]>([]);
const rangeStart = ref<Date | null>(null);
const rangeEnd = ref<Date | null>(null);

// Calculate min and max dates for demo
const today = new Date();
const minDate = new Date(today.getFullYear(), today.getMonth(), 1);
const maxDate = new Date(today.getFullYear(), today.getMonth() + 2, 0);

// Default value demo
const defaultDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5);

// Disabled dates demo
const disabledDate1 = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2);
const disabledDate2 = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);

const handleSingleChange = (event: CustomEvent) => {
  selectedDate.value = event.detail[0];
};

const handleMultipleChange = (event: CustomEvent) => {
  selectedDates.value = event.detail;
};

const handleRangeChange = (event: CustomEvent) => {
  if (event.detail.length >= 1) {
    rangeStart.value = event.detail[0];
  }
  if (event.detail.length >= 2) {
    rangeEnd.value = event.detail[1];
  }
};

const formatDate = (date: Date | null) => {
  if (!date) return "None";
  return date.toLocaleDateString();
};

const basicCode = `<bl-calendar></bl-calendar>`;

const singleCode = `<!-- Default type is "single" -->
<bl-calendar type="single"></bl-calendar>

<script>
const calendar = document.querySelector('bl-calendar');
calendar.addEventListener('bl-calendar-change', (e) => {
  const selectedDate = e.detail[0];
  console.log('Selected:', selectedDate);
});
<\/script>`;

const multipleCode = `<!-- Multiple date selection -->
<bl-calendar type="multiple"></bl-calendar>

<script>
const calendar = document.querySelector('bl-calendar');
calendar.addEventListener('bl-calendar-change', (e) => {
  const selectedDates = e.detail; // Array of dates
  console.log('Selected dates:', selectedDates);
});
<\/script>`;

const rangeCode = `<!-- Date range selection -->
<bl-calendar type="range"></bl-calendar>

<script>
const calendar = document.querySelector('bl-calendar');
calendar.addEventListener('bl-calendar-change', (e) => {
  const [startDate, endDate] = e.detail;
  console.log('Range:', startDate, 'to', endDate);
});
<\/script>`;

const defaultValueCode = `<!-- Set default value -->
<bl-calendar :value="defaultDate"></bl-calendar>`;

const minMaxCode = `<!-- Restrict date range -->
<bl-calendar
  :min-date="minDate"
  :max-date="maxDate"
></bl-calendar>`;

const disabledDatesCode = `<!-- Disable specific dates -->
<bl-calendar :disabled-dates="disabledDates"></bl-calendar>`;

const startOfWeekCode = `<!-- Start week on Monday (1) instead of Sunday (0) -->
<bl-calendar start-of-week="1"></bl-calendar>`;

const localeCode = `<!-- Set locale for internationalization -->
<bl-calendar locale="tr"></bl-calendar>
<bl-calendar locale="de"></bl-calendar>
<bl-calendar locale="ar"></bl-calendar>`;

const rtlCode = `<div dir="rtl" lang="ar">
  <bl-calendar type="single"></bl-calendar>
</div>`;
</script>

<template>
  <div class="space-y-6">
    <!-- Introduction -->
    <div class="prose dark:prose-invert max-w-none mb-8">
      <p class="text-neutral-dark dark:text-neutral-light">
        Calendar component is an <strong>internal</strong> component primarily used inside the
        Datepicker component. It provides a date selection interface with support for single,
        multiple, and range selection modes.
      </p>

      <bl-alert variant="info" icon class="my-4">
        The Calendar component is designed for internal use within Datepicker. For most use cases,
        consider using <code>bl-datepicker</code> instead.
      </bl-alert>

      <h4 class="text-sm font-semibold text-neutral-darkest dark:text-white mt-4 mb-2">
        Key Features
      </h4>
      <ul class="text-sm text-neutral-dark dark:text-neutral-light list-disc pl-5 space-y-1">
        <li>Three selection types: <code>single</code>, <code>multiple</code>, <code>range</code></li>
        <li>Date constraints with <code>min-date</code> and <code>max-date</code></li>
        <li>Disable specific dates with <code>disabled-dates</code></li>
        <li>Customizable week start with <code>start-of-week</code></li>
        <li>Internationalization with <code>locale</code> attribute</li>
        <li>Full RTL support</li>
      </ul>
    </div>

    <!-- Single Type Calendar -->
    <div class="mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Single Type Calendar
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Default calendar type is <code>single</code> and you can only select a single day from
        calendar.
      </p>
    </div>

    <DemoSection title="Single Selection" :code="singleCode">
      <div class="flex flex-col md:flex-row gap-6">
        <bl-calendar type="single" @bl-calendar-change="handleSingleChange"></bl-calendar>
        <div class="p-4 bg-neutral-lightest dark:bg-neutral-darker rounded-lg min-w-48">
          <p class="text-sm text-neutral-dark mb-1">Selected Date:</p>
          <p class="text-lg font-medium text-primary">
            {{ formatDate(selectedDate) }}
          </p>
        </div>
      </div>
    </DemoSection>

    <!-- Multiple Type Calendar -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Multiple Type Calendar
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        You can select multiple days from calendar by setting <code>type="multiple"</code>.
      </p>
    </div>

    <DemoSection title="Multiple Selection" :code="multipleCode">
      <div class="flex flex-col md:flex-row gap-6">
        <bl-calendar type="multiple" @bl-calendar-change="handleMultipleChange"></bl-calendar>
        <div class="p-4 bg-neutral-lightest dark:bg-neutral-darker rounded-lg min-w-48">
          <p class="text-sm text-neutral-dark mb-1">Selected Dates:</p>
          <div v-if="selectedDates.length > 0" class="space-y-1">
            <p
              v-for="(date, index) in selectedDates"
              :key="index"
              class="text-sm font-medium text-primary"
            >
              {{ formatDate(date) }}
            </p>
          </div>
          <p v-else class="text-sm text-neutral-dark">None selected</p>
        </div>
      </div>
    </DemoSection>

    <!-- Range Type Calendar -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Range Type Calendar
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        You can select a date range from calendar by setting <code>type="range"</code>. Click to
        select start date, then click again to select end date.
      </p>
    </div>

    <DemoSection title="Range Selection" :code="rangeCode">
      <div class="flex flex-col md:flex-row gap-6">
        <bl-calendar type="range" @bl-calendar-change="handleRangeChange"></bl-calendar>
        <div class="p-4 bg-neutral-lightest dark:bg-neutral-darker rounded-lg min-w-48">
          <p class="text-sm text-neutral-dark mb-1">Selected Range:</p>
          <div class="space-y-1">
            <p class="text-sm">
              <span class="text-neutral-dark">Start:</span>
              <span class="font-medium text-primary ml-2">{{ formatDate(rangeStart) }}</span>
            </p>
            <p class="text-sm">
              <span class="text-neutral-dark">End:</span>
              <span class="font-medium text-primary ml-2">{{ formatDate(rangeEnd) }}</span>
            </p>
          </div>
        </div>
      </div>
    </DemoSection>

    <!-- Default Value -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Set Default Value
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        You can set a default value to the calendar using the <code>value</code> attribute.
      </p>
    </div>

    <DemoSection title="Default Value" :code="defaultValueCode">
      <bl-calendar type="single" :value="defaultDate"></bl-calendar>
      <p class="text-sm text-neutral-dark mt-2">
        Default date set to: {{ formatDate(defaultDate) }}
      </p>
    </DemoSection>

    <!-- Min/Max Dates -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Date Constraints (Min/Max)
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Use <code>min-date</code> and <code>max-date</code> attributes to restrict the selectable
        date range. Dates outside this range will be disabled.
      </p>
    </div>

    <DemoSection title="Min/Max Dates" :code="minMaxCode">
      <bl-calendar type="single" :min-date="minDate" :max-date="maxDate"></bl-calendar>
      <p class="text-sm text-neutral-dark mt-2">
        Selectable range: {{ formatDate(minDate) }} - {{ formatDate(maxDate) }}
      </p>
    </DemoSection>

    <!-- Disabled Dates -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Disabled Dates
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        You can disable specific dates using the <code>disabled-dates</code> attribute.
      </p>
    </div>

    <DemoSection title="Disabled Dates" :code="disabledDatesCode">
      <bl-calendar type="single" :disabled-dates="[disabledDate1, disabledDate2]"></bl-calendar>
      <p class="text-sm text-neutral-dark mt-2">
        Disabled dates: {{ formatDate(disabledDate1) }}, {{ formatDate(disabledDate2) }}
      </p>
    </DemoSection>

    <!-- Start of Week -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Start of Week
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        The <code>start-of-week</code> attribute defines the first day of the week. Use
        <code>0</code> for Sunday, <code>1</code> for Monday, etc.
      </p>
    </div>

    <DemoSection title="Start of Week" :code="startOfWeekCode">
      <div class="flex flex-col md:flex-row gap-6">
        <div>
          <p class="text-sm text-neutral-dark mb-2">Sunday (0) - Default</p>
          <bl-calendar type="single" start-of-week="0"></bl-calendar>
        </div>
        <div>
          <p class="text-sm text-neutral-dark mb-2">Monday (1)</p>
          <bl-calendar type="single" start-of-week="1"></bl-calendar>
        </div>
      </div>
    </DemoSection>

    <!-- RTL Support -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">RTL Support</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        The calendar component supports RTL (Right-to-Left) text direction. You can enable RTL mode
        by setting the <code>dir</code> attribute and <code>lang</code> attribute on a parent
        element.
      </p>
    </div>

    <DemoSection title="RTL Support" :code="rtlCode">
      <div class="flex flex-col md:flex-row gap-8">
        <div>
          <p class="text-sm text-neutral-dark mb-2">LTR (Left-to-Right)</p>
          <bl-calendar type="single"></bl-calendar>
        </div>
        <div dir="rtl" lang="ar">
          <p class="text-sm text-neutral-dark mb-2">RTL (Right-to-Left)</p>
          <bl-calendar type="single"></bl-calendar>
        </div>
      </div>
    </DemoSection>
  </div>
</template>
