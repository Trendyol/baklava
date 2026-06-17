<script setup lang="ts">
import CodeBlock from "@/components/CodeBlock.vue";
</script>

<template>
  <div class="doc-content">
    <h1 id="baklava-testing">Baklava Testing</h1>

    <p>This guide will help contributors understand how to test Baklava.</p>

    <h2 id="overview">Overview</h2>

    <ul>
      <li>Our coverage percentage for tests is <strong>100%</strong></li>
      <li>
        We use
        <a
          href="https://www.npmjs.com/package/@open-wc/testing"
          target="_blank"
          rel="noopener"
          >@open-wc/testing</a
        >
        for writing tests
      </li>
      <li>
        We use
        <a href="https://playwright.dev/" target="_blank" rel="noopener">Playwright</a> with
        <a href="https://modern-web.dev/docs/test-runner/overview/" target="_blank" rel="noopener"
          >@web/test-runner</a
        >
        to run tests
      </li>
    </ul>

    <h2 id="running-tests">Running Tests</h2>

    <CodeBlock language="bash" code="npm run test" />
  </div>
</template>

<style scoped>
.doc-content {
  max-width: 100%;
}

.doc-content h1 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--bl-color-neutral-darkest);
  margin-bottom: 1.5rem;
}

.doc-content h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--bl-color-neutral-darkest);
  margin-top: 2.5rem;
  margin-bottom: 1rem;
}

.doc-content p {
  color: var(--bl-color-neutral-darker);
  margin-bottom: 1rem;
  line-height: 1.7;
}

.doc-content a {
  color: var(--bl-color-primary);
}

.doc-content a:hover {
  text-decoration: underline;
}

.doc-content ul {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.doc-content li {
  color: var(--bl-color-neutral-darker);
  margin-bottom: 0.5rem;
}

:global(html.dark) .doc-content h1,
:global(html.dark) .doc-content h2 {
  color: var(--bl-color-neutral-full);
}

:global(html.dark) .doc-content p,
:global(html.dark) .doc-content li {
  color: var(--bl-color-neutral-light);
}
</style>
