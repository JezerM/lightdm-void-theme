(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["splash"],{"30c7":function(e,t,n){"use strict";n("3e53")},"3e53":function(e,t,n){},"8f75":function(e,t,n){"use strict";n.r(t);var s=n("7a23");const i={id:"content"},c=Object(s["i"])("h3",null,"Press any key to go back",-1);function a(e,t,n,a,r,o){return Object(s["v"])(),Object(s["h"])("div",{id:"splash",onClick:t[0]||(t[0]=t=>e.back())},[Object(s["i"])("div",i,[Object(s["i"])("h1",null,Object(s["H"])(e.message),1),c])])}var r=n("9ab4"),o=n("ce1f");let u=class extends o["b"]{};u=Object(r["b"])([Object(o["a"])({data(){const e=this.$route.params.mode;if("string"!==typeof e)return{};let t;return t="shutdown"==e?"Shutting down":"restart"==e?"Restarting":"suspend"==e?"Suspending":"hibernate"==e?"Hibernating":e,{message:t}},methods:{back(){this.$router.back()}},mounted(){window.addEventListener("keyup",this.back)},unmounted(){window.removeEventListener("keyup",this.back)}})],u);var d=u,b=(n("30c7"),n("6b0d")),h=n.n(b);const p=h()(d,[["render",a]]);t["default"]=p}}]);