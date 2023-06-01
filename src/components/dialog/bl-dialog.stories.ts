import type { Meta, StoryObj } from '@storybook/web-components';
import { loremIpsum } from "lorem-ipsum";
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { fullscreenLayout } from '../../utilities/chromatic-decorators';
import type BlDialog from './bl-dialog';

const meta: Meta = {
  title: 'Components/Dialog',
  component: 'bl-dialog',
  parameters: {
    chromatic: {
      viewports: [1000]
    },
    controls: {
      exclude: ['id'],
    }
  },
  decorators: [
    fullscreenLayout,
  ],
  argTypes: {
    open: {
      control: "boolean",
    },
    caption: {
      control: "text"
    },
    content: {
      control: "text"
    }
  }
};

export default meta;

interface DialogArgs {
  id: string;
  className?: string;
  caption?: string;
  open?: boolean;
  content?: string;
  primaryAction?: string;
  secondaryAction?: string;
  tertiaryAction?: string;
  focusPrimary?: boolean;
  focusSecondary?: boolean;
  focusTertiary?: boolean;
}

type Story = StoryObj<DialogArgs>;

const dialogOpener = (dialogId: string) => async () => {
  const dialog = document.getElementById(dialogId) as BlDialog;
  dialog.open = true;
}

const BasicTemplate = (args: DialogArgs) => html`
<bl-button @bl-click="${dialogOpener(args.id)}" variant="secondary">Open Dialog</bl-button>

<bl-dialog
  id=${args.id}
  class="${ifDefined(args.className)}"
  caption="${ifDefined(args.caption)}"
  ?open="${args.open}">
    ${
      unsafeHTML(args.content)
    }${
      args.primaryAction ? html`

  <bl-button slot="primary-action" variant="primary" ?autofocus=${args.focusPrimary} size="large">${args.primaryAction}</bl-button>` : ''}${
      args.secondaryAction ? html`
  <bl-button slot="secondary-action" variant="secondary" ?autofocus=${args.focusSecondary} size="large">${args.secondaryAction}</bl-button>` : ''}${
      args.tertiaryAction ? html`
  <bl-button slot="tertiary-action" variant="tertiary" ?autofocus=${args.focusTertiary} size="large">${args.tertiaryAction}</bl-button>` : ''}
</bl-dialog>
`

const FullWidthActionsTemplate = (args: DialogArgs) => html`
<style>
  bl-dialog.full-width-actions bl-button {
    --bl-button-display: block;
    flex: 1;
  }
</style>

${BasicTemplate({...args, className: "full-width-actions"})}
`

const TemplateWithStickyFooter = (args: DialogArgs) => html`
<style>
  bl-dialog.limited-width .content {
    max-width: 500px;
    max-height: 500px;
  }
</style>

${BasicTemplate({...args, className: 'limited-width', content: `<div class="content">
  <bl-alert icon>Please read all terms and conditions.</bl-alert>
  <h4>Lorem ipsum dolor sit amet</h4>
  ${loremIpsum({format: 'html', count: 20, units: 'paragraph'})}` })}
</div>`

const SizingTemplate = (args: DialogArgs) => html`
<style>
  .my-dialog-content {
    width: 400px;
    height:200px;
    margin:0;
    padding:0;
  }
</style>

${BasicTemplate({...args, content: `<p class="my-dialog-content">${loremIpsum({count: 20, units: 'sentences'})}</p>` })}
`

export const BasicUsage: Story = {
  args: {
    id: 'dl-basic',
    caption: "Use location service?",
    content: 'Let us help determine location. This means sending anonymous location data to us.',
    primaryAction: 'Agree',
    secondaryAction: 'Disagree',
    tertiaryAction: 'Cancel',
  },
  render: BasicTemplate,
  play: dialogOpener("dl-basic")
};

export const DialogWithStickyFooter: Story = {
  args: {
    id: 'dl-sticky-footer',
    caption: "Terms And Conditions",
    primaryAction: 'Agree',
    secondaryAction: 'Disagree',
  },
  render: TemplateWithStickyFooter,
  play: dialogOpener("dl-sticky-footer")
};

export const DialogSizing: Story = {
  args: {
    id: 'dl-sizing',
    primaryAction: 'Agree',
    secondaryAction: 'Disagree',
    tertiaryAction: 'Cancel'
  },
  render: SizingTemplate,
  play: dialogOpener("dl-sizing")
};

export const DialogWithFocusedAction: Story = {
  args: {
    id: 'dl-focused-action',
    caption: "Use location service?",
    content: 'Let us help determine location. This means sending anonymous location data to us.',
    primaryAction: 'Agree',
    secondaryAction: 'Disagree',
    focusSecondary: true,
    tertiaryAction: 'Cancel'
  },
  render: BasicTemplate,
  play: dialogOpener("dl-focused-action")
};

export const DialogWithFocusedInput: Story = {
  args: {
    id: 'dl-focused-input',
    caption: 'Name your file',
    content: '<p>Please provide a name for your file</p><bl-input placeholder="filename.pdf" autofocus></bl-input>',
    primaryAction: 'OK',
    tertiaryAction: 'Cancel'
  },
  render: BasicTemplate,
  play: dialogOpener("dl-focused-input")
};

export const DialogWithFullWidthAction: Story = {
  args: {
    id: 'dl-full-width-action',
    caption: 'Action completed',
    content: '<p>Your process is done!</p>',
    primaryAction: 'OK'
  },
  render: FullWidthActionsTemplate,
  play: dialogOpener("dl-full-width-action")
};


export const DialogWithFullWidthActions: Story = {
  args: {
    id: 'dl-full-width-actions',
    caption: 'Are you sure to delete?',
    content: '<p>Do you want to really delete the file?</p>',
    primaryAction: 'Delete',
    secondaryAction: 'Cancel'
  },
  render: FullWidthActionsTemplate,
  play: dialogOpener("dl-full-width-actions")
};
