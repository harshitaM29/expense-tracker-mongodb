"use strict";(self.webpackChunkreact_the_complete_guide=self.webpackChunkreact_the_complete_guide||[]).push([[433],{9433:function(e,t,r){r.r(t),r.d(t,{default:function(){return m}});var s=r(4165),a=r(5861),n=r(885),c={auth:"ForgetPassword_auth__F1G+U",control:"ForgetPassword_control__TvPhX",actions:"ForgetPassword_actions__NrcAN"},o=r(9140),l=r(3027),i=r(6144),u=r(3360),d=r(2791),p=r(1243),h=r(184),m=function(){var e,t=(0,d.useState)(!1),r=(0,n.Z)(t,2),m=r[0],_=r[1],f=(0,d.useRef)();return(0,h.jsxs)(o.Z,{className:c.auth,children:[(0,h.jsx)("h2",{children:"Forget Password"}),(0,h.jsxs)(l.Z,{onSubmit:function(t){return(e=e||(0,a.Z)((0,s.Z)().mark((function e(t){var r,a;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),r=f.current.value,_(!0),e.prev=3,e.next=6,p.Z.post("http://localhost:4000/password/forgetpassword",{email:r});case 6:a=e.sent,_(!1),a&&alert(a.data.message),e.next=15;break;case 11:e.prev=11,e.t0=e.catch(3),_(!1),alert(e.t0.response.data);case 15:case"end":return e.stop()}}),e,null,[[3,11]])})))).apply(this,arguments)},children:[(0,h.jsxs)(l.Z.Group,{className:c.control,controlId:"email",children:[(0,h.jsx)(l.Z.Label,{children:"Email address"}),(0,h.jsx)("input",{ref:f,required:!0,type:"email",placeholder:"Enter email"})]}),(0,h.jsxs)(i.Z,{className:c.actions,vertical:!0,children:[m&&(0,h.jsx)(u.Z,{className:c.toggle,type:"button",children:"Sending Request"}),!m&&(0,h.jsx)(u.Z,{variant:"primary",type:"submit",children:"Submit"})]})]})]})}}}]);
//# sourceMappingURL=433.14b4a7d0.chunk.js.map