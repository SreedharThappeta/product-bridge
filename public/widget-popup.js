"use strict";var FeedbackWidgetPopup=(()=>{var W,g,le,qe,T,re,ce,fe,de,Y,$,G,Ne,R={},pe=[],Ue=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,B=Array.isArray;function S(e,t){for(var o in t)e[o]=t[o];return e}function K(e){e&&e.parentNode&&e.parentNode.removeChild(e)}function We(e,t,o){var r,s,a,c={};for(a in t)a=="key"?r=t[a]:a=="ref"?s=t[a]:c[a]=t[a];if(arguments.length>2&&(c.children=arguments.length>3?W.call(arguments,2):o),typeof e=="function"&&e.defaultProps!=null)for(a in e.defaultProps)c[a]===void 0&&(c[a]=e.defaultProps[a]);return q(e,c,r,s,null)}function q(e,t,o,r,s){var a={type:e,props:t,key:o,ref:r,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:s==null?++le:s,__i:-1,__u:0};return s==null&&g.vnode!=null&&g.vnode(a),a}function D(e){return e.children}function N(e,t){this.props=e,this.context=t}function A(e,t){if(t==null)return e.__?A(e.__,e.__i+1):null;for(var o;t<e.__k.length;t++)if((o=e.__k[t])!=null&&o.__e!=null)return o.__e;return typeof e.type=="function"?A(e):null}function ue(e){var t,o;if((e=e.__)!=null&&e.__c!=null){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if((o=e.__k[t])!=null&&o.__e!=null){e.__e=e.__c.base=o.__e;break}return ue(e)}}function ae(e){(!e.__d&&(e.__d=!0)&&T.push(e)&&!U.__r++||re!=g.debounceRendering)&&((re=g.debounceRendering)||ce)(U)}function U(){for(var e,t,o,r,s,a,c,f=1;T.length;)T.length>f&&T.sort(fe),e=T.shift(),f=T.length,e.__d&&(o=void 0,r=void 0,s=(r=(t=e).__v).__e,a=[],c=[],t.__P&&((o=S({},r)).__v=r.__v+1,g.vnode&&g.vnode(o),J(t.__P,o,r,t.__n,t.__P.namespaceURI,32&r.__u?[s]:null,a,s==null?A(r):s,!!(32&r.__u),c),o.__v=r.__v,o.__.__k[o.__i]=o,be(a,o,c),r.__e=r.__=null,o.__e!=s&&ue(o)));U.__r=0}function _e(e,t,o,r,s,a,c,f,d,l,p){var n,_,u,w,k,x,h,b=r&&r.__k||pe,F=t.length;for(d=Be(o,t,b,d,F),n=0;n<F;n++)(u=o.__k[n])!=null&&(_=u.__i==-1?R:b[u.__i]||R,u.__i=n,x=J(e,u,_,s,a,c,f,d,l,p),w=u.__e,u.ref&&_.ref!=u.ref&&(_.ref&&Z(_.ref,null,u),p.push(u.ref,u.__c||w,u)),k==null&&w!=null&&(k=w),(h=!!(4&u.__u))||_.__k===u.__k?d=ge(u,d,e,h):typeof u.type=="function"&&x!==void 0?d=x:w&&(d=w.nextSibling),u.__u&=-7);return o.__e=k,d}function Be(e,t,o,r,s){var a,c,f,d,l,p=o.length,n=p,_=0;for(e.__k=new Array(s),a=0;a<s;a++)(c=t[a])!=null&&typeof c!="boolean"&&typeof c!="function"?(typeof c=="string"||typeof c=="number"||typeof c=="bigint"||c.constructor==String?c=e.__k[a]=q(null,c,null,null,null):B(c)?c=e.__k[a]=q(D,{children:c},null,null,null):c.constructor==null&&c.__b>0?c=e.__k[a]=q(c.type,c.props,c.key,c.ref?c.ref:null,c.__v):e.__k[a]=c,d=a+_,c.__=e,c.__b=e.__b+1,(l=c.__i=je(c,o,d,n))!=-1&&(n--,(f=o[l])&&(f.__u|=2)),f==null||f.__v==null?(l==-1&&(s>p?_--:s<p&&_++),typeof c.type!="function"&&(c.__u|=4)):l!=d&&(l==d-1?_--:l==d+1?_++:(l>d?_--:_++,c.__u|=4))):e.__k[a]=null;if(n)for(a=0;a<p;a++)(f=o[a])!=null&&!(2&f.__u)&&(f.__e==r&&(r=A(f)),me(f,f));return r}function ge(e,t,o,r){var s,a;if(typeof e.type=="function"){for(s=e.__k,a=0;s&&a<s.length;a++)s[a]&&(s[a].__=e,t=ge(s[a],t,o,r));return t}e.__e!=t&&(r&&(t&&e.type&&!t.parentNode&&(t=A(e)),o.insertBefore(e.__e,t||null)),t=e.__e);do t=t&&t.nextSibling;while(t!=null&&t.nodeType==8);return t}function je(e,t,o,r){var s,a,c,f=e.key,d=e.type,l=t[o],p=l!=null&&(2&l.__u)==0;if(l===null&&f==null||p&&f==l.key&&d==l.type)return o;if(r>(p?1:0)){for(s=o-1,a=o+1;s>=0||a<t.length;)if((l=t[c=s>=0?s--:a++])!=null&&!(2&l.__u)&&f==l.key&&d==l.type)return c}return-1}function ie(e,t,o){t[0]=="-"?e.setProperty(t,o==null?"":o):e[t]=o==null?"":typeof o!="number"||Ue.test(t)?o:o+"px"}function M(e,t,o,r,s){var a,c;e:if(t=="style")if(typeof o=="string")e.style.cssText=o;else{if(typeof r=="string"&&(e.style.cssText=r=""),r)for(t in r)o&&t in o||ie(e.style,t,"");if(o)for(t in o)r&&o[t]==r[t]||ie(e.style,t,o[t])}else if(t[0]=="o"&&t[1]=="n")a=t!=(t=t.replace(de,"$1")),c=t.toLowerCase(),t=c in e||t=="onFocusOut"||t=="onFocusIn"?c.slice(2):t.slice(2),e.l||(e.l={}),e.l[t+a]=o,o?r?o.u=r.u:(o.u=Y,e.addEventListener(t,a?G:$,a)):e.removeEventListener(t,a?G:$,a);else{if(s=="http://www.w3.org/2000/svg")t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(t!="width"&&t!="height"&&t!="href"&&t!="list"&&t!="form"&&t!="tabIndex"&&t!="download"&&t!="rowSpan"&&t!="colSpan"&&t!="role"&&t!="popover"&&t in e)try{e[t]=o==null?"":o;break e}catch(f){}typeof o=="function"||(o==null||o===!1&&t[4]!="-"?e.removeAttribute(t):e.setAttribute(t,t=="popover"&&o==1?"":o))}}function se(e){return function(t){if(this.l){var o=this.l[t.type+e];if(t.t==null)t.t=Y++;else if(t.t<o.u)return;return o(g.event?g.event(t):t)}}}function J(e,t,o,r,s,a,c,f,d,l){var p,n,_,u,w,k,x,h,b,F,E,L,z,ne,P,H,V,C=t.type;if(t.constructor!=null)return null;128&o.__u&&(d=!!(32&o.__u),a=[f=t.__e=o.__e]),(p=g.__b)&&p(t);e:if(typeof C=="function")try{if(h=t.props,b="prototype"in C&&C.prototype.render,F=(p=C.contextType)&&r[p.__c],E=p?F?F.props.value:p.__:r,o.__c?x=(n=t.__c=o.__c).__=n.__E:(b?t.__c=n=new C(h,E):(t.__c=n=new N(h,E),n.constructor=C,n.render=Ve),F&&F.sub(n),n.state||(n.state={}),n.__n=r,_=n.__d=!0,n.__h=[],n._sb=[]),b&&n.__s==null&&(n.__s=n.state),b&&C.getDerivedStateFromProps!=null&&(n.__s==n.state&&(n.__s=S({},n.__s)),S(n.__s,C.getDerivedStateFromProps(h,n.__s))),u=n.props,w=n.state,n.__v=t,_)b&&C.getDerivedStateFromProps==null&&n.componentWillMount!=null&&n.componentWillMount(),b&&n.componentDidMount!=null&&n.__h.push(n.componentDidMount);else{if(b&&C.getDerivedStateFromProps==null&&h!==u&&n.componentWillReceiveProps!=null&&n.componentWillReceiveProps(h,E),t.__v==o.__v||!n.__e&&n.shouldComponentUpdate!=null&&n.shouldComponentUpdate(h,n.__s,E)===!1){for(t.__v!=o.__v&&(n.props=h,n.state=n.__s,n.__d=!1),t.__e=o.__e,t.__k=o.__k,t.__k.some(function(I){I&&(I.__=t)}),L=0;L<n._sb.length;L++)n.__h.push(n._sb[L]);n._sb=[],n.__h.length&&c.push(n);break e}n.componentWillUpdate!=null&&n.componentWillUpdate(h,n.__s,E),b&&n.componentDidUpdate!=null&&n.__h.push(function(){n.componentDidUpdate(u,w,k)})}if(n.context=E,n.props=h,n.__P=e,n.__e=!1,z=g.__r,ne=0,b){for(n.state=n.__s,n.__d=!1,z&&z(t),p=n.render(n.props,n.state,n.context),P=0;P<n._sb.length;P++)n.__h.push(n._sb[P]);n._sb=[]}else do n.__d=!1,z&&z(t),p=n.render(n.props,n.state,n.context),n.state=n.__s;while(n.__d&&++ne<25);n.state=n.__s,n.getChildContext!=null&&(r=S(S({},r),n.getChildContext())),b&&!_&&n.getSnapshotBeforeUpdate!=null&&(k=n.getSnapshotBeforeUpdate(u,w)),H=p,p!=null&&p.type===D&&p.key==null&&(H=he(p.props.children)),f=_e(e,B(H)?H:[H],t,o,r,s,a,c,f,d,l),n.base=t.__e,t.__u&=-161,n.__h.length&&c.push(n),x&&(n.__E=n.__=null)}catch(I){if(t.__v=null,d||a!=null)if(I.then){for(t.__u|=d?160:128;f&&f.nodeType==8&&f.nextSibling;)f=f.nextSibling;a[a.indexOf(f)]=null,t.__e=f}else{for(V=a.length;V--;)K(a[V]);Q(t)}else t.__e=o.__e,t.__k=o.__k,I.then||Q(t);g.__e(I,t,o)}else a==null&&t.__v==o.__v?(t.__k=o.__k,t.__e=o.__e):f=t.__e=Oe(o.__e,t,o,r,s,a,c,d,l);return(p=g.diffed)&&p(t),128&t.__u?void 0:f}function Q(e){e&&e.__c&&(e.__c.__e=!0),e&&e.__k&&e.__k.forEach(Q)}function be(e,t,o){for(var r=0;r<o.length;r++)Z(o[r],o[++r],o[++r]);g.__c&&g.__c(t,e),e.some(function(s){try{e=s.__h,s.__h=[],e.some(function(a){a.call(s)})}catch(a){g.__e(a,s.__v)}})}function he(e){return typeof e!="object"||e==null||e.__b&&e.__b>0?e:B(e)?e.map(he):S({},e)}function Oe(e,t,o,r,s,a,c,f,d){var l,p,n,_,u,w,k,x=o.props||R,h=t.props,b=t.type;if(b=="svg"?s="http://www.w3.org/2000/svg":b=="math"?s="http://www.w3.org/1998/Math/MathML":s||(s="http://www.w3.org/1999/xhtml"),a!=null){for(l=0;l<a.length;l++)if((u=a[l])&&"setAttribute"in u==!!b&&(b?u.localName==b:u.nodeType==3)){e=u,a[l]=null;break}}if(e==null){if(b==null)return document.createTextNode(h);e=document.createElementNS(s,b,h.is&&h),f&&(g.__m&&g.__m(t,a),f=!1),a=null}if(b==null)x===h||f&&e.data==h||(e.data=h);else{if(a=a&&W.call(e.childNodes),!f&&a!=null)for(x={},l=0;l<e.attributes.length;l++)x[(u=e.attributes[l]).name]=u.value;for(l in x)if(u=x[l],l!="children"){if(l=="dangerouslySetInnerHTML")n=u;else if(!(l in h)){if(l=="value"&&"defaultValue"in h||l=="checked"&&"defaultChecked"in h)continue;M(e,l,null,u,s)}}for(l in h)u=h[l],l=="children"?_=u:l=="dangerouslySetInnerHTML"?p=u:l=="value"?w=u:l=="checked"?k=u:f&&typeof u!="function"||x[l]===u||M(e,l,u,x[l],s);if(p)f||n&&(p.__html==n.__html||p.__html==e.innerHTML)||(e.innerHTML=p.__html),t.__k=[];else if(n&&(e.innerHTML=""),_e(t.type=="template"?e.content:e,B(_)?_:[_],t,o,r,b=="foreignObject"?"http://www.w3.org/1999/xhtml":s,a,c,a?a[0]:o.__k&&A(o,0),f,d),a!=null)for(l=a.length;l--;)K(a[l]);f||(l="value",b=="progress"&&w==null?e.removeAttribute("value"):w!=null&&(w!==e[l]||b=="progress"&&!w||b=="option"&&w!=x[l])&&M(e,l,w,x[l],s),l="checked",k!=null&&k!=e[l]&&M(e,l,k,x[l],s))}return e}function Z(e,t,o){try{if(typeof e=="function"){var r=typeof e.__u=="function";r&&e.__u(),r&&t==null||(e.__u=e(t))}else e.current=t}catch(s){g.__e(s,o)}}function me(e,t,o){var r,s;if(g.unmount&&g.unmount(e),(r=e.ref)&&(r.current&&r.current!=e.__e||Z(r,null,t)),(r=e.__c)!=null){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(a){g.__e(a,t)}r.base=r.__P=null}if(r=e.__k)for(s=0;s<r.length;s++)r[s]&&me(r[s],t,o||typeof e.type!="function");o||K(e.__e),e.__c=e.__=e.__e=void 0}function Ve(e,t,o){return this.constructor(e,o)}function ve(e,t,o){var r,s,a,c;t==document&&(t=document.documentElement),g.__&&g.__(e,t),s=(r=typeof o=="function")?null:o&&o.__k||t.__k,a=[],c=[],J(t,e=(!r&&o||t).__k=We(D,null,[e]),s||R,R,t.namespaceURI,!r&&o?[o]:s?null:t.firstChild?W.call(t.childNodes):null,a,!r&&o?o:s?s.__e:t.firstChild,r,c),be(a,e,c)}W=pe.slice,g={__e:function(e,t,o,r){for(var s,a,c;t=t.__;)if((s=t.__c)&&!s.__)try{if((a=s.constructor)&&a.getDerivedStateFromError!=null&&(s.setState(a.getDerivedStateFromError(e)),c=s.__d),s.componentDidCatch!=null&&(s.componentDidCatch(e,r||{}),c=s.__d),c)return s.__E=s}catch(f){e=f}throw e}},le=0,qe=function(e){return e!=null&&e.constructor==null},N.prototype.setState=function(e,t){var o;o=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=S({},this.state),typeof e=="function"&&(e=e(S({},o),this.props)),e&&S(o,e),e!=null&&this.__v&&(t&&this._sb.push(t),ae(this))},N.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),ae(this))},N.prototype.render=D,T=[],ce=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,fe=function(e,t){return e.__v.__b-t.__v.__b},U.__r=0,de=/(PointerCapture)$|Capture$/i,Y=0,$=se(!1),G=se(!0),Ne=0;var ee,m,X,we,te=0,Te=[],v=g,xe=v.__b,ye=v.__r,ke=v.diffed,Ce=v.__c,Se=v.unmount,Fe=v.__;function $e(e,t){v.__h&&v.__h(m,e,te||t),te=0;var o=m.__H||(m.__H={__:[],__h:[]});return e>=o.__.length&&o.__.push({}),o.__[e]}function y(e){return te=1,Ge(Ie,e)}function Ge(e,t,o){var r=$e(ee++,2);if(r.t=e,!r.__c&&(r.__=[o?o(t):Ie(void 0,t),function(f){var d=r.__N?r.__N[0]:r.__[0],l=r.t(d,f);d!==l&&(r.__N=[l,r.__[1]],r.__c.setState({}))}],r.__c=m,!m.__f)){var s=function(f,d,l){if(!r.__c.__H)return!0;var p=r.__c.__H.__.filter(function(_){return!!_.__c});if(p.every(function(_){return!_.__N}))return!a||a.call(this,f,d,l);var n=r.__c.props!==f;return p.forEach(function(_){if(_.__N){var u=_.__[0];_.__=_.__N,_.__N=void 0,u!==_.__[0]&&(n=!0)}}),a&&a.call(this,f,d,l)||n};m.__f=!0;var a=m.shouldComponentUpdate,c=m.componentWillUpdate;m.componentWillUpdate=function(f,d,l){if(this.__e){var p=a;a=void 0,s(f,d,l),a=p}c&&c.call(this,f,d,l)},m.shouldComponentUpdate=s}return r.__N||r.__}function Qe(){for(var e;e=Te.shift();)if(e.__P&&e.__H)try{e.__H.__h.forEach(j),e.__H.__h.forEach(oe),e.__H.__h=[]}catch(t){e.__H.__h=[],v.__e(t,e.__v)}}v.__b=function(e){m=null,xe&&xe(e)},v.__=function(e,t){e&&t.__k&&t.__k.__m&&(e.__m=t.__k.__m),Fe&&Fe(e,t)},v.__r=function(e){ye&&ye(e),ee=0;var t=(m=e.__c).__H;t&&(X===m?(t.__h=[],m.__h=[],t.__.forEach(function(o){o.__N&&(o.__=o.__N),o.u=o.__N=void 0})):(t.__h.forEach(j),t.__h.forEach(oe),t.__h=[],ee=0)),X=m},v.diffed=function(e){ke&&ke(e);var t=e.__c;t&&t.__H&&(t.__H.__h.length&&(Te.push(t)!==1&&we===v.requestAnimationFrame||((we=v.requestAnimationFrame)||Ye)(Qe)),t.__H.__.forEach(function(o){o.u&&(o.__H=o.u),o.u=void 0})),X=m=null},v.__c=function(e,t){t.some(function(o){try{o.__h.forEach(j),o.__h=o.__h.filter(function(r){return!r.__||oe(r)})}catch(r){t.some(function(s){s.__h&&(s.__h=[])}),t=[],v.__e(r,o.__v)}}),Ce&&Ce(e,t)},v.unmount=function(e){Se&&Se(e);var t,o=e.__c;o&&o.__H&&(o.__H.__.forEach(function(r){try{j(r)}catch(s){t=s}}),o.__H=void 0,t&&v.__e(t,o.__v))};var Ee=typeof requestAnimationFrame=="function";function Ye(e){var t,o=function(){clearTimeout(r),Ee&&cancelAnimationFrame(t),setTimeout(e)},r=setTimeout(o,35);Ee&&(t=requestAnimationFrame(o))}function j(e){var t=m,o=e.__c;typeof o=="function"&&(e.__c=void 0,o()),m=t}function oe(e){var t=m;e.__c=e.__(),m=t}function Ie(e,t){return typeof t=="function"?t(e):t}var Ae=[{id:"1",type:"suggestion",message:"Would love to see dark mode support!",email:"user@example.com",createdAt:"2024-12-10"},{id:"2",type:"bug",message:"The submit button is not working on mobile Safari",createdAt:"2024-12-09"}],De=[{id:"1",title:"Dark Mode",description:"Add support for dark mode theme",votes:42,status:"planned",createdAt:"2024-12-01"},{id:"2",title:"Email Notifications",description:"Get notified when someone replies to your feedback",votes:28,status:"in-progress",createdAt:"2024-11-28"},{id:"3",title:"Export to CSV",description:"Export all feedback data to CSV format",votes:15,status:"under-review",createdAt:"2024-11-25"},{id:"4",title:"Slack Integration",description:"Post new feedback directly to Slack channels",votes:35,status:"completed",createdAt:"2024-11-20"}],ze=[{id:"1",title:"API Integrations",description:"Connect with Slack, Discord, and other tools",status:"in-progress",quarter:"Q1 2025"},{id:"2",title:"Analytics Dashboard",description:"View feedback trends and insights",status:"planned",quarter:"Q1 2025"},{id:"3",title:"Custom Branding",description:"Customize colors, logo, and styling",status:"planned",quarter:"Q2 2025"},{id:"4",title:"Multi-language Support",description:"Support for 10+ languages",status:"planned",quarter:"Q2 2025"}],He=[{id:"1",version:"1.2.0",title:"Feature Requests & Voting",description:"Users can now submit and vote on feature requests",changes:["Added feature request submission form","Implemented upvoting system","Added status badges for features"],date:"2024-12-08"},{id:"2",version:"1.1.0",title:"Improved Feedback Form",description:"Enhanced the feedback submission experience",changes:["Added feedback categories (bug, suggestion, other)","Optional email field for follow-ups","Better mobile responsiveness"],date:"2024-11-25"},{id:"3",version:"1.0.0",title:"Initial Release",description:"First public release of the feedback widget",changes:["Basic feedback submission","Embeddable widget script","Simple and clean UI"],date:"2024-11-10"}];var Ke=0,ft=Array.isArray;function i(e,t,o,r,s,a){t||(t={});var c,f,d=t;if("ref"in d)for(f in d={},t)f=="ref"?c=t[f]:d[f]=t[f];var l={type:e,props:d,key:o,ref:c,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--Ke,__i:-1,__u:0,__source:s,__self:a};if(typeof e=="function"&&(c=e.defaultProps))for(f in c)d[f]===void 0&&(d[f]=c[f]);return g.vnode&&g.vnode(l),l}var Je=()=>i("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:i("path",{d:"M5 15l7-7 7 7"})}),Ze=()=>i("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:i("path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"})}),Xe=()=>i("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:i("path",{d:"M18 6L6 18M6 6l12 12"})});var O=({active:e,onClick:t,children:o})=>i("button",{class:`fw-tab ${e?"active":""}`,onClick:t,children:o}),Re=({status:e})=>i("span",{class:`fw-badge fw-badge-${e}`,children:e.replace("-"," ")}),et=({feedback:e,onSubmit:t})=>{let[o,r]=y("suggestion"),[s,a]=y(""),[c,f]=y(""),[d,l]=y(!1);return i("div",{class:"fw-feedback-container",children:[i("form",{class:"fw-create-form",onSubmit:n=>{n.preventDefault(),s.trim()&&(t({type:o,message:s,email:c||void 0}),a(""),f(""),l(!0),setTimeout(()=>l(!1),3e3))},children:i("div",{class:"fw-form-inner",children:[i("h3",{class:"fw-form-title",children:"Send us your feedback"}),i("p",{class:"fw-form-subtitle",children:"Help us improve by sharing your thoughts"}),i("div",{class:"fw-form-group",children:[i("label",{class:"fw-label",children:"Feedback Type"}),i("div",{class:"fw-type-buttons",children:["suggestion","bug","other"].map(n=>i("button",{type:"button",class:`fw-type-btn ${o===n?"active":""}`,onClick:()=>r(n),children:[n==="suggestion"&&"\u{1F4A1}"," ",n==="bug"&&"\u{1F41B}"," ",n==="other"&&"\u{1F4DD}"," ",n.charAt(0).toUpperCase()+n.slice(1)]},n))})]}),i("div",{class:"fw-form-group",children:[i("label",{class:"fw-label",children:"Your Message"}),i("textarea",{class:"fw-textarea",value:s,onInput:n=>a(n.target.value),placeholder:"Tell us what you think...",required:!0})]}),i("div",{class:"fw-form-group",children:[i("label",{class:"fw-label",children:"Email (optional)"}),i("input",{type:"email",class:"fw-input",value:c,onInput:n=>f(n.target.value),placeholder:"your@email.com"})]}),i("button",{type:"submit",class:"fw-submit-btn",children:"Submit Feedback"}),d&&i("p",{class:"fw-success-msg",children:"\u2713 Thank you for your feedback!"})]})}),i("div",{class:"fw-feedback-list-section",children:[i("h3",{class:"fw-section-title",children:"Recent Feedback"}),i("div",{class:"fw-feedback-list",children:e.map(n=>i("div",{class:"fw-feedback-item",children:[i("div",{class:"fw-feedback-header",children:[i("span",{class:`fw-badge fw-badge-${n.type}`,children:n.type}),i("span",{class:"fw-feedback-date",children:n.createdAt})]}),i("p",{class:"fw-feedback-text",children:n.message})]},n.id))})]})]})},tt=({features:e,onVote:t,onSubmit:o})=>{let[r,s]=y(!1),[a,c]=y(""),[f,d]=y(""),l=n=>{n.preventDefault(),!(!a.trim()||!f.trim())&&(o({title:a,description:f}),c(""),d(""),s(!1))},p=[...e].sort((n,_)=>_.votes-n.votes);return i("div",{class:"fw-features-container",children:[i("div",{class:"fw-features-header",children:[i("div",{children:[i("h3",{class:"fw-section-title",children:"Feature Requests"}),i("p",{class:"fw-section-subtitle",children:"Vote on features you'd like to see"})]}),i("button",{class:"fw-link-btn",onClick:()=>s(!r),children:r?"Cancel":"\u271A Request Feature"})]}),r&&i("form",{class:"fw-create-form",onSubmit:l,children:i("div",{class:"fw-form-inner",children:[i("div",{class:"fw-form-group",children:[i("label",{class:"fw-label",children:"Feature Title"}),i("input",{type:"text",class:"fw-input",value:a,onInput:n=>c(n.target.value),placeholder:"What feature would you like?",required:!0})]}),i("div",{class:"fw-form-group",children:[i("label",{class:"fw-label",children:"Description"}),i("textarea",{class:"fw-textarea",value:f,onInput:n=>d(n.target.value),placeholder:"Explain why you need this...",required:!0})]}),i("button",{type:"submit",class:"fw-submit-btn",children:"Submit Request"})]})}),i("div",{class:"fw-feature-list",children:p.map(n=>i("div",{class:"fw-feature-item",children:[i("button",{class:"fw-vote-btn",onClick:()=>t(n.id),title:"Vote for this feature",children:[i(Je,{}),i("span",{class:"fw-vote-count",children:n.votes})]}),i("div",{class:"fw-feature-body",children:[i("div",{class:"fw-feature-title-row",children:[i("span",{class:"fw-feature-title",children:n.title}),i(Re,{status:n.status})]}),i("p",{class:"fw-feature-desc",children:n.description})]})]},n.id))})]})},ot=({items:e})=>{let t=e.reduce((o,r)=>(o[r.quarter]||(o[r.quarter]=[]),o[r.quarter].push(r),o),{});return i("div",{class:"fw-roadmap-container",children:[i("div",{class:"fw-roadmap-header",children:[i("h3",{class:"fw-section-title",children:"Product Roadmap"}),i("p",{class:"fw-section-subtitle",children:"See what's coming next"})]}),i("div",{class:"fw-roadmap-timeline",children:Object.entries(t).map(([o,r])=>i("div",{class:"fw-roadmap-quarter",children:[i("h4",{class:"fw-quarter-title",children:o}),i("div",{class:"fw-roadmap-items",children:r.map(s=>i("div",{class:"fw-roadmap-item",children:[i("div",{class:"fw-roadmap-status",children:i(Re,{status:s.status})}),i("div",{class:"fw-roadmap-content",children:[i("span",{class:"fw-roadmap-title",children:s.title}),i("p",{class:"fw-roadmap-desc",children:s.description})]})]},s.id))})]},o))})]})},nt=({entries:e})=>i("div",{class:"fw-changelog-container",children:[i("div",{class:"fw-changelog-header",children:[i("h3",{class:"fw-section-title",children:"Changelog"}),i("p",{class:"fw-section-subtitle",children:"Latest updates and improvements"})]}),i("div",{class:"fw-changelog-list",children:e.map(t=>i("div",{class:"fw-changelog-entry",children:[i("div",{class:"fw-changelog-entry-header",children:[i("div",{class:"fw-changelog-version-section",children:[i("span",{class:"fw-version-badge",children:["v",t.version]}),i("span",{class:"fw-changelog-date",children:t.date})]}),i("h4",{class:"fw-changelog-title",children:t.title})]}),i("p",{class:"fw-changelog-desc",children:t.description}),i("ul",{class:"fw-changes-list",children:t.changes.map((o,r)=>i("li",{class:"fw-change-item",children:o},r))})]},t.id))})]}),rt=()=>{let[e,t]=y("feedback"),[o,r]=y(Ae),[s,a]=y(De);return i("div",{class:"fw-widget",children:[i("div",{class:"fw-header",children:i("div",{class:"fw-header-content",children:[i("h2",{children:"Product Feedback"}),i("p",{children:"Share your ideas and help us build a better product"})]})}),i("div",{class:"fw-tabs",children:[i(O,{active:e==="feedback",onClick:()=>t("feedback"),children:"Feedback"}),i(O,{active:e==="features",onClick:()=>t("features"),children:"Requests"}),i(O,{active:e==="roadmap",onClick:()=>t("roadmap"),children:"Roadmap"}),i(O,{active:e==="changelog",onClick:()=>t("changelog"),children:"Updates"})]}),i("div",{class:"fw-content",children:[e==="feedback"&&i(et,{feedback:o,onSubmit:l=>{r([{...l,id:Date.now().toString(),createdAt:new Date().toISOString().split("T")[0]},...o])}}),e==="features"&&i(tt,{features:s,onVote:l=>{a(s.map(p=>p.id===l?{...p,votes:p.votes+1}:p))},onSubmit:l=>{a([{...l,id:Date.now().toString(),votes:1,status:"under-review",createdAt:new Date().toISOString().split("T")[0]},...s])}}),e==="roadmap"&&i(ot,{items:ze}),e==="changelog"&&i(nt,{entries:He})]}),i("div",{class:"fw-footer",children:i("span",{children:"Powered by Feedback Widget"})})]})},Le=()=>{let[e,t]=y(!1);return i("div",{children:[i("button",{class:"fw-popup-trigger",onClick:()=>t(!e),children:e?i(Xe,{}):i(Ze,{})}),i("div",{class:`fw-popup-container ${e?"":"hidden"}`,children:i(rt,{})})]})};var Pe=`
/* Reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Container */
.fw-widget {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif;
  font-size: 14px;
  line-height: 1.6;
  color: #1f2937;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04);
  border: 1px solid #e5e7eb;
  overflow: hidden;
  max-width: 900px;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* Header */
.fw-header {
  padding: 28px 32px;
  background: linear-gradient(135deg, #fafbfc 0%, #ffffff 100%);
  border-bottom: 1px solid #e5e7eb;
  flex-shrink: 0;
}

.fw-header-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.fw-header h2 {
  font-size: 26px;
  font-weight: 700;
  color: #111827;
  margin: 0;
  letter-spacing: -0.6px;
}

.fw-header p {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
  font-weight: 400;
}

/* Tabs */
.fw-tabs {
  display: flex;
  gap: 0;
  padding: 0 24px;
  border-bottom: 1px solid #e5e7eb;
  overflow-x: auto;
  background: #ffffff;
  flex-shrink: 0;
}

.fw-tab {
  padding: 16px 20px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 0;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  background: transparent;
  color: #6b7280;
  margin: 0;
}

.fw-tab:hover {
  color: #374151;
  background: transparent;
}

.fw-tab.active {
  background: transparent;
  color: #2563eb;
  border-bottom-color: #2563eb;
}

/* Content */
.fw-content {
  padding: 32px;
  flex: 1;
  overflow-y: auto;
}

/* Form Styles */
.fw-create-form {
  background: #f8f9fa;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  margin-bottom: 32px;
}

.fw-form-inner {
  padding: 24px;
}

.fw-form-title {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 6px 0;
}

.fw-form-subtitle {
  font-size: 13px;
  color: #6b7280;
  margin: 0 0 20px 0;
}

.fw-form-group {
  margin-bottom: 16px;
}

.fw-label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
}

.fw-input, .fw-textarea {
  width: 100%;
  padding: 10px 14px;
  font-size: 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #ffffff;
  color: #1f2937;
  font-family: inherit;
  transition: all 0.15s ease;
}

.fw-input:focus, .fw-textarea:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.fw-textarea {
  resize: none;
  min-height: 100px;
}

.fw-type-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.fw-type-btn {
  padding: 8px 14px;
  font-size: 13px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  background: #ffffff;
  color: #374151;
  cursor: pointer;
  text-transform: capitalize;
  font-weight: 500;
  transition: all 0.15s ease;
}

.fw-type-btn:hover {
  background: #f3f4f6;
  border-color: #9ca3af;
}

.fw-type-btn.active {
  background: #2563eb;
  color: #ffffff;
  border-color: #2563eb;
}

.fw-submit-btn {
  width: 100%;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  background: #2563eb;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;
}

.fw-submit-btn:hover {
  background: #1d4ed8;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.fw-success-msg {
  margin-top: 12px;
  padding: 12px;
  font-size: 13px;
  color: #059669;
  background: #dcfce7;
  border-radius: 6px;
  text-align: center;
}

/* Section Headers */
.fw-section-title {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 4px 0;
}

.fw-section-subtitle {
  font-size: 13px;
  color: #6b7280;
  margin: 0;
}

.fw-quarter-title {
  font-size: 12px;
  font-weight: 700;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 16px;
  margin-top: 24px;
}

.fw-quarter-title:first-child {
  margin-top: 0;
}

/* Badges */
.fw-badge {
  display: inline-block;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 6px;
  text-transform: capitalize;
}

.fw-badge-bug {
  background: #fee2e2;
  color: #dc2626;
}

.fw-badge-suggestion {
  background: #dbeafe;
  color: #1e40af;
}

.fw-badge-other {
  background: #f3f4f6;
  color: #4b5563;
}

.fw-badge-under-review {
  background: #fef08a;
  color: #92400e;
}

.fw-badge-planned {
  background: #dbeafe;
  color: #1e40af;
}

.fw-badge-in-progress {
  background: #e9d5ff;
  color: #6b21a8;
}

.fw-badge-completed {
  background: #dcfce7;
  color: #166534;
}

/* Feedback Section */
.fw-feedback-container {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.fw-feedback-list-section {
  display: flex;
  flex-direction: column;
}

.fw-feedback-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.fw-feedback-item {
  padding: 16px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.fw-feedback-item:hover {
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.fw-feedback-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.fw-feedback-date {
  font-size: 12px;
  color: #9ca3af;
  margin-left: auto;
}

.fw-feedback-text {
  font-size: 14px;
  color: #374151;
  margin: 0;
  line-height: 1.5;
}

/* Features Section */
.fw-features-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.fw-features-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}

.fw-feature-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.fw-feature-item {
  display: flex;
  gap: 16px;
  padding: 16px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.fw-feature-item:hover {
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.fw-vote-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  min-width: 56px;
  background: #f0f1f3;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;
  flex-shrink: 0;
}

.fw-vote-btn:hover {
  background: #e5e7eb;
  transform: scale(1.05);
}

.fw-vote-btn svg {
  width: 18px;
  height: 18px;
  color: #6b7280;
  margin-bottom: 4px;
}

.fw-vote-count {
  font-size: 13px;
  font-weight: 700;
  color: #111827;
}

.fw-feature-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.fw-feature-title-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 6px;
}

.fw-feature-title {
  font-size: 15px;
  font-weight: 600;
  color: #111827;
}

.fw-feature-desc {
  font-size: 13px;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}

/* Roadmap Section */
.fw-roadmap-container {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.fw-roadmap-header {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.fw-roadmap-timeline {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.fw-roadmap-quarter {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.fw-roadmap-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.fw-roadmap-item {
  display: flex;
  gap: 16px;
  padding: 16px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.fw-roadmap-item:hover {
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.fw-roadmap-status {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.fw-roadmap-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.fw-roadmap-title {
  font-size: 15px;
  font-weight: 600;
  color: #111827;
  display: block;
  margin-bottom: 4px;
}

.fw-roadmap-desc {
  font-size: 13px;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}

/* Changelog Section */
.fw-changelog-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.fw-changelog-header {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.fw-changelog-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.fw-changelog-entry {
  padding: 20px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.fw-changelog-entry:hover {
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.fw-changelog-entry-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
}

.fw-changelog-version-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.fw-version-badge {
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 700;
  background: #dbeafe;
  color: #1e40af;
  border-radius: 6px;
}

.fw-changelog-date {
  font-size: 12px;
  color: #9ca3af;
}

.fw-changelog-title {
  font-size: 16px;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.fw-changelog-desc {
  font-size: 14px;
  color: #6b7280;
  margin: 12px 0;
  line-height: 1.6;
}

.fw-changes-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.fw-change-item {
  font-size: 13px;
  color: #4b5563;
  padding-left: 20px;
  position: relative;
  line-height: 1.5;
}

.fw-change-item::before {
  content: "\u2713";
  position: absolute;
  left: 0;
  color: #10b981;
  font-weight: 700;
}

/* Link Button */
.fw-link-btn {
  background: none;
  border: none;
  color: #2563eb;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding: 8px 12px;
  transition: all 0.2s ease;
  border-radius: 6px;
}

.fw-link-btn:hover {
  background: #eff6ff;
  color: #1d4ed8;
}

/* Footer */
.fw-footer {
  padding: 12px 32px;
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
  text-align: center;
  flex-shrink: 0;
}

.fw-footer span {
  font-size: 11px;
  color: #9ca3af;
}

/* Popup Styles */
.fw-popup-trigger {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #2563eb;
  border: none;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(37, 99, 235, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 9998;
}

.fw-popup-trigger:hover {
  transform: scale(1.08);
  box-shadow: 0 12px 32px rgba(37, 99, 235, 0.4);
}

.fw-popup-trigger svg {
  width: 24px;
  height: 24px;
  color: #ffffff;
}

.fw-popup-container {
  position: fixed;
  bottom: 100px;
  right: 24px;
  z-index: 9999;
  max-width: 900px;
  width: 90vw;
  max-height: 90vh;
  animation: fw-slide-up 0.3s ease;
}

@keyframes fw-slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fw-popup-container.hidden {
  display: none;
}

/* Scrollbar Styling */
.fw-content::-webkit-scrollbar {
  width: 8px;
}

.fw-content::-webkit-scrollbar-track {
  background: transparent;
}

.fw-content::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 4px;
}

.fw-content::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* Responsive Design */
@media (max-width: 768px) {
  .fw-widget {
    max-width: 100%;
    border-radius: 0;
    height: 100vh;
  }

  .fw-header {
    padding: 20px 20px;
  }

  .fw-header h2 {
    font-size: 22px;
  }

  .fw-content {
    padding: 20px;
  }

  .fw-features-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .fw-popup-container {
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    border-radius: 20px 20px 0 0;
    max-width: 100%;
  }
}
`;function Me(){if(!document.getElementById("fw-popup-styles")){let t=document.createElement("style");t.id="fw-popup-styles",t.textContent=Pe,document.head.appendChild(t)}let e=document.createElement("div");e.id="feedback-widget-popup",document.body.appendChild(e),ve(i(Le,{}),e)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Me):Me();window.FeedbackWidget={version:"1.0.0",open:()=>{let e=new CustomEvent("fw-open");window.dispatchEvent(e)},close:()=>{let e=new CustomEvent("fw-close");window.dispatchEvent(e)}};})();
