<script setup lang="ts">
import DemoSection from "@/components/DemoSection.vue";
import { ref } from "vue";

const popoverRefs = ref<Record<string, any>>({});

function togglePopover(id: string, event: Event) {
  const popover = document.getElementById(id) as any;

  if (popover) {
    popover.target = event.target;
    if (popover.visible) {
      popover.hide();
    } else {
      popover.show();
    }
  }
}

const basicCode = `<bl-button id="trigger-btn" @bl-click="togglePopover">Click me</bl-button>
<bl-popover id="my-popover" target="trigger-btn">
  <p>This is popover content</p>
</bl-popover>

<script>
const button = document.getElementById('trigger-btn');
const popover = document.getElementById('my-popover');

button.addEventListener('bl-click', () => {
  popover.show();
});
<\/script>`;

const placementsCode = `<bl-popover target="btn-top" placement="top">...</bl-popover>
<bl-popover target="btn-bottom" placement="bottom">...</bl-popover>
<bl-popover target="btn-left" placement="left">...</bl-popover>
<bl-popover target="btn-right" placement="right">...</bl-popover>`;

const allPlacementsCode = `<!-- Available placements -->
top-start, top, top-end
bottom-start, bottom, bottom-end
left-start, left, left-end
right-start, right, right-end`;

const arrowCode = `<bl-popover style="--bl-popover-arrow-display: block">
  Popover with arrow indicator
</bl-popover>`;

const customStylesCode = `<!-- Custom background color -->
<bl-popover style="--bl-popover-background-color: #f4edff">
  Custom styled popover
</bl-popover>

<!-- Custom border color -->
<bl-popover style="--bl-popover-border-color: blue">
  Blue border popover
</bl-popover>

<!-- Custom padding -->
<bl-popover style="--bl-popover-padding: 2rem">
  Popover with large padding
</bl-popover>`;

const offsetCode = `<bl-popover offset="40" placement="right">
  40px offset from trigger
</bl-popover>`;

const fitSizeCode = `<bl-popover fit-size>
  Popover width matches button width
</bl-popover>`;

const richContentCode = `<bl-popover>
  <div class="min-w-48">
    <div class="flex items-center gap-3 mb-3 pb-3 border-b">
      <bl-icon name="account"></bl-icon>
      <div>
        <p class="font-medium">John Doe</p>
        <p class="text-sm">john@example.com</p>
      </div>
    </div>
    <nav>
      <a href="#">Profile</a>
      <a href="#">Settings</a>
      <a href="#">Logout</a>
    </nav>
  </div>
</bl-popover>`;
</script>

