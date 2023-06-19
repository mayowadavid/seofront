import { e as useRouter, a as useRoute, u as useRuntimeConfig } from './server.mjs';
import { withAsyncContext, useSSRContext } from 'vue';
import { u as useFetch } from './fetch-707280a9.mjs';
import { ssrRenderAttrs } from 'vue/server-renderer';
import 'ofetch';
import 'hookable';
import 'unctx';
import '@unhead/vue';
import '@unhead/dom';
import '@unhead/ssr';
import 'vue-router';
import 'h3';
import 'ufo';
import 'defu';
import '@vueuse/core';
import 'floating-vue';
import 'sweetalert2';
import './config.mjs';
import 'destr';
import 'scule';
import 'ohash';

const _sfc_main = {
  __name: "test",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useRouter();
    const route = useRoute();
    const config = useRuntimeConfig();
    config.BASE_URL + route.fullPath;
    const fullpath = process.env.BASE_URL + "/test";
    console.log("Path and route: ", fullpath, route);
    console.log("Document referrer: ", document.referrer);
    const carDetails = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${config.API_BASE_URL}trackingurl/get-meta`,
      {
        method: "POST",
        body: {
          tracking_url: fullpath
        }
      },
      "$rVQMEfhjEx"
    ).then((res) => res.data.value)), __temp = await __temp, __restore(), __temp);
    console.log("0000006: ", carDetails);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><h1>Test Page</h1></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/test.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=test-3c168c26.mjs.map
