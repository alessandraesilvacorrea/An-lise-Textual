import{i as r,u as n,j as e,B as d,T as o,h as l}from"./index-BOJuSKc6.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],j=r("arrow-right",h);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}],["path",{d:"M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662",key:"154egf"}]],N=r("circle-user",x);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]],p=r("circle-x",m);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]],g=r("info",u);function w({title:t,subtitle:a="TextLab",actions:s}){const c=n();return e.jsx("header",{className:"sticky top-0 z-30 border-b border-edtech-border bg-edtech-surface/90 shadow-[0_10px_30px_rgba(31,41,55,0.04)] backdrop-blur-xl",children:e.jsxs("div",{className:"mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8",children:[e.jsxs("button",{type:"button",onClick:()=>c("/home"),"aria-label":"Ir para a página inicial do TextLab",className:"flex min-w-0 items-center gap-3 rounded-lg text-left transition hover:opacity-90",children:[e.jsx("div",{className:"flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-edtech-primary text-white shadow-sm",children:e.jsx(d,{className:"h-5 w-5","aria-hidden":"true"})}),e.jsxs("div",{className:"min-w-0",children:[e.jsx("p",{className:"text-xs font-semibold uppercase tracking-[0.2em] text-edtech-muted",children:a}),e.jsx("p",{className:"truncate text-base font-semibold text-edtech-text",children:t})]})]}),s?e.jsx("div",{className:"flex shrink-0 flex-wrap items-center justify-end gap-2",children:s}):null]})})}const y={info:"border-edtech-sky/40 bg-edtech-sky/10",success:"border-edtech-mint/50 bg-edtech-mint/15",warning:"border-edtech-amber/55 bg-edtech-amber/15",error:"border-category-argumentativo/45 bg-category-argumentativo/10"},b={info:"text-edtech-primary",success:"text-edtech-mint",warning:"text-edtech-primary",error:"text-category-argumentativo"},f={info:g,success:l,warning:o,error:p};function v({variant:t="info",title:a,children:s,action:c}){const i=f[t];return e.jsx("div",{className:`rounded-lg border p-4 text-sm leading-6 text-edtech-text ${y[t]}`,role:"status",children:e.jsxs("div",{className:"flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",children:[e.jsxs("div",{className:"flex gap-3",children:[e.jsx(i,{className:`mt-0.5 h-5 w-5 shrink-0 ${b[t]}`,"aria-hidden":"true"}),e.jsxs("div",{children:[e.jsx("p",{className:"font-semibold text-edtech-text",children:a}),e.jsx("div",{className:"mt-1 text-edtech-muted",children:s})]})]}),c?e.jsx("div",{className:"shrink-0 sm:pl-4",children:c}):null]})})}export{w as A,N as C,v as P,j as a,p as b};
