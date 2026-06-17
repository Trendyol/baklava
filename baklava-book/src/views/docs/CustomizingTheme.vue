<script setup lang="ts">
import CodeBlock from "@/components/CodeBlock.vue";
</script>

<template>
  <div class="doc-content">
    <h1 id="customizing-baklava-theme">Customizing Baklava Theme</h1>

    <p>
      Baklava Design System provides a set of well defined components with some UX decisions.
      Baklava is not a generic UI library, so it doesn't intend to provide a list of component that
      you can customize every part of it. Instead Baklava aims to provide a good and consistent UX
      for the applications uses it.
    </p>

    <p>
      But there are still many customization options in Baklava, those doesn't effect UX result of
      the components a lot. These are design tokens and a set of design token definitions are named
      as a "theme". Baklava comes with a default theme that you can import from
      <code>themes/default.css</code> file and also provides a dark theme from
      <code>themes/dark.css</code> file. You can also create your own theme or extend/override some
      part of the default theme in your applications.
    </p>

    <h2 id="creating-your-own-theme">Creating your own theme</h2>

    <p>
      You can simply copy our <code>themes/default.css</code> file to your codebase, change any of
      the CSS variables inside the file and put that CSS file on your document instead of
      <code>themes/default.css</code> file. Like:
    </p>

    <CodeBlock
      language="html"
      :code="`<link rel=&quot;stylesheet&quot; href=&quot;/styles/my-baklava-theme.css&quot; />
<script type=&quot;module&quot; src=&quot;https://cdn.jsdelivr.net/npm/@trendyol/baklava/dist/baklava.js&quot;></script>`"
    />

    <p>
      With this opportunity you can use all of the Baklava components with your own branding colors,
      own selection of Font or different sizing values.
    </p>

    <h2 id="extending-default-theme">Extending default theme</h2>

    <p>If you want to change a small set of the design tokens, you may consider to extend default theme.</p>

    <CodeBlock
      language="html"
      :code="`<link rel=&quot;stylesheet&quot; href=&quot;https://cdn.jsdelivr.net/npm/@trendyol/baklava/dist/themes/default.css&quot; />
<link rel=&quot;stylesheet&quot; href=&quot;/styles/my-baklava-theme.css&quot; />
<script type=&quot;module&quot; src=&quot;https://cdn.jsdelivr.net/npm/@trendyol/baklava/dist/baklava.js&quot;></script>`"
    />

    <p>
      With this, you can -for example- only override color palette for your app and continue to use
      typography or spacing rules from the default theme.
    </p>

    <h2 id="using-dark-theme">Using Dark Theme</h2>

    <p>Baklava provides a built-in dark theme that you can use in your application. To enable dark mode:</p>

    <CodeBlock
      language="html"
      :code="`<link rel=&quot;stylesheet&quot; href=&quot;https://cdn.jsdelivr.net/npm/@trendyol/baklava/dist/themes/default.css&quot; />
<link rel=&quot;stylesheet&quot; href=&quot;https://cdn.jsdelivr.net/npm/@trendyol/baklava/dist/themes/dark.css&quot; />

<html data-theme=&quot;dark&quot;>
  <!-- All components will use dark theme -->
  <bl-button>Click Me</bl-button>
</html>`"
    />

    <p>Or you can toggle dark mode dynamically with JavaScript:</p>

    <CodeBlock
      language="html"
      :code="`<script>
  function toggleDarkMode(isDark) {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }

  // Listen to system preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  toggleDarkMode(prefersDark);
</script>`"
    />

    <h2 id="using-themes-in-a-smaller-scope">Using themes in a smaller scope</h2>

    <p>
      Our theme files are setting CSS variables on <code>:root</code> level. That means they are
      being set on document level. But since we are only talking about classic CSS styling here, in
      some cases, it's perfectly fine to set a design token for a part of your document.
    </p>

    <CodeBlock
      language="html"
      :code="`<div class=&quot;hero&quot;>
   <bl-button>Get Started</bl-button>
</div>

<style>
.hero {
  --bl-primary-color: purple;
}
</style>`"
    />

    <p>
      In this example we are an exceptional part in our document that we want to make a primary
      button that is different then our theme colors. So we set <code>--bl-primary-color</code>
      variable on <code>.hero</code> element and make primary button inside this element in a
      different color.
    </p>

    <p>
      But you need to be careful about setting a design token in a scope, because in the example
      below, if I put a <code>bl-badge</code> component inside <code>.hero</code> element, that will
      also use same color we set instead of our theme color. But of course you can easily address
      that kind of issues, like:
    </p>

    <CodeBlock
      language="css"
      :code="`.hero bl-button {
  --bl-primary-color: purple;
}`"
    />

    <p>This opportunity gives a big power for handling exceptional use cases like:</p>

    <ul>
      <li>Using dark theme in a part of your document (like header or footer)</li>
      <li>Having more color or spacing options inside your app.</li>
    </ul>

    <p>For example, you can use dark theme only in header:</p>

    <CodeBlock
      language="html"
      :code="`<link rel=&quot;stylesheet&quot; href=&quot;path/to/themes/default.css&quot; />
