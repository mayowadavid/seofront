<template>
  <Head v-if="redirect?.length > 0">
    <Title>Some Traffic | {{ redirect[0]?.seo_title }}</Title>
    <!-- Open Graph Meta Tags -->
    <Meta property="og:title" :content="redirect[0]?.seo_title" />
    <Meta property="og:description" :content="redirect[0].seo_description" />
    <Meta property="og:image" :content="redirect[0].seo_image_url" />
    <Meta property="og:url" :content="fullpath" />
    <Meta property="og:type" content="Some traffic web app" />
  </Head>

  <div>
    <div class="w-screen h-screen rounded-xl p-8 flex justify-center m-auto">
      <div class="space-y-8 flex justify-center m-auto object-center">
        <span class="inline-flex tracking" v-if="flaq.redirect_flaq == true">
          <Loader />
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { useScreen } from "vue-screen";

definePageMeta({
  layout: "front",
});

const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();

const params = route.params;
const query = route.query;
let redirect = ref([]);

onBeforeMount(async () => {
const screenWidth = window?.screen?.width;
const screenHeight = window?.screen?.height;
const operating_system = navigator.userAgent;
const browser_language = navigator.language;
const userAgent = navigator.userAgent;
const device = navigator.userAgent;
const connection = navigator.connection;
let network_speed = "";
if (navigator.connection) {
  const connection = navigator.connection;
  const speedMbps = connection.downlink; // Get the estimated download speed in Mbps
  network_speed = speedMbps + " Mbps";
} else {
  console.log("navigator.connection is not available");
}

const flaq = reactive({ redirect_flaq: false });

const path = window.location.href;
const fullpath = path.split("?")[0];

if (params.id && params.id.length === 7) {
  flaq.redirect_flaq = !flaq.redirect_flaq;
  if (query.fbclid) {
       await useFetch(`${config.API_BASE_URL}tracking-url/getclicks`, {
      method: "POST",
      body: {
        tracking_url: fullpath,
        screen_resolution: `${screenWidth}x${screenHeight}`,
        operating_system,
        device,
        browser_language,
        network_speed,
        referrer_url: document.referrer,
      },
    })
      .then((result) => {
        if (result.data.value) {
          redirect.value = result.data.value;
          let destination = result.data.value.destination_url;
          if (
            !destination.includes("http") ||
            !destination.includes("https")
          ) {
            destination = "https://" + destination;
          }
          window.location.assign(destination);
        }
        if (result.error.value) {
        }
      })
      .catch((error) => {
        console.log("Error useFetch: ", error);
      });
  } else {
     await useFetch(`${config.API_BASE_URL}tracking-url/getclicks`, {
      method: "POST",
      body: {
        tracking_url: path,
        screen_resolution: `${screenWidth}x${screenHeight}`,
        operating_system,
        device,
        browser_language,
        network_speed,
        referrer_url: document.referrer,
      },
    })
      .then((result) => {
        if (result.data.value) {
          redirect.value = result.data.value;
          let destination = result.data.value.destination_url;
          if (
            !destination.includes("http") ||
            !destination.includes("https")
          ) {
            destination = "https://" + destination;
          }
          window.location.assign(destination);
        }
        if (result.error.value) {
        }
      })
      .catch((error) => {
        console.log("Error useFetch: ", error);
      });
  }
  }
})
</script>
