<script setup lang="ts">
import { components, categories, getComponentsByCategory } from "@/data/components";
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section
      class="relative py-24 px-6 bg-gradient-to-br from-primary/5 via-white to-primary/10 dark:from-neutral-darkest dark:via-neutral-darker dark:to-neutral-darkest"
    >
      <div class="max-w-4xl mx-auto text-center">
        <bl-badge
          icon="star"
          size="large"
          style="--bl-badge-bg-color: #fef2e8; --bl-badge-color: #f27a1a"
        >
          Trendyol Design System
        </bl-badge>

        <h1 class="text-5xl md:text-6xl font-bold text-neutral-darkest dark:text-white mb-6">
          Baklava
          <span class="text-primary">Book</span>
        </h1>

        <p class="text-xl text-neutral-dark dark:text-neutral-light mb-10 max-w-2xl mx-auto">
          Modern web component kütüphanesi. Vue ve React projelerinde kolayca kullanılabilir.
        </p>

        <div class="flex flex-wrap justify-center gap-4">
          <bl-button variant="primary" size="large" icon="arrow_right" href="/components/button">
            Başla
          </bl-button>

          <bl-button
            variant="secondary"
            kind="neutral"
            size="large"
            icon="external_link"
            href="https://github.com/Trendyol/baklava"
            target="_blank"
          >
            GitHub
          </bl-button>
        </div>
      </div>
    </section>

    <!-- Component Overview -->
    <section class="py-20 px-6">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold text-neutral-darkest dark:text-white mb-4 text-center">
          {{ components.length }} Component
        </h2>
        <p class="text-neutral-dark dark:text-neutral-light text-center mb-12">
          Vue ve React için hazır, erişilebilir ve özelleştirilebilir
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="category in categories"
            :key="category.id"
            class="p-6 bg-white dark:bg-neutral-darker border border-neutral-lightest dark:border-neutral-dark rounded-2xl"
          >
            <div class="text-3xl mb-3">{{ category.icon }}</div>
            <h3 class="text-lg font-semibold text-neutral-darkest dark:text-white mb-2">
              {{ category.label }}
            </h3>
            <ul class="space-y-1">
              <li v-for="comp in getComponentsByCategory(category.id)" :key="comp.slug">
                <router-link
                  :to="`/components/${comp.slug}`"
                  class="text-sm text-neutral-dark dark:text-neutral-light hover:text-primary transition-colors"
                >
                  {{ comp.name }}
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Framework Support -->
    <section class="py-20 px-6 bg-neutral-lightest dark:bg-neutral-darker">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl font-bold text-neutral-darkest dark:text-white mb-4">
          Vue & React Desteği
        </h2>
        <p class="text-neutral-dark dark:text-neutral-light mb-10">
          Web Components tabanlı olduğu için her iki framework'te de sorunsuz çalışır.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Vue -->
          <div
            class="p-6 bg-white dark:bg-neutral-darkest rounded-2xl border border-neutral-lighter dark:border-neutral-dark text-center"
          >
            <svg class="w-12 h-12 mb-4 mx-auto" viewBox="0 0 128 128">
              <path
                fill="#42b883"
                d="M78.8,10L64,35.4L49.2,10H0l64,110l64-110C128,10,78.8,10,78.8,10z"
              />
              <path fill="#35495e" d="M78.8,10L64,35.4L49.2,10H25.6L64,76l38.4-66H78.8z" />
            </svg>
            <h3 class="text-xl font-semibold text-neutral-darkest dark:text-white mb-2">Vue 3</h3>
            <pre
              class="text-left text-sm bg-neutral-darkest text-neutral-lightest p-4 rounded-lg overflow-x-auto"
            ><code>&lt;bl-button variant="primary"&gt;
  Click me
