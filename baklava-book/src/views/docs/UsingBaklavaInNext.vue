<script setup lang="ts">
import CodeBlock from "@/components/CodeBlock.vue";
</script>

<template>
  <div class="doc-content">
    <h1 id="using-baklava-with-next">Using Baklava With Next</h1>

    <p>
      Because Baklava uses static CDN and Next uses SSR, they are not compatible by default. We have
      2 options. We can wait for the CDN to load before rendering the page, or we can force baklava
      to use Client Side Rendering.
    </p>

    <h2 id="preparation">Preparation</h2>

    <p>Install the NPM package to your project.</p>

    <CodeBlock language="bash" code="npm install @trendyol/baklava" />

    <p>
      Include Baklava library from CDN to your project's <code>&lt;head&gt;</code> section (in
      <code>layout.tsx</code> or <code>app.tsx</code>).
    </p>

    <CodeBlock
      language="html"
      :code="`<link
  rel=&quot;stylesheet&quot;
  href=&quot;https://cdn.jsdelivr.net/npm/@trendyol/baklava/dist/themes/default.css&quot;
/>

<script
  type=&quot;module&quot;
  src=&quot;https://cdn.jsdelivr.net/npm/@trendyol/baklava/dist/baklava.js&quot;
/>`"
    />

    <h2 id="using-without-ssr">Using without SSR</h2>

    <p>Create a custom component for the baklava component you will use</p>

    <CodeBlock
      language="jsx"
      :code="`&quot;use client&quot;; // This is a client-side component

import { BlButton } from &quot;@trendyol/baklava/dist/baklava-react&quot;; // Import the component from the library

// Create a new component that uses the library component
const Button = (props) => (
  <BlButton {...props}>Click me!</BlButton>
);

export default Button;`"
    />

    <p>
      In the page, import the component using <code>dynamic</code> with ssr off.
    </p>

    <CodeBlock
      language="jsx"
      code='const Button = dynamic(() => import("@/components/Button"), { ssr: false });'
    />

    <p>Or you can export the component as dynamic to avoid type errors.</p>

    <CodeBlock
      language="jsx"
      :code="`&quot;use client&quot;;

import dynamic from 'next/dynamic';
import type { ComponentProps } from 'react';
import { BlButton } from &quot;@trendyol/baklava/dist/baklava-react&quot;;

type ButtonProps = ComponentProps<typeof BlButton>;

const Button = (props: ButtonProps) => (
  <BlButton {...props}>Click me!</BlButton>
);

const DynamicButton = dynamic<ButtonProps>(() =>
  Promise.resolve(Button)
);

export default DynamicButton;`"
    />

    <p>
      <a
        href="https://github.com/trendyol/baklava/tree/next/examples/next-app-router-ssr"
        target="_blank"
        rel="noopener"
        >Here is the demo repository</a
      >. You can also preview it live with
      <a
        href="https://stackblitz.com/github/trendyol/baklava/tree/next/examples/next-app-router-ssr"
        target="_blank"
        rel="noopener"
        >StackBlitz</a
      >.
    </p>

    <h2 id="using-with-ssr">Using with SSR</h2>

    <p>
      We will use a workaround in order to wait for CDN to be loaded. In
      <code>_app.tsx</code>, add a 0ms latency for the <code>&lt;Component /&gt;</code>.
    </p>

    <CodeBlock
      language="jsx"
      :code="`export default function MyApp({ Component, pageProps }) {
  const [isLoaded, setIsLoaded] = useState(false);

  setTimeout(() => {
    setIsLoaded(true);
  }, 0);

  return isLoaded && <Component {...pageProps} />
}`"
    />

    <p>Then import components just like regular react.</p>

    <CodeBlock
      language="jsx"
      :code="`import { BlButton } from '@trendyol/baklava/dist/baklava-react';

function Button() {
  return <BlButton>Click Me</BlButton>
}`"
    />

    <h2 id="testing-with-jest">Testing with Jest</h2>

    <p>
      If you are using Server Side Rendering, you can mock Baklava components as JSX components in
      Jest.
    </p>

    <CodeBlock
      language="js"
      :code="`jest.mock('@trendyol/baklava/dist/baklava-react', () => ({
  ...jest.requireActual('@trendyol/baklava/dist/baklava-react'),
  BlPagination: (props) => <div data-testId=&quot;current-page-mock&quot;>{props['current-page']}</div>,
}));`"
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
