(this.webpackJsonplearn=this.webpackJsonplearn||[]).push([[0],{30:function(e,t,s){},39:function(e,t,s){},40:function(e,t,s){},41:function(e,t,s){},42:function(e,t,s){},43:function(e,t,s){},44:function(e,t,s){},45:function(e,t,s){"use strict";s.r(t);var c=s(1),a=s.n(c),n=s(17),i=s.n(n),r=s(9),l=s(2),o=s(0);function j(e){return Object(o.jsx)("div",{})}var d=s(4),b=s(8),u=s.n(b),m=s(11),h=s(18),x=s(19),O=s(23),p=s(22);s(30);function f(e){var t=e.isLink?Object(o.jsx)(r.b,{onClick:e.setClickedOnShowQuery,to:"https://mail.google.com/mail/u/0/#inbox",children:e.email}):e.email,s=e.isLink?Object(o.jsx)("button",{className:"btn btn-dark showFullScreenQuery",onClick:function(){e.setFullScreenProps({setClickedOnShowQuery:e.setClickedOnShowQuery,number:e.number,query_id:e.query_id,query:e.query,date:e.date,email:e.email}),e.setClickedOnShowQuery(!0)},children:e.query}):e.query.substr(0,142);return Object(o.jsxs)("div",{className:"row my-row justify-content-around",children:[Object(o.jsx)("div",{className:"col-2",children:e.number}),Object(o.jsx)("div",{className:"my-col-3 col",children:e.query_id}),Object(o.jsx)("div",{className:"my-col col",styles:{textAlign:"center"},children:t}),Object(o.jsx)("div",{className:"my-col-2 col-2",children:s}),Object(o.jsx)("div",{className:"my-col col",children:Object(o.jsx)("span",{children:e.date})})]})}var N,A,v=function(e){Object(O.a)(s,e);var t=Object(p.a)(s);function s(e){var c;return Object(h.a)(this,s),(c=t.call(this,e)).state={Items:[],Offset:0},c}return Object(x.a)(s,[{key:"componentDidMount",value:function(){var e=Object(m.a)(u.a.mark((function e(){var t=this;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:N=Array.from(document.getElementsByClassName("back"))[0].styles,A=Array.from(document.getElementsByClassName("next"))[0].styles,fetch("http://localhost:8080/api/query/?offset=0").then((function(e){return e.json()})).then((function(e){t.setState((function(){return{Items:e.content.reverse()}}))})),this.ajaxForQueries();case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"ajaxForQueries",value:function(){var e=this;setInterval(Object(m.a)(u.a.mark((function t(){var s,c;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("http://localhost:8080/api/query/?offset=0");case 2:return s=t.sent,t.next=5,s.json();case 5:(c=t.sent).reverse()!==e.state.Items&&e.setState((function(){return{Items:c.reverse()}}));case 7:case"end":return t.stop()}}),t)}))),12e5)}},{key:"componentDidUpdate",value:function(){var e=Object(m.a)(u.a.mark((function e(t,s){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:1===this.state.Offset&&(N={cursor:"none"}),10===this.state.Offset&&(A={cursor:"none"}),1!==this.state.Offset&&N==={cursor:"none"}&&(N={cursor:"pointer"}),10!==this.state.Offset&&A==={cursor:"none"}&&(A={cursor:"pointer"});case 4:case"end":return e.stop()}}),e,this)})));return function(t,s){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this,t=function(){var t=Object(m.a)(u.a.mark((function t(){var s,c;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("http://localhost:8080/api/query/?offset=".concat(e.state.Offset+1));case 2:return s=t.sent,t.next=5,s.json();case 5:c=t.sent,e.setState({Items:c.content.reverse(),Offset:e.state.Offset+1});case 7:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),s=function(){var t=Object(m.a)(u.a.mark((function t(){var s,c;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("http://localhost:8080/api/query/?offset=".concat(e.state.Offset-1));case 2:return s=t.sent,t.next=5,s.json();case 5:c=t.sent,e.setState({Items:c.content.reverse(),Offset:e.state.Offset-1});case 7:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(o.jsxs)(o.Fragment,{children:[Object(o.jsx)("h1",{children:"Welcome Alok"}),Object(o.jsxs)("div",{className:"container my-container",children:[Object(o.jsx)(f,{number:"S.no",query_id:"Query Id",query:"query",email:"email",date:"Date"}),this.state.Items.map((function(t){return Object(o.jsx)(f,{setClickedOnShowQuery:e.props.setClickedOnShowQuery,setFullScreenProps:e.props.setFullScreenProps,isLink:!0,number:e.state.Items.indexOf(t)+1,query_id:t.id,query:t.query,email:t.email,date:t.date},t.id)})),Object(o.jsx)("button",{onClick:s,className:"btn back btn-danger btn-sm page",children:"Back"}),Object(o.jsx)("button",{onClick:t,className:"btn next btn-danger btn-sm page",children:"Next"})]})]})}}]),s}(c.Component);function y(e){return Object(o.jsxs)("div",{className:(t=e.colour,"alert alert-".concat(t," alert-dismissible fade show")),role:"alert",children:[e.text,Object(o.jsx)("button",{onClick:e.finalize,type:"button",className:"btn-close","data-bs-dismiss":"alert","aria-label":"Close"})]});var t}function k(e){var t=Object(c.useState)(!1),s=Object(d.a)(t,2),a=s[0],n=s[1],i=e.allProps,r=i.query,l=i.query_id,j=i.date,b=i.email;return Object(o.jsxs)(o.Fragment,{children:[a&&Object(o.jsx)(y,{text:"Deleted message sucessfully",colour:"danger"}),Object(o.jsxs)("div",{className:"container my-2 form-container form-floating ",children:[Object(o.jsx)("input",{defaultValue:b,className:"my-3 form-control",type:"email",name:"email"}),Object(o.jsx)("textarea",{className:"my-4 form-control",defaultValue:r,name:"query",style:{height:100}}),Object(o.jsx)("input",{type:"text",className:"my-3 form-control",defaultValue:l,name:"",id:""}),Object(o.jsx)("input",{type:"text",className:"my-3 form-control",defaultValue:j,name:"",id:""}),"\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0",Object(o.jsx)("button",{onClick:function(){e.setClickedOnShowQuery(!1)},className:"btn btn-primary",children:"Back"}),"\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0",Object(o.jsx)("button",{onClick:function(){fetch("http://localhost:8080/api/query/".concat(l),{method:"delete"}),n(!0),e.setClickedOnShowQuery(!1)},className:"btn btn-primary",children:"Delete"})]})]})}function w(){var e=Object(c.useState)(!1),t=Object(d.a)(e,2),s=t[0],a=t[1],n=Object(c.useState)({}),i=Object(d.a)(n,2),r=i[0],l=i[1];return Object(o.jsxs)("div",{children:[s||Object(o.jsx)(v,{setFullScreenProps:l,setClickedOnShowQuery:a}),s&&Object(o.jsx)(k,{setClickedOnShowQuery:a,allProps:r})]})}s(39);function g(){return Object(o.jsxs)("footer",{className:"bg-dark text-center text-white",children:[Object(o.jsxs)("div",{className:"container p-4",children:[Object(o.jsx)("section",{className:"mb-4"}),Object(o.jsx)("section",{className:"",children:Object(o.jsx)("form",{action:"",children:Object(o.jsxs)("div",{className:"row d-flex justify-content-center",children:[Object(o.jsx)("div",{className:"col-md-5 col-12"}),Object(o.jsx)("div",{className:"col-auto"})]})})}),Object(o.jsx)("section",{className:"mb-4",children:Object(o.jsx)("p",{children:Object(o.jsx)("strong",{children:"Email Me: @gmail.com"})})}),Object(o.jsx)("section",{className:"",children:Object(o.jsxs)("div",{className:"row",children:[Object(o.jsxs)("div",{className:"col-lg-3 col-md-6 mb-4 mb-md-0",children:[Object(o.jsx)("h5",{className:"text-uppercase",children:"Links"}),Object(o.jsxs)("ul",{className:"list-unstylesd mb-0",children:[Object(o.jsx)("li",{children:Object(o.jsx)("a",{href:"#!",className:"text-white",children:"Home"})}),Object(o.jsx)("li",{children:Object(o.jsx)("a",{href:"#!",className:"text-white",children:"About"})}),Object(o.jsx)("li",{children:Object(o.jsx)("a",{href:"#!",className:"text-white",children:"Contact Us"})}),Object(o.jsx)("li",{children:Object(o.jsx)("a",{href:"#!",className:"text-white",children:"Email Us"})})]})]}),Object(o.jsxs)("div",{className:"col-lg-3 col-md-6 mb-4 mb-md-0",children:[Object(o.jsx)("h5",{className:"text-uppercase",children:"Links"}),Object(o.jsxs)("ul",{className:"list-unstylesd mb-0",children:[Object(o.jsx)("li",{children:Object(o.jsx)("a",{href:"#!",className:"text-white",children:"View All Publications"})}),Object(o.jsx)("li",{children:Object(o.jsx)("a",{href:"#!",className:"text-white",children:"View Latest Publications"})}),Object(o.jsx)("li",{children:Object(o.jsx)("a",{href:"#!",className:"text-white",children:"Link 3"})}),Object(o.jsx)("li",{children:Object(o.jsx)("a",{href:"#!",className:"text-white",children:"Link 4"})})]})]}),Object(o.jsxs)("div",{className:"col-lg-3 col-md-6 mb-4 mb-md-0",children:[Object(o.jsx)("h5",{className:"text-uppercase",children:"Links"}),Object(o.jsxs)("ul",{className:"list-unstylesd mb-0",children:[Object(o.jsx)("li",{children:Object(o.jsx)("a",{href:"#!",className:"text-white",children:"Link 1"})}),Object(o.jsx)("li",{children:Object(o.jsx)("a",{href:"#!",className:"text-white",children:"Link 2"})}),Object(o.jsx)("li",{children:Object(o.jsx)("a",{href:"#!",className:"text-white",children:"Link 3"})}),Object(o.jsx)("li",{children:Object(o.jsx)("a",{href:"#!",className:"text-white",children:"Link 4"})})]})]}),Object(o.jsxs)("div",{className:"col-lg-3 col-md-6 mb-4 mb-md-0",children:[Object(o.jsx)("h5",{className:"text-uppercase",children:"Links"}),Object(o.jsxs)("ul",{className:"list-unstylesd mb-0",children:[Object(o.jsx)("li",{children:Object(o.jsx)("a",{href:"#!",className:"text-white",children:"Link 1"})}),Object(o.jsx)("li",{children:Object(o.jsx)("a",{href:"#!",className:"text-white",children:"Link 2"})}),Object(o.jsx)("li",{children:Object(o.jsx)("a",{href:"#!",className:"text-white",children:"Link 3"})}),Object(o.jsx)("li",{children:Object(o.jsx)("a",{href:"#!",className:"text-white",children:"Link 4"})})]})]})]})})]}),Object(o.jsx)("div",{className:"text-center p-3",styles:"background-color: rgba(0, 0, 0, 0.2);",children:"\xa9 2021 Copyright"})]})}var S=s(21),E=s.n(S);s(40);function P(){var e=Object(c.useState)(!1),t=Object(d.a)(e,2),s=t[0],a=t[1],n=Object(c.useState)(!1),i=Object(d.a)(n,2),r=i[0],l=i[1],j=function(e){e.target.value=""};return Object(o.jsxs)(o.Fragment,{children:[!0===s&&Object(o.jsx)(y,{text:"Message Sent sucessfully.Dr alok will reply shortly. If you have any other doubts please do inform us.",colour:"success"}),r&&Object(o.jsx)(y,{text:"Failed to send message",colour:"danger"}),Object(o.jsx)("div",{className:"container my-2 form-container form-floating",children:Object(o.jsxs)("form",{onSubmit:function(e){e.preventDefault(),fetch("http://localhost:8080/api/query/",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify([{query:document.getElementById("form__question").value,email:document.getElementById("form__email").value}])}).then((function(e){e.status?a(!0):l(!0)})).catch((function(){l(!0)}))},id:"post__form",children:[Object(o.jsxs)("div",{children:[Object(o.jsx)("h3",{id:"h3",className:"my-3",children:Object(o.jsx)(E.a,{strings:["Please Enter your query"," Dr Alok will reply shortly"],backSpeed:15,smartBackspace:!0,backDelay:1200,startDelay:1e3,typeSpeed:25,loop:!0})}),Object(o.jsx)("hr",{className:"dropdown-divider"}),Object(o.jsx)("input",{onClick:j,className:"form-control my-3",id:"form__email",required:!0,defaultValue:"Please enter your email",type:"email",name:"email"}),Object(o.jsx)("textarea",{onClick:j,className:"form-control",id:"form__question",name:"query",style:{height:100},required:!0,defaultValue:"Enter question here"})]}),Object(o.jsx)("div",{className:"container",children:Object(o.jsx)("button",{className:"btn btn-success btn-outline-light my-2",type:"submit",id:"submit",children:"Send"})})]})})]})}s(41);var U=s.p+"static/media/chair.9a88e7af.jpg";function Q(){return Object(o.jsxs)("div",{id:"carouselExampleCaptions",className:"carousel container slide","data-bs-ride":"carousel",children:[Object(o.jsxs)("div",{className:"carousel-indicators",children:[Object(o.jsx)("button",{type:"button","data-bs-target":"#carouselExampleCaptions","data-bs-slide-to":"0",className:"active","aria-current":"true","aria-label":"Slide 1"}),Object(o.jsx)("button",{type:"button","data-bs-target":"#carouselExampleCaptions","data-bs-slide-to":"1","aria-label":"Slide 2"}),Object(o.jsx)("button",{type:"button","data-bs-target":"#carouselExampleCaptions","data-bs-slide-to":"2","aria-label":"Slide 3"})]}),Object(o.jsxs)("div",{className:"carousel-inner",children:[Object(o.jsxs)("div",{className:"carousel-item active",children:[Object(o.jsx)("img",{src:U,className:"d-block w-100",alt:"..."}),Object(o.jsxs)("div",{className:"carousel-caption d-none d-md-block",children:[Object(o.jsx)("h5",{children:"First slide label"}),Object(o.jsx)("p",{children:"Some representative placeholder content for the first slide."})]})]}),Object(o.jsxs)("div",{className:"carousel-item",children:[Object(o.jsx)("img",{src:"data:image/jpeg;base64,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",className:"d-block w-100",alt:"..."}),Object(o.jsxs)("div",{className:"carousel-caption d-none d-md-block",children:[Object(o.jsx)("h5",{children:"Second slide label"}),Object(o.jsx)("p",{children:"Some representative placeholder content for the second slide."})]})]}),Object(o.jsxs)("div",{className:"carousel-item",children:[Object(o.jsx)("img",{src:U,className:"d-block w-100",alt:"..."}),Object(o.jsxs)("div",{className:"carousel-caption d-none d-md-block",children:[Object(o.jsx)("h5",{children:"Third slide label"}),Object(o.jsx)("p",{children:"Some representative placeholder content for the third slide."})]})]})]}),Object(o.jsxs)("button",{className:"carousel-control-prev",type:"button","data-bs-target":"#carouselExampleCaptions","data-bs-slide":"prev",children:[Object(o.jsx)("span",{className:"carousel-control-prev-icon","aria-hidden":"true"}),Object(o.jsx)("span",{className:"visually-hidden",children:"Previous"})]}),Object(o.jsxs)("button",{className:"carousel-control-next",type:"button","data-bs-target":"#carouselExampleCaptions","data-bs-slide":"next",children:[Object(o.jsx)("span",{className:"carousel-control-next-icon","aria-hidden":"true"}),Object(o.jsx)("span",{className:"visually-hidden",children:"Next"})]})]})}function C(e){var t=Object(c.useState)("Home"),s=Object(d.a)(t,2),a=s[0],n=s[1],i=Object(c.useState)(a),l=Object(d.a)(i,2),j=l[0],b=l[1];return Object(c.useEffect)((function(){document.getElementById(j).classList.remove("active"),document.getElementById(a).classList.add("active"),b(a)}),[a,j]),Object(o.jsx)("nav",{className:"navbar navbar-expand-lg navbar-dark bg-dark",styles:{marginBottom:"50px"},children:Object(o.jsxs)("div",{className:"container-fluid",children:[Object(o.jsx)("button",{className:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation",children:Object(o.jsx)("span",{className:"navbar-toggler-icon"})}),Object(o.jsxs)("div",{className:"collapse navbar-collapse",id:"navbarSupportedContent",children:[Object(o.jsxs)("ul",{className:"navbar-nav me-auto mb-2 mb-lg-0",children:[Object(o.jsx)("li",{className:"nav-item",children:Object(o.jsx)(r.b,{className:"nav-link active",onClick:function(){n("Home")},id:"Home","aria-current":"page",to:"/home",children:"Home"})}),Object(o.jsx)("li",{className:"nav-item",children:Object(o.jsx)(r.b,{className:"nav-link",onClick:function(){n("About")},id:"About","aria-current":"page",to:"/about",children:"About"})}),Object(o.jsx)("li",{className:"nav-item",children:Object(o.jsx)(r.b,{className:"nav-link",onClick:function(){n("Post")},id:"Post","aria-current":"page",to:"/post",children:"Post"})}),Object(o.jsx)("li",{className:"nav-item",children:Object(o.jsx)(r.b,{className:"nav-link",onClick:function(){n("Publications")},id:"Publications","aria-current":"page",to:"/publications",children:"Publications"})})]}),Object(o.jsxs)("form",{className:"d-flex",children:[Object(o.jsx)("input",{className:"form-control me-2",type:"search",placeholder:"Search","aria-label":"Search"}),Object(o.jsx)("button",{className:"btn btn-outline-success",type:"submit",children:"Search"})]})]})]})})}s(42),s(43);function F(e){return Object(o.jsxs)(o.Fragment,{children:[Object(o.jsxs)("div",{className:"blog-item my-2 mx-2",children:[Object(o.jsx)("h4",{className:"mx-3",children:e.heading.toUpperCase()}),Object(o.jsx)("p",{className:"mx-3",children:e.text.slice(0,20)})]}),Object(o.jsx)("hr",{})]})}function T(){var e=Object(c.useState)(1),t=Object(d.a)(e,2),s=t[0],a=t[1];a;var n=fetch("http://localhost:8080/api/publications/paginate/?offset=".concat(s,"&size=").concat(1)).then((function(e){return e.json()})).then((function(e){return e})).listOfPublications;return Object(o.jsxs)("div",{className:"container",children:[Object(o.jsxs)("div",{className:"content my-2",children:[Object(o.jsx)("h1",{children:"Publications from Dr Alok Dubey "}),Object(o.jsx)("hr",{}),n.map((function(e){return Object(o.jsx)(F,{heading:e.heading,text:e.text},e.PublicationId)}))]}),Object(o.jsx)("button",{className:"btn btn-sm btn-danger",children:"\u2190Back"}),Object(o.jsx)("button",{className:"btn btn-sm btn-danger next",children:"Next\u2192"})]})}s(44);function z(){return Object(o.jsxs)("div",{className:"App",children:[Object(o.jsxs)(r.a,{children:[Object(o.jsx)(C,{}),Object(o.jsx)("div",{className:"body",children:Object(o.jsxs)(l.c,{children:[Object(o.jsx)(l.a,{exact:!0,path:"/",component:Q}),Object(o.jsx)(l.a,{exact:!0,path:"/home",component:Q}),Object(o.jsx)(l.a,{exact:!0,path:"/admin",component:w}),Object(o.jsx)(l.a,{exact:!0,path:"/about",component:j}),Object(o.jsx)(l.a,{exact:!0,path:"/publications",component:T}),Object(o.jsx)(l.a,{exact:!0,path:"/post",children:Object(o.jsx)(P,{showAlert:!1})}),Object(o.jsx)(l.a,{exact:!0,path:"/post/success",children:Object(o.jsx)(P,{success:!0})}),Object(o.jsx)(l.a,{exact:!0,path:"/post/failure",children:Object(o.jsx)(P,{failure:!0})})]})})]}),Object(o.jsx)("div",{className:"footer",children:Object(o.jsx)(g,{})})]})}var D=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,46)).then((function(t){var s=t.getCLS,c=t.getFID,a=t.getFCP,n=t.getLCP,i=t.getTTFB;s(e),c(e),a(e),n(e),i(e)}))};i.a.render(Object(o.jsx)(a.a.StrictMode,{children:Object(o.jsx)(z,{})}),document.getElementById("root")),D()}},[[45,1,2]]]);
//# sourceMappingURL=main.9c7aa074.chunk.js.map