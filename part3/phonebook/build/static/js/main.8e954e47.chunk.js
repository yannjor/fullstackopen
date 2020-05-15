(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,t,n){e.exports=n(37)},37:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(14),c=n.n(o),u=n(4),l=n(2),i=n(3),m=n.n(i),s=function(e){var t=e.addPerson,n=e.newName,a=e.newNumber,o=e.setNewName,c=e.setNewNumber;return r.a.createElement(r.a.Fragment,null,r.a.createElement("h2",null,"Add new"),r.a.createElement("form",{onSubmit:t},r.a.createElement("div",null,"Name:"," ",r.a.createElement("input",{type:"text",value:n,onChange:function(e){return o(e.target.value)}})),r.a.createElement("div",null,"Number:"," ",r.a.createElement("input",{type:"tel",value:a,onChange:function(e){return c(e.target.value)}})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"Add"))))},d=function(e){var t=e.person,n=e.deletePerson;return r.a.createElement("p",null,t.name," ",t.number," ",r.a.createElement("button",{onClick:function(){return n(t)}},"Delete"))},f=function(e){var t=e.persons,n=e.filter,a=e.deletePerson;if(""===n)return r.a.createElement(r.a.Fragment,null,t.map((function(e){return r.a.createElement(d,{key:e.name,person:e,deletePerson:a})})));var o=t.filter((function(e){return e.name.toLowerCase().includes(n.toLowerCase())}));return r.a.createElement(r.a.Fragment,null,o.map((function(e){return r.a.createElement(d,{key:e.name,person:e,deletePerson:a})})))},b=function(e){var t=e.filter,n=e.setFilter;return r.a.createElement(r.a.Fragment,null,"Filter:"," ",r.a.createElement("input",{type:"text",value:t,onChange:function(e){return n(e.target.value)}}))},p=function(e){var t=e.message,n=e.error;if(!t)return null;var a={color:"green",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:15},o=Object(u.a)({},a,{color:"red"});return r.a.createElement("div",{style:n?o:a},t)},E=function(){var e=Object(a.useState)([]),t=Object(l.a)(e,2),n=t[0],o=t[1],c=Object(a.useState)(""),i=Object(l.a)(c,2),d=i[0],E=i[1],h=Object(a.useState)(""),v=Object(l.a)(h,2),g=v[0],w=v[1],j=Object(a.useState)(""),N=Object(l.a)(j,2),O=N[0],y=N[1],k=Object(a.useState)(null),S=Object(l.a)(k,2),F=S[0],P=S[1],C=Object(a.useState)(!1),D=Object(l.a)(C,2),x=D[0],A=D[1],B="/api/persons",I=function(){setTimeout((function(){P(null),A(!1)}),5e3)};Object(a.useEffect)((function(){m.a.get(B).then((function(e){o(e.data)}))}),[]);return r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",null,"Phonebook"),r.a.createElement(p,{message:F,error:x}),r.a.createElement(b,{filter:O,setFilter:y}),r.a.createElement(s,{addPerson:function(e){if(e.preventDefault(),n.some((function(e){return e.name===d}))){if(window.confirm("".concat(d," is already added to the phonebook, replace the old number with a new one?"))){var t=n.find((function(e){return e.name===d})),a=Object(u.a)({},t,{number:g});m.a.put(B.concat("/".concat(t.id)),a).then((function(e){o(n.map((function(n){return n.id===t.id?e.data:n}))),E(""),w(""),P("Updated number for ".concat(d)),I()})).catch((function(e){console.log(e.response.data),A(!0),P("Information of ".concat(d," has already been removed from server")),I()}))}}else{var r={name:d,number:g};m.a.post(B,r).then((function(e){r.id=e.data.id,o(n.concat(r)),E(""),w(""),P("Added ".concat(d)),I()})).catch((function(e){console.log(e.response.data),A(!0),P(e.response.data.error),I()}))}},newName:d,newNumber:g,setNewName:E,setNewNumber:w}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(f,{persons:n,filter:O,deletePerson:function(e){window.confirm("Delete ".concat(e.name,"?"))&&m.a.delete(B.concat("/".concat(e.id))).then((function(t){o(n.filter((function(t){return t.id!==e.id}))),P("Deleted ".concat(e.name)),I()}))}}))};c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(E,null)),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.8e954e47.chunk.js.map