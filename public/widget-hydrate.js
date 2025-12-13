"use strict";var FeedbackWidgetHydrate=(()=>{var W,g,fe,qe,T,ie,de,pe,ue,Y,$,G,Ne,R={},_e=[],Ue=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,B=Array.isArray;function C(t,e){for(var o in e)t[o]=e[o];return t}function K(t){t&&t.parentNode&&t.parentNode.removeChild(t)}function We(t,e,o){var r,s,a,c={};for(a in e)a=="key"?r=e[a]:a=="ref"?s=e[a]:c[a]=e[a];if(arguments.length>2&&(c.children=arguments.length>3?W.call(arguments,2):o),typeof t=="function"&&t.defaultProps!=null)for(a in t.defaultProps)c[a]===void 0&&(c[a]=t.defaultProps[a]);return q(t,c,r,s,null)}function q(t,e,o,r,s){var a={type:t,props:e,key:o,ref:r,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:s==null?++fe:s,__i:-1,__u:0};return s==null&&g.vnode!=null&&g.vnode(a),a}function D(t){return t.children}function N(t,e){this.props=t,this.context=e}function A(t,e){if(e==null)return t.__?A(t.__,t.__i+1):null;for(var o;e<t.__k.length;e++)if((o=t.__k[e])!=null&&o.__e!=null)return o.__e;return typeof t.type=="function"?A(t):null}function ge(t){var e,o;if((t=t.__)!=null&&t.__c!=null){for(t.__e=t.__c.base=null,e=0;e<t.__k.length;e++)if((o=t.__k[e])!=null&&o.__e!=null){t.__e=t.__c.base=o.__e;break}return ge(t)}}function se(t){(!t.__d&&(t.__d=!0)&&T.push(t)&&!U.__r++||ie!=g.debounceRendering)&&((ie=g.debounceRendering)||de)(U)}function U(){for(var t,e,o,r,s,a,c,f=1;T.length;)T.length>f&&T.sort(pe),t=T.shift(),f=T.length,t.__d&&(o=void 0,r=void 0,s=(r=(e=t).__v).__e,a=[],c=[],e.__P&&((o=C({},r)).__v=r.__v+1,g.vnode&&g.vnode(o),J(e.__P,o,r,e.__n,e.__P.namespaceURI,32&r.__u?[s]:null,a,s==null?A(r):s,!!(32&r.__u),c),o.__v=r.__v,o.__.__k[o.__i]=o,he(a,o,c),r.__e=r.__=null,o.__e!=s&&ge(o)));U.__r=0}function be(t,e,o,r,s,a,c,f,d,l,p){var n,_,u,w,y,x,m,b=r&&r.__k||_e,F=e.length;for(d=Be(o,e,b,d,F),n=0;n<F;n++)(u=o.__k[n])!=null&&(_=u.__i==-1?R:b[u.__i]||R,u.__i=n,x=J(t,u,_,s,a,c,f,d,l,p),w=u.__e,u.ref&&_.ref!=u.ref&&(_.ref&&Z(_.ref,null,u),p.push(u.ref,u.__c||w,u)),y==null&&w!=null&&(y=w),(m=!!(4&u.__u))||_.__k===u.__k?d=me(u,d,t,m):typeof u.type=="function"&&x!==void 0?d=x:w&&(d=w.nextSibling),u.__u&=-7);return o.__e=y,d}function Be(t,e,o,r,s){var a,c,f,d,l,p=o.length,n=p,_=0;for(t.__k=new Array(s),a=0;a<s;a++)(c=e[a])!=null&&typeof c!="boolean"&&typeof c!="function"?(typeof c=="string"||typeof c=="number"||typeof c=="bigint"||c.constructor==String?c=t.__k[a]=q(null,c,null,null,null):B(c)?c=t.__k[a]=q(D,{children:c},null,null,null):c.constructor==null&&c.__b>0?c=t.__k[a]=q(c.type,c.props,c.key,c.ref?c.ref:null,c.__v):t.__k[a]=c,d=a+_,c.__=t,c.__b=t.__b+1,(l=c.__i=je(c,o,d,n))!=-1&&(n--,(f=o[l])&&(f.__u|=2)),f==null||f.__v==null?(l==-1&&(s>p?_--:s<p&&_++),typeof c.type!="function"&&(c.__u|=4)):l!=d&&(l==d-1?_--:l==d+1?_++:(l>d?_--:_++,c.__u|=4))):t.__k[a]=null;if(n)for(a=0;a<p;a++)(f=o[a])!=null&&!(2&f.__u)&&(f.__e==r&&(r=A(f)),we(f,f));return r}function me(t,e,o,r){var s,a;if(typeof t.type=="function"){for(s=t.__k,a=0;s&&a<s.length;a++)s[a]&&(s[a].__=t,e=me(s[a],e,o,r));return e}t.__e!=e&&(r&&(e&&t.type&&!e.parentNode&&(e=A(t)),o.insertBefore(t.__e,e||null)),e=t.__e);do e=e&&e.nextSibling;while(e!=null&&e.nodeType==8);return e}function je(t,e,o,r){var s,a,c,f=t.key,d=t.type,l=e[o],p=l!=null&&(2&l.__u)==0;if(l===null&&f==null||p&&f==l.key&&d==l.type)return o;if(r>(p?1:0)){for(s=o-1,a=o+1;s>=0||a<e.length;)if((l=e[c=s>=0?s--:a++])!=null&&!(2&l.__u)&&f==l.key&&d==l.type)return c}return-1}function le(t,e,o){e[0]=="-"?t.setProperty(e,o==null?"":o):t[e]=o==null?"":typeof o!="number"||Ue.test(e)?o:o+"px"}function M(t,e,o,r,s){var a,c;e:if(e=="style")if(typeof o=="string")t.style.cssText=o;else{if(typeof r=="string"&&(t.style.cssText=r=""),r)for(e in r)o&&e in o||le(t.style,e,"");if(o)for(e in o)r&&o[e]==r[e]||le(t.style,e,o[e])}else if(e[0]=="o"&&e[1]=="n")a=e!=(e=e.replace(ue,"$1")),c=e.toLowerCase(),e=c in t||e=="onFocusOut"||e=="onFocusIn"?c.slice(2):e.slice(2),t.l||(t.l={}),t.l[e+a]=o,o?r?o.u=r.u:(o.u=Y,t.addEventListener(e,a?G:$,a)):t.removeEventListener(e,a?G:$,a);else{if(s=="http://www.w3.org/2000/svg")e=e.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(e!="width"&&e!="height"&&e!="href"&&e!="list"&&e!="form"&&e!="tabIndex"&&e!="download"&&e!="rowSpan"&&e!="colSpan"&&e!="role"&&e!="popover"&&e in t)try{t[e]=o==null?"":o;break e}catch(f){}typeof o=="function"||(o==null||o===!1&&e[4]!="-"?t.removeAttribute(e):t.setAttribute(e,e=="popover"&&o==1?"":o))}}function ce(t){return function(e){if(this.l){var o=this.l[e.type+t];if(e.t==null)e.t=Y++;else if(e.t<o.u)return;return o(g.event?g.event(e):e)}}}function J(t,e,o,r,s,a,c,f,d,l){var p,n,_,u,w,y,x,m,b,F,E,L,H,ae,P,z,V,S=e.type;if(e.constructor!=null)return null;128&o.__u&&(d=!!(32&o.__u),a=[f=e.__e=o.__e]),(p=g.__b)&&p(e);e:if(typeof S=="function")try{if(m=e.props,b="prototype"in S&&S.prototype.render,F=(p=S.contextType)&&r[p.__c],E=p?F?F.props.value:p.__:r,o.__c?x=(n=e.__c=o.__c).__=n.__E:(b?e.__c=n=new S(m,E):(e.__c=n=new N(m,E),n.constructor=S,n.render=Ve),F&&F.sub(n),n.state||(n.state={}),n.__n=r,_=n.__d=!0,n.__h=[],n._sb=[]),b&&n.__s==null&&(n.__s=n.state),b&&S.getDerivedStateFromProps!=null&&(n.__s==n.state&&(n.__s=C({},n.__s)),C(n.__s,S.getDerivedStateFromProps(m,n.__s))),u=n.props,w=n.state,n.__v=e,_)b&&S.getDerivedStateFromProps==null&&n.componentWillMount!=null&&n.componentWillMount(),b&&n.componentDidMount!=null&&n.__h.push(n.componentDidMount);else{if(b&&S.getDerivedStateFromProps==null&&m!==u&&n.componentWillReceiveProps!=null&&n.componentWillReceiveProps(m,E),e.__v==o.__v||!n.__e&&n.shouldComponentUpdate!=null&&n.shouldComponentUpdate(m,n.__s,E)===!1){for(e.__v!=o.__v&&(n.props=m,n.state=n.__s,n.__d=!1),e.__e=o.__e,e.__k=o.__k,e.__k.some(function(I){I&&(I.__=e)}),L=0;L<n._sb.length;L++)n.__h.push(n._sb[L]);n._sb=[],n.__h.length&&c.push(n);break e}n.componentWillUpdate!=null&&n.componentWillUpdate(m,n.__s,E),b&&n.componentDidUpdate!=null&&n.__h.push(function(){n.componentDidUpdate(u,w,y)})}if(n.context=E,n.props=m,n.__P=t,n.__e=!1,H=g.__r,ae=0,b){for(n.state=n.__s,n.__d=!1,H&&H(e),p=n.render(n.props,n.state,n.context),P=0;P<n._sb.length;P++)n.__h.push(n._sb[P]);n._sb=[]}else do n.__d=!1,H&&H(e),p=n.render(n.props,n.state,n.context),n.state=n.__s;while(n.__d&&++ae<25);n.state=n.__s,n.getChildContext!=null&&(r=C(C({},r),n.getChildContext())),b&&!_&&n.getSnapshotBeforeUpdate!=null&&(y=n.getSnapshotBeforeUpdate(u,w)),z=p,p!=null&&p.type===D&&p.key==null&&(z=ve(p.props.children)),f=be(t,B(z)?z:[z],e,o,r,s,a,c,f,d,l),n.base=e.__e,e.__u&=-161,n.__h.length&&c.push(n),x&&(n.__E=n.__=null)}catch(I){if(e.__v=null,d||a!=null)if(I.then){for(e.__u|=d?160:128;f&&f.nodeType==8&&f.nextSibling;)f=f.nextSibling;a[a.indexOf(f)]=null,e.__e=f}else{for(V=a.length;V--;)K(a[V]);Q(e)}else e.__e=o.__e,e.__k=o.__k,I.then||Q(e);g.__e(I,e,o)}else a==null&&e.__v==o.__v?(e.__k=o.__k,e.__e=o.__e):f=e.__e=Oe(o.__e,e,o,r,s,a,c,d,l);return(p=g.diffed)&&p(e),128&e.__u?void 0:f}function Q(t){t&&t.__c&&(t.__c.__e=!0),t&&t.__k&&t.__k.forEach(Q)}function he(t,e,o){for(var r=0;r<o.length;r++)Z(o[r],o[++r],o[++r]);g.__c&&g.__c(e,t),t.some(function(s){try{t=s.__h,s.__h=[],t.some(function(a){a.call(s)})}catch(a){g.__e(a,s.__v)}})}function ve(t){return typeof t!="object"||t==null||t.__b&&t.__b>0?t:B(t)?t.map(ve):C({},t)}function Oe(t,e,o,r,s,a,c,f,d){var l,p,n,_,u,w,y,x=o.props||R,m=e.props,b=e.type;if(b=="svg"?s="http://www.w3.org/2000/svg":b=="math"?s="http://www.w3.org/1998/Math/MathML":s||(s="http://www.w3.org/1999/xhtml"),a!=null){for(l=0;l<a.length;l++)if((u=a[l])&&"setAttribute"in u==!!b&&(b?u.localName==b:u.nodeType==3)){t=u,a[l]=null;break}}if(t==null){if(b==null)return document.createTextNode(m);t=document.createElementNS(s,b,m.is&&m),f&&(g.__m&&g.__m(e,a),f=!1),a=null}if(b==null)x===m||f&&t.data==m||(t.data=m);else{if(a=a&&W.call(t.childNodes),!f&&a!=null)for(x={},l=0;l<t.attributes.length;l++)x[(u=t.attributes[l]).name]=u.value;for(l in x)if(u=x[l],l!="children"){if(l=="dangerouslySetInnerHTML")n=u;else if(!(l in m)){if(l=="value"&&"defaultValue"in m||l=="checked"&&"defaultChecked"in m)continue;M(t,l,null,u,s)}}for(l in m)u=m[l],l=="children"?_=u:l=="dangerouslySetInnerHTML"?p=u:l=="value"?w=u:l=="checked"?y=u:f&&typeof u!="function"||x[l]===u||M(t,l,u,x[l],s);if(p)f||n&&(p.__html==n.__html||p.__html==t.innerHTML)||(t.innerHTML=p.__html),e.__k=[];else if(n&&(t.innerHTML=""),be(e.type=="template"?t.content:t,B(_)?_:[_],e,o,r,b=="foreignObject"?"http://www.w3.org/1999/xhtml":s,a,c,a?a[0]:o.__k&&A(o,0),f,d),a!=null)for(l=a.length;l--;)K(a[l]);f||(l="value",b=="progress"&&w==null?t.removeAttribute("value"):w!=null&&(w!==t[l]||b=="progress"&&!w||b=="option"&&w!=x[l])&&M(t,l,w,x[l],s),l="checked",y!=null&&y!=t[l]&&M(t,l,y,x[l],s))}return t}function Z(t,e,o){try{if(typeof t=="function"){var r=typeof t.__u=="function";r&&t.__u(),r&&e==null||(t.__u=t(e))}else t.current=e}catch(s){g.__e(s,o)}}function we(t,e,o){var r,s;if(g.unmount&&g.unmount(t),(r=t.ref)&&(r.current&&r.current!=t.__e||Z(r,null,e)),(r=t.__c)!=null){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(a){g.__e(a,e)}r.base=r.__P=null}if(r=t.__k)for(s=0;s<r.length;s++)r[s]&&we(r[s],e,o||typeof t.type!="function");o||K(t.__e),t.__c=t.__=t.__e=void 0}function Ve(t,e,o){return this.constructor(t,o)}function X(t,e,o){var r,s,a,c;e==document&&(e=document.documentElement),g.__&&g.__(t,e),s=(r=typeof o=="function")?null:o&&o.__k||e.__k,a=[],c=[],J(e,t=(!r&&o||e).__k=We(D,null,[t]),s||R,R,e.namespaceURI,!r&&o?[o]:s?null:e.firstChild?W.call(e.childNodes):null,a,!r&&o?o:s?s.__e:e.firstChild,r,c),he(a,t,c)}W=_e.slice,g={__e:function(t,e,o,r){for(var s,a,c;e=e.__;)if((s=e.__c)&&!s.__)try{if((a=s.constructor)&&a.getDerivedStateFromError!=null&&(s.setState(a.getDerivedStateFromError(t)),c=s.__d),s.componentDidCatch!=null&&(s.componentDidCatch(t,r||{}),c=s.__d),c)return s.__E=s}catch(f){t=f}throw t}},fe=0,qe=function(t){return t!=null&&t.constructor==null},N.prototype.setState=function(t,e){var o;o=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=C({},this.state),typeof t=="function"&&(t=t(C({},o),this.props)),t&&C(o,t),t!=null&&this.__v&&(e&&this._sb.push(e),se(this))},N.prototype.forceUpdate=function(t){this.__v&&(this.__e=!0,t&&this.__h.push(t),se(this))},N.prototype.render=D,T=[],de=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,pe=function(t,e){return t.__v.__b-e.__v.__b},U.__r=0,ue=/(PointerCapture)$|Capture$/i,Y=0,$=ce(!1),G=ce(!0),Ne=0;var te,h,ee,xe,oe=0,Ie=[],v=g,ye=v.__b,ke=v.__r,Se=v.diffed,Ce=v.__c,Fe=v.unmount,Ee=v.__;function $e(t,e){v.__h&&v.__h(h,t,oe||e),oe=0;var o=h.__H||(h.__H={__:[],__h:[]});return t>=o.__.length&&o.__.push({}),o.__[t]}function k(t){return oe=1,Ge(Ae,t)}function Ge(t,e,o){var r=$e(te++,2);if(r.t=t,!r.__c&&(r.__=[o?o(e):Ae(void 0,e),function(f){var d=r.__N?r.__N[0]:r.__[0],l=r.t(d,f);d!==l&&(r.__N=[l,r.__[1]],r.__c.setState({}))}],r.__c=h,!h.__f)){var s=function(f,d,l){if(!r.__c.__H)return!0;var p=r.__c.__H.__.filter(function(_){return!!_.__c});if(p.every(function(_){return!_.__N}))return!a||a.call(this,f,d,l);var n=r.__c.props!==f;return p.forEach(function(_){if(_.__N){var u=_.__[0];_.__=_.__N,_.__N=void 0,u!==_.__[0]&&(n=!0)}}),a&&a.call(this,f,d,l)||n};h.__f=!0;var a=h.shouldComponentUpdate,c=h.componentWillUpdate;h.componentWillUpdate=function(f,d,l){if(this.__e){var p=a;a=void 0,s(f,d,l),a=p}c&&c.call(this,f,d,l)},h.shouldComponentUpdate=s}return r.__N||r.__}function Qe(){for(var t;t=Ie.shift();)if(t.__P&&t.__H)try{t.__H.__h.forEach(j),t.__H.__h.forEach(ne),t.__H.__h=[]}catch(e){t.__H.__h=[],v.__e(e,t.__v)}}v.__b=function(t){h=null,ye&&ye(t)},v.__=function(t,e){t&&e.__k&&e.__k.__m&&(t.__m=e.__k.__m),Ee&&Ee(t,e)},v.__r=function(t){ke&&ke(t),te=0;var e=(h=t.__c).__H;e&&(ee===h?(e.__h=[],h.__h=[],e.__.forEach(function(o){o.__N&&(o.__=o.__N),o.u=o.__N=void 0})):(e.__h.forEach(j),e.__h.forEach(ne),e.__h=[],te=0)),ee=h},v.diffed=function(t){Se&&Se(t);var e=t.__c;e&&e.__H&&(e.__H.__h.length&&(Ie.push(e)!==1&&xe===v.requestAnimationFrame||((xe=v.requestAnimationFrame)||Ye)(Qe)),e.__H.__.forEach(function(o){o.u&&(o.__H=o.u),o.u=void 0})),ee=h=null},v.__c=function(t,e){e.some(function(o){try{o.__h.forEach(j),o.__h=o.__h.filter(function(r){return!r.__||ne(r)})}catch(r){e.some(function(s){s.__h&&(s.__h=[])}),e=[],v.__e(r,o.__v)}}),Ce&&Ce(t,e)},v.unmount=function(t){Fe&&Fe(t);var e,o=t.__c;o&&o.__H&&(o.__H.__.forEach(function(r){try{j(r)}catch(s){e=s}}),o.__H=void 0,e&&v.__e(e,o.__v))};var Te=typeof requestAnimationFrame=="function";function Ye(t){var e,o=function(){clearTimeout(r),Te&&cancelAnimationFrame(e),setTimeout(t)},r=setTimeout(o,35);Te&&(e=requestAnimationFrame(o))}function j(t){var e=h,o=t.__c;typeof o=="function"&&(t.__c=void 0,o()),h=e}function ne(t){var e=h;t.__c=t.__(),h=e}function Ae(t,e){return typeof e=="function"?e(t):e}var De=[{id:"1",type:"suggestion",message:"Would love to see dark mode support!",email:"user@example.com",createdAt:"2024-12-10"},{id:"2",type:"bug",message:"The submit button is not working on mobile Safari",createdAt:"2024-12-09"}],He=[{id:"1",title:"Dark Mode",description:"Add support for dark mode theme",votes:42,status:"planned",createdAt:"2024-12-01"},{id:"2",title:"Email Notifications",description:"Get notified when someone replies to your feedback",votes:28,status:"in-progress",createdAt:"2024-11-28"},{id:"3",title:"Export to CSV",description:"Export all feedback data to CSV format",votes:15,status:"under-review",createdAt:"2024-11-25"},{id:"4",title:"Slack Integration",description:"Post new feedback directly to Slack channels",votes:35,status:"completed",createdAt:"2024-11-20"}],ze=[{id:"1",title:"API Integrations",description:"Connect with Slack, Discord, and other tools",status:"in-progress",quarter:"Q1 2025"},{id:"2",title:"Analytics Dashboard",description:"View feedback trends and insights",status:"planned",quarter:"Q1 2025"},{id:"3",title:"Custom Branding",description:"Customize colors, logo, and styling",status:"planned",quarter:"Q2 2025"},{id:"4",title:"Multi-language Support",description:"Support for 10+ languages",status:"planned",quarter:"Q2 2025"}],Re=[{id:"1",version:"1.2.0",title:"Feature Requests & Voting",description:"Users can now submit and vote on feature requests",changes:["Added feature request submission form","Implemented upvoting system","Added status badges for features"],date:"2024-12-08"},{id:"2",version:"1.1.0",title:"Improved Feedback Form",description:"Enhanced the feedback submission experience",changes:["Added feedback categories (bug, suggestion, other)","Optional email field for follow-ups","Better mobile responsiveness"],date:"2024-11-25"},{id:"3",version:"1.0.0",title:"Initial Release",description:"First public release of the feedback widget",changes:["Basic feedback submission","Embeddable widget script","Simple and clean UI"],date:"2024-11-10"}];var Ke=0,st=Array.isArray;function i(t,e,o,r,s,a){e||(e={});var c,f,d=e;if("ref"in d)for(f in d={},e)f=="ref"?c=e[f]:d[f]=e[f];var l={type:t,props:d,key:o,ref:c,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--Ke,__i:-1,__u:0,__source:s,__self:a};if(typeof t=="function"&&(c=t.defaultProps))for(f in c)d[f]===void 0&&(d[f]=c[f]);return g.vnode&&g.vnode(l),l}var Je=()=>i("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:i("path",{d:"M5 15l7-7 7 7"})});var O=({active:t,onClick:e,children:o})=>i("button",{class:`fw-tab ${t?"active":""}`,onClick:e,children:o}),Le=({status:t})=>i("span",{class:`fw-badge fw-badge-${t}`,children:t.replace("-"," ")}),Ze=({feedback:t,onSubmit:e})=>{let[o,r]=k("suggestion"),[s,a]=k(""),[c,f]=k(""),[d,l]=k(!1);return i("div",{class:"fw-feedback-container",children:[i("form",{class:"fw-create-form",onSubmit:n=>{n.preventDefault(),s.trim()&&(e({type:o,message:s,email:c||void 0}),a(""),f(""),l(!0),setTimeout(()=>l(!1),3e3))},children:i("div",{class:"fw-form-inner",children:[i("h3",{class:"fw-form-title",children:"Send us your feedback"}),i("p",{class:"fw-form-subtitle",children:"Help us improve by sharing your thoughts"}),i("div",{class:"fw-form-group",children:[i("label",{class:"fw-label",children:"Feedback Type"}),i("div",{class:"fw-type-buttons",children:["suggestion","bug","other"].map(n=>i("button",{type:"button",class:`fw-type-btn ${o===n?"active":""}`,onClick:()=>r(n),children:[n==="suggestion"&&"\u{1F4A1}"," ",n==="bug"&&"\u{1F41B}"," ",n==="other"&&"\u{1F4DD}"," ",n.charAt(0).toUpperCase()+n.slice(1)]},n))})]}),i("div",{class:"fw-form-group",children:[i("label",{class:"fw-label",children:"Your Message"}),i("textarea",{class:"fw-textarea",value:s,onInput:n=>a(n.target.value),placeholder:"Tell us what you think...",required:!0})]}),i("div",{class:"fw-form-group",children:[i("label",{class:"fw-label",children:"Email (optional)"}),i("input",{type:"email",class:"fw-input",value:c,onInput:n=>f(n.target.value),placeholder:"your@email.com"})]}),i("button",{type:"submit",class:"fw-submit-btn",children:"Submit Feedback"}),d&&i("p",{class:"fw-success-msg",children:"\u2713 Thank you for your feedback!"})]})}),i("div",{class:"fw-feedback-list-section",children:[i("h3",{class:"fw-section-title",children:"Recent Feedback"}),i("div",{class:"fw-feedback-list",children:t.map(n=>i("div",{class:"fw-feedback-item",children:[i("div",{class:"fw-feedback-header",children:[i("span",{class:`fw-badge fw-badge-${n.type}`,children:n.type}),i("span",{class:"fw-feedback-date",children:n.createdAt})]}),i("p",{class:"fw-feedback-text",children:n.message})]},n.id))})]})]})},Xe=({features:t,onVote:e,onSubmit:o})=>{let[r,s]=k(!1),[a,c]=k(""),[f,d]=k(""),l=n=>{n.preventDefault(),!(!a.trim()||!f.trim())&&(o({title:a,description:f}),c(""),d(""),s(!1))},p=[...t].sort((n,_)=>_.votes-n.votes);return i("div",{class:"fw-features-container",children:[i("div",{class:"fw-features-header",children:[i("div",{children:[i("h3",{class:"fw-section-title",children:"Feature Requests"}),i("p",{class:"fw-section-subtitle",children:"Vote on features you'd like to see"})]}),i("button",{class:"fw-link-btn",onClick:()=>s(!r),children:r?"Cancel":"\u271A Request Feature"})]}),r&&i("form",{class:"fw-create-form",onSubmit:l,children:i("div",{class:"fw-form-inner",children:[i("div",{class:"fw-form-group",children:[i("label",{class:"fw-label",children:"Feature Title"}),i("input",{type:"text",class:"fw-input",value:a,onInput:n=>c(n.target.value),placeholder:"What feature would you like?",required:!0})]}),i("div",{class:"fw-form-group",children:[i("label",{class:"fw-label",children:"Description"}),i("textarea",{class:"fw-textarea",value:f,onInput:n=>d(n.target.value),placeholder:"Explain why you need this...",required:!0})]}),i("button",{type:"submit",class:"fw-submit-btn",children:"Submit Request"})]})}),i("div",{class:"fw-feature-list",children:p.map(n=>i("div",{class:"fw-feature-item",children:[i("button",{class:"fw-vote-btn",onClick:()=>e(n.id),title:"Vote for this feature",children:[i(Je,{}),i("span",{class:"fw-vote-count",children:n.votes})]}),i("div",{class:"fw-feature-body",children:[i("div",{class:"fw-feature-title-row",children:[i("span",{class:"fw-feature-title",children:n.title}),i(Le,{status:n.status})]}),i("p",{class:"fw-feature-desc",children:n.description})]})]},n.id))})]})},et=({items:t})=>{let e=t.reduce((o,r)=>(o[r.quarter]||(o[r.quarter]=[]),o[r.quarter].push(r),o),{});return i("div",{class:"fw-roadmap-container",children:[i("div",{class:"fw-roadmap-header",children:[i("h3",{class:"fw-section-title",children:"Product Roadmap"}),i("p",{class:"fw-section-subtitle",children:"See what's coming next"})]}),i("div",{class:"fw-roadmap-timeline",children:Object.entries(e).map(([o,r])=>i("div",{class:"fw-roadmap-quarter",children:[i("h4",{class:"fw-quarter-title",children:o}),i("div",{class:"fw-roadmap-items",children:r.map(s=>i("div",{class:"fw-roadmap-item",children:[i("div",{class:"fw-roadmap-status",children:i(Le,{status:s.status})}),i("div",{class:"fw-roadmap-content",children:[i("span",{class:"fw-roadmap-title",children:s.title}),i("p",{class:"fw-roadmap-desc",children:s.description})]})]},s.id))})]},o))})]})},tt=({entries:t})=>i("div",{class:"fw-changelog-container",children:[i("div",{class:"fw-changelog-header",children:[i("h3",{class:"fw-section-title",children:"Changelog"}),i("p",{class:"fw-section-subtitle",children:"Latest updates and improvements"})]}),i("div",{class:"fw-changelog-list",children:t.map(e=>i("div",{class:"fw-changelog-entry",children:[i("div",{class:"fw-changelog-entry-header",children:[i("div",{class:"fw-changelog-version-section",children:[i("span",{class:"fw-version-badge",children:["v",e.version]}),i("span",{class:"fw-changelog-date",children:e.date})]}),i("h4",{class:"fw-changelog-title",children:e.title})]}),i("p",{class:"fw-changelog-desc",children:e.description}),i("ul",{class:"fw-changes-list",children:e.changes.map((o,r)=>i("li",{class:"fw-change-item",children:o},r))})]},e.id))})]}),re=()=>{let[t,e]=k("feedback"),[o,r]=k(De),[s,a]=k(He);return i("div",{class:"fw-widget",children:[i("div",{class:"fw-header",children:i("div",{class:"fw-header-content",children:[i("h2",{children:"Product Feedback"}),i("p",{children:"Share your ideas and help us build a better product"})]})}),i("div",{class:"fw-tabs",children:[i(O,{active:t==="feedback",onClick:()=>e("feedback"),children:"Feedback"}),i(O,{active:t==="features",onClick:()=>e("features"),children:"Requests"}),i(O,{active:t==="roadmap",onClick:()=>e("roadmap"),children:"Roadmap"}),i(O,{active:t==="changelog",onClick:()=>e("changelog"),children:"Updates"})]}),i("div",{class:"fw-content",children:[t==="feedback"&&i(Ze,{feedback:o,onSubmit:l=>{r([{...l,id:Date.now().toString(),createdAt:new Date().toISOString().split("T")[0]},...o])}}),t==="features"&&i(Xe,{features:s,onVote:l=>{a(s.map(p=>p.id===l?{...p,votes:p.votes+1}:p))},onSubmit:l=>{a([{...l,id:Date.now().toString(),votes:1,status:"under-review",createdAt:new Date().toISOString().split("T")[0]},...s])}}),t==="roadmap"&&i(et,{items:ze}),t==="changelog"&&i(tt,{entries:Re})]}),i("div",{class:"fw-footer",children:i("span",{children:"Powered by Feedback Widget"})})]})};var Pe=`
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
`;function Me(){var e;if(!document.getElementById("fw-ssr-styles")){let o=document.createElement("style");o.id="fw-ssr-styles",o.textContent=Pe,document.head.appendChild(o)}let t=document.getElementById("feedback-widget")||((e=document.getElementById("fw-ssr-widget"))==null?void 0:e.parentElement);t&&X(i(re,{}),t)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Me):setTimeout(Me,100);window.FeedbackWidget={version:"1.0.0",hydrate:t=>{let e=document.querySelector(t);e&&X(i(re,{}),e)}};})();
