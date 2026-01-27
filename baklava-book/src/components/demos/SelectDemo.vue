<script setup lang="ts">
import DemoSection from "@/components/DemoSection.vue";
import { ref } from "vue";

const selectedCountry = ref("");

const basicCode = `<bl-select placeholder="Choose country" label="Country">
  <bl-select-option value="tr">Turkiye</bl-select-option>
  <bl-select-option value="nl">The Netherlands</bl-select-option>
  <bl-select-option value="de">Germany</bl-select-option>
  <bl-select-option value="uk">United Kingdom</bl-select-option>
</bl-select>`;

const initialValueCode = `<bl-select placeholder="Choose country" label="Country" value="tr">
  <bl-select-option value="tr">Turkiye</bl-select-option>
  <bl-select-option value="nl">The Netherlands</bl-select-option>
</bl-select>`;

const multipleCode = `<bl-select placeholder="Choose countries" label="Countries" multiple>
  <bl-select-option value="tr">Turkiye</bl-select-option>
  <bl-select-option value="nl">The Netherlands</bl-select-option>
  <bl-select-option value="de">Germany</bl-select-option>
  <bl-select-option value="uk">United Kingdom</bl-select-option>
</bl-select>`;

const selectAllCode = `<bl-select
  placeholder="Choose countries"
  label="Countries"
  multiple
  view-select-all
  select-all-text="Select All Countries"
>
  <bl-select-option value="tr">Turkiye</bl-select-option>
  <bl-select-option value="nl">The Netherlands</bl-select-option>
  <bl-select-option value="de">Germany</bl-select-option>
</bl-select>`;

const clearableCode = `<bl-select placeholder="Choose country" label="Country" value="tr" clearable>
  <bl-select-option value="tr">Turkiye</bl-select-option>
  <bl-select-option value="nl">The Netherlands</bl-select-option>
</bl-select>`;

const labelCode = `<!-- Floating label (default) -->
<bl-select label="Country">...</bl-select>

<!-- Fixed label -->
<bl-select label="Country" label-fixed placeholder="Choose country">...</bl-select>

<!-- Without label -->
<bl-select placeholder="Choose country">...</bl-select>`;

const sizesCode = `<bl-select label="Small" size="small">...</bl-select>
<bl-select label="Medium">...</bl-select>
<bl-select label="Large" size="large">...</bl-select>`;

const statesCode = `<bl-select label="Disabled" disabled>...</bl-select>
<bl-select label="With Help Text" help-text="Select your country">...</bl-select>`;

const searchableCode = `<bl-select
  label="Country"
  search-bar
  search-bar-placeholder="Search countries..."
>
  <bl-select-option value="tr">Turkiye</bl-select-option>
  <bl-select-option value="nl">The Netherlands</bl-select-option>
</bl-select>`;

const iconsCode = `<bl-select placeholder="Choose Payment Method" label="Payment">
  <bl-select-option value="credit_card" icon="info">Credit Card</bl-select-option>
  <bl-select-option value="cash" icon="money">Cash</bl-select-option>
</bl-select>`;

const validationCode = `<bl-select label="Country" label-fixed required>
  <bl-select-option value="tr">Turkiye</bl-select-option>
  <bl-select-option value="nl">The Netherlands</bl-select-option>
</bl-select>`;

const interactiveCode = `<script setup>
import { ref } from "vue";
const selectedCountry = ref("");
<\/script>

<template>
  <bl-select
    :value="selectedCountry"
    placeholder="Choose country"
    label="Country"
    @bl-select="selectedCountry = $event.detail[0]?.value || ''"
  >
    <bl-select-option value="tr">Turkiye</bl-select-option>
    <bl-select-option value="nl">The Netherlands</bl-select-option>
  </bl-select>
  <span>Selected: {{ selectedCountry || "(none)" }}</span>
</template>`;

const rtlCode = `<!-- LTR (Left-to-Right) -->
<bl-select label="Country" placeholder="Select a country">
  <bl-select-option value="us">United States</bl-select-option>
  <bl-select-option value="uk">United Kingdom</bl-select-option>
</bl-select>

<!-- RTL (Right-to-Left) -->
<div dir="rtl">
  <bl-select label="الدولة" placeholder="اختر دولة">
    <bl-select-option value="us">الولايات المتحدة</bl-select-option>
    <bl-select-option value="uk">المملكة المتحدة</bl-select-option>
  </bl-select>
</div>`;
</script>

