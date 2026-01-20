<script setup lang="ts"></script>

<template>
  <div class="space-y-8">
    <!-- Basic -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Basic Popover</h4>
      <bl-popover>
        <template #popover-trigger>
<bl-button >Click me</bl-button>
</template>
        <div class="p-2">
          <p class="text-neutral-darker dark:text-neutral-light">This is popover content</p>
        </div>
      </bl-popover>
    </div>

    <!-- Placements -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Placements</h4>
      <div class="flex flex-wrap gap-4 py-8">
        <bl-popover placement="top">
          <template #popover-trigger>
<bl-button  variant="secondary">Top</bl-button>
</template>
          <div class="p-2">Popover on top</div>
        </bl-popover>
        <bl-popover placement="bottom">
          <template #popover-trigger>
<bl-button  variant="secondary">Bottom</bl-button>
</template>
          <div class="p-2">Popover on bottom</div>
        </bl-popover>
        <bl-popover placement="left">
          <template #popover-trigger>
<bl-button  variant="secondary">Left</bl-button>
</template>
          <div class="p-2">Popover on left</div>
        </bl-popover>
        <bl-popover placement="right">
          <template #popover-trigger>
<bl-button  variant="secondary">Right</bl-button>
</template>
          <div class="p-2">Popover on right</div>
        </bl-popover>
      </div>
    </div>

    <!-- With Arrow -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">With Arrow</h4>
      <bl-popover style="--bl-popover-arrow-display: block">
        <template #popover-trigger>
<bl-button >With Arrow</bl-button>
</template>
        <div class="p-2">
          <p>Popover with arrow indicator</p>
        </div>
      </bl-popover>
    </div>

    <!-- Rich Content -->
    <div>
      <h4 class="text-sm font-medium text-neutral-dark mb-3">Rich Content</h4>
      <bl-popover>
        <template #popover-trigger>
<bl-button  icon="account">User Menu</bl-button>
</template>
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
              class="block px-2 py-1.5 text-sm rounded hover:bg-neutral-lightest dark:hover:bg-neutral-darker"
              >Profile</a
            >
            <a
              href="#"
              class="block px-2 py-1.5 text-sm rounded hover:bg-neutral-lightest dark:hover:bg-neutral-darker"
              >Settings</a
            >
            <a
              href="#"
              class="block px-2 py-1.5 text-sm rounded hover:bg-neutral-lightest dark:hover:bg-neutral-darker text-danger"
              >Logout</a
            >
          </nav>
        </div>
      </bl-popover>
    </div>
  </div>
</template>
