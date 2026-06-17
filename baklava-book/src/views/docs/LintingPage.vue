<script setup lang="ts">
import CodeBlock from "@/components/CodeBlock.vue";
</script>

<template>
  <div class="doc-content">
    <h1 id="linters-formatters">Linters & Formatters</h1>

    <p>To keep a consistent codebase, we use several linters in Baklava.</p>

    <h2 id="linters-used">Linters Used</h2>

    <table>
      <thead>
        <tr>
          <th>Linter</th>
          <th>Purpose</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <a href="https://eslint.org" target="_blank" rel="noopener">ESLint</a>
          </td>
          <td>JavaScript/TypeScript linting</td>
        </tr>
        <tr>
          <td>
            <a href="https://stylelint.io" target="_blank" rel="noopener">Stylelint</a>
          </td>
          <td>CSS linting</td>
        </tr>
        <tr>
          <td>
            <a href="https://commitlint.js.org" target="_blank" rel="noopener">Commitlint</a>
          </td>
          <td>Commit message linting</td>
        </tr>
        <tr>
          <td>
            <a href="https://prettier.io" target="_blank" rel="noopener">Prettier</a>
          </td>
          <td>Code formatting</td>
        </tr>
      </tbody>
    </table>

    <h2 id="running-linters-manually">Running Linters Manually</h2>

    <CodeBlock
      language="bash"
      :code="`# Run all linters
npm run lint

# Fix formatting issues automatically
npm run format`"
    />
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

.doc-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
}

.doc-content th,
.doc-content td {
  border: 1px solid var(--bl-color-neutral-lightest);
  padding: 0.75rem;
  text-align: left;
}

.doc-content th {
  background-color: var(--bl-color-neutral-lightest);
  font-weight: 600;
  color: var(--bl-color-neutral-darkest);
}

.doc-content td {
  color: var(--bl-color-neutral-darker);
}

:global(html.dark) .doc-content h1,
:global(html.dark) .doc-content h2 {
  color: var(--bl-color-neutral-full);
}

:global(html.dark) .doc-content p,
:global(html.dark) .doc-content td {
  color: var(--bl-color-neutral-light);
}

:global(html.dark) .doc-content th {
  background-color: var(--bl-color-neutral-darker);
  color: var(--bl-color-neutral-full);
}

:global(html.dark) .doc-content th,
:global(html.dark) .doc-content td {
  border-color: var(--bl-color-neutral-darker);
}
</style>
