<template>
  <div>
    <div id="information_items" class="shadow sm:rounded-md">
      <Modal
        title="You can NOT undo this action"
        modalClass="confirm-modal"
        v-model:visible="shouldShowDialog"
        :cancelButton="{ text: 'Cancel' }"
        :okButton="{ text: 'Okay', onclick: () => handleDelete() }"
      >
        <div class="text">Are you sure?</div>
      </Modal>

      <div class="flex justify-between">
        <h1 class="font-bold py-4 capitalize">
          Information Items list ({{ clickdatasTotal }})
        </h1>
        <div class="flex items-start">
          <div class="flex border-2 rounded">
            <div class="relative">
              <input
                type="text"
                v-model="search.vaClDa"
                class="px-4 py-2 w-80 border-inherit bg-inherit pr-9 focus:outline-none focus:ring focus:border-blue-600 search"
                placeholder="Search..."
                v-on:keyup.enter="enterSearch()"
              />
              <!-- <div class="absolute inset-y-0 right-0"> -->
              <button
                class="absolute inset-y-0 right-0 px-2"
                @click="(event) => empty()"
              >
                <svg
                  color="black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <!-- </div> -->
            </div>

            <button
              class="flex items-center justify-center px-4 border-l bg-blue-700"
              @click="(event) => searched()"
            >
              <svg
                class="w-6 h-6 text-slate-50"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-center"></div>
      <div class="overflow-x-auto">
        <table class="w-full whitespace-nowrap">
          <thead class="bg-black/60">
            <tr>
              <th class="text-left py-3 px-2">Info ID</th>
              <th class="text-left py-3 px-2">Item ID</th>
              <th class="text-left py-3 px-2">Information</th>
              <th class="text-left py-3 px-2">Category</th>
              <!-- <th class="text-left py-3 px-2">Priority</th> -->
              <th class="text-left py-3 px-2">Posts/Month</th>
              <!-- <th class="text-left py-3 px-2">Members</th> -->
              <th class="text-left py-3 px-2">Date/Time</th>
              <th class="text-left py-3 px-2 rounded-r-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="border-b border-gray-700"
              v-for="clickdata in searchdatas"
              :key="clickdata.id"
            >
              <td class="py-3 px-2">
                <NuxtLink
                  :to="`/information-items/${clickdata.id}`"
                  title="Edit"
                  class="hover:text-white"
                >
                  {{ clickdata?.id }}
                </NuxtLink>
              </td>
              <td class="py-3 px-2">
                <NuxtLink
                  :to="`/category-items/${clickdata?.id}`"
                  title="Edit"
                  class="hover:text-white"
                >
                  {{ clickdata?.id }}
                </NuxtLink>
              </td>
              <td class="py-3 px-2 tooltip">
                {{
                  clickdata.information.length > 90
                    ? clickdata.information.slice(0, 90) + "..."
                    : clickdata.information
                }}
              </td>
              <td class="py-3 px-2 capitalize">
                {{ clickdata?.categoryItem?.item_title || 'N/A' }}
              </td>
              <!-- <td class="py-3 px-2 capitalize">{{ clickdata?.Category_Item.priority }}</td> -->
              <td class="py-3 px-2 capitalize">
                {{ clickdata?.posts_per_month }}
              </td>
              <!-- <td class="py-3 px-2 capitalize">
                {{ clickdata?.members_total }}
              </td> -->
              <td class="py-3 px-2 capitalize">
                {{ formatDate(clickdata?.createdAt, "YYYY-MM-DD H:m") }}
              </td>
              <td class="py-3 px-2">
                <div class="inline-flex items-center space-x-3">
                  <NuxtLink
                    :to="`/information-items/${clickdata.id}`"
                    title="Edit"
                    class="hover:text-white"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-5 h-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </NuxtLink>

                  <span
                    @click="(event) => destroy(clickdata.id)"
                    title="Delete"
                    class="hover:text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import moment from "moment-timezone";
