(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{16:function(e,n,t){e.exports=t(40)},22:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(14),c=t.n(o),u=(t(22),t(4)),l=t(15),i=t(2),m=t(3),d=t.n(m),f="/api/persons",s=function(){return d.a.get(f).then(function(e){return e.data})},b=function(e){return d.a.post(f,e).then(function(e){return e.data})},h=function(e){return d.a.delete("".concat(f,"/").concat(e))},v=function(e,n){return d.a.put("".concat(f,"/").concat(e),n).then(function(e){return e.data})},E=function(e){var n=e.onChangeHandler;return r.a.createElement("p",null,"Filter show with",r.a.createElement("input",{onChange:n}))},p=function(e){var n=e.onSubmitHandler,t=e.newName,a=e.onChangeNameHandler,o=e.newNumber,c=e.onChangeNumberHandler;return r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name:",r.a.createElement("input",{value:t,onChange:a})),r.a.createElement("div",null,"number:",r.a.createElement("input",{value:o,onChange:c})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},w=function(e){var n=e.persons,t=e.onDelete;return r.a.createElement(r.a.Fragment,null,n.map(function(e){return r.a.createElement("p",{key:e.id},e.name," ",e.number,r.a.createElement("button",{onClick:function(){return n=e.id,a=e.name,void(window.confirm("Delete ".concat(a,"?"))&&t(n));var n,a}},"delete"))}))},g=function(e){var n=e.message,t=e.type;return null===n?null:"error"===t?r.a.createElement("div",{className:"notification error"},n):r.a.createElement("div",{className:"notification"},n)},j=function(){var e=Object(a.useState)([]),n=Object(i.a)(e,2),t=n[0],o=n[1],c=Object(a.useState)(""),m=Object(i.a)(c,2),d=m[0],f=m[1],j=Object(a.useState)(""),O=Object(i.a)(j,2),C=O[0],N=O[1],S=Object(a.useState)(""),y=Object(i.a)(S,2),H=y[0],k=y[1],D=Object(a.useState)(!0),T=Object(i.a)(D,2),A=T[0],I=T[1],L=Object(a.useState)(null),F=Object(i.a)(L,2),J=F[0],x=F[1],B=Object(a.useState)(null),P=Object(i.a)(B,2),q=P[0],z=P[1];Object(a.useEffect)(function(){s().then(function(e){o(e)})},[]);var G=A?t:t.filter(function(e){var n=e.name.toLocaleLowerCase(),t=H.toLowerCase();return n.includes(t)});return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(g,{message:J}),r.a.createElement(g,{type:"error",message:q}),r.a.createElement(E,{onChangeHandler:function(e){k(e.target.value),I(!1)}}),r.a.createElement("h2",null,"Add a new"),r.a.createElement(p,{onSubmitHandler:function(e){e.preventDefault();var n=t.filter(function(e){return e.name.includes(d)});if(1===n.length)window.confirm("".concat(d," is already added to phonebook, replace the old number with a new one?"))&&v(n[0].id,Object(l.a)({},n[0],{number:C})).then(function(e){var n=t.filter(function(n){return n.id!==e.id});n=[].concat(Object(u.a)(n),[e]),o(n),f(""),N(""),x("Added ".concat(e.name)),setTimeout(function(){x(null)},2e3)}).catch(function(e){z("Information of ".concat(d," has already been removed from server")),setTimeout(function(){z(null)},5e3)});else{var a={name:d,number:C,id:t.length+1};b(a).then(function(e){var n;n=d,void 0!==t.find(function(e){return e.name===n})?alert("".concat(d," is already added to phonebook")):o([].concat(Object(u.a)(t),[{name:d,number:C}])),x("Added ".concat(d)),setTimeout(function(){x(null)},2e3),f(""),N("")}).catch(function(e){z("Information of ".concat(d," has already been removed from server")),setTimeout(function(){z(null)},5e3)})}},newName:d,onChangeNameHandler:function(e){f(e.target.value)},newNumber:C,onChangeNumberHandler:function(e){N(e.target.value)}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(w,{persons:G,onDelete:function(e){h(e).then(function(){var n=t.filter(function(n){return n.id!==e});o(n)})}}))};c.a.render(r.a.createElement(j,null),document.getElementById("root"))}},[[16,1,2]]]);
//# sourceMappingURL=main.1f5513a4.chunk.js.map