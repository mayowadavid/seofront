<template>
  <div @click.shift="doSomething">
    <div id="last-tracking-url">
      <Modal
        title="Are you sure?"
        modalClass="confirm-modal"
        v-model:visible="shouldShowDialog"
        :cancelButton="{ text: 'Cancel' }"
        :okButton="{ text: 'Okay', onclick: () => handleSave() }"
      >
        <div class="text">
          This item already exists in the database. Are you sure that you want
          to create it double?
        </div>
      </Modal>

      <form @submit.prevent="createProject">
        <div class="flex justify-between">
          <h1 class="font-bold py-4 capitalize">Add a new project</h1>

          <button
            type="submit"
            class="bg-[#bcbcbc] inline-flex justify-center rounded-md border border-transparent pt-4 px-4 text-sm font-medium text-black shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add project
          </button>
        </div>

        <div class="overflow-hidden shadow sm:rounded-md">
          <div class="px-4 py-5 sm:p-6">
            <div class="col-span-12 mt-4">
              <div class="grid grid-cols-12">
                <div
                  class="col-span-3 flex items-center text-sm font-medium text-gray-700"
                >
                  Project name *
                </div>
                <div class="col-span-3">
                  <input
                    placeholder="Need to enter account name (obligatory)"
                    type="text"
                    v-model="form.name"
                    id="name"
                    class="bg-[#dddddd] h-10 py-2 px-3 text-gray-900 mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-gray-800 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div
                  class="col-span-6 pl-4"
                >
                      <div class="col-span-9">
                    <select
                    v-model="form.planId"
                      id="category"
                      class="bg-[#dddddd] h-10 py-2 px-3 text-gray-900 mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-gray-800 focus:ring-indigo-500 sm:text-sm"
                      required
                    >
                      <option v-for="plan in plans" :value="plan.id" :key="plan.id">{{plan?.name}}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-span-12 sm:col-span-12 mt-4">
              <div
                class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-12 gap-4 gap-x-4"
              >
                <div class="col-span-12 sm:col-span-12">
                  <label
                    for="description"
                    class="block text-sm font-medium text-gray-700"
                    >Description</label
                  >
                  <textarea
                    v-model="form.description"
                    rows="6"
                    id="description"
                    class="bg-[#dddddd] py-2 px-3 text-gray-900 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-800 focus:ring-indigo-500 sm:text-sm"
                    placeholder="(free text field, 1000 characters max, about 30 sentenses max) what is the goal of this item or project"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <!-- <div class="px-4 py-3 text-right sm:px-6 w-full sm:w-full">
              <button
                type="submit"
                class="bg-[#bcbcbc] inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Create category item
              </button>
            </div> -->
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
input:checked {
  background-color: #22c55e; /* bg-green-500 */
}

input:checked ~ span:last-child {
  --tw-translate-x: 1.75rem; /* translate-x-7 */
}
.valid {
  border: 3px solid green;
}

.invalid {
  border: 3px solid red;
}

#awn-popup-wrapper {
  display: none !important;
}

.input-w-loading {
  width: 90%;
}
img.loading {
  width: 50px;
  display: inline-block;
  margin-left: 10px;
}
</style>

<script setup>
import { Modal } from "usemodal-vue3"
definePageMeta({
  middleware: ["auth"],
})
const AWN = inject("$awn")
const config = useRuntimeConfig()

const shouldShowDialog = ref(false)
const clickdatas = ref([])


const uniqueUrl = ref("")
const isLoading = ref(false)
const user = ref({});
const plans = ref([]);

function isValidUrl(urlString) {
  let urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ) // validate fragment locator

  return !!urlPattern.test(urlString)
}

const form = ref({
  name: "",
  description: "",
  planId: ""
})
const store = useStore();
const allPlan = computed(()=>store.value.plan);
const planId = computed(()=> store.value.planId);
if(allPlan.value.length > 0){
  plans.value = [...allPlan.value];
}

if(planId?.value){
  form.value.planId = planId.value;
}

watch(()=>store.value?.planId, (newData)=>{
  if(newData){
    form.value.planId = newData;
  }
});

user.value = {...store.value.user};
const {createProjects} = actions;

const createProject = () => {
 createProjects(form.value);
}


</script>
