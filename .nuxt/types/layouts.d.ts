import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "auth" | "default" | "front" | "redirect"
declare module "C:/Users/mayowa/Documents/sometraffic_frontend_0.33-main/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}