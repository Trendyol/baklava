import { html, TemplateResult } from 'lit';
import { ButtonVariant } from './gr-button';
import './gr-button';

const buttonOptions: ButtonVariant[] = ['primary', 'secondary'];

export default {
  title: 'Navigation/Button',
  component: 'gr-button',
  argTypes: {
    isDisabled: {
      name: 'is-disabled',
      table: { category: 'Properties', defaultValue: { summary: 'false' } },
      description:
        'Set whether the button is disabled. Only applies to implementations not using the url property',
      control: {
        type: 'boolean',
      },
    },
    variant: {
      name: 'button-variant',
      table: { category: 'Properties', defaultValue: { summary: 'primary' } },
      description: 'The button style variant to use.',
      options: buttonOptions,
      control: {
        type: 'select',
      },
    },
  },
  args: {
    variant: 'primary',
  },
  parameters: {
    docs: {
      description: {
        component: `
This component renders a button.
        `,
      },
    },
  },
};

const Template = ({
  defaultSlot,
  isDisabled,
  variant,
}): TemplateResult =>
  html`
<gr-button
  variant="${variant}"
  ?is-disabled=${isDisabled}
>
  ${defaultSlot}
</gr-button>
  `;

export const Button = Template.bind({});
Button.args = {
  defaultSlot: 'Button',
  variant: 'primary',
  isDisabled: false,
};

const inlineIconDecorator = [
  (Story): TemplateResult => html`
<div class="flex flex-row">
${Story()}
</div> `,
];

const PrimaryButtonsTemplate = (): TemplateResult =>
  html`
  <p>This section of primary buttons demonstrates the button.</p>
  <div class="my-6">
    <gr-button class="mr-2">Button</gr-button>
  </div>
  <p>This section of primary buttons demonstrates the disabled version of the same button.</p>
  <div class="my-6">
    <gr-button class="mr-2" is-disabled>Button</gr-button>
  </div>
`;

export const PrimaryButtons = PrimaryButtonsTemplate.bind({});
PrimaryButtons.parameters = {
  name: 'Primary Button',
  docs: {
    source: {
      code: `
<!-- Primary Buttons -->
<gr-button class="mr-2">Large Button</gr-button>
<!-- Primary Buttons (Disabled) -->
<gr-button class="mr-2" is-disabled>Button</gr-button>
      `,
    },
  },
};