/*! (C) Andrea Giammarchi - @WebReflection - Mit Style License */
// see https://github.com/WebReflection/document-register-element/issues/21#issuecomment-102020311
var innerHTML=function(e){var t="extends",n=e.registerElement,r=e.createElement("div"),i="document-register-element",s=n.innerHTML,o,u;if(s)return s;try{n.call(e,i,{prototype:Object.create(HTMLElement.prototype,{createdCallback:{value:Object}})}),r.innerHTML="<"+i+"></"+i+">";if("createdCallback"in r.querySelector(i))return n.innerHTML=function(e,t){return e.innerHTML=t,e}}catch(a){}return u=[],o=function(t){if("createdCallback"in t||"attachedCallback"in t||"detachedCallback"in t||"attributeChangedCallback"in t)return;e.createElement.innerHTMLHelper=!0;for(var n=t.parentNode,r=t.getAttribute("is"),i=t.nodeName,s=e.createElement.apply(e,r?[i,r]:[i]),o=t.attributes,u=0,a=o.length,f,l;u<a;u++)f=o[u],s.setAttribute(f.name,f.value);s.createdCallback&&(s.created=!0,s.createdCallback(),s.created=!1);while(l=t.firstChild)s.appendChild(l);e.createElement.innerHTMLHelper=!1,n&&n.replaceChild(s,t)},(e.registerElement=function(i,s){var o=(s[t]?s[t]+'[is="'+i+'"]':i).toLowerCase();return u.indexOf(o)<0&&u.push(o),n.apply(e,arguments)}).innerHTML=function(e,t){e.innerHTML=t;for(var n=e.querySelectorAll(u.join(",")),r=n.length;r--;o(n[r]));return e}}(document);