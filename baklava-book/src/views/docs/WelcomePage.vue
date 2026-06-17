<script setup lang="ts">
import CodeBlock from "@/components/CodeBlock.vue";
</script>

<template>
  <div class="doc-content">
    <h1 id="baklava-design-system">Baklava Design System</h1>

    <p>
      Baklava is a design system provided by
      <a href="https://github.com/trendyol" target="_blank" rel="noopener">Trendyol</a>
      to create a consistent UI/UX for app users.
    </p>

    <p>
      Web implementation of the design system is created as native web components so it can be used
      within every type of web frameworks including Vue, React or Angular. Our target is providing a
      UI library that has neatly designed and developed for providing best possible user experience
      for the users of applications that uses Baklava DS.
    </p>

    <h2 id="how-to-use">How to use</h2>

    <p>
      Preferred way of using Baklava is using it via CDN. Just import library JS and CSS files to
      your main document like below:
    </p>

    <CodeBlock
      language="html"
      :code="`<link rel=&quot;stylesheet&quot; href=&quot;https://cdn.jsdelivr.net/npm/@trendyol/baklava/dist/themes/default.css&quot; />
<script type=&quot;module&quot; src=&quot;https://cdn.jsdelivr.net/npm/@trendyol/baklava/dist/baklava.js&quot;></script>`"
    />

    <p>We highly recommend using the manual version of the Baklava library:</p>

    <CodeBlock
      language="html"
      :code="`<link rel=&quot;stylesheet&quot; href=&quot;https://cdn.jsdelivr.net/npm/@trendyol/baklava@x.x.x/dist/themes/default.css&quot; />
<script type=&quot;module&quot; src=&quot;https://cdn.jsdelivr.net/npm/@trendyol/baklava@x.x.x/dist/baklava.js&quot;></script>`"
    />

    <p>
      This way library will be served from a very high performant CDN and all of the Baklava web
      components will be ready to use inside your web project.
    </p>

    <CodeBlock language="html" code="<bl-button>Baklava works!</bl-button>" />

    <h2 id="how-to-contribute">How to contribute</h2>

    <p>
      Baklava Design System is always open for direct contributions. Contributions can be in the
      form of design suggestions, documentation improvements, new component suggestions, code
      improvements, adding new features or fixing problems. For more information please check our
      <a
        href="https://github.com/Trendyol/baklava/blob/next/CONTRIBUTING.md"
        target="_blank"
        rel="noopener"
      >
        Contribution Guideline document</a
      >.
    </p>

    <h2 id="useful-links">Useful Links</h2>

    <ul>
      <li>
        <a href="https://baklava.design/" target="_blank" rel="noopener"
          >Storybook Documentation</a
        >
      </li>
      <li>
        <a
          href="https://www.figma.com/file/RrcLH0mWpIUy4vwuTlDeKN/Baklava-Design-Guide"
          target="_blank"
          rel="noopener"
          >Figma Design Document</a
        >
      </li>
      <li>
        <a href="https://github.com/orgs/Trendyol/projects/4" target="_blank" rel="noopener"
          >Project Board</a
        >
      </li>
      <li>
        <a href="https://github.com/Trendyol/baklava/discussions" target="_blank" rel="noopener"
          >Discussion Board</a
        >
      </li>
      <li>
        <a href="https://github.com/Trendyol/baklava-react-native" target="_blank" rel="noopener"
          >Mobile (React-Native) Implementation</a
        >
      </li>
      <li>
        <a href="https://github.com/Trendyol/baklava-icons" target="_blank" rel="noopener"
          >Icons Library</a
        >
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