<template>
  <div class="space-y-6">
    <!-- Introduction -->
    <div class="prose dark:prose-invert max-w-none mb-8">
      <p class="text-neutral-dark dark:text-neutral-light">
        Select component is a component for selecting a value from a list of options. Each option
        should be wrapped with <code>bl-select-option</code> component.
      </p>
    </div>

    <!-- Basic Usage -->
    <div class="mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Basic Usage</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        A simple select with options.
      </p>
    </div>

    <DemoSection title="Basic Select" :code="basicCode">
      <div class="max-w-xs">
        <bl-select placeholder="Choose country" label="Country">
          <bl-select-option value="tr">Turkiye</bl-select-option>
          <bl-select-option value="nl">The Netherlands</bl-select-option>
          <bl-select-option value="de">Germany</bl-select-option>
          <bl-select-option value="uk">United Kingdom</bl-select-option>
        </bl-select>
      </div>
    </DemoSection>

    <!-- With Initial Value -->
    <DemoSection title="With Initial Value" :code="initialValueCode">
      <div class="max-w-xs">
        <bl-select placeholder="Choose country" label="Country" value="tr">
          <bl-select-option value="tr">Turkiye</bl-select-option>
          <bl-select-option value="nl">The Netherlands</bl-select-option>
          <bl-select-option value="de">Germany</bl-select-option>
        </bl-select>
      </div>
    </DemoSection>

    <!-- Multiple Select -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Multiple Select
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        There will be checkboxes in select menu when <code>multiple</code> attribute is set to true.
        Selected options will be visible on input separated by commas.
      </p>
    </div>

    <DemoSection title="Multiple Selection" :code="multipleCode">
      <div class="max-w-xs">
        <bl-select placeholder="Choose countries" label="Countries" multiple>
          <bl-select-option value="tr">Turkiye</bl-select-option>
          <bl-select-option value="nl">The Netherlands</bl-select-option>
          <bl-select-option value="de">Germany</bl-select-option>
          <bl-select-option value="uk">United Kingdom</bl-select-option>
        </bl-select>
      </div>
    </DemoSection>

    <!-- Select All -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Select All</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        The Select component features a 'Select All' option in the Multiple Select, which is
        displayed when the <code>view-select-all</code> attribute is enabled.
      </p>
    </div>

    <DemoSection title="Select All" :code="selectAllCode">
      <div class="max-w-xs">
        <bl-select
          placeholder="Choose countries"
          label="Countries"
          multiple
          view-select-all
          select-all-text="Select All Countries"
        >
          <bl-select-option value="tr">Turkiye</bl-select-option>
          <bl-select-option value="nl">The Netherlands</bl-select-option>
          <bl-select-option value="de">Germany</bl-select-option>
          <bl-select-option value="uk">United Kingdom</bl-select-option>
        </bl-select>
      </div>
    </DemoSection>

    <!-- Clear Button -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Clear Button</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Clear button can be displayed by passing <code>clearable</code> attribute to the Select
        component.
      </p>
    </div>

    <DemoSection title="Clearable" :code="clearableCode">
      <div class="max-w-xs">
        <bl-select placeholder="Choose country" label="Country" value="tr" clearable>
          <bl-select-option value="tr">Turkiye</bl-select-option>
          <bl-select-option value="nl">The Netherlands</bl-select-option>
          <bl-select-option value="de">Germany</bl-select-option>
        </bl-select>
      </div>
    </DemoSection>

    <!-- Labels -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Select Labels</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Select component optionally can have a <code>label</code>. If the label is set, it will be a
        floating label by default. Use <code>label-fixed</code> for always-on-top labels.
      </p>
    </div>

    <DemoSection title="Label Variants" :code="labelCode">
      <div class="flex flex-wrap gap-4">
        <bl-select label="Floating Label">
          <bl-select-option value="tr">Turkiye</bl-select-option>
          <bl-select-option value="nl">The Netherlands</bl-select-option>
        </bl-select>
        <bl-select label="Fixed Label" label-fixed placeholder="Choose country">
          <bl-select-option value="tr">Turkiye</bl-select-option>
          <bl-select-option value="nl">The Netherlands</bl-select-option>
        </bl-select>
        <bl-select placeholder="No Label">
          <bl-select-option value="tr">Turkiye</bl-select-option>
          <bl-select-option value="nl">The Netherlands</bl-select-option>
        </bl-select>
      </div>
    </DemoSection>

    <!-- Sizes -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Select Sizes</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Select has 3 size options: <strong>small</strong>, <strong>medium</strong> and
        <strong>large</strong>. <code>medium</code> size is default.
      </p>
    </div>

    <DemoSection title="Sizes" :code="sizesCode">
      <div class="flex flex-wrap items-end gap-4">
        <bl-select label="Small" size="small">
          <bl-select-option value="tr">Turkiye</bl-select-option>
          <bl-select-option value="nl">The Netherlands</bl-select-option>
        </bl-select>
        <bl-select label="Medium">
          <bl-select-option value="tr">Turkiye</bl-select-option>
          <bl-select-option value="nl">The Netherlands</bl-select-option>
        </bl-select>
        <bl-select label="Large" size="large">
          <bl-select-option value="tr">Turkiye</bl-select-option>
          <bl-select-option value="nl">The Netherlands</bl-select-option>
        </bl-select>
      </div>
    </DemoSection>

    <!-- States -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Select States
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Select can be disabled or have help text.
      </p>
    </div>

    <DemoSection title="States" :code="statesCode">
      <div class="flex flex-wrap gap-4">
        <bl-select label="Disabled" disabled>
          <bl-select-option value="tr">Turkiye</bl-select-option>
        </bl-select>
        <bl-select label="With Help Text" help-text="Select your country">
          <bl-select-option value="tr">Turkiye</bl-select-option>
          <bl-select-option value="nl">The Netherlands</bl-select-option>
        </bl-select>
      </div>
    </DemoSection>

    <!-- Searchable -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Searchable</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Select component can be searchable by using <code>search-bar</code> attribute.
      </p>
    </div>

    <DemoSection title="Searchable" :code="searchableCode">
      <div class="max-w-xs">
        <bl-select label="Country" search-bar search-bar-placeholder="Search countries...">
          <bl-select-option value="tr">Turkiye</bl-select-option>
          <bl-select-option value="nl">The Netherlands</bl-select-option>
          <bl-select-option value="de">Germany</bl-select-option>
          <bl-select-option value="uk">United Kingdom</bl-select-option>
          <bl-select-option value="us">United States</bl-select-option>
        </bl-select>
      </div>
    </DemoSection>

    <!-- With Icons -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Options with Icons
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        If <code>bl-select-option</code> has icon by <code>icon</code> attribute,
        <code>bl-select</code> would render the icon of selected option.
      </p>
    </div>

    <DemoSection title="With Icons" :code="iconsCode">
      <div class="max-w-xs">
        <bl-select placeholder="Choose Payment Method" label="Payment">
          <bl-select-option value="credit_card" icon="info">Credit Card</bl-select-option>
          <bl-select-option value="cash" icon="money">Cash</bl-select-option>
          <bl-select-option value="coin" icon="coin">Coin</bl-select-option>
        </bl-select>
      </div>
    </DemoSection>

    <!-- Validation -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Select Validation
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Select component supports <code>required</code> rule to do validation. Validation will run
        after user selects a value and goes out from the input.
      </p>
    </div>

    <DemoSection title="Validation" :code="validationCode">
      <div class="max-w-xs">
        <bl-select label="Country" label-fixed required>
          <bl-select-option value="tr">Turkiye</bl-select-option>
          <bl-select-option value="nl">The Netherlands</bl-select-option>
          <bl-select-option value="de">Germany</bl-select-option>
        </bl-select>
      </div>
    </DemoSection>

    <!-- Interactive -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Interactive Demo
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Test select events with this interactive example.
      </p>
    </div>

    <DemoSection title="Interactive Demo" :code="interactiveCode">
      <div class="flex items-center gap-4">
        <bl-select
          :value="selectedCountry"
          placeholder="Choose country"
          label="Country"
          @bl-select="selectedCountry = ($event as CustomEvent).detail[0]?.value || ''"
        >
          <bl-select-option value="tr">Turkiye</bl-select-option>
          <bl-select-option value="nl">The Netherlands</bl-select-option>
          <bl-select-option value="de">Germany</bl-select-option>
          <bl-select-option value="uk">United Kingdom</bl-select-option>
        </bl-select>
        <span class="text-neutral-dark">
          Selected: <strong class="text-primary">{{ selectedCountry || "(none)" }}</strong>
        </span>
      </div>
    </DemoSection>

    <!-- RTL Support -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">RTL Support</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        The select component supports RTL (Right-to-Left) text direction. You can enable RTL mode by
        setting the <code>dir</code> attribute on a parent element or the <code>html</code> tag.
      </p>
    </div>

    <DemoSection title="RTL Support" :code="rtlCode">
      <div class="flex gap-8">
        <div>
          <p class="text-sm text-neutral-dark mb-2">LTR (Left-to-Right)</p>
          <bl-select label="Country" placeholder="Select a country">
            <bl-select-option value="us">United States</bl-select-option>
            <bl-select-option value="uk">United Kingdom</bl-select-option>
            <bl-select-option value="fr">France</bl-select-option>
          </bl-select>
        </div>
        <div dir="rtl">
          <p class="text-sm text-neutral-dark mb-2">RTL (Right-to-Left)</p>
          <bl-select label="الدولة" placeholder="اختر دولة">
            <bl-select-option value="us">الولايات المتحدة</bl-select-option>
            <bl-select-option value="uk">المملكة المتحدة</bl-select-option>
            <bl-select-option value="fr">فرنسا</bl-select-option>
          </bl-select>
        </div>
      </div>
    </DemoSection>
  </div>
</template>
