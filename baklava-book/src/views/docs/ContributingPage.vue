<script setup lang="ts">
import CodeBlock from "@/components/CodeBlock.vue";
</script>

<template>
  <div class="doc-content">
    <h1 id="contributing-to-baklava">Contributing to Baklava</h1>

    <p>
      Thank you for your interest in contributing to Baklava! We welcome contributions from the
      community.
    </p>

    <h2 id="getting-started">Getting Started</h2>

    <ol>
      <li><strong>Fork the repository</strong> on GitHub</li>
      <li><strong>Clone your fork</strong> locally</li>
      <li><strong>Install dependencies</strong>: <code>npm install</code></li>
      <li><strong>Create a branch</strong> for your changes</li>
    </ol>

    <h2 id="development-workflow">Development Workflow</h2>

    <ol>
      <li>Make your changes in a feature branch</li>
      <li>Write tests for your changes</li>
      <li>Ensure all tests pass: <code>npm run test</code></li>
      <li>Ensure linting passes: <code>npm run lint</code></li>
      <li>Commit your changes using conventional commits</li>
      <li>Push to your fork and open a Pull Request</li>
    </ol>
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

.doc-content ol {
  list-style-type: decimal;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.doc-content li {
  color: var(--bl-color-neutral-darker);
  margin-bottom: 0.5rem;
}

.doc-content code {
  background-color: var(--bl-color-neutral-lightest);
  color: var(--bl-color-primary);
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-family: "Fira Code", "Monaco", "Consolas", monospace;
}

:global(html.dark) .doc-content h1,
:global(html.dark) .doc-content h2 {
  color: var(--bl-color-neutral-full);
}

:global(html.dark) .doc-content p,
:global(html.dark) .doc-content li {
  color: var(--bl-color-neutral-light);
}

:global(html.dark) .doc-content code {
  background-color: var(--bl-color-neutral-darker);
}
</style>
