<script setup lang="ts">
import CodeBlock from "@/components/CodeBlock.vue";
</script>

<template>
  <div class="doc-content">
    <h1 id="using-baklava-in-vue">Using Baklava in Vue</h1>

    <p>
      Vue is mostly
      <a href="https://custom-elements-everywhere.com/#vue" target="_blank" rel="noopener"
        >compatible</a
      >
      with custom elements.
    </p>

    <h2 id="installation">Installation</h2>

    <p>
      To add Baklava in your app, you can either import it via CDN or npm package. But one way or
      another, you should tell Vue to ignore custom elements.
    </p>

    <p>
      To make the rule more generic, easiest way is ignoring the elements start with
      <code>bl-</code> tag. Thanks to that, every baklava element will be ignored by the Vue.
    </p>

    <h3 id="via-cdn">Via CDN</h3>

    <p>
      To be able to use Baklava via CDN, you should add our default.css and baklava.js at head tag
      in your index.html file.
    </p>

    <CodeBlock
      language="html"
      :code="`<link rel=&quot;stylesheet&quot; href=&quot;https://cdn.jsdelivr.net/npm/@trendyol/baklava/dist/themes/default.css&quot;/>
<script type=&quot;module&quot; src=&quot;https://cdn.jsdelivr.net/npm/@trendyol/baklava/dist/baklava.js&quot;></script>`"
    />

    <h3 id="via-npm">Via NPM</h3>

    <p>
      To be able to use Baklava via npm, run <code>npm install @trendyol/baklava</code> then:
    </p>

    <CodeBlock
      language="js"
      :code="`import &quot;@trendyol/baklava/dist/themes/default.css&quot;;
import { setIconPath } from '@trendyol/baklava'
setIconPath('https://cdn.jsdelivr.net/npm/@trendyol/baklava-icons@latest/icons')`"
    />

    <h3 id="vue2">Vue2</h3>

    <p>
      If you use Vue2, you should add <code>Vue.config.ignoredElements = [/^bl-/]</code> in your
      main.js.
    </p>

    <h3 id="vue3">Vue3</h3>

    <p>If you use Vue3, you can add this in your main.js before Vue mounts the app:</p>

    <CodeBlock
      language="js"
      code="app.config.compilerOptions.isCustomElement = tag => tag.startsWith('bl-');"
    />

    <p>Also, you can add ignore rule as compiler options to your webpack or vite.</p>

    <CodeBlock language="js" code="isCustomElement: tag => tag.startsWith('bl-')" />

    <p><strong>For Vite:</strong></p>

    <CodeBlock
      language="js"
      :code="`{
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.startsWith('bl-')
        }
      }
    })
  ]
}`"
    />

    <p><strong>For Webpack with vue-loader:</strong></p>

    <CodeBlock
      language="js"
      :code="`{
  test: /\\.vue$/,
  use: {
    loader: &quot;vue-loader&quot;,
    options: {
      compilerOptions: {
        isCustomElement: tag => tag.startsWith('bl-')
      }
    }
  }
}`"
    />

    <h3 id="typescript">TypeScript</h3>

    <p>
      Baklava offers TypeScript support for Vue versions 2.7 and higher. To enable this support, you
      should create a file named <code>components.d.ts</code> within the "src" directory and include
      the following line:
    </p>

    <CodeBlock
      language="ts"
      code='/// <reference types="@trendyol/baklava/dist/baklava-vue.d.ts" />'
    />

    <h3 id="eslint-configuration">ESLint Configuration</h3>

    <p>
      Baklava components are developed with <code>kebab case</code>. Eslint uses
      <code>pascal case</code> by default. If you are using eslint in your project, it will
      automatically convert the baklava components to <code>pascal case</code>. To prevent this, you
      need to turn off the <code>pascal case</code> rule in your project.
    </p>

    <p>To do this, give the following rule in your eslint config file:</p>

    <CodeBlock
      language="js"
      :code="`rules: {
  &quot;vue/component-name-in-template-casing&quot;: &quot;off&quot;,
},`"
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

:global(html.dark) .doc-content code {
  background-color: var(--bl-color-neutral-darker);
}
</style>
