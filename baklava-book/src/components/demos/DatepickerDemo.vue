<script setup lang="ts">
import DemoSection from "@/components/DemoSection.vue";

const basicCode = `<bl-datepicker
  type="single"
  label="Select Date"
  placeholder="Choose a date"
></bl-datepicker>`;

const multipleCode = `<bl-datepicker
  type="multiple"
  label="Select Multiple Dates"
  placeholder="Choose dates"
></bl-datepicker>`;

const rangeCode = `<bl-datepicker
  type="range"
  label="Select Date Range"
  placeholder="Start - End"
></bl-datepicker>`;

const monthYearCode = `<bl-datepicker
  type="single"
  label="Select Month and Year"
  placeholder="Choose month/year"
  month-year-only
></bl-datepicker>`;

const sizesCode = `<bl-datepicker size="large" label="Large" placeholder="Large"></bl-datepicker>
<bl-datepicker size="medium" label="Medium" placeholder="Medium"></bl-datepicker>
<bl-datepicker size="small" label="Small" placeholder="Small"></bl-datepicker>`;

const minMaxCode = `<bl-datepicker
  type="single"
  label="Limited Date Range"
  placeholder="Select a date"
  min-date="2024-01-01"
  max-date="2024-12-31"
></bl-datepicker>`;

const inputWidthCode = `<bl-datepicker
  type="single"
  label="Custom Width"
  placeholder="Set input width"
  style="--bl-datepicker-input-width: 300px"
></bl-datepicker>`;

const helpTextCode = `<bl-datepicker
  label="Birth Date"
  placeholder="DD/MM/YYYY"
  help-text="Enter your birth date"
></bl-datepicker>`;

const statesCode = `<bl-datepicker label="Disabled" placeholder="Disabled" disabled></bl-datepicker>
<bl-datepicker
  label="Invalid"
  placeholder="Invalid"
  invalid
  invalid-text="Please select a valid date"
></bl-datepicker>`;

const rtlCode = `<div dir="rtl" lang="ar">
  <bl-datepicker
    type="single"
    label="اختر تاريخ"
    placeholder="حدد تاريخًا"
    locale="ar"
    start-of-week="6"
  ></bl-datepicker>
</div>`;

const localeCode = `<!-- Turkish locale -->
<bl-datepicker
  type="single"
  label="Tarih Seçin"
  placeholder="Bir tarih seçin"
  locale="tr"
  start-of-week="1"
></bl-datepicker>

<!-- German locale -->
<bl-datepicker
  type="single"
  label="Datum auswählen"
  placeholder="Wählen Sie ein Datum"
  locale="de"
  start-of-week="1"
></bl-datepicker>`;
</script>

