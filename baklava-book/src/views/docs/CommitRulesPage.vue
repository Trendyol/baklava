<script setup lang="ts">
import CodeBlock from "@/components/CodeBlock.vue";
</script>

<template>
  <div class="doc-content">
    <h1 id="baklava-commit-rules">Baklava Commit Rules</h1>

    <p>
      While developing Baklava we use
      <a
        href="https://www.conventionalcommits.org/en/v1.0.0/"
        target="_blank"
        rel="noopener"
        >conventional commit messages</a
      >.
    </p>

    <h2 id="why-conventional-commits">Why Conventional Commits?</h2>

    <p>
      Because we automatically generate library versions and release notes from commit messages,
      it's critical to write commit messages properly.
    </p>

    <h2 id="commit-format">Commit Format</h2>

    <CodeBlock language="text" code="<type>(<scope>): <subject>" />

    <h3 id="types">Types</h3>

    <ul>
      <li><code>feat</code>: A new feature</li>
      <li><code>fix</code>: A bug fix</li>
      <li><code>docs</code>: Documentation changes</li>
      <li><code>style</code>: Code style changes (formatting, etc.)</li>
      <li><code>refactor</code>: Code refactoring</li>
      <li><code>test</code>: Adding or updating tests</li>
      <li><code>chore</code>: Maintenance tasks</li>
    </ul>
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

.doc-content h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--bl-color-neutral-darkest);
  margin-top: 2rem;
  margin-bottom: 0.75rem;
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

.doc-content code {
  background-color: var(--bl-color-neutral-lightest);
  color: var(--bl-color-primary);
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-family: "Fira Code", "Monaco", "Consolas", monospace;
}

:global(html.dark) .doc-content h1,
:global(html.dark) .doc-content h2,
:global(html.dark) .doc-content h3 {
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
