import{a as i,b as a,e as o,f as r,g as t}from"./chunk-6TYTDGI6.js";import{a as l}from"./chunk-NZ3RGSR6.js";var s=i`:host {
  display: inline-block;
  max-width: 100%;

  --bl-badge-bg-color: var(--bl-color-accent-primary-background);
  --bl-badge-color: var(--bl-color-primary);
  --bl-badge-font: var(--bl-font-title-4-medium);
  --bl-badge-padding-vertical: var(--bl-size-3xs);
  --bl-badge-padding-horizontal: var(--bl-size-3xs);
  --bl-badge-margin-icon: var(--bl-size-3xs);
  --bl-badge-icon-size: var(--bl-size-s);
  --bl-badge-height: var(--bl-size-xl);
}

.badge {
  display: flex;
  gap: var(--bl-badge-margin-icon);
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  border: none;
  border-radius: var(--bl-size-4xs);
  margin: 0;
  padding: var(--bl-badge-padding-vertical) var(--bl-badge-padding-horizontal);
  background-color: var(--bl-badge-bg-color);
  color: var(--bl-badge-color, white);
  font: var(--bl-badge-font);
  font-kerning: none;
  height: var(--bl-badge-height);
}

:host([size='small']) {
  --bl-badge-font: var(--bl-font-caption-small-text);
  --bl-badge-height: var(--bl-size-m);
}

:host([size='large']) {
  --bl-badge-font: var(--bl-font-title-3-medium);
  --bl-badge-padding-vertical: var(--bl-size-2xs);
  --bl-badge-padding-horizontal: var(--bl-size-2xs);
  --bl-badge-height: var(--bl-size-2xl);
  --bl-badge-icon-size: var(--bl-size-m);
}

:host ::slotted(bl-icon) {
  font-size: var(--bl-badge-icon-size);
}

:host([size='small']) bl-icon {
  display: none;
}
`,b=s;var e=class extends o{constructor(){super(...arguments);this.size="medium"}static get styles(){return[b]}render(){let n=this.icon?a`<bl-icon name=${this.icon}></bl-icon>`:"";return a`<span class="badge">
      <slot name="icon">${n}</slot>
      <slot></slot>
    </span>`}};l([t({type:String,reflect:!0})],e.prototype,"size",2),l([t({type:String})],e.prototype,"icon",2),e=l([r("bl-badge")],e);export{e as a};
//# sourceMappingURL=chunk-L4EJFUQV.js.map
