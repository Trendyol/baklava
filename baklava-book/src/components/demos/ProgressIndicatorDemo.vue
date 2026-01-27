<script setup lang="ts">
import DemoSection from "@/components/DemoSection.vue";
import { onMounted, onUnmounted, ref } from "vue";

const progress = ref(0);
let interval: number;

onMounted(() => {
  interval = setInterval(() => {
    progress.value = (progress.value + 5) % 105;
  }, 500) as unknown as number;
});

onUnmounted(() => {
  clearInterval(interval);
});

const basicCode = `<bl-progress-indicator value="50" max="100"></bl-progress-indicator>`;

const valuesCode = `<bl-progress-indicator value="25" max="100"></bl-progress-indicator>
<bl-progress-indicator value="50" max="100"></bl-progress-indicator>
<bl-progress-indicator value="75" max="100"></bl-progress-indicator>
<bl-progress-indicator value="100" max="100"></bl-progress-indicator>`;

const maxValueCode = `<!-- 5 of 8 tasks completed -->
<bl-progress-indicator value="5" max="8"></bl-progress-indicator>

<!-- 3 of 10 steps done -->
<bl-progress-indicator value="3" max="10"></bl-progress-indicator>`;

const sizesCode = `<bl-progress-indicator size="small" value="60" max="100"></bl-progress-indicator>
<bl-progress-indicator size="medium" value="60" max="100"></bl-progress-indicator>
<bl-progress-indicator size="large" value="60" max="100"></bl-progress-indicator>`;

const failedCode = `<!-- Failed state - e.g., upload failed -->
<bl-progress-indicator value="100" max="100" failed></bl-progress-indicator>`;

const rtlCode = `<!-- LTR (Left-to-Right) -->
<bl-progress-indicator value="5" max="8"></bl-progress-indicator>

<!-- RTL (Right-to-Left) -->
<div dir="rtl">
  <bl-progress-indicator value="5" max="8"></bl-progress-indicator>
</div>`;

const animatedCode = `<script setup>
import { ref, onMounted } from "vue";
const progress = ref(0);

onMounted(() => {
  setInterval(() => {
    progress.value = (progress.value + 5) % 105;
  }, 500);
});
<\/script>

<template>
  <p>Progress: {{ progress }}%</p>
  <bl-progress-indicator :value="progress" max="100"></bl-progress-indicator>
</template>`;

const useCasesCode = `<!-- File upload progress -->
<div class="p-4 bg-neutral-lightest rounded-lg">
  <div class="flex justify-between text-sm mb-2">
    <span>Uploading file.zip</span>
    <span class="font-medium">68%</span>
  </div>
  <bl-progress-indicator value="68" max="100"></bl-progress-indicator>
</div>

<!-- Storage usage -->
<div class="p-4 bg-neutral-lightest rounded-lg">
  <div class="flex justify-between text-sm mb-2">
    <span>Storage used</span>
    <span>15GB / 50GB</span>
  </div>
  <bl-progress-indicator value="30" max="100"></bl-progress-indicator>
</div>`;
</script>