import { Modal } from "usemodal-vue3";

definePageMeta({
  middleware: ["auth"],
});
const AWN = inject("$awn");

const { id } = useRoute().query;
const shouldShowDialog = ref(false);
const clickdatas = ref([]);
const searchdatas = ref([]);
const clickdatasTotal = ref(0);
const search = reactive({
  vaClDa: id !== "" ? id : "",
});
const store = useStore();
const checkInfo = computed(()=> store.value.information);
const {fetchInformationByProject} = actions;
const projectId = store.value.projectId;

if(checkInfo.value.length > 0){
  clickdatas.value = [...checkInfo.value];
  searchdatas.value = [...checkInfo.value];
  clickdatasTotal.value = checkInfo.value.length;
}

watch(()=> store?.value?.information, (newData)=>{
  clickdatas.value = [...newData];
  searchdatas.value = [...newData];
  clickdatasTotal.value = newData.length;
})

//console.log('info', clickdatas);

const config = useRuntimeConfig();

const empty = () => {
  search.vaClDa = "";
  searchdatas.value = clickdatas.value;
  clickdatasTotal.value = clickdatas.value.length;
};
const searched = () => {
  searchdatas.value = clickdatas?._value?.filter((row) => {
    return (
      row.username
        .toLowerCase()
        ?.includes(search.vaClDa?.toString()?.toLowerCase()) ||
      row?.id?.includes(search.vaClDa) ||
      row?.Category_Item.unique_identifier?.includes(search.vaClDa) ||
      row?.timestamp
        ?.toLowerCase()
        .includes(search.vaClDa?.toString()?.toLowerCase()) ||
      row?.information
        ?.toLowerCase()
        .includes(search.vaClDa?.toString()?.toLowerCase()) ||
      row?.url_1_txt
        ?.toLowerCase()
        ?.includes(search.vaClDa?.toString()?.toLowerCase()) ||
      row?.url_1_link
        ?.toLowerCase()
        ?.includes(search.vaClDa?.toString()?.toLowerCase()) ||
      row?.url_2_txt
        ?.toLowerCase()
        ?.includes(search.vaClDa?.toString()?.toLowerCase()) ||
      row?.url_2_link
        ?.toLowerCase()
        ?.includes(search.vaClDa?.toString()?.toLowerCase()) ||
      row?.posts_per_month?.toString()?.includes(search.vaClDa) ||
      row?.posts_today?.toString()?.includes(search.vaClDa) ||
      row?.members_total?.toString()?.includes(search.vaClDa) ||
      row?.members_new?.toString()?.includes(search.vaClDa)
    );
  });
  clickdatasTotal.value = searchdatas.value.length;
};
const enterSearch = () => {
  searchdatas.value = clickdatas?._value?.filter((row) => {
    return (
      row.username
        .toLowerCase()
        ?.includes(search.vaClDa?.toString()?.toLowerCase()) ||
      row?.unique_identifier?.includes(search.vaClDa) ||
      row?.Category_Item.unique_identifier?.includes(search.vaClDa) ||
      row?.item_title
        ?.toLowerCase()
        .includes(search.vaClDa?.toString()?.toLowerCase()) ||
      row?.category
        ?.toLowerCase()
        ?.includes(search.vaClDa?.toString()?.toLowerCase()) ||
      row?.cat_group
        ?.toLowerCase()
        ?.includes(search.vaClDa?.toString()?.toLowerCase()) ||
      row?.priority
        ?.toLowerCase()
        ?.includes(search.vaClDa?.toString()?.toLowerCase()) ||
      row?.information
        ?.toLowerCase()
        ?.includes(search.vaClDa?.toString()?.toLowerCase()) ||
      row?.visibility
        ?.toLowerCase()
        ?.includes(search.vaClDa?.toString()?.toLowerCase()) ||
      row?.automatic_status
        ?.toLowerCase()
        ?.includes(search.vaClDa?.toString()?.toLowerCase()) ||
      row?.url_1_txt
        ?.toLowerCase()
        ?.includes(search.vaClDa?.toString()?.toLowerCase()) ||
      row?.url_1_link
        ?.toLowerCase()
        ?.includes(search.vaClDa?.toString()?.toLowerCase()) ||
      row?.url_2_txt
        ?.toLowerCase()
        ?.includes(search.vaClDa?.toString()?.toLowerCase()) ||
      row?.url_2_link
        ?.toLowerCase()
        ?.includes(search.vaClDa?.toString()?.toLowerCase()) ||
      row?.plan_frequency?.toString()?.includes(search.vaClDa)
    );
  });
  clickdatasTotal.value = searchdatas.value.length;
};

