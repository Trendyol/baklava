import{c as a,j as d,k as h,l}from"./chunk-6TYTDGI6.js";var u=h(class extends l{constructor(s){var e;if(super(s),s.type!==d.ATTRIBUTE||s.name!=="class"||((e=s.strings)===null||e===void 0?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(s){return" "+Object.keys(s).filter(e=>s[e]).join(" ")+" "}update(s,[e]){var i,r;if(this.et===void 0){this.et=new Set,s.strings!==void 0&&(this.st=new Set(s.strings.join(" ").split(/\s/).filter(t=>t!=="")));for(let t in e)e[t]&&!(!((i=this.st)===null||i===void 0)&&i.has(t))&&this.et.add(t);return this.render(e)}let n=s.element.classList;this.et.forEach(t=>{t in e||(n.remove(t),this.et.delete(t))});for(let t in e){let o=!!e[t];o===this.et.has(t)||((r=this.st)===null||r===void 0?void 0:r.has(t))||(o?(n.add(t),this.et.add(t)):(n.remove(t),this.et.delete(t)))}return a}});export{u as a};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
//# sourceMappingURL=chunk-4HPQWL76.js.map
