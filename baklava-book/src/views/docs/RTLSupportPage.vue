<script setup lang="ts">
import CodeBlock from "@/components/CodeBlock.vue";
</script>

<template>
  <div class="doc-content">
    <h1 id="right-to-left-rtl">Right-to-Left (RTL)</h1>

    <p>
      Baklava components support Right-to-Left (RTL) text direction, which is essential for
      languages that are written from right to left, such as Arabic, Hebrew, and Persian. To enable
      RTL support in your application using Baklava components, you need to set the
      <code>dir</code> attribute on the <code>&lt;html&gt;</code> tag in your project.
    </p>

    <h2 id="enabling-right-to-left-rtl">Enabling Right-to-Left (RTL)</h2>

    <p>
      To enable Right-to-Left (RTL), add the <code>dir="rtl"</code> attribute to your HTML tag.
      Here's how you can do it:
    </p>

    <ol>
      <li>In your HTML file, locate the opening <code>&lt;html&gt;</code> tag.</li>
      <li>Add the <code>dir="rtl"</code> attribute to the tag.</li>
    </ol>

    <CodeBlock
      language="html"
      :code="`<!DOCTYPE html>
<html lang=&quot;ar&quot; dir=&quot;rtl&quot;>
  <head>
    <meta charset=&quot;UTF-8&quot;>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;>
    <title>RTL Example</title>
  </head>
  <body>
    <!-- Your content here -->
  </body>
</html>`"
    />

    <h2 id="guidelines-for-contributors">Guidelines for Contributors</h2>

    <p>
      When developing or modifying Baklava components, it's crucial to ensure proper RTL support.
      This includes being aware of RTL text and its implications on layout and styling. For a
      comprehensive guide on building RTL-aware web applications and websites, refer to
      <a
        href="https://hacks.mozilla.org/2015/09/building-rtl-aware-web-apps-and-websites-part-1/"
        target="_blank"
        rel="noopener"
        >this article</a
      >.
    </p>

    <h3 id="use-the-bl-text-x-direction-css-custom-property">
      1. Use the --bl-text-x-direction CSS custom property
    </h3>

    <p>
      This property helps determine whether the element is in RTL or LTR. You can use it in your CSS
      like this:
    </p>

    <CodeBlock
      language="css"
      :code="`.my-component {
  transform: scaleX(var(--bl-text-x-direction));
  box-shadow: calc(8px * var(--bl-text-x-direction)) 0 16px 0 rgb(39 49 66 / 10%);
}`"
    />

    <h3 id="utilize-css-logical-properties">2. Utilize CSS logical properties</h3>

    <p>
      Instead of using directional properties like <code>left</code>, <code>right</code>,
      <code>margin-left</code>, etc., use their logical counterparts. This ensures that your
      components adapt correctly to both LTR and RTL layouts. Here are some examples:
    </p>

    <ul>
      <li>
        Use <code>inline-start</code> and <code>inline-end</code> instead of <code>left</code> and
        <code>right</code>
      </li>
      <li>
        Use <code>block-start</code> and <code>block-end</code> instead of <code>top</code> and
        <code>bottom</code>
      </li>
      <li>
        Use <code>margin-inline-start</code> and <code>margin-inline-end</code> instead of
        <code>margin-left</code> and <code>margin-right</code>
      </li>
      <li>
        Use <code>padding-inline-start</code> and <code>padding-inline-end</code> instead of
        <code>padding-left</code> and <code>padding-right</code>
      </li>
      <li>
        Use <code>border-inline-start</code> and <code>border-inline-end</code> instead of
        <code>border-left</code> and <code>border-right</code>
      </li>
    </ul>

    <CodeBlock
      language="css"
      :code="`.my-component {
  margin-inline-start: 1rem;
  padding-inline-end: 0.5rem;
  border-inline-start: 1px solid #ccc;
}`"
    />

    <p>
      For more information on CSS logical properties and values, please refer to the
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values"
        target="_blank"
        rel="noopener"
        >MDN Web Docs</a
      >.
    </p>

    <h3 id="use-inset-for-positioning">3. Use inset for positioning</h3>

    <p>
      When using absolute or relative positioning, use the <code>inset</code> property with logical
      values:
    </p>

    <CodeBlock
      language="css"
      :code="`.positioned-element {
  position: absolute;
  inset-inline-start: 0;
  inset-block-start: 0;
}`"
    />

    <p>
      By following these guidelines, you'll ensure that Baklava components work seamlessly in both
      LTR and RTL layouts, providing a consistent user experience across different language
      settings.
    </p>
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
