<script setup lang="ts">
import DemoSection from "@/components/DemoSection.vue";

const basicCode = `<bl-tooltip>
  <bl-button slot="tooltip-trigger">Hover me</bl-button>
  This is a tooltip message
</bl-tooltip>`;

const placementsCode = `<bl-tooltip placement="top">
  <bl-button slot="tooltip-trigger" variant="secondary">Top</bl-button>
  Tooltip on top
</bl-tooltip>
<bl-tooltip placement="bottom">
  <bl-button slot="tooltip-trigger" variant="secondary">Bottom</bl-button>
  Tooltip on bottom
</bl-tooltip>
<bl-tooltip placement="left">
  <bl-button slot="tooltip-trigger" variant="secondary">Left</bl-button>
  Tooltip on left
</bl-tooltip>
<bl-tooltip placement="right">
  <bl-button slot="tooltip-trigger" variant="secondary">Right</bl-button>
  Tooltip on right
</bl-tooltip>`;

const elementsCode = `<bl-tooltip>
  <bl-button slot="tooltip-trigger" icon="info" label="Info"></bl-button>
  Click for more information
</bl-tooltip>

<bl-tooltip>
  <bl-badge slot="tooltip-trigger" icon="star">Featured</bl-badge>
  This item is featured
</bl-tooltip>

<bl-tooltip>
  <span slot="tooltip-trigger" class="cursor-help underline">Help text</span>
  Additional help information
</bl-tooltip>`;

const iconButtonsCode = `<bl-tooltip placement="bottom">
  <bl-button slot="tooltip-trigger" icon="edit" variant="tertiary" label="Edit"></bl-button>
  Edit item
</bl-tooltip>
<bl-tooltip placement="bottom">
  <bl-button slot="tooltip-trigger" icon="copy" variant="tertiary" label="Copy"></bl-button>
  Copy to clipboard
</bl-tooltip>
<bl-tooltip placement="bottom">
  <bl-button slot="tooltip-trigger" icon="delete" variant="tertiary" kind="danger" label="Delete"></bl-button>
  Delete item
</bl-tooltip>`;

const triggerCode = `<!-- Hover trigger (default) -->
<bl-tooltip trigger="hover">...</bl-tooltip>

<!-- Click trigger -->
<bl-tooltip trigger="click">...</bl-tooltip>`;

const rtlCode = `<!-- LTR (Left-to-Right) -->
<bl-tooltip placement="right">
  <bl-button slot="tooltip-trigger">Hover me</bl-button>
  This tooltip appears on the right
</bl-tooltip>

<!-- RTL (Right-to-Left) -->
<div dir="rtl">
  <bl-tooltip placement="left">
    <bl-button slot="tooltip-trigger">حوم فوقي</bl-button>
    تظهر هذه التلميحة على اليسار
  </bl-tooltip>
</div>`;
</script>

