(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["select"],{"0494":function(e,t,n){"use strict";n.r(t);var c=n("7a23");const o={id:"select"};function s(e,t,n,s,i,d){const l=Object(c["E"])("SelectItem");return Object(c["v"])(),Object(c["h"])("div",o,[Object(c["i"])("button",{class:"back",onClick:t[0]||(t[0]=t=>e.$router.back())},"Back"),Object(c["k"])(c["c"],{id:"content",name:"list",tag:"div"},{default:Object(c["L"])(()=>[(Object(c["v"])(!0),Object(c["h"])(c["a"],null,Object(c["C"])(e.content,t=>(Object(c["v"])(),Object(c["f"])(l,{key:t[e.type.key],mode:e.mode,item:t,selected:t[e.type.key]===e.selected[e.type.key],onSelect:n=>e.select(t)},null,8,["mode","item","selected","onSelect"]))),128))]),_:1})])}var i=n("9ab4"),d=n("ce1f"),l=n("8b99");const a={key:0},r={key:1},u={key:2};function b(e,t,n,o,s,i){return Object(c["v"])(),Object(c["h"])("button",{class:Object(c["q"])(["item",{selected:e.selected}]),onClick:t[0]||(t[0]=t=>e.select())},[Object(c["j"])(Object(c["H"])("user"===e.mode?e.item.display_name:e.item.name)+" ",1),"user"===e.mode?(Object(c["v"])(),Object(c["h"])("span",a,": "+Object(c["H"])(e.item.username),1)):Object(c["g"])("",!0),"desktop"===e.mode?(Object(c["v"])(),Object(c["h"])("span",r,": "+Object(c["H"])(e.item.key),1)):Object(c["g"])("",!0),"layout"===e.mode?(Object(c["v"])(),Object(c["h"])("span",u,": "+Object(c["H"])(e.item.description),1)):Object(c["g"])("",!0)],2)}let m=class extends d["b"]{};m=Object(i["b"])([Object(d["a"])({props:{mode:String,item:{type:Object,required:!0},selected:{type:Boolean,required:!0,default:!1}},methods:{select(){this.$emit("select")}}})],m);var p=m,O=(n("bbcf"),n("6b0d")),j=n.n(O);const y=j()(p,[["render",b]]);var k=y;const v={user:{field:"users",name:"display_name",key:"username"},desktop:{field:"sessions",name:"name",key:"key"},layout:{field:"layouts",name:"name",key:"name"}};function h(e){return Object.prototype.hasOwnProperty.call(e,"display_name")}function w(e){return Object.prototype.hasOwnProperty.call(e,"comment")}function f(e){return Object.prototype.hasOwnProperty.call(e,"short_description")}let g=class extends d["b"]{};g=Object(i["b"])([Object(d["a"])({components:{SelectItem:k},data(){var e,t,n,c,o,s,i;const d=this.$route.params.mode;if("string"!==typeof d)return{};if("user"!=d&&"desktop"!=d&&"layout"!=d)return{};const a=v[d];let r,u;return"user"==d?(r=null!==(t=null===(e=window.lightdm)||void 0===e?void 0:e.users)&&void 0!==t?t:[],u=l["b"].user):"desktop"==d?(r=null!==(c=null===(n=window.lightdm)||void 0===n?void 0:n.sessions)&&void 0!==c?c:[],u=l["b"].desktop):"layout"==d?(r=null!==(s=null===(o=window.greeter_config)||void 0===o?void 0:o.layouts)&&void 0!==s?s:[],u=null===(i=window.lightdm)||void 0===i?void 0:i.layout):r=[],{mode:d,type:a,content:r,selected:u}},methods:{select(e){"user"==this.mode&&h(e)?l["b"].user=e:"desktop"==this.mode&&w(e)?l["b"].desktop=e:"layout"==this.mode&&f(e)&&window.lightdm&&(window.lightdm.layout=Object.assign({},e)),this.selected=e,Object(l["a"])()},escape(e){"Escape"===e.code&&this.$router.back()}},mounted(){window.addEventListener("keyup",this.escape)},unmounted(){window.removeEventListener("keyup",this.escape)}})],g);var _=g;n("4299");const S=j()(_,[["render",s]]);t["default"]=S},3655:function(e,t,n){},4299:function(e,t,n){"use strict";n("a347")},a347:function(e,t,n){},bbcf:function(e,t,n){"use strict";n("3655")}}]);