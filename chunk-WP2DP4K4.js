import{a as l}from"./chunk-2OZ27HBE.js";import{a as b}from"./chunk-4HPQWL76.js";import{a as n,b as a,e as s,f as d,g as r,h as p,i as c,m as o}from"./chunk-6TYTDGI6.js";import{a as i}from"./chunk-NZ3RGSR6.js";var m=n`:host {
  display: inline-block;
  width: 200px;
  position: relative;

  --bl-input-padding-vertical: var(--bl-size-2xs);
  --bl-input-padding-horizontal: var(--bl-size-xs);
  --bl-input-border-color: var(--bl-color-border);
  --bl-input-icon-color: var(--bl-color-content-tertiary);
  --bl-input-text-color: var(--bl-color-content-primary);
  --bl-input-height: var(--bl-size-2xl);
}

input {
  outline: none;
  box-sizing: border-box;
  height: var(--bl-input-height);
  border: solid 1px var(--bl-input-border-color);
  width: 100%;
  font: var(--bl-font-title-3-regular);
  padding: 0 var(--bl-input-padding-horizontal);
  margin: 0;
  border-radius: 4px;
  color: var(--bl-input-text-color);
}

bl-icon {
  position: absolute;
  top: var(--bl-input-padding-vertical);
  right: var(--bl-input-padding-horizontal);
  font-size: var(--bl-size-m);
  z-index: 1;
  color: var(--bl-input-icon-color);
}

input:focus {
  --bl-input-border-color: var(--bl-color-primary);
}

input:focus ~ bl-icon {
  --bl-input-icon-color: var(--bl-color-primary);
}

:host([label-fixed]) bl-icon {
  top: calc(var(--bl-input-padding-vertical) + var(--bl-size-m));
}

:host ::placeholder {
  color: var(--bl-color-content-tertiary);
}

:host([label]) ::placeholder {
  color: transparent;
  transition: color ease-out 0.4s;
}

:host input:focus::placeholder,
:host([label-fixed]) ::placeholder {
  color: var(--bl-color-content-tertiary);
}

input:disabled {
  background-color: var(--bl-color-primary-background);

  --bl-input-text-color: var(--bl-color-content-tertiary);
}

input.dirty:invalid {
  --bl-input-border-color: var(--bl-color-danger);
}

input.has-icon {
  padding-right: calc(var(--bl-size-xs) * 2 + var(--bl-size-m));
}

.error-icon,
.invalid-text {
  display: none;
}

label {
  position: absolute;
  top: var(--bl-input-padding-vertical);
  left: var(--bl-input-padding-horizontal);
  transition: all ease-in 0.2s;
  pointer-events: none;
  font: var(--bl-font-title-3-regular);
  color: var(--bl-color-content-tertiary);
  padding: 0;
}

:where(input:focus, input.has-value) ~ label {
  top: 0;
  left: var(--bl-size-2xs);
  transform: translateY(-50%);
  font: var(--bl-font-form-label);
  color: var(--bl-color-content-secondary);
  padding: 0 var(--bl-size-3xs);
  background-color: var(--bl-color-primary-background);
  pointer-events: initial;
}

:host([label-fixed]) {
  padding-top: var(--bl-size-m);
}

:host([label-fixed]) label {
  top: 0;
  left: 0;
  transition: none;
  transform: none;
  pointer-events: initial;
  font: var(--bl-font-form-label);
  color: var(--bl-color-content-secondary);
  padding: 0;
}

.dirty:invalid ~ label {
  color: var(--bl-color-danger);
}

.invalid-text,
.help-text {
  font: var(--bl-font-title-4-regular);
  padding: var(--bl-size-3xs) var(--bl-input-padding-horizontal);
  margin: 0;
}

.invalid-text {
  color: var(--bl-color-danger);
}

.help-text {
  color: var(--bl-color-content-secondary);
}

.error-icon {
  color: var(--bl-color-danger);
}

.dirty:invalid ~ .invalid-text {
  display: block;
}

.dirty:invalid ~ .help-text {
  display: none;
}

.dirty:invalid ~ .error-icon {
  display: inline-block;
}

.dirty:invalid ~ .custom-icon ~ .error-icon {
  display: none;
}

.dirty:invalid ~ .custom-icon {
  --bl-input-icon-color: var(--bl-color-danger);
}

:host([size='large']) {
  --bl-input-height: var(--bl-size-3xl);
  --bl-input-padding-vertical: var(--bl-size-xs);
  --bl-input-padding-horizontal: var(--bl-size-m);
}
`,h=m;var t=class extends s{constructor(){super(...arguments);this.type="text";this.required=!1;this.size="medium";this.disabled=!1;this.labelFixed=!1;this._dirty=!1}static get styles(){return[h]}reportValidity(){this._dirty=!0,this.input.checkValidity()}get dirty(){return this._dirty}get hasValue(){var e;return((e=this.input)==null?void 0:e.value.length)>0}get _invalidText(){var e;return this.customInvalidText||((e=this.input)==null?void 0:e.validationMessage)}get _invalidState(){var e;return this.input&&!((e=this.input)!=null&&e.validity.valid)}inputHandler(){var e;this.validity=(e=this.input)==null?void 0:e.validity,this.value=this.input.value,this.onInput(this.input.value)}changeHandler(){this._dirty=!0,this.onChange(this.input.value)}firstUpdated(){var e;this.validity=(e=this.input)==null?void 0:e.validity,this._invalidState&&this.requestUpdate()}render(){let e=this._invalidState?a`<p class="invalid-text">${this._invalidText}</p>`:"",v=this.helpText?a`<p class="help-text">${this.helpText}</p>`:"",u=this.icon?a` <bl-icon class="custom-icon" name="${this.icon}"></bl-icon>`:"",g=this.label?a`<label>${this.label}</label>`:"";return a`
      <input
        type=${this.type}
        class=${b({dirty:this.dirty,"has-icon":this.icon||this.dirty&&this._invalidState,"has-value":this.hasValue})}
        value=${l(this.value)}
        placeholder="${l(this.placeholder)}"
        minlength="${l(this.minlength)}"
        maxlength="${l(this.maxlength)}"
        min="${l(this.min)}"
        max="${l(this.max)}"
        ?required=${this.required}
        ?disabled=${this.disabled}
        @change=${this.changeHandler}
        @input=${this.inputHandler}
      />
      ${g} ${u}
      <bl-icon class="error-icon" name="alert"></bl-icon>
      ${e} ${v}
    `}};i([c("input")],t.prototype,"input",2),i([r({})],t.prototype,"type",2),i([r({})],t.prototype,"label",2),i([r({})],t.prototype,"placeholder",2),i([r({})],t.prototype,"value",2),i([r({type:Boolean})],t.prototype,"required",2),i([r({type:Number})],t.prototype,"minlength",2),i([r({type:Number})],t.prototype,"maxlength",2),i([r({type:Number})],t.prototype,"min",2),i([r({type:Number})],t.prototype,"max",2),i([r({type:String})],t.prototype,"icon",2),i([r({type:String,reflect:!0})],t.prototype,"size",2),i([r({type:Boolean,reflect:!0})],t.prototype,"disabled",2),i([r({type:Boolean,attribute:"label-fixed"})],t.prototype,"labelFixed",2),i([r({type:String,attribute:"invalid-text"})],t.prototype,"customInvalidText",2),i([r({type:String,attribute:"help-text"})],t.prototype,"helpText",2),i([o("bl-change")],t.prototype,"onChange",2),i([o("bl-input")],t.prototype,"onInput",2),i([p()],t.prototype,"_dirty",2),t=i([d("bl-input")],t);export{t as a};
//# sourceMappingURL=chunk-WP2DP4K4.js.map