<template>
  <div class="space-y-6">
    <!-- Introduction -->
    <div class="prose dark:prose-invert max-w-none mb-8">
      <p class="text-neutral-dark dark:text-neutral-light">
        A progress indicator provides feedback about the duration and progression of a process to
        indicate how long a user will be waiting.
      </p>
      <p class="text-neutral-dark dark:text-neutral-light">
        Progress indicator component is used for a long operation or a process that can take a
        considerable or unknown amount of time. It visually shows the progression of a system
        operation such as downloading, uploading, loading data, submitting a form, or saving
        updates.
      </p>

      <h4 class="text-sm font-semibold text-neutral-darkest dark:text-white mt-4 mb-2">
        Key Features
      </h4>
      <ul class="text-sm text-neutral-dark dark:text-neutral-light list-disc pl-5 space-y-1">
        <li>
          <code>value</code> and <code>max</code> attributes for flexible progress calculation
        </li>
        <li>Three sizes: <code>small</code>, <code>medium</code>, <code>large</code></li>
        <li><code>failed</code> state for error indication</li>
        <li>RTL support</li>
      </ul>
    </div>

    <!-- Basic Usage -->
    <div class="mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Basic Usage</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        By default, the <code>max</code> is 100 and the progress indicator is evaluated over 100.
        So the <code>value</code> must be a valid floating point number between 0 and
        <code>max</code>, or between 0 and 100 if <code>max</code> is omitted.
      </p>
    </div>

    <DemoSection title="Basic Progress" :code="basicCode">
      <div class="max-w-md">
        <bl-progress-indicator value="50" max="100"></bl-progress-indicator>
      </div>
    </DemoSection>

    <!-- Different Values -->
    <DemoSection title="Different Values" :code="valuesCode">
      <div class="space-y-4 max-w-md">
        <div>
          <p class="text-sm text-neutral-dark dark:text-neutral-light mb-1">25%</p>
          <bl-progress-indicator value="25" max="100"></bl-progress-indicator>
        </div>
        <div>
          <p class="text-sm text-neutral-dark dark:text-neutral-light mb-1">50%</p>
          <bl-progress-indicator value="50" max="100"></bl-progress-indicator>
        </div>
        <div>
          <p class="text-sm text-neutral-dark dark:text-neutral-light mb-1">75%</p>
          <bl-progress-indicator value="75" max="100"></bl-progress-indicator>
        </div>
        <div>
          <p class="text-sm text-neutral-dark dark:text-neutral-light mb-1">100%</p>
          <bl-progress-indicator value="100" max="100"></bl-progress-indicator>
        </div>
      </div>
    </DemoSection>

    <!-- Custom Max Value -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Usage With Max Value
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        You don't have to pass the <code>value</code> according to 100 percent. For example, if you
        have a total of 8 tasks and completed 5 tasks you can pass parameters like
        <code>max="8" value="5"</code>. The progress indicator will divide into 8 parts and 5 parts
        will be full.
      </p>
    </div>

    <DemoSection title="Custom Max Value" :code="maxValueCode">
      <div class="space-y-4 max-w-md">
        <div>
          <p class="text-sm text-neutral-dark dark:text-neutral-light mb-1">
            Completed Tasks:
            <strong class="text-success">5/8</strong>
          </p>
          <bl-progress-indicator value="5" max="8"></bl-progress-indicator>
        </div>
        <div>
          <p class="text-sm text-neutral-dark dark:text-neutral-light mb-1">
            Steps Done:
            <strong class="text-success">3/10</strong>
          </p>
          <bl-progress-indicator value="3" max="10"></bl-progress-indicator>
        </div>
      </div>
    </DemoSection>

    <!-- Sizes -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Progress Indicator Sizes
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        We have 3 sizes of progress indicator: <code>small</code>, <code>medium</code>,
        <code>large</code>. Default size is <code>medium</code>.
      </p>
    </div>

    <DemoSection title="Sizes" :code="sizesCode">
      <div class="space-y-4 max-w-md">
        <div>
          <p class="text-sm text-neutral-dark dark:text-neutral-light mb-1">Small</p>
          <bl-progress-indicator size="small" value="60" max="100"></bl-progress-indicator>
        </div>
        <div>
          <p class="text-sm text-neutral-dark dark:text-neutral-light mb-1">Medium (default)</p>
          <bl-progress-indicator size="medium" value="60" max="100"></bl-progress-indicator>
        </div>
        <div>
          <p class="text-sm text-neutral-dark dark:text-neutral-light mb-1">Large</p>
          <bl-progress-indicator size="large" value="60" max="100"></bl-progress-indicator>
        </div>
      </div>
    </DemoSection>

    <!-- Failed State -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Progress Indicator Status
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        The progress indicator appears in success mode (green) by default. But if you need to show
        fail status for example failed to upload or failed to complete tasks you can pass the
        <code>failed</code> attribute.
      </p>
    </div>

    <DemoSection title="Failed State" :code="failedCode">
      <div class="max-w-md">
        <p class="text-sm text-danger mb-2">
          Upload Failed - Image must not be larger than 3mb.
        </p>
        <bl-progress-indicator value="100" max="100" failed></bl-progress-indicator>
      </div>
    </DemoSection>

    <!-- RTL Support -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">RTL Support</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        The progress indicator component supports RTL (Right-to-Left) text direction. You can
        enable RTL mode by setting the <code>dir</code> attribute on a parent element.
      </p>
    </div>

    <DemoSection title="RTL Support" :code="rtlCode">
      <div class="flex flex-col md:flex-row gap-8 max-w-2xl">
        <div class="flex-1">
          <p class="text-sm text-neutral-dark mb-2">LTR (Left-to-Right)</p>
          <p class="text-sm text-neutral-dark dark:text-neutral-light mb-1">
            Completed Tasks:
            <strong class="text-success">5/8</strong>
          </p>
          <bl-progress-indicator value="5" max="8"></bl-progress-indicator>
        </div>
        <div class="flex-1" dir="rtl">
          <p class="text-sm text-neutral-dark mb-2">RTL (Right-to-Left)</p>
          <p class="text-sm text-neutral-dark dark:text-neutral-light mb-1">
            المهام المكتملة:
            <strong class="text-success">5/8</strong>
          </p>
          <bl-progress-indicator value="5" max="8"></bl-progress-indicator>
        </div>
      </div>
    </DemoSection>

    <!-- Animated -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
        Animated Progress
      </h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        The progress indicator smoothly animates when the value changes.
      </p>
    </div>

    <DemoSection title="Animated Progress" :code="animatedCode">
      <div class="max-w-md">
        <p class="text-sm text-neutral-dark dark:text-neutral-light mb-1">
          Progress: <strong class="text-primary">{{ progress }}%</strong>
        </p>
        <bl-progress-indicator :value="progress" max="100"></bl-progress-indicator>
      </div>
    </DemoSection>

    <!-- Use Cases -->
    <div class="mt-8 mb-2">
      <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">Use Cases</h3>
      <p class="text-sm text-neutral-dark dark:text-neutral-light mb-4">
        Common scenarios where progress indicators are useful.
      </p>
    </div>

    <DemoSection title="Use Cases" :code="useCasesCode">
      <div class="space-y-4 max-w-md">
        <div class="p-4 bg-neutral-lightest dark:bg-neutral-darker rounded-lg">
          <div class="flex justify-between text-sm mb-2">
            <span class="text-neutral-darker dark:text-neutral-light">Uploading file.zip</span>
            <span class="text-primary font-medium">68%</span>
          </div>
          <bl-progress-indicator value="68" max="100"></bl-progress-indicator>
        </div>
        <div class="p-4 bg-neutral-lightest dark:bg-neutral-darker rounded-lg">
          <div class="flex justify-between text-sm mb-2">
            <span class="text-neutral-darker dark:text-neutral-light">Storage used</span>
            <span class="text-neutral-dark dark:text-neutral-light">15GB / 50GB</span>
          </div>
          <bl-progress-indicator value="30" max="100"></bl-progress-indicator>
        </div>
        <div class="p-4 bg-neutral-lightest dark:bg-neutral-darker rounded-lg">
          <div class="flex justify-between text-sm mb-2">
            <span class="text-neutral-darker dark:text-neutral-light">Profile completion</span>
            <span class="text-success font-medium">90%</span>
          </div>
          <bl-progress-indicator value="90" max="100"></bl-progress-indicator>
        </div>
      </div>
    </DemoSection>
  </div>
</template>