<link rel=&quot;stylesheet&quot; href=&quot;path/to/themes/dark.css&quot; />

<header class=&quot;dark-theme&quot;>
  <!-- Dark mode components -->
  <bl-button>Menu</bl-button>
</header>

<main>
  <!-- Light mode components -->
  <bl-button>Content</bl-button>
</main>`"
    />

    <h2 id="changing-default-styles-of-components">Changing default styles of components</h2>

    <p>
      In addition to setting design tokens, some of our components has their own CSS custom
      properties to make customisation on their style. And if you want you can use those custom
      properties in your theme definition to make all of those components in a desired style
      throughout your app.
    </p>

    <p>
      For example, our badge component has <code>--bl-badge-color</code> property and by default it
      uses <code>--bl-color-primary</code>. If you want you can use a different default color for
      all of the badges on your app by just adding:
    </p>

    <CodeBlock
      language="css"
      :code="`:root {
  --bl-badge-color: purple;
}`"
    />

    <p>Using design tokens here is of course also possible:</p>

    <CodeBlock
      language="css"
      :code="`:root {
  --bl-badge-color: var(--bl-color-success);
}`"
    />

    <h2 id="customizing-typography-styles">Customizing Typography Styles</h2>

    <p>
      Baklava Design System provides many design tokens for typography. You can customize font
      styles in different levels according to your needs. For example:
    </p>

    <CodeBlock
      language="css"
      :code="`.my-header {
  font: var(--bl-font-display-light);
}`"
    />

    <p>
      In the example above we are using "Display Light" font for an element. In your own theme, you
      can override this font definition like below:
    </p>

    <CodeBlock
      language="css"
      :code="`:root {
  --bl-font-display-light: 400 40px/48px Helvetica;
}`"
    />

    <p>
      On the other hand, this variable uses multiple other variables behind the scene. Let's check
      how it's defined in our default theme:
    </p>

    <CodeBlock
      language="css"
      :code="`:root {
  --bl-font-display-font-size: var(--bl-font-size-5xl);
  --bl-font-display-line-height: calc(var(--bl-font-display-font-size) + var(--bl-size-2xs));
  --bl-font-display-size: var(--bl-font-display-font-size)/var(--bl-font-display-line-height);
  --bl-font-display: var(--bl-font-display-size) var(--bl-font-family);
  --bl-font-display-light: var(--bl-font-weight-light) var(--bl-font-display);
}`"
    />

    <p>
      As you can see <code>--bl-font-display-light</code> is extending <code>--bl-font-display</code>
      by just setting font-weight with another variable we provide in design tokens named
      <code>--bl-font-weight-light</code>. It's also possible to override <code>--bl-font-display</code>
      to change font and size definitions of all of the "display" fonts without touching their font-weights:
    </p>

    <CodeBlock
      language="css"
      :code="`:root {
  --bl-font-display: 40px/48px Helvetica;
}`"
    />

    <p>
      Same applies for other variables. Let's check how can we set custom line-heights.
    </p>

    <p>
      In Baklava typography line-height values are "font size + a value from the sizing list". For
      display font, <code>--bl-font-display-font-size</code> is set by <code>--bl-font-size-5xl</code>
      and this value is summed with <code>--bl-size-2xs</code> while setting
      <code>--bl-font-display-line-height</code>. You are able customize this logic in any level you want.
    </p>

    <CodeBlock
      language="css"
      :code="`:root {
  --bl-font-display-line-height: 68px;
}`"
    />

    <p>Or an element level like:</p>

    <CodeBlock
      language="css"
      :code="`.my-header {
  font: var(--bl-font-display-light);
  --bl-font-display-line-height: 68px;
}`"
    />

    <p>Or you can set just font size:</p>

    <CodeBlock
      language="css"
      :code="`.my-header {
  font: var(--bl-font-display-light);
  --bl-font-display-font-size: 60px;
}`"
    />

    <p>
      In this case line-height of my-header will be set as 60px + value of <code>--bl-size-2xs</code>.
      Line-height is still calculated automatically.
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
