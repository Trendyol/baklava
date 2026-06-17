<script setup lang="ts">
import CodeBlock from "@/components/CodeBlock.vue";
</script>

<template>
  <div class="doc-content">
    <h1 id="requirements">Requirements</h1>

    <p>
      Baklava is a
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/Web_Components"
        target="_blank"
        rel="noopener"
        >web component</a
      >
      based design system. We are using
      <a href="https://lit.dev" target="_blank" rel="noopener">Lit</a> to simplify the process of
      creating web components and we create an
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules"
        target="_blank"
        rel="noopener"
        >ECMAScript module</a
      >
      (ESM).
    </p>

    <p>
      It is built on top of web standards and it should work without any issues in all modern
      browsers, but it's important to note that for older versions of the browsers, the support for
      web components may be limited or non-existent, this is where polyfills can be used to fill the
      gaps.
    </p>

    <p>Therefore, it relies on a few key technologies:</p>

    <ul>
      <li>
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements"
          target="_blank"
          rel="noopener"
          ><strong>Custom Elements API</strong></a
        >: This API allows developers to create custom elements and define their behavior.
      </li>
      <li>
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM"
          target="_blank"
          rel="noopener"
          ><strong>Shadow DOM</strong></a
        >: This API allows developers to create a "shadow" DOM tree for a custom element, which is
        separate from the main DOM. This allows the component to have its own style and layout
        without affecting the rest of the page.
      </li>
      <li>
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots"
          target="_blank"
          rel="noopener"
          ><strong>HTML Templates</strong></a
        >: This feature allows developers to define a template for a component that can be
        instantiated and used multiple times.
      </li>
      <li>
        <a
          href="https://dev.to/iggredible/what-the-heck-are-cjs-amd-umd-and-esm-ikm"
          target="_blank"
          rel="noopener"
          ><strong>Javascript Runtime</strong></a
        >: It requires a JavaScript runtime that supports ES6 or later.
      </li>
    </ul>

    <p>
      It's also important to consider that as web components are becoming more and more
      standardized. The need for polyfills will be reduced. However, if you are working with a large
      application that needs to support older browsers, you may need to use polyfills to ensure that
      Baklava work correctly.
    </p>

    <h2 id="browser-support">Browser Support</h2>

    <p>In Baklava -written with Lit-, browser support is grouped into two main categories:</p>

    <ul>
      <li>
        <a
          href="https://lit.dev/docs/tools/requirements/#building-for-modern-browsers"
          target="_blank"
          rel="noopener"
          >Modern Browsers</a
        >
      </li>
      <li>
        <a
          href="https://lit.dev/docs/tools/requirements/#building-for-legacy-browsers"
          target="_blank"
          rel="noopener"
          >Legacy Browsers</a
        >
      </li>
    </ul>

    <p>
      According to <strong>caniuse.com</strong>, Baklava's browser support is more than
      <strong>95%</strong>. (<a
        href="https://caniuse.com/?search=web%20components"
        target="_blank"
        rel="noopener"
        >web components</a
      >,
      <a href="https://caniuse.com/?search=esm" target="_blank" rel="noopener">esm</a>). The
      remaining 5% can be supported by compiling javascript in build time and adding polyfills.
    </p>

    <h3 id="modern-browser-support">Modern Browser Support</h3>

    <table>
      <thead>
        <tr>
          <th>Browser</th>
          <th>Supports ES2019 & web components</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Chrome</td>
          <td>&gt;= 73</td>
        </tr>
        <tr>
          <td>Firefox</td>
          <td>&gt;= 12.1</td>
        </tr>
        <tr>
          <td>Safari</td>
          <td>&gt;= 63</td>
        </tr>
        <tr>
          <td>Edge</td>
          <td>&gt;= 79</td>
        </tr>
      </tbody>
    </table>

    <h3 id="legacy-browser-support">Legacy Browser Support</h3>

    <p>Supporting older browsers requires some steps described by the Lit documentation:</p>

    <ul>
      <li>Compiling modern JavaScript syntax to ES5.</li>
      <li>Transforming ES modules to another module system.</li>
      <li>Loading polyfills.</li>
    </ul>

    <p>
      For compiling and transforming, you can install Baklava as an npm package and transpile it
      during the build time by using Webpack and Babel.
      <a
        href="https://medium.com/@sivaraj-v/basic-webpack-4-and-es5-to-es6-transpiler-using-babel-dc66e72c86c6"
        target="_blank"
        rel="noopener"
        >Here</a
      >
      you can find an example about this.
    </p>

    <table>
      <thead>
        <tr>
          <th>Browser</th>
          <th>Compile JS</th>
          <th>Compile JS & load polyfills</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Chrome</td>
          <td>67-79</td>
          <td>&lt;67</td>
        </tr>
        <tr>
          <td>Firefox</td>
          <td>10-12</td>
          <td>&lt;10</td>
        </tr>
        <tr>
          <td>Safari</td>
          <td>63-71</td>
          <td>&lt;63</td>
        </tr>
        <tr>
          <td>Edge</td>
          <td>79</td>
          <td>-</td>
        </tr>
        <tr>
          <td>Edge Classic</td>
          <td>-</td>
          <td>&lt;=18</td>
        </tr>
        <tr>
          <td>Internet Explorer</td>
          <td>-</td>
          <td>11</td>
        </tr>
      </tbody>
    </table>

    <h2 id="polyfills">Polyfills</h2>

    <p>
      Polyfills are a piece of code that allows web developers to use features that are not yet
      supported by some browsers. There is a
      <a href="https://github.com/webcomponents/polyfills" target="_blank" rel="noopener"
        >polyfills package</a
      >
      created and maintained by
      <a href="https://webcomponents.org" target="_blank" rel="noopener"
        >Web Components Organization</a
      >
      where you can find almost all necessary polyfills.
    </p>

    <p>Some common examples of polyfills for web components are:</p>

    <ul>
      <li>
        <strong>Custom Elements API</strong>: The
        <a
          href="https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs#custom-elements-es5-adapterjs"
          target="_blank"
          rel="noopener"
          >custom-elements-es5-adapter.js</a
        >
        polyfill can be used to support custom elements in older browsers.
      </li>
      <li>
        <strong>Shadow DOM</strong>: The
        <a
          href="https://github.com/webcomponents/polyfills/tree/master/packages/shadydom"
          target="_blank"
          rel="noopener"
          >shadydom</a
        >
        and
        <a
          href="https://github.com/webcomponents/polyfills/tree/master/packages/shadycss"
          target="_blank"
          rel="noopener"
          >shadycss</a
        >
        polyfills can be used to support the Shadow DOM in older browsers.
      </li>
      <li>
        <strong>HTML Templates</strong>: The
        <a
          href="https://github.com/webcomponents/polyfills/tree/master/packages/template"
          target="_blank"
          rel="noopener"
          >template.js</a
        >
        polyfill can be used to support the template element in older browsers.
      </li>
      <li>
        <strong>JS Runtime Polyfill</strong>: You can use
        <a href="https://github.com/zloirock/core-js" target="_blank" rel="noopener">core-js</a>.
      </li>
      <li>
        <strong>SystemJS</strong>: This is a dynamic module loader that can be used to load ES
        modules in older browsers.
      </li>
      <li>
        <strong>Dynamic Imports</strong>: One example is
        <a
          href="https://www.npmjs.com/package/dynamic-import-polyfill"
          target="_blank"
          rel="noopener"
          >dynamic-import-polyfill</a
        >.
      </li>
    </ul>

    <CodeBlock
      language="js"
      :code="`// import the webcomponents polyfills
import '@webcomponents/webcomponentsjs/webcomponents-bundle.js';
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js';`"
    />

    <h3 id="polyfills-in-baklava-core">Polyfills in Baklava Core</h3>

    <ul>
      <li>
        <a
          href="https://www.npmjs.com/package/element-internals-polyfill"
          target="_blank"
          rel="noopener"
          >element-internals-polyfill</a
        >: We add this polyfill to support
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals"
          target="_blank"
          rel="noopener"
          >element internals features</a
        >
        (Form Control) in Safari browsers.
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
:global(html.dark) .doc-content h2,
:global(html.dark) .doc-content h3 {
  color: var(--bl-color-neutral-full);
}

:global(html.dark) .doc-content p,
:global(html.dark) .doc-content li,
:global(html.dark) .doc-content td {
  color: var(--bl-color-neutral-light);
}

:global(html.dark) .doc-content code {
  background-color: var(--bl-color-neutral-darker);
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
