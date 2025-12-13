"use strict";var FeedbackWidgetInline=(()=>{var U,g,ce,Ne,T,ae,fe,de,pe,Q,$,G,We,L={},ue=[],Ue=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,B=Array.isArray;function C(e,t){for(var o in t)e[o]=t[o];return e}function K(e){e&&e.parentNode&&e.parentNode.removeChild(e)}function Be(e,t,o){var r,i,a,c={};for(a in t)a=="key"?r=t[a]:a=="ref"?i=t[a]:c[a]=t[a];if(arguments.length>2&&(c.children=arguments.length>3?U.call(arguments,2):o),typeof e=="function"&&e.defaultProps!=null)for(a in e.defaultProps)c[a]===void 0&&(c[a]=e.defaultProps[a]);return q(e,c,r,i,null)}function q(e,t,o,r,i){var a={type:e,props:t,key:o,ref:r,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:i==null?++ce:i,__i:-1,__u:0};return i==null&&g.vnode!=null&&g.vnode(a),a}function H(e){return e.children}function N(e,t){this.props=e,this.context=t}function A(e,t){if(t==null)return e.__?A(e.__,e.__i+1):null;for(var o;t<e.__k.length;t++)if((o=e.__k[t])!=null&&o.__e!=null)return o.__e;return typeof e.type=="function"?A(e):null}function _e(e){var t,o;if((e=e.__)!=null&&e.__c!=null){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if((o=e.__k[t])!=null&&o.__e!=null){e.__e=e.__c.base=o.__e;break}return _e(e)}}function ie(e){(!e.__d&&(e.__d=!0)&&T.push(e)&&!W.__r++||ae!=g.debounceRendering)&&((ae=g.debounceRendering)||fe)(W)}function W(){for(var e,t,o,r,i,a,c,f=1;T.length;)T.length>f&&T.sort(de),e=T.shift(),f=T.length,e.__d&&(o=void 0,r=void 0,i=(r=(t=e).__v).__e,a=[],c=[],t.__P&&((o=C({},r)).__v=r.__v+1,g.vnode&&g.vnode(o),J(t.__P,o,r,t.__n,t.__P.namespaceURI,32&r.__u?[i]:null,a,i==null?A(r):i,!!(32&r.__u),c),o.__v=r.__v,o.__.__k[o.__i]=o,me(a,o,c),r.__e=r.__=null,o.__e!=i&&_e(o)));W.__r=0}function ge(e,t,o,r,i,a,c,f,d,l,p){var n,_,u,x,y,w,m,b=r&&r.__k||ue,F=t.length;for(d=je(o,t,b,d,F),n=0;n<F;n++)(u=o.__k[n])!=null&&(_=u.__i==-1?L:b[u.__i]||L,u.__i=n,w=J(e,u,_,i,a,c,f,d,l,p),x=u.__e,u.ref&&_.ref!=u.ref&&(_.ref&&Z(_.ref,null,u),p.push(u.ref,u.__c||x,u)),y==null&&x!=null&&(y=x),(m=!!(4&u.__u))||_.__k===u.__k?d=be(u,d,e,m):typeof u.type=="function"&&w!==void 0?d=w:x&&(d=x.nextSibling),u.__u&=-7);return o.__e=y,d}function je(e,t,o,r,i){var a,c,f,d,l,p=o.length,n=p,_=0;for(e.__k=new Array(i),a=0;a<i;a++)(c=t[a])!=null&&typeof c!="boolean"&&typeof c!="function"?(typeof c=="string"||typeof c=="number"||typeof c=="bigint"||c.constructor==String?c=e.__k[a]=q(null,c,null,null,null):B(c)?c=e.__k[a]=q(H,{children:c},null,null,null):c.constructor==null&&c.__b>0?c=e.__k[a]=q(c.type,c.props,c.key,c.ref?c.ref:null,c.__v):e.__k[a]=c,d=a+_,c.__=e,c.__b=e.__b+1,(l=c.__i=Oe(c,o,d,n))!=-1&&(n--,(f=o[l])&&(f.__u|=2)),f==null||f.__v==null?(l==-1&&(i>p?_--:i<p&&_++),typeof c.type!="function"&&(c.__u|=4)):l!=d&&(l==d-1?_--:l==d+1?_++:(l>d?_--:_++,c.__u|=4))):e.__k[a]=null;if(n)for(a=0;a<p;a++)(f=o[a])!=null&&!(2&f.__u)&&(f.__e==r&&(r=A(f)),ve(f,f));return r}function be(e,t,o,r){var i,a;if(typeof e.type=="function"){for(i=e.__k,a=0;i&&a<i.length;a++)i[a]&&(i[a].__=e,t=be(i[a],t,o,r));return t}e.__e!=t&&(r&&(t&&e.type&&!t.parentNode&&(t=A(e)),o.insertBefore(e.__e,t||null)),t=e.__e);do t=t&&t.nextSibling;while(t!=null&&t.nodeType==8);return t}function Oe(e,t,o,r){var i,a,c,f=e.key,d=e.type,l=t[o],p=l!=null&&(2&l.__u)==0;if(l===null&&f==null||p&&f==l.key&&d==l.type)return o;if(r>(p?1:0)){for(i=o-1,a=o+1;i>=0||a<t.length;)if((l=t[c=i>=0?i--:a++])!=null&&!(2&l.__u)&&f==l.key&&d==l.type)return c}return-1}function se(e,t,o){t[0]=="-"?e.setProperty(t,o==null?"":o):e[t]=o==null?"":typeof o!="number"||Ue.test(t)?o:o+"px"}function M(e,t,o,r,i){var a,c;e:if(t=="style")if(typeof o=="string")e.style.cssText=o;else{if(typeof r=="string"&&(e.style.cssText=r=""),r)for(t in r)o&&t in o||se(e.style,t,"");if(o)for(t in o)r&&o[t]==r[t]||se(e.style,t,o[t])}else if(t[0]=="o"&&t[1]=="n")a=t!=(t=t.replace(pe,"$1")),c=t.toLowerCase(),t=c in e||t=="onFocusOut"||t=="onFocusIn"?c.slice(2):t.slice(2),e.l||(e.l={}),e.l[t+a]=o,o?r?o.u=r.u:(o.u=Q,e.addEventListener(t,a?G:$,a)):e.removeEventListener(t,a?G:$,a);else{if(i=="http://www.w3.org/2000/svg")t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(t!="width"&&t!="height"&&t!="href"&&t!="list"&&t!="form"&&t!="tabIndex"&&t!="download"&&t!="rowSpan"&&t!="colSpan"&&t!="role"&&t!="popover"&&t in e)try{e[t]=o==null?"":o;break e}catch(f){}typeof o=="function"||(o==null||o===!1&&t[4]!="-"?e.removeAttribute(t):e.setAttribute(t,t=="popover"&&o==1?"":o))}}function le(e){return function(t){if(this.l){var o=this.l[t.type+e];if(t.t==null)t.t=Q++;else if(t.t<o.u)return;return o(g.event?g.event(t):t)}}}function J(e,t,o,r,i,a,c,f,d,l){var p,n,_,u,x,y,w,m,b,F,E,R,D,re,P,z,V,S=t.type;if(t.constructor!=null)return null;128&o.__u&&(d=!!(32&o.__u),a=[f=t.__e=o.__e]),(p=g.__b)&&p(t);e:if(typeof S=="function")try{if(m=t.props,b="prototype"in S&&S.prototype.render,F=(p=S.contextType)&&r[p.__c],E=p?F?F.props.value:p.__:r,o.__c?w=(n=t.__c=o.__c).__=n.__E:(b?t.__c=n=new S(m,E):(t.__c=n=new N(m,E),n.constructor=S,n.render=$e),F&&F.sub(n),n.state||(n.state={}),n.__n=r,_=n.__d=!0,n.__h=[],n._sb=[]),b&&n.__s==null&&(n.__s=n.state),b&&S.getDerivedStateFromProps!=null&&(n.__s==n.state&&(n.__s=C({},n.__s)),C(n.__s,S.getDerivedStateFromProps(m,n.__s))),u=n.props,x=n.state,n.__v=t,_)b&&S.getDerivedStateFromProps==null&&n.componentWillMount!=null&&n.componentWillMount(),b&&n.componentDidMount!=null&&n.__h.push(n.componentDidMount);else{if(b&&S.getDerivedStateFromProps==null&&m!==u&&n.componentWillReceiveProps!=null&&n.componentWillReceiveProps(m,E),t.__v==o.__v||!n.__e&&n.shouldComponentUpdate!=null&&n.shouldComponentUpdate(m,n.__s,E)===!1){for(t.__v!=o.__v&&(n.props=m,n.state=n.__s,n.__d=!1),t.__e=o.__e,t.__k=o.__k,t.__k.some(function(I){I&&(I.__=t)}),R=0;R<n._sb.length;R++)n.__h.push(n._sb[R]);n._sb=[],n.__h.length&&c.push(n);break e}n.componentWillUpdate!=null&&n.componentWillUpdate(m,n.__s,E),b&&n.componentDidUpdate!=null&&n.__h.push(function(){n.componentDidUpdate(u,x,y)})}if(n.context=E,n.props=m,n.__P=e,n.__e=!1,D=g.__r,re=0,b){for(n.state=n.__s,n.__d=!1,D&&D(t),p=n.render(n.props,n.state,n.context),P=0;P<n._sb.length;P++)n.__h.push(n._sb[P]);n._sb=[]}else do n.__d=!1,D&&D(t),p=n.render(n.props,n.state,n.context),n.state=n.__s;while(n.__d&&++re<25);n.state=n.__s,n.getChildContext!=null&&(r=C(C({},r),n.getChildContext())),b&&!_&&n.getSnapshotBeforeUpdate!=null&&(y=n.getSnapshotBeforeUpdate(u,x)),z=p,p!=null&&p.type===H&&p.key==null&&(z=he(p.props.children)),f=ge(e,B(z)?z:[z],t,o,r,i,a,c,f,d,l),n.base=t.__e,t.__u&=-161,n.__h.length&&c.push(n),w&&(n.__E=n.__=null)}catch(I){if(t.__v=null,d||a!=null)if(I.then){for(t.__u|=d?160:128;f&&f.nodeType==8&&f.nextSibling;)f=f.nextSibling;a[a.indexOf(f)]=null,t.__e=f}else{for(V=a.length;V--;)K(a[V]);Y(t)}else t.__e=o.__e,t.__k=o.__k,I.then||Y(t);g.__e(I,t,o)}else a==null&&t.__v==o.__v?(t.__k=o.__k,t.__e=o.__e):f=t.__e=Ve(o.__e,t,o,r,i,a,c,d,l);return(p=g.diffed)&&p(t),128&t.__u?void 0:f}function Y(e){e&&e.__c&&(e.__c.__e=!0),e&&e.__k&&e.__k.forEach(Y)}function me(e,t,o){for(var r=0;r<o.length;r++)Z(o[r],o[++r],o[++r]);g.__c&&g.__c(t,e),e.some(function(i){try{e=i.__h,i.__h=[],e.some(function(a){a.call(i)})}catch(a){g.__e(a,i.__v)}})}function he(e){return typeof e!="object"||e==null||e.__b&&e.__b>0?e:B(e)?e.map(he):C({},e)}function Ve(e,t,o,r,i,a,c,f,d){var l,p,n,_,u,x,y,w=o.props||L,m=t.props,b=t.type;if(b=="svg"?i="http://www.w3.org/2000/svg":b=="math"?i="http://www.w3.org/1998/Math/MathML":i||(i="http://www.w3.org/1999/xhtml"),a!=null){for(l=0;l<a.length;l++)if((u=a[l])&&"setAttribute"in u==!!b&&(b?u.localName==b:u.nodeType==3)){e=u,a[l]=null;break}}if(e==null){if(b==null)return document.createTextNode(m);e=document.createElementNS(i,b,m.is&&m),f&&(g.__m&&g.__m(t,a),f=!1),a=null}if(b==null)w===m||f&&e.data==m||(e.data=m);else{if(a=a&&U.call(e.childNodes),!f&&a!=null)for(w={},l=0;l<e.attributes.length;l++)w[(u=e.attributes[l]).name]=u.value;for(l in w)if(u=w[l],l!="children"){if(l=="dangerouslySetInnerHTML")n=u;else if(!(l in m)){if(l=="value"&&"defaultValue"in m||l=="checked"&&"defaultChecked"in m)continue;M(e,l,null,u,i)}}for(l in m)u=m[l],l=="children"?_=u:l=="dangerouslySetInnerHTML"?p=u:l=="value"?x=u:l=="checked"?y=u:f&&typeof u!="function"||w[l]===u||M(e,l,u,w[l],i);if(p)f||n&&(p.__html==n.__html||p.__html==e.innerHTML)||(e.innerHTML=p.__html),t.__k=[];else if(n&&(e.innerHTML=""),ge(t.type=="template"?e.content:e,B(_)?_:[_],t,o,r,b=="foreignObject"?"http://www.w3.org/1999/xhtml":i,a,c,a?a[0]:o.__k&&A(o,0),f,d),a!=null)for(l=a.length;l--;)K(a[l]);f||(l="value",b=="progress"&&x==null?e.removeAttribute("value"):x!=null&&(x!==e[l]||b=="progress"&&!x||b=="option"&&x!=w[l])&&M(e,l,x,w[l],i),l="checked",y!=null&&y!=e[l]&&M(e,l,y,w[l],i))}return e}function Z(e,t,o){try{if(typeof e=="function"){var r=typeof e.__u=="function";r&&e.__u(),r&&t==null||(e.__u=e(t))}else e.current=t}catch(i){g.__e(i,o)}}function ve(e,t,o){var r,i;if(g.unmount&&g.unmount(e),(r=e.ref)&&(r.current&&r.current!=e.__e||Z(r,null,t)),(r=e.__c)!=null){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(a){g.__e(a,t)}r.base=r.__P=null}if(r=e.__k)for(i=0;i<r.length;i++)r[i]&&ve(r[i],t,o||typeof e.type!="function");o||K(e.__e),e.__c=e.__=e.__e=void 0}function $e(e,t,o){return this.constructor(e,o)}function X(e,t,o){var r,i,a,c;t==document&&(t=document.documentElement),g.__&&g.__(e,t),i=(r=typeof o=="function")?null:o&&o.__k||t.__k,a=[],c=[],J(t,e=(!r&&o||t).__k=Be(H,null,[e]),i||L,L,t.namespaceURI,!r&&o?[o]:i?null:t.firstChild?U.call(t.childNodes):null,a,!r&&o?o:i?i.__e:t.firstChild,r,c),me(a,e,c)}U=ue.slice,g={__e:function(e,t,o,r){for(var i,a,c;t=t.__;)if((i=t.__c)&&!i.__)try{if((a=i.constructor)&&a.getDerivedStateFromError!=null&&(i.setState(a.getDerivedStateFromError(e)),c=i.__d),i.componentDidCatch!=null&&(i.componentDidCatch(e,r||{}),c=i.__d),c)return i.__E=i}catch(f){e=f}throw e}},ce=0,Ne=function(e){return e!=null&&e.constructor==null},N.prototype.setState=function(e,t){var o;o=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=C({},this.state),typeof e=="function"&&(e=e(C({},o),this.props)),e&&C(o,e),e!=null&&this.__v&&(t&&this._sb.push(t),ie(this))},N.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),ie(this))},N.prototype.render=H,T=[],fe=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,de=function(e,t){return e.__v.__b-t.__v.__b},W.__r=0,pe=/(PointerCapture)$|Capture$/i,Q=0,$=le(!1),G=le(!0),We=0;var te,h,ee,xe,oe=0,Te=[],v=g,we=v.__b,ye=v.__r,ke=v.diffed,Se=v.__c,Ce=v.unmount,Fe=v.__;function Ge(e,t){v.__h&&v.__h(h,e,oe||t),oe=0;var o=h.__H||(h.__H={__:[],__h:[]});return e>=o.__.length&&o.__.push({}),o.__[e]}function k(e){return oe=1,Ye(Ie,e)}function Ye(e,t,o){var r=Ge(te++,2);if(r.t=e,!r.__c&&(r.__=[o?o(t):Ie(void 0,t),function(f){var d=r.__N?r.__N[0]:r.__[0],l=r.t(d,f);d!==l&&(r.__N=[l,r.__[1]],r.__c.setState({}))}],r.__c=h,!h.__f)){var i=function(f,d,l){if(!r.__c.__H)return!0;var p=r.__c.__H.__.filter(function(_){return!!_.__c});if(p.every(function(_){return!_.__N}))return!a||a.call(this,f,d,l);var n=r.__c.props!==f;return p.forEach(function(_){if(_.__N){var u=_.__[0];_.__=_.__N,_.__N=void 0,u!==_.__[0]&&(n=!0)}}),a&&a.call(this,f,d,l)||n};h.__f=!0;var a=h.shouldComponentUpdate,c=h.componentWillUpdate;h.componentWillUpdate=function(f,d,l){if(this.__e){var p=a;a=void 0,i(f,d,l),a=p}c&&c.call(this,f,d,l)},h.shouldComponentUpdate=i}return r.__N||r.__}function Qe(){for(var e;e=Te.shift();)if(e.__P&&e.__H)try{e.__H.__h.forEach(j),e.__H.__h.forEach(ne),e.__H.__h=[]}catch(t){e.__H.__h=[],v.__e(t,e.__v)}}v.__b=function(e){h=null,we&&we(e)},v.__=function(e,t){e&&t.__k&&t.__k.__m&&(e.__m=t.__k.__m),Fe&&Fe(e,t)},v.__r=function(e){ye&&ye(e),te=0;var t=(h=e.__c).__H;t&&(ee===h?(t.__h=[],h.__h=[],t.__.forEach(function(o){o.__N&&(o.__=o.__N),o.u=o.__N=void 0})):(t.__h.forEach(j),t.__h.forEach(ne),t.__h=[],te=0)),ee=h},v.diffed=function(e){ke&&ke(e);var t=e.__c;t&&t.__H&&(t.__H.__h.length&&(Te.push(t)!==1&&xe===v.requestAnimationFrame||((xe=v.requestAnimationFrame)||Ke)(Qe)),t.__H.__.forEach(function(o){o.u&&(o.__H=o.u),o.u=void 0})),ee=h=null},v.__c=function(e,t){t.some(function(o){try{o.__h.forEach(j),o.__h=o.__h.filter(function(r){return!r.__||ne(r)})}catch(r){t.some(function(i){i.__h&&(i.__h=[])}),t=[],v.__e(r,o.__v)}}),Se&&Se(e,t)},v.unmount=function(e){Ce&&Ce(e);var t,o=e.__c;o&&o.__H&&(o.__H.__.forEach(function(r){try{j(r)}catch(i){t=i}}),o.__H=void 0,t&&v.__e(t,o.__v))};var Ee=typeof requestAnimationFrame=="function";function Ke(e){var t,o=function(){clearTimeout(r),Ee&&cancelAnimationFrame(t),setTimeout(e)},r=setTimeout(o,35);Ee&&(t=requestAnimationFrame(o))}function j(e){var t=h,o=e.__c;typeof o=="function"&&(e.__c=void 0,o()),h=t}function ne(e){var t=h;e.__c=e.__(),h=t}function Ie(e,t){return typeof t=="function"?t(e):t}var Ae=[{id:"1",type:"suggestion",message:"Would love to see dark mode support!",email:"user@example.com",createdAt:"2024-12-10"},{id:"2",type:"bug",message:"The submit button is not working on mobile Safari",createdAt:"2024-12-09"}],He=[{id:"1",title:"Dark Mode",description:"Add support for dark mode theme",votes:42,status:"planned",createdAt:"2024-12-01"},{id:"2",title:"Email Notifications",description:"Get notified when someone replies to your feedback",votes:28,status:"in-progress",createdAt:"2024-11-28"},{id:"3",title:"Export to CSV",description:"Export all feedback data to CSV format",votes:15,status:"under-review",createdAt:"2024-11-25"},{id:"4",title:"Slack Integration",description:"Post new feedback directly to Slack channels",votes:35,status:"completed",createdAt:"2024-11-20"}],De=[{id:"1",title:"API Integrations",description:"Connect with Slack, Discord, and other tools",status:"in-progress",quarter:"Q1 2025"},{id:"2",title:"Analytics Dashboard",description:"View feedback trends and insights",status:"planned",quarter:"Q1 2025"},{id:"3",title:"Custom Branding",description:"Customize colors, logo, and styling",status:"planned",quarter:"Q2 2025"},{id:"4",title:"Multi-language Support",description:"Support for 10+ languages",status:"planned",quarter:"Q2 2025"}],ze=[{id:"1",version:"1.2.0",title:"Feature Requests & Voting",description:"Users can now submit and vote on feature requests",changes:["Added feature request submission form","Implemented upvoting system","Added status badges for features"],date:"2024-12-08"},{id:"2",version:"1.1.0",title:"Improved Feedback Form",description:"Enhanced the feedback submission experience",changes:["Added feedback categories (bug, suggestion, other)","Optional email field for follow-ups","Better mobile responsiveness"],date:"2024-11-25"},{id:"3",version:"1.0.0",title:"Initial Release",description:"First public release of the feedback widget",changes:["Basic feedback submission","Embeddable widget script","Simple and clean UI"],date:"2024-11-10"}];var Je=0,ct=Array.isArray;function s(e,t,o,r,i,a){t||(t={});var c,f,d=t;if("ref"in d)for(f in d={},t)f=="ref"?c=t[f]:d[f]=t[f];var l={type:e,props:d,key:o,ref:c,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--Je,__i:-1,__u:0,__source:i,__self:a};if(typeof e=="function"&&(c=e.defaultProps))for(f in c)d[f]===void 0&&(d[f]=c[f]);return g.vnode&&g.vnode(l),l}var Ze=()=>s("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:s("path",{d:"M5 15l7-7 7 7"})});var O=({active:e,onClick:t,children:o})=>s("button",{class:`fw-tab ${e?"active":""}`,onClick:t,children:o}),Le=({status:e})=>s("span",{class:`fw-badge fw-badge-${e}`,children:e.replace("-"," ")}),Xe=({feedback:e,onSubmit:t})=>{let[o,r]=k("suggestion"),[i,a]=k(""),[c,f]=k(""),[d,l]=k(!1);return s("div",{class:"fw-feedback-container",children:[s("form",{class:"fw-create-form",onSubmit:n=>{n.preventDefault(),i.trim()&&(t({type:o,message:i,email:c||void 0}),a(""),f(""),l(!0),setTimeout(()=>l(!1),3e3))},children:s("div",{class:"fw-form-inner",children:[s("h3",{class:"fw-form-title",children:"Send us your feedback"}),s("p",{class:"fw-form-subtitle",children:"Help us improve by sharing your thoughts"}),s("div",{class:"fw-form-group",children:[s("label",{class:"fw-label",children:"Feedback Type"}),s("div",{class:"fw-type-buttons",children:["suggestion","bug","other"].map(n=>s("button",{type:"button",class:`fw-type-btn ${o===n?"active":""}`,onClick:()=>r(n),children:[n==="suggestion"&&"\u{1F4A1}"," ",n==="bug"&&"\u{1F41B}"," ",n==="other"&&"\u{1F4DD}"," ",n.charAt(0).toUpperCase()+n.slice(1)]},n))})]}),s("div",{class:"fw-form-group",children:[s("label",{class:"fw-label",children:"Your Message"}),s("textarea",{class:"fw-textarea",value:i,onInput:n=>a(n.target.value),placeholder:"Tell us what you think...",required:!0})]}),s("div",{class:"fw-form-group",children:[s("label",{class:"fw-label",children:"Email (optional)"}),s("input",{type:"email",class:"fw-input",value:c,onInput:n=>f(n.target.value),placeholder:"your@email.com"})]}),s("button",{type:"submit",class:"fw-submit-btn",children:"Submit Feedback"}),d&&s("p",{class:"fw-success-msg",children:"\u2713 Thank you for your feedback!"})]})}),s("div",{class:"fw-feedback-list-section",children:[s("h3",{class:"fw-section-title",children:"Recent Feedback"}),s("div",{class:"fw-feedback-list",children:e.map(n=>s("div",{class:"fw-feedback-item",children:[s("div",{class:"fw-feedback-header",children:[s("span",{class:`fw-badge fw-badge-${n.type}`,children:n.type}),s("span",{class:"fw-feedback-date",children:n.createdAt})]}),s("p",{class:"fw-feedback-text",children:n.message})]},n.id))})]})]})},et=({features:e,onVote:t,onSubmit:o})=>{let[r,i]=k(!1),[a,c]=k(""),[f,d]=k(""),l=n=>{n.preventDefault(),!(!a.trim()||!f.trim())&&(o({title:a,description:f}),c(""),d(""),i(!1))},p=[...e].sort((n,_)=>_.votes-n.votes);return s("div",{class:"fw-features-container",children:[s("div",{class:"fw-features-header",children:[s("div",{children:[s("h3",{class:"fw-section-title",children:"Feature Requests"}),s("p",{class:"fw-section-subtitle",children:"Vote on features you'd like to see"})]}),s("button",{class:"fw-link-btn",onClick:()=>i(!r),children:r?"Cancel":"\u271A Request Feature"})]}),r&&s("form",{class:"fw-create-form",onSubmit:l,children:s("div",{class:"fw-form-inner",children:[s("div",{class:"fw-form-group",children:[s("label",{class:"fw-label",children:"Feature Title"}),s("input",{type:"text",class:"fw-input",value:a,onInput:n=>c(n.target.value),placeholder:"What feature would you like?",required:!0})]}),s("div",{class:"fw-form-group",children:[s("label",{class:"fw-label",children:"Description"}),s("textarea",{class:"fw-textarea",value:f,onInput:n=>d(n.target.value),placeholder:"Explain why you need this...",required:!0})]}),s("button",{type:"submit",class:"fw-submit-btn",children:"Submit Request"})]})}),s("div",{class:"fw-feature-list",children:p.map(n=>s("div",{class:"fw-feature-item",children:[s("button",{class:"fw-vote-btn",onClick:()=>t(n.id),title:"Vote for this feature",children:[s(Ze,{}),s("span",{class:"fw-vote-count",children:n.votes})]}),s("div",{class:"fw-feature-body",children:[s("div",{class:"fw-feature-title-row",children:[s("span",{class:"fw-feature-title",children:n.title}),s(Le,{status:n.status})]}),s("p",{class:"fw-feature-desc",children:n.description})]})]},n.id))})]})},tt=({items:e})=>{let t=e.reduce((o,r)=>(o[r.quarter]||(o[r.quarter]=[]),o[r.quarter].push(r),o),{});return s("div",{class:"fw-roadmap-container",children:[s("div",{class:"fw-roadmap-header",children:[s("h3",{class:"fw-section-title",children:"Product Roadmap"}),s("p",{class:"fw-section-subtitle",children:"See what's coming next"})]}),s("div",{class:"fw-roadmap-timeline",children:Object.entries(t).map(([o,r])=>s("div",{class:"fw-roadmap-quarter",children:[s("h4",{class:"fw-quarter-title",children:o}),s("div",{class:"fw-roadmap-items",children:r.map(i=>s("div",{class:"fw-roadmap-item",children:[s("div",{class:"fw-roadmap-status",children:s(Le,{status:i.status})}),s("div",{class:"fw-roadmap-content",children:[s("span",{class:"fw-roadmap-title",children:i.title}),s("p",{class:"fw-roadmap-desc",children:i.description})]})]},i.id))})]},o))})]})},ot=({entries:e})=>s("div",{class:"fw-changelog-container",children:[s("div",{class:"fw-changelog-header",children:[s("h3",{class:"fw-section-title",children:"Changelog"}),s("p",{class:"fw-section-subtitle",children:"Latest updates and improvements"})]}),s("div",{class:"fw-changelog-list",children:e.map(t=>s("div",{class:"fw-changelog-entry",children:[s("div",{class:"fw-changelog-entry-header",children:[s("div",{class:"fw-changelog-version-section",children:[s("span",{class:"fw-version-badge",children:["v",t.version]}),s("span",{class:"fw-changelog-date",children:t.date})]}),s("h4",{class:"fw-changelog-title",children:t.title})]}),s("p",{class:"fw-changelog-desc",children:t.description}),s("ul",{class:"fw-changes-list",children:t.changes.map((o,r)=>s("li",{class:"fw-change-item",children:o},r))})]},t.id))})]}),Re=()=>{let[e,t]=k("feedback"),[o,r]=k(Ae),[i,a]=k(He);return s("div",{class:"fw-widget",children:[s("div",{class:"fw-header",children:s("div",{class:"fw-header-content",children:[s("h2",{children:"Product Feedback"}),s("p",{children:"Share your ideas and help us build a better product"})]})}),s("div",{class:"fw-tabs",children:[s(O,{active:e==="feedback",onClick:()=>t("feedback"),children:"Feedback"}),s(O,{active:e==="features",onClick:()=>t("features"),children:"Requests"}),s(O,{active:e==="roadmap",onClick:()=>t("roadmap"),children:"Roadmap"}),s(O,{active:e==="changelog",onClick:()=>t("changelog"),children:"Updates"})]}),s("div",{class:"fw-content",children:[e==="feedback"&&s(Xe,{feedback:o,onSubmit:l=>{r([{...l,id:Date.now().toString(),createdAt:new Date().toISOString().split("T")[0]},...o])}}),e==="features"&&s(et,{features:i,onVote:l=>{a(i.map(p=>p.id===l?{...p,votes:p.votes+1}:p))},onSubmit:l=>{a([{...l,id:Date.now().toString(),votes:1,status:"under-review",createdAt:new Date().toISOString().split("T")[0]},...i])}}),e==="roadmap"&&s(tt,{items:De}),e==="changelog"&&s(ot,{entries:ze})]}),s("div",{class:"fw-footer",children:s("span",{children:"Powered by Feedback Widget"})})]})};var Pe=`
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
`;var nt=Pe.replace(/\.fw-/g,".fw-");function qe(e){if(!document.getElementById("fw-inline-styles")){let t=document.createElement("style");t.id="fw-inline-styles",t.textContent=nt,document.head.appendChild(t)}X(s(Re,{}),e)}function Me(){let e=document.getElementById("feedback-widget");if(!e){let t=document.getElementsByTagName("script"),o=t[t.length-1];e=document.createElement("div"),e.id="feedback-widget",e.style.maxWidth="512px",e.style.margin="0 auto",o.parentNode?o.parentNode.insertBefore(e,o.nextSibling):document.body.appendChild(e)}qe(e)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Me):Me();window.FeedbackWidget={version:"1.0.0",mount:e=>{let t=document.querySelector(e);t?qe(t):console.error(`FeedbackWidget: Container "${e}" not found`)},unmount:e=>{let t=document.querySelector(e);t&&X(null,t)}};})();
