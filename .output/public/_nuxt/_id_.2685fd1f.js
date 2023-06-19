import{a as I,w as b,r as l,b as P,x as q,e as _,i as e,D as r,E as u,u as o,m as A,W as k,P as T,Q as D,C as S,k as U,l as V,Z as $,o as p,t as M,F as E,G as L}from"./entry.ca1e4630.js";import{u as v}from"./fetch.f6f7d706.js";import{m as R}from"./index.046527df.js";const C={id:"last-tracking-url"},F=["onSubmit"],N=e("div",{class:"flex justify-between"},[e("h1",{class:"font-bold py-4 capitalize"},"Edit a new group"),e("button",{type:"submit",class:"bg-[#bcbcbc] inline-flex justify-center rounded-md border border-transparent pt-4 px-4 text-sm font-medium text-black shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"}," Edit group ")],-1),z={class:"overflow-hidden shadow sm:rounded-md"},G={class:"px-4 py-5 sm:p-6"},O={class:"col-span-12"},Y={class:"grid grid-cols-12"},H=e("div",{class:"col-span-1 flex items-center text-sm font-medium text-gray-700"}," ID ",-1),W={class:"col-span-5 pr-4"},J=["disabled"],K=e("div",{class:"col-span-1 flex items-center text-sm font-medium text-gray-700"}," Created at ",-1),Q={class:"col-span-5 pl-4"},Z=["value"],X={class:"flex flex-row mt-4"},ee={class:"basis-1/2 pr-1.5"},te={class:"col-span-12"},se={class:"grid grid-cols-12"},oe=e("div",{class:"col-span-3 flex items-center text-sm font-medium text-gray-700"}," Updated ",-1),de={class:"col-span-9"},ie=["disabled"],ae={class:"basis-1/2 pl-1.5"},re={class:"col-span-12"},ne={class:"grid grid-cols-12"},ce=e("div",{class:"col-span-3 flex items-center text-sm font-medium text-gray-700"}," Created By ",-1),le={class:"col-span-9"},ue=["disabled"],me={class:"col-span-12 py-2"},_e={class:"grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-12 gap-4 gap-x-4"},pe={class:"col-span-3 flex items-center text-sm font-medium text-gray-700"},ge={xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"w-6 h-6 ml-2 text-gray-800",style:{display:"inline-block"}},fe=e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"},null,-1),ve=[fe],he={class:"col-span-9"},ye=["value"],xe={class:"col-span-12 mt-4"},be={class:"grid grid-cols-12"},we=e("div",{class:"col-span-3 flex items-center text-sm font-medium text-gray-700"}," Group name * ",-1),je={class:"col-span-9"},Be={class:"col-span-12 sm:col-span-12 mt-4"},Ie={class:"grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-12 gap-4 gap-x-4"},Pe={class:"col-span-12 sm:col-span-12"},qe=e("label",{for:"description",class:"block text-sm font-medium text-gray-700"},"Description",-1),Ae={data(){return{tab:1}},methods:{activeTabOne(){this.tab=1},activeTabTwo(){this.tab=2},activeTabThree(){this.tab=3},activeTabFour(){this.tab=4}}},Ve=Object.assign(Ae,{__name:"[id]",async setup(ke){let i,m;const h=U("$awn"),g=I(),{id:f}=([i,m]=b(()=>V().params),i=await i,m(),i);let y=l(new Date().toLocaleTimeString());localStorage.getItem("user");const w=l(localStorage.getItem("activeAccount"));l([]),l(""),l(!1);const x=l([]);setInterval(()=>{y.value=new Date().toLocaleTimeString()},10);const t=P({createdBy:"",createdAt:"",timestamp:y,unique_identifier:"",description:"",name:"",ProjectId:"",id:""}),{data:a}=([i,m]=b(()=>v(`${g.API_BASE_URL}groups/identifier/${f}`,{key:f},"$9WSLTO6Jf1")),i=await i,m(),i);a.value&&(t.id=a.value.id,t.ProjectId=a.value.ProjectId,t.name=a.value.name,t.createdBy=a.value.createdBy,t.unique_identifier=a.value.unique_identifier,t.description=a.value.description,t.createdAt=a.value.createdAt);const j=(n,s)=>{const c=new Date(n);return R(c).format(s)},B=async()=>{const n={id:t.id,ProjectId:t.ProjectId,name:t.name,createdBy:t.createdBy,unique_identifier:t.unique_identifier,description:t.description},{data:s,error:c}=await v(`${g.API_BASE_URL}groups/update/${f}`,{method:"PUT",body:n},"$gVPGz8FdNI");s.value&&(await h.success(s.value.message),E("/user-groups").then(()=>{L().go("/user-groups")})),c.value&&await h.alert(c.value.statusMessage)};return q(async()=>{const{data:n}=await v(`${g.API_BASE_URL}projects/all?AccountId=${w.value}`,"$o1h0bK08nj");x.value=n.value}),(n,s)=>{const c=$("tooltip");return p(),_("div",C,[e("form",{onSubmit:S(B,["prevent"])},[N,e("div",z,[e("div",G,[e("div",O,[e("div",Y,[H,e("div",W,[r(e("input",{type:"text","onUpdate:modelValue":s[0]||(s[0]=d=>o(t).unique_identifier=d),disabled:o(t).unique_identifier,id:"unique_identifier",class:"bg-[#dddddd] h-10 py-2 px-3 text-gray-900 mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-gray-800 focus:ring-indigo-500 sm:text-sm",required:""},null,8,J),[[u,o(t).unique_identifier]])]),K,e("div",Q,[e("input",{type:"text",value:j(o(t).createdAt,"YYYY-MM-DD HH:mm"),disabled:"",id:"timestamp",class:"bg-[#dddddd] h-10 py-2 px-3 text-gray-900 mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-gray-800 focus:ring-indigo-500 sm:text-sm",required:""},null,8,Z)])])]),e("div",X,[e("div",ee,[e("div",te,[e("div",se,[oe,e("div",de,[r(e("input",{type:"text","onUpdate:modelValue":s[1]||(s[1]=d=>o(t).timestamp=d),disabled:o(t).timestamp,id:"timestamp",class:"bg-[#dddddd] h-10 py-2 px-3 text-gray-900 mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-gray-800 focus:ring-indigo-500 sm:text-sm",required:""},null,8,ie),[[u,o(t).timestamp]])])])])]),e("div",ae,[e("div",re,[e("div",ne,[ce,e("div",le,[r(e("input",{type:"text","onUpdate:modelValue":s[2]||(s[2]=d=>o(t).createdBy=d),disabled:o(t).createdBy,id:"username",class:"bg-[#dddddd] h-10 py-2 px-3 text-gray-900 mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-gray-800 focus:ring-indigo-500 sm:text-sm",required:""},null,8,ue),[[u,o(t).createdBy]])])])])])]),e("div",me,[e("div",_e,[e("div",pe,[A(" Related to Project * "),r((p(),_("svg",ge,ve)),[[c,{content:"<div>Obligatory, here you have to select which project you want to edit group to.</div>",html:!0},void 0,{right:!0}]])]),e("div",he,[r(e("select",{"onUpdate:modelValue":s[3]||(s[3]=d=>o(t).ProjectId=d),id:"category",class:"bg-[#dddddd] h-10 py-2 px-3 text-gray-900 mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-gray-800 focus:ring-indigo-500 sm:text-sm",required:""},[(p(!0),_(T,null,D(o(x),d=>(p(),_("option",{key:d.id,value:d.id},M(d.name),9,ye))),128))],512),[[k,o(t).ProjectId]])])])]),e("div",xe,[e("div",be,[we,e("div",je,[r(e("input",{placeholder:"Need to enter account name (obligatory)",type:"text","onUpdate:modelValue":s[4]||(s[4]=d=>o(t).name=d),id:"name",class:"bg-[#dddddd] h-10 py-2 px-3 text-gray-900 mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-gray-800 focus:ring-indigo-500 sm:text-sm",required:""},null,512),[[u,o(t).name]])])])]),e("div",Be,[e("div",Ie,[e("div",Pe,[qe,r(e("textarea",{"onUpdate:modelValue":s[5]||(s[5]=d=>o(t).description=d),rows:"6",id:"description",class:"bg-[#dddddd] py-2 px-3 text-gray-900 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-800 focus:ring-indigo-500 sm:text-sm",placeholder:"(free text field, 1000 characters max, about 30 sentenses max) what is the goal of this item or group"},null,512),[[u,o(t).description]])])])])])])],40,F)])}}});export{Ve as default};
