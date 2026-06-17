<script setup lang="ts">
import CodeBlock from "@/components/CodeBlock.vue";
</script>

<template>
  <div class="doc-content">
    <h1 id="how-to-customize-a-components-style">How to customize a component's style?</h1>

    <blockquote>
      You can look at our
      <a
        href="https://github.com/Trendyol/baklava/discussions/164"
        target="_blank"
        rel="noopener"
        >discussion</a
      >
      to know more about our decision process.
    </blockquote>

    <p>
      A design system is a set of design tokens and principles that aims to create consistency in
      terms of both experience and development. Also, it represents branding in terms of design.
      Every component is written with the design language that Baklava provides. It has
      intentionally limited flexibility. To prevent the loss of standards and experience, we don't
      want and let users change directly component's style. However, we allow users to create their
      theme and use it for Baklava.
    </p>

    <p>
      In Baklava, we create <strong>web components</strong>. Our components work in a Shadow DOM.
      Therefore, components are isolated from the page DOM and their styles are scoped to their DOM.
      Thanks to this, style rules don't leak out and we can decide whether this rule can change or
      not by the user while developing the component. To create flexibility in components, we use
      CSS custom properties. If we need to allow users to customize styling options, we define them
      as CSS custom variables.
    </p>

    <h2 id="for-contributors">For Contributors</h2>

    <p>
      All <strong>private</strong> CSS variables should be defined under a wrapping element (For
      example: <code>.badge</code> for the badge component) <strong>inside</strong> the component.
    </p>

    <p>
      By doing this, we apply a <strong>safer</strong> approach. We prevented developers to style
      components <strong>unintentionally</strong>. Thanks to this, we don't need to specify
      variables with prefixes in every component. Therefore, should be no prefixes in local
      variables. Because those are only used inside a component.
    </p>

    <p>
      However, if we want to add some flexibility, customizability, we define variables with
      components prefix like <code>--bl-badge-bg-color</code>.
    </p>

    <h3 id="example">Example</h3>

    <p>Let's take a badge component as an example:</p>

    <CodeBlock
      language="css"
      :code="`/* bl-badge.css */
:host {
  display: inline-block;
  max-width: 100%;
}

.badge {
  /* Variable definition start */
  --bg-color: var(--bl-badge-bg-color, var(--bl-color-primary-contrast));
  --color: var(--bl-badge-color, var(--bl-color-primary));
  --font: var(--bl-font-title-4-medium);
  --padding-vertical: var(--bl-size-3xs);
  --padding-horizontal: var(--bl-size-3xs);
  --margin-icon: var(--bl-size-3xs);
  --icon-size: var(--bl-size-s);
  --height: var(--bl-size-xl);
  /* Variable definition stop */

  /* Using variables start */
  gap: var(--margin-icon);
  border-radius: var(--bl-size-4xs);
  padding: var(--padding-vertical) var(--padding-horizontal);
  background-color: var(--bg-color);
  color: var(--color, white);
  font: var(--font);
  height: var(--height);
  /* Using variables end */
}`"
    />

    <p>
      By the <strong>nature</strong> of this component, we let users to change background color and
      color. To accomplish this, we define a default variables <code>--bl-badge-bg-color</code> and
      <code>--bl-badge-color</code> and fill it with our default definitions like this:
    </p>

    <CodeBlock
      language="css"
      :code="`--bg-color: var(--bl-badge-bg-color, var(--bl-color-primary-contrast));
--color: var(--bl-badge-color, var(--bl-color-primary));`"
    />

    <p>
      Therefore, if users want to change its background color and/or color, they should change
      <code>--bl-badge-bg-color</code> and/or <code>--bl-badge-color</code>.
    </p>

    <CodeBlock
      language="css"
      :code="`.wrapper {
  --bl-badge-bg-color: red;
  --bl-badge-color: white;
}`"
    />

    <CodeBlock
      language="html"
      :code="`<div class=&quot;wrapper&quot;>
  <bl-badge>badge component</bl-badge>
</div>`"
    />

    <p>
      We <strong>must</strong> define public variables in the component's CSS Custom Properties
      documentation so users can discover and use them for customization.
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

.doc-content blockquote {
  border-left: 4px solid var(--bl-color-primary);
  padding-left: 1rem;
  margin: 1rem 0;
  color: var(--bl-color-neutral-dark);
  font-style: italic;
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

:global(html.dark) .doc-content p {
  color: var(--bl-color-neutral-light);
}

:global(html.dark) .doc-content blockquote {
  color: var(--bl-color-neutral-light);
}

:global(html.dark) .doc-content code {
  background-color: var(--bl-color-neutral-darker);
}
</style>