<template>
  <div class="space-y-6">
    <!-- Introduction -->
    <div class="prose dark:prose-invert max-w-none mb-8">
      <p class="text-neutral-dark dark:text-neutral-light">
        Tooltip component displays informative text when users hover over or focus on an element.
        It's useful for providing additional context without cluttering the UI.
      </p>

      <h4 class="text-sm font-semibold text-neutral-darkest dark:text-white mt-4 mb-2">
        Usage Guidelines
      </h4>
      <ul class="text-sm text-neutral-dark dark:text-neutral-light list-disc pl-5 space-y-1">
        <li>Keep tooltip text brief and informative</li>
        <li>Use tooltips for supplementary information, not essential content</li>
        <li>Avoid tooltips on touch devices as hover is not available</li>
        <li>Position tooltips to avoid covering important content</li>
        <li>Use consistent placement throughout your application</li>
      </ul>
    </div>

    <!-- Basic -->
    <div class="mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Basic Tooltip</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        A simple tooltip that appears on hover. Use <code>slot="tooltip-trigger"</code> for the
        trigger element.
      </p>
    </div>

    <DemoSection title="Basic Tooltip" :code="basicCode">
      <div class="flex flex-wrap gap-4">
        <bl-tooltip>
          <bl-button slot="tooltip-trigger">Hover me</bl-button>
          This is a tooltip message
        </bl-tooltip>
      </div>
    </DemoSection>

    <!-- Placements -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Placements</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Control tooltip position with the <code>placement</code> attribute. Available values:
        <code>top</code>, <code>bottom</code>, <code>left</code>, <code>right</code>, and their
        variations like <code>top-start</code>, <code>top-end</code>, etc.
      </p>
    </div>

    <DemoSection title="Placements" :code="placementsCode">
      <div class="flex flex-wrap gap-4 py-8">
        <bl-tooltip placement="top">
          <bl-button slot="tooltip-trigger" variant="secondary">Top</bl-button>
          Tooltip on top
        </bl-tooltip>
        <bl-tooltip placement="bottom">
          <bl-button slot="tooltip-trigger" variant="secondary">Bottom</bl-button>
          Tooltip on bottom
        </bl-tooltip>
        <bl-tooltip placement="left">
          <bl-button slot="tooltip-trigger" variant="secondary">Left</bl-button>
          Tooltip on left
        </bl-tooltip>
        <bl-tooltip placement="right">
          <bl-button slot="tooltip-trigger" variant="secondary">Right</bl-button>
          Tooltip on right
        </bl-tooltip>
      </div>
    </DemoSection>

    <!-- On Different Elements -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        On Different Elements
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Tooltips can be attached to any element - buttons, icons, badges, or plain text.
      </p>
    </div>

    <DemoSection title="On Different Elements" :code="elementsCode">
      <div class="flex flex-wrap items-center gap-6">
        <bl-tooltip>
          <bl-button slot="tooltip-trigger" icon="info" label="Info"></bl-button>
          Click for more information
        </bl-tooltip>

        <bl-tooltip>
          <bl-badge slot="tooltip-trigger" icon="star">Featured</bl-badge>
          This item is featured
        </bl-tooltip>

        <bl-tooltip>
          <span slot="tooltip-trigger" class="text-primary cursor-help underline">Help text</span>
          Additional help information
        </bl-tooltip>
      </div>
    </DemoSection>

    <!-- Icon Buttons with Tooltips -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Icon Buttons with Tooltips
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        A common pattern is using tooltips with icon-only buttons to describe their action.
      </p>
    </div>

    <DemoSection title="Icon Buttons with Tooltips" :code="iconButtonsCode">
      <div class="flex flex-wrap gap-2">
        <bl-tooltip placement="bottom">
          <bl-button slot="tooltip-trigger" icon="edit" variant="tertiary" label="Edit"></bl-button>
          Edit item
        </bl-tooltip>
        <bl-tooltip placement="bottom">
          <bl-button slot="tooltip-trigger" icon="copy" variant="tertiary" label="Copy"></bl-button>
          Copy to clipboard
        </bl-tooltip>
        <bl-tooltip placement="bottom">
          <bl-button
            slot="tooltip-trigger"
            icon="delete"
            variant="tertiary"
            kind="danger"
            label="Delete"
          ></bl-button>
          Delete item
        </bl-tooltip>
        <bl-tooltip placement="bottom">
          <bl-button slot="tooltip-trigger" icon="share" variant="tertiary" label="Share">
          </bl-button>
          Share item
        </bl-tooltip>
      </div>
    </DemoSection>

    <!-- Trigger Types -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Trigger Types</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Tooltips can be triggered by hover (default) or click.
      </p>
    </div>

    <DemoSection title="Trigger Types" :code="triggerCode">
      <div class="flex flex-wrap gap-4">
        <bl-tooltip trigger="hover">
          <bl-button slot="tooltip-trigger" variant="secondary">Hover Trigger</bl-button>
          Shows on hover
        </bl-tooltip>
        <bl-tooltip trigger="click">
          <bl-button slot="tooltip-trigger" variant="secondary">Click Trigger</bl-button>
          Shows on click
        </bl-tooltip>
      </div>
    </DemoSection>

    <!-- RTL Support -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">RTL Support</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        The tooltip component supports RTL (Right-to-Left) text direction. Tooltip placements are
        automatically mirrored in RTL mode.
      </p>
    </div>

    <DemoSection title="RTL Support" :code="rtlCode">
      <div class="flex gap-8 py-4">
        <div>
          <p class="text-sm text-neutral-dark mb-2">LTR (Left-to-Right)</p>
          <bl-tooltip placement="right">
            <bl-button slot="tooltip-trigger">Hover me</bl-button>
            This tooltip appears on the right
          </bl-tooltip>
        </div>
        <div dir="rtl">
          <p class="text-sm text-neutral-dark mb-2">RTL (Right-to-Left)</p>
          <bl-tooltip placement="left">
            <bl-button slot="tooltip-trigger">حوم فوقي</bl-button>
            تظهر هذه التلميحة على اليسار
          </bl-tooltip>
        </div>
      </div>
    </DemoSection>
  </div>
</template>
