import{x as l,r as o,j as a,c as i,y as c}from"./index-BIIicj6n.js";import{C as p}from"./chevron-right-D-plVJfY.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=l("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=l("ChevronsLeft",[["path",{d:"m11 17-5-5 5-5",key:"13zhaf"}],["path",{d:"m18 17-5-5 5-5",key:"h8a8et"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=l("ChevronsRight",[["path",{d:"m6 17 5-5-5-5",key:"xnjwq"}],["path",{d:"m13 17 5-5-5-5",key:"17xmmf"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=l("Ellipsis",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]]),d=({className:e,...s})=>a.jsx("nav",{role:"navigation","aria-label":"pagination",className:i("mx-auto flex w-full justify-center",e),...s});d.displayName="Pagination";const f=o.forwardRef(({className:e,...s},n)=>a.jsx("ul",{ref:n,className:i("flex flex-row items-center gap-1",e),...s}));f.displayName="PaginationContent";const N=o.forwardRef(({className:e,...s},n)=>a.jsx("li",{ref:n,className:i("",e),...s}));N.displayName="PaginationItem";const t=({className:e,isActive:s,size:n="icon",...r})=>a.jsx("a",{"aria-current":s?"page":void 0,className:i(c({variant:s?"outline":"ghost",size:n}),e),...r});t.displayName="PaginationLink";const j=({className:e,...s})=>a.jsxs(t,{"aria-label":"Go to previous page",size:"default",className:i("gap-1 pl-2.5",e),...s,children:[a.jsx(m,{className:"h-4 w-4"}),a.jsx("span",{children:"Previous"})]});j.displayName="PaginationPrevious";const y=({className:e,...s})=>a.jsxs(t,{"aria-label":"Go to next page",size:"default",className:i("gap-1 pr-2.5",e),...s,children:[a.jsx("span",{children:"Next"}),a.jsx(p,{className:"h-4 w-4"})]});y.displayName="PaginationNext";const P=({className:e,...s})=>a.jsxs(t,{"aria-label":"Go to first page",size:"default",className:i("gap-1 px-2.5",e),...s,children:[a.jsx(x,{className:"h-4 w-4"}),a.jsx("span",{children:"First"})]});P.displayName="PaginationFirst";const u=({className:e,...s})=>a.jsxs(t,{"aria-label":"Go to last page",size:"default",className:i("gap-1 px-2.5",e),...s,children:[a.jsx("span",{children:"Last"}),a.jsx(g,{className:"h-4 w-4"})]});u.displayName="PaginationLast";const v=({className:e,...s})=>a.jsxs("span",{"aria-hidden":!0,className:i("flex h-9 w-9 items-center justify-center",e),...s,children:[a.jsx(h,{className:"h-4 w-4"}),a.jsx("span",{className:"sr-only",children:"More pages"})]});v.displayName="PaginationEllipsis";export{d as P,f as a,N as b,P as c,j as d,t as e,v as f,y as g,u as h};