<template>
  <div class="space-y-6">
    <!-- Introduction -->
    <div class="prose dark:prose-invert max-w-none mb-8">
      <p class="text-neutral-dark dark:text-neutral-light">
        Datepicker renders the calendar component within itself and provides the functionality
        provided by the calendar component.
      </p>

      <h4 class="text-sm font-semibold text-neutral-darkest dark:text-white mt-4 mb-2">Usage</h4>
      <ul class="text-sm text-neutral-dark dark:text-neutral-light list-disc pl-5 space-y-1">
        <li>
          Datepicker has three types: <strong>single</strong>, <strong>multiple</strong> and
          <strong>range</strong>. Default type is <code>single</code>.
        </li>
        <li>
          Use <code>min-date</code> and <code>max-date</code> attributes to restrict date
          selection.
        </li>
        <li><code>disabled-dates</code> attribute restricts specific dates.</li>
        <li>
          <code>start-of-week</code> defines the first day of the week (0 = Sunday, 6 = Saturday).
        </li>
        <li>Use <code>locale</code> attribute to change the language and date format.</li>
      </ul>
    </div>

    <!-- Datepicker Types -->
    <div class="mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Datepicker Types
      </h3>
    </div>

    <!-- Single Type -->
    <div class="mt-4 mb-2">
      <h4 class="text-md font-semibold text-neutral-darkest dark:text-white mb-2">
        Single Type Datepicker
      </h4>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Default datepicker type is <code>single</code> and you can only select a single day.
      </p>
    </div>

    <DemoSection title="Single Date" :code="basicCode">
      <div class="max-w-xs">
        <bl-datepicker type="single" label="Select Date" placeholder="Choose a date"></bl-datepicker>
      </div>
    </DemoSection>

    <!-- Multiple Type -->
    <div class="mt-8 mb-2">
      <h4 class="text-md font-semibold text-neutral-darkest dark:text-white mb-2">
        Multiple Type Datepicker
      </h4>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        You can select multiple days from Datepicker.
      </p>
    </div>

    <DemoSection title="Multiple Dates" :code="multipleCode">
      <div class="max-w-md">
        <bl-datepicker
          type="multiple"
          label="Select Multiple Dates"
          placeholder="Choose dates"
        ></bl-datepicker>
      </div>
    </DemoSection>

    <!-- Range Type -->
    <div class="mt-8 mb-2">
      <h4 class="text-md font-semibold text-neutral-darkest dark:text-white mb-2">
        Range Type Datepicker
      </h4>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        You can select date range from Datepicker.
      </p>
    </div>

    <DemoSection title="Date Range" :code="rangeCode">
      <div class="max-w-md">
        <bl-datepicker type="range" label="Select Date Range" placeholder="Start - End"></bl-datepicker>
      </div>
    </DemoSection>

    <!-- Month Year Only -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Month and Year Only Selection
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        You can set the datepicker to month-year only mode by using the
        <code>month-year-only</code> attribute. When enabled, users can only select a month and
        year, not a specific day.
      </p>
    </div>

    <DemoSection title="Month Year Only" :code="monthYearCode">
      <div class="max-w-xs">
        <bl-datepicker
          type="single"
          label="Select Month and Year"
          placeholder="Choose month/year"
          month-year-only
        ></bl-datepicker>
      </div>
    </DemoSection>

    <!-- Sizes -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Sizes</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Datepicker has 3 size options: <strong>small</strong>, <strong>medium</strong> and
        <strong>large</strong>.
      </p>
    </div>

    <DemoSection title="Sizes" :code="sizesCode">
      <div class="flex flex-wrap items-end gap-4">
        <bl-datepicker size="large" label="Large" placeholder="Large"></bl-datepicker>
        <bl-datepicker size="medium" label="Medium" placeholder="Medium"></bl-datepicker>
        <bl-datepicker size="small" label="Small" placeholder="Small"></bl-datepicker>
      </div>
    </DemoSection>

    <!-- Min Max Date -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Min - Max Date
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        You can set min date or max date for the datepicker to restrict the date selection range.
      </p>
    </div>

    <DemoSection title="Min/Max Date" :code="minMaxCode">
      <div class="max-w-xs">
        <bl-datepicker
          type="single"
          label="Limited Date Range"
          placeholder="Select a date"
          min-date="2024-01-01"
          max-date="2024-12-31"
        ></bl-datepicker>
      </div>
    </DemoSection>

    <!-- Input Width -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Input Width</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        You can set input width of datepicker using
        <code>--bl-datepicker-input-width</code> CSS variable.
      </p>
    </div>

    <DemoSection title="Custom Width" :code="inputWidthCode">
      <bl-datepicker
        type="single"
        label="Custom Width"
        placeholder="Set input width"
        style="--bl-datepicker-input-width: 300px"
      ></bl-datepicker>
    </DemoSection>

    <!-- Help Text -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Help Text</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        You can provide additional information with <code>help-text</code> attribute.
      </p>
    </div>

    <DemoSection title="With Help Text" :code="helpTextCode">
      <div class="max-w-xs">
        <bl-datepicker
          label="Birth Date"
          placeholder="DD/MM/YYYY"
          help-text="Enter your birth date"
        ></bl-datepicker>
      </div>
    </DemoSection>

    <!-- States -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">States</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Datepicker can be <code>disabled</code> or in <code>invalid</code> state for validation.
      </p>
    </div>

    <DemoSection title="States" :code="statesCode">
      <div class="flex flex-wrap gap-4">
        <bl-datepicker label="Disabled" placeholder="Disabled" disabled></bl-datepicker>
        <bl-datepicker
          label="Invalid"
          placeholder="Invalid"
          invalid
          invalid-text="Please select a valid date"
        ></bl-datepicker>
      </div>
    </DemoSection>

    <!-- Localization -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Localization</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Use <code>locale</code> attribute to change the calendar language and date format.
      </p>
    </div>

    <DemoSection title="Different Locales" :code="localeCode">
      <div class="flex flex-wrap gap-4">
        <bl-datepicker
          type="single"
          label="Tarih Seçin"
          placeholder="Bir tarih seçin"
          locale="tr"
          start-of-week="1"
        ></bl-datepicker>
        <bl-datepicker
          type="single"
          label="Datum auswählen"
          placeholder="Wählen Sie ein Datum"
          locale="de"
          start-of-week="1"
        ></bl-datepicker>
      </div>
    </DemoSection>

    <!-- RTL Support -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">RTL Support</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        The datepicker component supports RTL (Right-to-Left) text direction. You can enable RTL
        mode by setting the <code>dir</code> attribute and <code>lang</code> attribute on a parent
        element or the <code>html</code> tag.
      </p>
    </div>

    <DemoSection title="RTL Support" :code="rtlCode">
      <div class="flex gap-8">
        <div>
          <p class="text-sm text-neutral-dark mb-2">LTR (Left-to-Right)</p>
          <bl-datepicker
            type="single"
            label="Select Date"
            placeholder="Choose a date"
          ></bl-datepicker>
        </div>
        <div dir="rtl" lang="ar">
          <p class="text-sm text-neutral-dark mb-2">RTL (Right-to-Left)</p>
          <bl-datepicker
            type="single"
            label="اختر تاريخ"
            placeholder="حدد تاريخًا"
            locale="ar"
            start-of-week="6"
          ></bl-datepicker>
        </div>
      </div>
    </DemoSection>
  </div>
</template>