<template>
  <div class="space-y-6">
    <!-- Introduction -->
    <div class="prose dark:prose-invert max-w-none mb-8">
      <p class="text-neutral-dark dark:text-neutral-light">
        Popovers can be used for displaying informative or interactive content related with another
        element on the screen. It shows given content in a floating container that is positioned to
        a given target element.
      </p>

      <bl-alert variant="warning" icon class="mt-4">
        Use <strong>Tooltip component</strong> for text-based non-interactive informative content.
      </bl-alert>

      <h4 class="text-sm font-semibold text-neutral-darkest dark:text-white mt-4 mb-2">
        Main Behaviours
      </h4>
      <ul class="text-sm text-neutral-dark dark:text-neutral-light list-disc pl-5 space-y-1">
        <li>
          Popovers don't open by themselves. <code>show()</code> method should be called via
          JavaScript.
        </li>
        <li>Only a single popover can be visible at the same time (unless they are nested).</li>
        <li>
          Popovers try to keep themselves inside viewport. If there's not enough space, they
          automatically flip to the opposite side.
        </li>
        <li>Popovers can be closed with <code>Escape</code> key.</li>
        <li>Popovers close if user clicks outside of it and its target element.</li>
      </ul>
    </div>

    <!-- Basic Usage -->
    <div class="mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Basic Usage</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Use the <code>target</code> attribute to specify the trigger element (by id or element
        reference). Call <code>show()</code> method to open the popover.
      </p>
    </div>

    <DemoSection title="Basic Popover" :code="basicCode">
      <bl-button id="basic-popover-trigger" @bl-click="togglePopover('basic-popover', $event)">
        Click me
      </bl-button>
      <bl-popover id="basic-popover">
        <div class="p-2">
          <p class="text-neutral-darker dark:text-neutral-light">This is popover content</p>
        </div>
      </bl-popover>
    </DemoSection>

    <!-- Placements -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Placement</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Use the <code>placement</code> attribute to control popover direction. Default placement is
        <code>bottom</code>. If there's not enough room, it repositions automatically.
      </p>
    </div>

    <DemoSection title="Basic Placements" :code="placementsCode">
      <div class="flex flex-wrap gap-4 py-8">
        <div>
          <bl-button
            id="popover-top-trigger"
            variant="secondary"
            @bl-click="togglePopover('popover-top', $event)"
          >
            Top
          </bl-button>
          <bl-popover id="popover-top" placement="top">
            <div class="p-2">Popover on top</div>
          </bl-popover>
        </div>
        <div>
          <bl-button
            id="popover-bottom-trigger"
            variant="secondary"
            @bl-click="togglePopover('popover-bottom', $event)"
          >
            Bottom
          </bl-button>
          <bl-popover id="popover-bottom" placement="bottom">
            <div class="p-2">Popover on bottom</div>
          </bl-popover>
        </div>
        <div>
          <bl-button
            id="popover-left-trigger"
            variant="secondary"
            @bl-click="togglePopover('popover-left', $event)"
          >
            Left
          </bl-button>
          <bl-popover id="popover-left" placement="left">
            <div class="p-2">Popover on left</div>
          </bl-popover>
        </div>
        <div>
          <bl-button
            id="popover-right-trigger"
            variant="secondary"
            @bl-click="togglePopover('popover-right', $event)"
          >
            Right
          </bl-button>
          <bl-popover id="popover-right" placement="right">
            <div class="p-2">Popover on right</div>
          </bl-popover>
        </div>
      </div>
    </DemoSection>

    <!-- All Placements -->
    <DemoSection title="All Placement Options" :code="allPlacementsCode">
      <div class="flex flex-wrap gap-3 py-4">
        <div>
          <bl-button
            size="small"
            variant="tertiary"
            @bl-click="togglePopover('popover-top-start', $event)"
          >
            top-start
          </bl-button>
          <bl-popover
            id="popover-top-start"
            placement="top-start"
            style="--bl-popover-arrow-display: block"
          >
            <div class="p-2 text-sm">top-start</div>
          </bl-popover>
        </div>
        <div>
          <bl-button
            size="small"
            variant="tertiary"
            @bl-click="togglePopover('popover-top-center', $event)"
          >
            top
          </bl-button>
          <bl-popover
            id="popover-top-center"
            placement="top"
            style="--bl-popover-arrow-display: block"
          >
            <div class="p-2 text-sm">top</div>
          </bl-popover>
        </div>
        <div>
          <bl-button
            size="small"
            variant="tertiary"
            @bl-click="togglePopover('popover-top-end', $event)"
          >
            top-end
          </bl-button>
          <bl-popover
            id="popover-top-end"
            placement="top-end"
            style="--bl-popover-arrow-display: block"
          >
            <div class="p-2 text-sm">top-end</div>
          </bl-popover>
        </div>
        <div>
          <bl-button
            size="small"
            variant="tertiary"
            @bl-click="togglePopover('popover-bottom-start', $event)"
          >
            bottom-start
          </bl-button>
          <bl-popover
            id="popover-bottom-start"
            placement="bottom-start"
            style="--bl-popover-arrow-display: block"
          >
            <div class="p-2 text-sm">bottom-start</div>
          </bl-popover>
        </div>
        <div>
          <bl-button
            size="small"
            variant="tertiary"
            @bl-click="togglePopover('popover-bottom-center', $event)"
          >
            bottom
          </bl-button>
          <bl-popover
            id="popover-bottom-center"
            placement="bottom"
            style="--bl-popover-arrow-display: block"
          >
            <div class="p-2 text-sm">bottom</div>
          </bl-popover>
        </div>
        <div>
          <bl-button
            size="small"
            variant="tertiary"
            @bl-click="togglePopover('popover-bottom-end', $event)"
          >
            bottom-end
          </bl-button>
          <bl-popover
            id="popover-bottom-end"
            placement="bottom-end"
            style="--bl-popover-arrow-display: block"
          >
            <div class="p-2 text-sm">bottom-end</div>
          </bl-popover>
        </div>
      </div>
    </DemoSection>

    <!-- Arrow -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Arrow</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Use <code>--bl-popover-arrow-display: block</code> CSS variable to show an arrow. By
        default, arrow is hidden (<code>none</code>).
      </p>
    </div>

    <DemoSection title="With Arrow" :code="arrowCode">
      <bl-button @bl-click="togglePopover('popover-arrow', $event)">With Arrow</bl-button>
      <bl-popover id="popover-arrow" style="--bl-popover-arrow-display: block">
        <div class="p-2">
          <p class="text-neutral-darker dark:text-neutral-light">Popover with arrow indicator</p>
        </div>
      </bl-popover>
    </DemoSection>

    <!-- Custom Styles -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Customization
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Customize popover appearance using CSS variables:
      </p>
      <ul class="text-sm text-neutral-dark dark:text-neutral-light list-disc pl-5 mb-4">
        <li><code>--bl-popover-background-color</code> - Background color</li>
        <li><code>--bl-popover-border-color</code> - Border color</li>
        <li><code>--bl-popover-padding</code> - Padding</li>
        <li><code>--bl-popover-border-radius</code> - Border radius</li>
        <li><code>--bl-popover-arrow-display</code> - Arrow visibility (none/block)</li>
      </ul>
    </div>

    <DemoSection title="Custom Styles" :code="customStylesCode">
      <div class="flex flex-wrap gap-4">
        <div>
          <bl-button variant="secondary" @bl-click="togglePopover('popover-bg', $event)">
            Custom Background
          </bl-button>
          <bl-popover
            id="popover-bg"
            style="--bl-popover-background-color: #f4edff; --bl-popover-arrow-display: block"
          >
            <div class="p-2 text-neutral-darkest">Purple background</div>
          </bl-popover>
        </div>
        <div>
          <bl-button variant="secondary" @bl-click="togglePopover('popover-border', $event)">
            Custom Border
          </bl-button>
          <bl-popover id="popover-border" style="--bl-popover-border-color: var(--bl-color-info)">
            <div class="p-2">Blue border</div>
          </bl-popover>
        </div>
        <div>
          <bl-button variant="secondary" @bl-click="togglePopover('popover-padding', $event)">
            Large Padding
          </bl-button>
          <bl-popover id="popover-padding" style="--bl-popover-padding: 1.5rem">
            <div>More padding around content</div>
          </bl-popover>
        </div>
      </div>
    </DemoSection>

    <!-- Offset -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Offset</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Use the <code>offset</code> attribute to set the distance from the trigger element. Default
        is 8px.
      </p>
    </div>

    <DemoSection title="Custom Offset" :code="offsetCode">
      <div class="flex gap-4">
        <div>
          <bl-button variant="secondary" @bl-click="togglePopover('popover-offset-default', $event)">
            Default Offset
          </bl-button>
          <bl-popover id="popover-offset-default" placement="bottom">
            <div class="p-2">Default spacing</div>
          </bl-popover>
        </div>
        <div>
          <bl-button variant="secondary" @bl-click="togglePopover('popover-offset-large', $event)">
            Large Offset (40px)
          </bl-button>
          <bl-popover id="popover-offset-large" offset="40" placement="bottom">
            <div class="p-2">40px from trigger</div>
          </bl-popover>
        </div>
      </div>
    </DemoSection>

    <!-- Fit Size -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Fit Size</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Use the <code>fit-size</code> attribute to make popover width match the trigger element
        width. Useful for dropdown buttons.
      </p>
    </div>

    <DemoSection title="Fit Size" :code="fitSizeCode">
      <bl-button @bl-click="togglePopover('popover-fitsize', $event)">
        Long Button Text for FitSize Demo
      </bl-button>
      <bl-popover id="popover-fitsize" fit-size>
        <div class="p-2 text-center">
          <p class="text-neutral-darker dark:text-neutral-light">
            Popover width matches the button width
          </p>
        </div>
      </bl-popover>
    </DemoSection>

    <!-- Rich Content -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Rich Content</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Popovers can contain complex interactive content like menus, forms, or user cards.
      </p>
    </div>

    <DemoSection title="Rich Content" :code="richContentCode">
      <bl-button icon="account" @bl-click="togglePopover('popover-rich', $event)">
        User Menu
      </bl-button>
      <bl-popover id="popover-rich">
        <div class="p-3 min-w-48">
          <div
            class="flex items-center gap-3 mb-3 pb-3 border-b border-neutral-lightest dark:border-neutral-darker"
          >
            <div class="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
              <bl-icon name="account"></bl-icon>
            </div>
            <div>
              <p class="font-medium text-neutral-darkest dark:text-white">John Doe</p>
              <p class="text-sm text-neutral-dark">john@example.com</p>
            </div>
          </div>
          <nav class="space-y-1">
            <a
              href="#"
              class="block px-2 py-1.5 text-sm rounded hover:bg-neutral-lightest dark:hover:bg-neutral-darker text-neutral-darker dark:text-neutral-light"
            >
              Profile
            </a>
            <a
              href="#"
              class="block px-2 py-1.5 text-sm rounded hover:bg-neutral-lightest dark:hover:bg-neutral-darker text-neutral-darker dark:text-neutral-light"
            >
              Settings
            </a>
            <a
              href="#"
              class="block px-2 py-1.5 text-sm rounded hover:bg-neutral-lightest dark:hover:bg-neutral-darker text-danger"
            >
              Logout
            </a>
          </nav>
        </div>
      </bl-popover>
    </DemoSection>
  </div>
</template>