const formatDate = (dateString, formatString) => {
  const date = new Date(dateString);
  return moment(date).format(formatString);
};

const setClickDatas = async () => {

  // if (!localStorage.getItem('activeProject')) {
  //   let timer = 0
  //   const waitForActiveProject = setInterval(async () => {
  //     if (localStorage.getItem('activeProject')) {
  //       clearInterval(waitForActiveProject)
  //       const { data: data } = await useFetch(
  //         `${config.API_BASE_URL}information-items/all?projectId=${localStorage.getItem('activeProject')}`
  //       );

  //       clickdatas.value = data.value.data;
  //       searchdatas.value = data.value.data;
  //       clickdatasTotal.value = data.value.count;

  //     } else {
  //       timer += 1
  //       if (timer / 10 > 5) {
  //         clearInterval(waitForActiveProject)
  //       }
  //     }
  //   }, 100)
  // } else {
  //   const { data: data } = await useFetch(
  //     `${config.API_BASE_URL}information-items/all?projectId=${localStorage.getItem('activeProject')}`
  //   );

  //   clickdatas.value = data.value.data;
  //   searchdatas.value = data.value.data;
  //   clickdatasTotal.value = data.value.count;
  // }
  // if (id) {
  //   searched();
  // }

};

const niceFrequencyDisplay = (n) => {
  if (n === 4) {
    return "4 hours";
  } else if (n === 6) {
    return "6 hours";
  } else if (n === 8) {
    return "8 hours";
  } else if (n === 12) {
    return "12 hours";
  } else if (n === 24) {
    return "Daily";
  } else if (n === 48) {
    return "2 Days";
  } else if (n === 72) {
    return "3 Days";
  } else if (n === 120) {
    return "5 Days";
  } else if (n === 168) {
    return "Weekly";
  } else if (n === 336) {
    return "Bi weekly";
  } else if (n === 720) {
    return "Monthly";
  } else if (n === 1440) {
    return "Bi monthly";
  }
};

const handleDelete = async () => {
  const id = localStorage.getItem("sometraffic_delete_info");
  const { data, error } = await useFetch(
    `${config.API_BASE_URL}information-item/${id}`,
    {
      method: "DELETE",
      params: { id: id },
    }
  );
  if (data.value) {
    shouldShowDialog.value = false;
    await AWN.success(data.value.message);
    searchdatas.value = searchdatas.value.filter(d=> d.id !== id);
    clickdatas.value = clickdatas.value.filter(d=> d.id !== id);
  }
  if (error.value) {
    shouldShowDialog.value = false;
    await AWN.alert(error.value.statusMessage);
  }

  localStorage.removeItem("sometraffic_delete_info");
  await setClickDatas();
};

const destroy = async (id) => {
  shouldShowDialog.value = true;
  localStorage.setItem("sometraffic_delete_info", id);
};
onBeforeMount(()=>{
  fetchInformationByProject(projectId);
  console.log('id', projectId);
  })
//onBeforeMount(setClickDatas);
</script>

<style scoped>
#information_items h1,
table tbody tr td,
input {
  color: #000;
}

#information_items input.search {
  background: #ddd;
}
</style>
