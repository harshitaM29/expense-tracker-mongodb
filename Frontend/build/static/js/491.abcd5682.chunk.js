"use strict";(self.webpackChunkreact_the_complete_guide=self.webpackChunkreact_the_complete_guide||[]).push([[491],{3491:function(e,t,r){r.r(t),r.d(t,{default:function(){return j}});var n=r(4165),a=r(5861),s="Report_report__XJPV7",c="Report_list__f1wo3",o="Report_description__5YMWp",l=r(2186),i=r(7022),u=r(3360),d=r(9140),h=r(2791),p=r(1243),f=r(184),x=function(e){return(0,f.jsx)("li",{children:(0,f.jsx)(i.Z,{children:(0,f.jsx)("div",{className:o,children:(0,f.jsx)("p",{children:e.url})})})},e.key)},m=r(9434),_=r(313),w=r(674),j=function(){var e,t=localStorage.getItem("token"),r=(0,m.I0)(),o=(0,m.v9)((function(e){return e.premium.downloadedData}));(0,h.useEffect)((function(){r((0,_.L)(t))}),[r]);return(0,f.jsxs)(h.Fragment,{children:[(0,f.jsx)(l.Z,{}),(0,f.jsxs)(i.Z,{className:s,children:[(0,f.jsx)("h2",{children:"Day to Day Expenses"}),(0,f.jsx)(u.Z,{onClick:function(){return(e=e||(0,a.Z)((0,n.Z)().mark((function e(){var a,s;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,p.Z.get("http://localhost:4000/user/download",{headers:{Authorization:t}});case 3:if(200!==(a=e.sent).status){e.next=12;break}(s=document.createElement("a")).href=a.data.fileURL,s.download="myexpense.csv",s.click(),r(w.s.addDownloadedItems(a.data)),e.next=13;break;case 12:throw new Error(a.data.message);case 13:e.next=18;break;case 15:throw e.prev=15,e.t0=e.catch(0),new Error(e.t0);case 18:case"end":return e.stop()}}),e,null,[[0,15]])})))).apply(this,arguments)},children:"Download Report"}),(0,f.jsx)(d.Z,{className:c,children:(0,f.jsx)("ul",{children:o&&o.map((function(e){return(0,f.jsx)(x,{url:e.fileURL},e.id)}))})})]})]})}}}]);
//# sourceMappingURL=491.abcd5682.chunk.js.map