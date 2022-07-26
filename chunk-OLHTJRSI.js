import{a as f,b as u,c as g,d as l,e as v,f as y,g as T,h as x,j as w,k as m,l as E,m as p}from"./chunk-6TYTDGI6.js";import{a as r}from"./chunk-NZ3RGSR6.js";var s=class extends E{constructor(t){if(super(t),this.it=l,t.type!==w.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===l||t==null)return this.ft=void 0,this.it=t;if(t===g)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this.ft;this.it=t;let i=[t];return i.raw=i,this.ft={_$litType$:this.constructor.resultType,strings:i,values:[]}}};s.directiveName="unsafeHTML",s.resultType=1;var G=m(s);var n=class extends s{};n.directiveName="unsafeSVG",n.resultType=2;var L=m(n);var P="./assets";function M(a){P=a}function $(){return P}var N=import.meta.url;N&&M(N.split("/").slice(0,-1).concat("assets").join("/"));var D=f`:host {
  display: inline-block;
  position: relative;
  width: 1em;
  height: 1em;
  min-width: 1em;
  min-height: 1em;
}

:host div,
:host svg {
  width: 100%;
  height: 100%;
}
`,b=D;var d=new Map,e=class extends v{static get styles(){return[b]}get name(){return this._iconName}set name(i){i!==this._iconName&&(this._iconName=i,this.load())}async load(){let c=`${$()}/${this.name}.svg`;d.has(c)||d.set(c,fetch(c));try{let o=await d.get(c),h=await(o==null?void 0:o.clone());h!=null&&h.ok?(this.svg=await h.text(),this.onLoad(`${this.name} icon loaded`),this.requestUpdate()):this.onError(`${this.name} icon failed to load`)}catch(o){this.onError(`${this.name} icon failed to load [${o}]`)}}render(){return u`<div aria-hidden="true">${L(this.svg)}</div>`}};r([T()],e.prototype,"name",1),r([p("bl-load")],e.prototype,"onLoad",2),r([p("bl-error")],e.prototype,"onError",2),r([x()],e.prototype,"svg",2),e=r([y("bl-icon")],e);export{M as a,$ as b,e as c};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
//# sourceMappingURL=chunk-OLHTJRSI.js.map