&lt;/bl-button&gt;</code></pre>
          </div>

          <!-- React -->
          <div
            class="p-6 bg-white dark:bg-neutral-darkest rounded-2xl border border-neutral-lighter dark:border-neutral-dark text-center"
          >
            <svg class="w-12 h-12 mb-4 mx-auto" viewBox="0 0 128 128">
              <g fill="#61DAFB">
                <circle cx="64" cy="64" r="11.4" />
                <path
                  d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8zM92.5 14.7c4.1 2.4 5.5 9.8 3.8 20.3-.3 2.1-.8 4.3-1.4 6.6-5.2-1.2-10.7-2-16.5-2.5-3.4-4.8-6.9-9.1-10.4-13 7.4-7.3 14.9-12.3 21-12.3 1.3 0 2.5.3 3.5.9zM81.3 74c-1.8 3.2-3.9 6.4-6.1 9.6-3.7.3-7.4.4-11.2.4-3.9 0-7.6-.1-11.2-.4-2.2-3.2-4.2-6.4-6-9.6-1.9-3.3-3.7-6.7-5.3-10 1.6-3.3 3.4-6.7 5.3-10 1.8-3.2 3.9-6.4 6.1-9.6 3.7-.3 7.4-.4 11.2-.4 3.9 0 7.6.1 11.2.4 2.2 3.2 4.2 6.4 6 9.6 1.9 3.3 3.7 6.7 5.3 10-1.7 3.3-3.4 6.6-5.3 10zm8.3-3.3c1.5 3.5 2.7 6.9 3.8 10.3-3.4.8-7 1.4-10.8 1.9 1.2-1.9 2.5-3.9 3.6-6 1.2-2.1 2.3-4.2 3.4-6.2zM64 97.8c-2.4-2.6-4.7-5.4-6.9-8.3 2.3.1 4.6.2 6.9.2 2.3 0 4.6-.1 6.9-.2-2.2 2.9-4.5 5.7-6.9 8.3zm-18.6-15c-3.8-.5-7.4-1.1-10.8-1.9 1.1-3.3 2.3-6.8 3.8-10.3 1.1 2 2.2 4.1 3.4 6.1 1.2 2.2 2.4 4.1 3.6 6.1zm-7-25.5c-1.5-3.5-2.7-6.9-3.8-10.3 3.4-.8 7-1.4 10.8-1.9-1.2 1.9-2.5 3.9-3.6 6-1.2 2.1-2.3 4.2-3.4 6.2zM64 30.2c2.4 2.6 4.7 5.4 6.9 8.3-2.3-.1-4.6-.2-6.9-.2-2.3 0-4.6.1-6.9.2 2.2-2.9 4.5-5.7 6.9-8.3zm22.2 21l-3.6-6c3.8.5 7.4 1.1 10.8 1.9-1.1 3.3-2.3 6.8-3.8 10.3-1.1-2.1-2.2-4.2-3.4-6.2zM31.7 35c-1.7-10.5-.3-17.9 3.8-20.3 1-.6 2.2-.9 3.5-.9 6 0 13.5 4.9 21 12.3-3.5 3.8-7 8.2-10.4 13-5.8.5-11.3 1.4-16.5 2.5-.6-2.3-1-4.5-1.4-6.6zM7 64c0-4.7 5.7-9.7 15.7-13.4 2-.8 4.2-1.5 6.4-2.1 1.6 5 3.6 10.3 6 15.6-2.4 5.3-4.5 10.5-6 15.5C15.3 75.6 7 69.6 7 64zm28.5 49.3c-4.1-2.4-5.5-9.8-3.8-20.3.3-2.1.8-4.3 1.4-6.6 5.2 1.2 10.7 2 16.5 2.5 3.4 4.8 6.9 9.1 10.4 13-7.4 7.3-14.9 12.3-21 12.3-1.3 0-2.5-.3-3.5-.9zM96.3 93c1.7 10.5.3 17.9-3.8 20.3-1 .6-2.2.9-3.5.9-6 0-13.5-4.9-21-12.3 3.5-3.8 7-8.2 10.4-13 5.8-.5 11.3-1.4 16.5-2.5.6 2.3 1 4.5 1.4 6.6zm9-15.6c-2 .8-4.2 1.5-6.4 2.1-1.6-5-3.6-10.3-6-15.6 2.4-5.3 4.5-10.5 6-15.5 13.8 4 22.1 10 22.1 15.6 0 4.7-5.8 9.7-15.7 13.4z"
                />
              </g>
            </svg>
            <h3 class="text-xl font-semibold text-neutral-darkest dark:text-white mb-2">React</h3>
            <pre
              class="text-left text-sm bg-neutral-darkest text-neutral-lightest p-4 rounded-lg overflow-x-auto"
            ><code>import { BlButton } from '@trendyol/baklava/react'

&lt;BlButton variant="primary"&gt;
  Click me
&lt;/BlButton&gt;</code></pre>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
