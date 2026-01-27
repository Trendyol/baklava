<script setup lang="ts">
import CodeBlock from "@/components/CodeBlock.vue";
</script>

<template>
  <div class="doc-content">
    <h1 id="localization">Localization</h1>

    <p>
      Baklava comes with built-in support for localization. You can check the full list of supported
      languages
      <a
        href="https://github.com/Trendyol/baklava/tree/next/translations"
        target="_blank"
        rel="noopener"
        >here</a
      >. It essentially examines the <code>lang</code> attribute of the <code>html</code> element
      and configures the locale accordingly. In the absence of a specified <code>lang</code>
      attribute, it defaults to English.
    </p>

    <p>To initialize localization, insert the following script at the head of your HTML file:</p>

    <CodeBlock
      language="html"
      :code="`<html lang=&quot;tr&quot;>
  <head>
    <script type=&quot;module&quot; src=&quot;https://cdn.jsdelivr.net/npm/@trendyol/baklava/dist/localization.js&quot;></script>
  </head>
  <body>
    ...
  </body>
</html>`"
    />

    <p>
      Utilizing a mutation observer, modifications to the <code>lang</code> attribute will
      automatically trigger updates across all localized components, seamlessly adapting them to the
      new language setting.
    </p>

    <h2 id="submitting-new-translations-or-improvements">
      Submitting New Translations or Improvements
    </h2>

    <p>
      If you wish to contribute new translations or enhancements to existing ones, kindly submit a
      pull request on GitHub. The translations can be found in the
      <a
        href="https://github.com/Trendyol/baklava/tree/next/translations"
        target="_blank"
        rel="noopener"
        >translations</a
      >
      folder.
    </p>

    <p>To add a new translation, follow these steps:</p>

    <ol>
      <li>Add the language short code to <code>lit-localize.json</code>.</li>
      <li>
        Execute <code>npm run localize:extract</code> to extract the new language file.
      </li>
      <li>Update the newly created file in the translations folder.</li>
      <li>
        Execute <code>npm run localize:build</code> to generate the new language file.
      </li>
    </ol>

    <p>Submit a new pull request with the aforementioned changes.</p>

    <h2 id="adding-new-localized-texts">Adding New Localized Texts</h2>

    <p>To include localized texts, adhere to the following guidelines:</p>

    <ul>
      <li>
        A component should have <code>@localized()</code> added to its decorator.
      </li>
      <li>
        The <code>msg</code> function should possess a description in the format:
        <em>"bl-component: description of the message"</em>.
      </li>
      <li>The <code>msg</code> function should feature a default value in English.</li>
      <li>
        No property should have a default value in English; instead, it should be defined elsewhere
        in the code, preferably in the render section.
      </li>
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

.doc-content ul,
.doc-content ol {
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.doc-content ul {
  list-style-type: disc;
}

.doc-content ol {
  list-style-type: decimal;
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
