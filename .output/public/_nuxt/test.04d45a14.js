import{G as c,l,a as u,w as _,e as i,o as m,i as h}from"./entry.ca1e4630.js";import{u as f}from"./fetch.f6f7d706.js";const d=h("h1",null,"Test Page",-1),g=[d],A={__name:"test",async setup(p){let e,t;c();const o=l(),s=u();s.BASE_URL+o.fullPath;const a={}.BASE_URL+"/test";console.log("Path and route: ",a,o),console.log("Document referrer: ",document.referrer);const n=([e,t]=_(()=>f(`${s.API_BASE_URL}trackingurl/get-meta`,{method:"POST",body:{tracking_url:a}},"$rVQMEfhjEx").then(r=>r.data.value)),e=await e,t(),e);return console.log("0000006: ",n),(r,B)=>(m(),i("div",null,g))}};export{A as default};
