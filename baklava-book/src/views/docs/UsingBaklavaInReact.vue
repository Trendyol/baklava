<script setup lang="ts">
import CodeBlock from "@/components/CodeBlock.vue";
</script>

<template>
  <div class="doc-content">
    <h1 id="using-baklava-in-react">Using Baklava in React</h1>

    <p>
      React is not
      <a href="https://custom-elements-everywhere.com/#react" target="_blank" rel="noopener"
        >compatible</a
      >
      with most of the web component features. React passes all props as string to Custom Components
      so object and array props don't pass in correct way. Also, since React uses its own synthetic
      event system, it can't listen events that dispatches from Custom Elements. For this reasons,
      we used
      <a href="https://www.npmjs.com/package/@lit-labs/react" target="_blank" rel="noopener"
        >@lit-labs/react</a
      >
      package to convert Custom Elements to React components.
    </p>

    <h2 id="using-with-cdn">Using with CDN</h2>

    <p>Install the NPM package to your project.</p>

    <CodeBlock language="bash" code="npm install @trendyol/baklava" />

    <p>
      Include Baklava library from CDN to your project's <code>index.html</code> file's
      <code>&lt;head&gt;</code> section.
    </p>

    <CodeBlock
      language="html"
      :code="`<link rel=&quot;stylesheet&quot; href=&quot;https://cdn.jsdelivr.net/npm/@trendyol/baklava/dist/themes/default.css&quot;/>
<script type=&quot;module&quot; src=&quot;https://cdn.jsdelivr.net/npm/@trendyol/baklava/dist/baklava.js&quot;></script>`"
    />

    <p>
      Then you can use Baklava React components in your project by importing them from
      <code>@trendyol/baklava/dist/baklava-react</code> in your code.
    </p>

    <bl-alert variant="warning">
      Please make sure you are using same version on CDN imports and NPM package. Otherwise there
      can be inconsistencies between React components and their related web components.
    </bl-alert>

    <CodeBlock
      language="jsx"
      :code="`import { BlTooltip, BlButton } from &quot;@trendyol/baklava/dist/baklava-react&quot;;

function App() {
  return (
    <BlTooltip>
      <BlButton slot=&quot;tooltip-trigger&quot; icon=&quot;info&quot; label=&quot;Show Info&quot; />
      Some extra information.
    </BlTooltip>
  );
}

export default App;`"
    />

    <p>
      By using via CDN, you'll have a very thin React wrapper package in your project bundle, and
      you'll be able to use Baklava React components in your project with a very fast and optimized
      CDN. In this way you don't need to do any special thing for including assets.
    </p>

    <h2 id="using-with-npm">Using with NPM</h2>

    <p>If you want to include Baklava to your project bundle, you can import it via NPM.</p>

    <p>Install the NPM package to your project.</p>

    <CodeBlock language="bash" code="npm install @trendyol/baklava" />

    <p>
      Then import Baklava library and styles in a central place of your app. Like
      <code>main.jsx</code> file. You need to use provided <code>setIconPath</code> function to set
      icon location via CDN. Or you can download those icons to your project's asset folder and set
      the path manually.
    </p>

    <CodeBlock
      language="jsx"
      :code="`import React from &quot;react&quot;;
