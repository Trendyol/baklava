import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { fullscreenLayout } from "../../utilities/chromatic-decorators";
import type BlDialog from "./bl-dialog";

const meta: Meta = {
  title: "Components/Dialog",
  component: "bl-dialog",
  parameters: {
    chromatic: {
      viewports: [1000]
    },
    controls: {
      exclude: ["id"],
    }
  },
  decorators: [
    fullscreenLayout,
  ],
  argTypes: {
    open: {
      control: "boolean",
    },
    polyfilled: {
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
  polyfilled?: boolean;
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
};

const BasicTemplate = (args: DialogArgs) => html`
<bl-button @bl-click="${dialogOpener(args.id)}" variant="secondary">Open Dialog</bl-button>

<bl-dialog
  id=${args.id}
  class="${ifDefined(args.className)}"
  caption="${ifDefined(args.caption)}"
  ?open="${args.open}"
  ?polyfilled="${args.polyfilled}">
    ${
      unsafeHTML(args.content)
    }${
      args.primaryAction ? html`

  <bl-button slot="primary-action" variant="primary" ?autofocus=${args.focusPrimary} size="large">${args.primaryAction}</bl-button>` : ""}${
      args.secondaryAction ? html`
  <bl-button slot="secondary-action" variant="secondary" ?autofocus=${args.focusSecondary} size="large">${args.secondaryAction}</bl-button>` : ""}${
      args.tertiaryAction ? html`
  <bl-button slot="tertiary-action" variant="tertiary" ?autofocus=${args.focusTertiary} size="large">${args.tertiaryAction}</bl-button>` : ""}
</bl-dialog>
`;

const FullWidthActionsTemplate = (args: DialogArgs) => html`
<style>
  bl-dialog.full-width-actions bl-button {
    --bl-button-display: block;
    flex: 1;
  }
</style>

${BasicTemplate({...args, className: "full-width-actions"})}
`;

const TemplateWithStickyFooter = (args: DialogArgs) => html`
<style>
  bl-dialog.limited-width .content {
    max-width: 500px;
    max-height: 500px;
  }
</style>

${BasicTemplate({...args, className: "limited-width", content: `<div class="content">
  <bl-alert icon>Please read all terms and conditions.</bl-alert>
  <h4>Lorem ipsum dolor sit amet</h4>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun ut labore et dolore magna aliqua.
   Ut enim ad minim veniam, quis nostrud exercitatioullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
  <ul>
    <li>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis</li>
    <li>Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore.</li>
    <li>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit</li>
    <li>Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore.</li>
    <li>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis</li>
    <li>Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore.</li>
    <li>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit</li>
    <li>Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore.</li>
  </ul>
  <p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
  Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form
  accompanied by English versions from the 1914 translation by H. Rackham.</p>
  <h4>Quis autem vel eum iure reprehenderit qui</h4>
  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry
  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scramble
  it to make a type specimen book.</p>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun ut labore et dolore magna aliqua.
  Ut enim ad minim veniam, quis nostrud exercitatioullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun ut labore et dolore magna aliqua.
  Ut enim ad minim veniam, quis nostrud exercitatioullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
  <ul>
    <li>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis</li>
    <li>Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore.</li>
    <li>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit</li>
    <li>Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore.</li>
    <li>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis</li>
    <li>Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore.</li>
    <li>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit</li>
    <li>Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore.</li>
  </ul>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun ut labore et dolore magna aliqua.
  Ut enim ad minim veniam, quis nostrud exercitatioullamco laboris nisi ut aliquip ex ea commodo consequat.<br/>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun ut labore et dolore magna aliqua.
  Ut enim ad minim veniam, quis nostrud exercitatioullamco laboris nisi ut aliquip ex ea commodo consequat.<br/>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun ut labore et dolore magna aliqua.
  Ut enim ad minim veniam, quis nostrud exercitatioullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun ut labore et dolore magna aliqua.
  Ut enim ad minim veniam, quis nostrud exercitatioullamco laboris nisi ut aliquip ex ea commodo consequat.<br/>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun ut labore et dolore magna aliqua.
  Ut enim ad minim veniam, quis nostrud exercitatioullamco laboris nisi ut aliquip ex ea commodo consequat.<br/>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun ut labore et dolore magna aliqua.
  Ut enim ad minim veniam, quis nostrud exercitatioullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
</div>`
})}`;

const SizingTemplate = (args: DialogArgs) => html`
<style>
  .my-dialog-content {
    width: 400px;
    height:200px;
    margin:0;
    padding:0;
  }
</style>

${BasicTemplate({...args, content: `<p class="my-dialog-content">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
software like Aldus PageMaker including versions of Lorem Ipsum. Let us help determine location. This means sending anonymous location data to us.
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock,
a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites
of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
(The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,
"Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>` })}
`;

const TabGroupTemplate = (args: DialogArgs) => html`
<style>
  .my-dialog-content {
    height:50px;
    margin:50px;
    padding:0;
  }
</style>

${BasicTemplate({...args, content: `
<bl-tab-group>
  <bl-tab name="test-1" slot="tabs" caption="Caption">Tab 1</bl-tab>
  <bl-tab name="test-2" slot="tabs">Tab 2</bl-tab>
  <bl-tab name="test-3" slot="tabs" disabled caption="Caption">Tab 3</bl-tab>
</bl-tab-group>
<p class="my-dialog-content">
Normal dialog contents has default padding in bl-dialog component. But bl-tab-group has full width in bl-dialog component.
</p>

` })}
`;

export const BasicUsage: Story = {
  args: {
    id: "dl-basic",
    caption: "Use location service?",
    content: "Let us help determine location. This means sending anonymous location data to us.",
    primaryAction: "Agree",
    secondaryAction: "Disagree",
    tertiaryAction: "Cancel",
  },
  render: BasicTemplate,
  play: dialogOpener("dl-basic")
};

export const DialogWithStickyFooter: Story = {
  args: {
    id: "dl-sticky-footer",
    caption: "Terms And Conditions",
    primaryAction: "Agree",
    secondaryAction: "Disagree",
  },
  render: TemplateWithStickyFooter,
  play: dialogOpener("dl-sticky-footer")
};

export const DialogSizing: Story = {
  args: {
    id: "dl-sizing",
    primaryAction: "Agree",
    secondaryAction: "Disagree",
    tertiaryAction: "Cancel"
  },
  render: SizingTemplate,
  play: dialogOpener("dl-sizing")
};

export const DialogWithFocusedAction: Story = {
  args: {
    id: "dl-focused-action",
    caption: "Use location service?",
    content: "Let us help determine location. This means sending anonymous location data to us.",
    primaryAction: "Agree",
    secondaryAction: "Disagree",
    focusSecondary: true,
    tertiaryAction: "Cancel"
  },
  render: BasicTemplate,
  play: dialogOpener("dl-focused-action")
};

export const DialogWithFocusedInput: Story = {
  args: {
    id: "dl-focused-input",
    caption: "Name your file",
    content: '<p>Please provide a name for your file</p><bl-input placeholder="filename.pdf" autofocus></bl-input>',
    primaryAction: "OK",
    tertiaryAction: "Cancel"
  },
  render: BasicTemplate,
  play: dialogOpener("dl-focused-input")
};

export const DialogWithFullWidthAction: Story = {
  args: {
    id: "dl-full-width-action",
    caption: "Action completed",
    content: "<p>Your process is done!</p>",
    primaryAction: "OK"
  },
  render: FullWidthActionsTemplate,
  play: dialogOpener("dl-full-width-action")
};


export const DialogWithFullWidthActions: Story = {
  args: {
    id: "dl-full-width-actions",
    caption: "Are you sure to delete?",
    content: "<p>Do you want to really delete the file?</p>",
    primaryAction: "Delete",
    secondaryAction: "Cancel"
  },
  render: FullWidthActionsTemplate,
  play: dialogOpener("dl-full-width-actions")
};

export const DialogWithTabGroup: Story = {
  args: {
    id: "dl-tab-group",
    caption: "Use location service?",
    content: "Let us help determine location. This means sending anonymous location data to us.",
    primaryAction: "Agree",
    secondaryAction: "Disagree",
    tertiaryAction: "Cancel",
  },
  render: TabGroupTemplate,
  play: dialogOpener("dl-tab-group")
};