import ReactDOM from &quot;react-dom/client&quot;;
import &quot;@trendyol/baklava&quot;;
import { setIconPath } from &quot;@trendyol/baklava&quot;;
import &quot;@trendyol/baklava/dist/themes/default.css&quot;;
setIconPath(&quot;https://cdn.jsdelivr.net/npm/@trendyol/baklava-icons@latest/icons&quot;);

import App from &quot;./App&quot;;

ReactDOM.createRoot(document.getElementById(&quot;root&quot;)).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`"
    />

    <p>
      Now you are able to use Baklava React components in your project by importing them from
      <code>@trendyol/baklava/dist/baklava-react</code> in your code.
    </p>

    <CodeBlock
      language="jsx"
      :code="`import { BlTooltip, BlButton } from &quot;@trendyol/baklava/dist/baklava-react&quot;;

function App() {
  return (
    <BlTooltip>
      <BlButton slot=&quot;tooltip-trigger&quot; icon=&quot;info&quot; text label=&quot;Show Info&quot; />
      Some extra information.
    </BlTooltip>
  );
}

export default App;`"
    />

    <h2 id="event-handling">Event Handling</h2>

    <p>
      Baklava components emit
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent"
        target="_blank"
        rel="noopener"
        >custom events</a
      >. For example, the input component emits the <code>bl-input</code> event when it receives
      input. In React, you can listen for the event using <code>onInput</code>.
    </p>

    <p>Example:</p>

    <CodeBlock
      language="jsx"
      :code="`import { useState } from 'react';
import { BlInput } from '@trendyol/baklava/dist/baklava-react';

function MyComponent() {
  const [value, setValue] = useState('');

  return <BlInput value={value} onInput={event => setValue(event.target.value)} />;
}

export default MyComponent;`"
    />

    <h2 id="styling-components">Styling Components</h2>

    <p>You can customize components with css variables or general theme variables.</p>

    <h3 id="inline-css">Inline CSS</h3>

    <CodeBlock
      language="jsx"
      :code="`import { BlButton } from &quot;@trendyol/baklava/dist/baklava-react&quot;;

function MyComponent() {
  const buttonStyle = {
    &quot;--bl-color-primary&quot;: &quot;purple&quot;,
    &quot;--bl-color-primary-highlight&quot;: &quot;rebeccapurple&quot;,
  }

  return (
    <BlButton style={buttonStyle}>button</BlButton>
  );
}

export default MyComponent;`"
    />

    <h3 id="styled-components">Styled Components</h3>

    <CodeBlock
      language="jsx"
      :code="`import { BlTooltip, BlButton } from &quot;@trendyol/baklava/dist/baklava-react&quot;;
import styled from &quot;styled-components&quot;

const Wrapper = styled.div\`
   .button-class {
     --bl-color-primary: purple;
   }

   .tooltip-class {
     --bl-tooltip-position: fixed;
   }
\`;

function MyComponent() {
  return (
    <Wrapper>
      <BlTooltip className=&quot;tooltip-class&quot;>
        <BlButton className=&quot;button-class&quot; slot=&quot;tooltip-trigger&quot; icon=&quot;info&quot; text label=&quot;Show Info&quot; />
        Some extra information.
      </BlTooltip>
    </Wrapper>
  );
}

export default MyComponent;`"
    />

    <h2 id="testing-with-vitest">Testing with Vitest</h2>

    <p>
      Baklava uses ES modules. We will explain how to install Vitest due to its ES Modules support.
      If you are using Jest, your version should be greater than 26.5.0, and you should add
      "@trendyol/baklava" to the
      <a
        href="https://jestjs.io/docs/tutorial-react-native#transformignorepatterns-customization"
        target="_blank"
        rel="noopener"
        >transformIgnorePatterns</a
      >.
    </p>

    <CodeBlock language="bash" code="npm install -D vitest vitest-dom jsdom" />

    <p>
      After downloading Vitest with this command, you should provide a file path to the setupFiles
      section in your Vitest config file. We used './src/setupTest.ts'.
    </p>

    <CodeBlock
      language="js"
      :code="`import { defineConfig } from &quot;vitest/config&quot;;

export default defineConfig({
  test: {
    environment: &quot;jsdom&quot;,
    setupFiles: [&quot;./src/setupTest.ts&quot;]
  }
});`"
    />

    <p>Afterward, we should edit our setupTest.ts file just like setting up baklava.</p>

    <CodeBlock
      language="js"
      :code="`import &quot;vitest-dom/extend-expect&quot;;
import &quot;@trendyol/baklava&quot;;
import { setIconPath } from &quot;@trendyol/baklava&quot;;
import &quot;@trendyol/baklava/dist/themes/default.css&quot;;
setIconPath(&quot;https://cdn.jsdelivr.net/npm/@trendyol/baklava-icons@latest/icons&quot;);`"
    />

    <p>We are ready to write tests.</p>

    <CodeBlock
      language="tsx"
      :code="`import { fireEvent, render, screen } from &quot;@testing-library/react&quot;;
import { expect, test, vi } from &quot;vitest&quot;;
import { BlButton } from &quot;@trendyol/baklava/dist/baklava-react&quot;;
import React from &quot;react&quot;;

test(&quot;should trigger click event&quot;, async () => {
  const onClickFn = vi.fn();
  render(
    <React.Suspense fallback={null}>
      <BlButton onBlClick={onClickFn}>Button</BlButton>
    </React.Suspense>
  );

  const blButton = await screen.findByText(&quot;Button&quot;);
  const button = blButton.shadowRoot.querySelector(&quot;button&quot;);
  fireEvent.click(button);

  expect(onClickFn).toBeCalled();
});`"
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

.doc-content bl-alert {
  display: block;
  margin: 1rem 0;
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
