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
  
        <form @submit.prevent="createGroup">
          <div class="flex justify-between">
            <h1 class="font-bold py-4 capitalize">Add a new group</h1>
  
            <button
              type="submit"
              class="bg-[#bcbcbc] inline-flex justify-center rounded-md border border-transparent pt-4 px-4 text-sm font-medium text-black shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
             Add group
            </button>
          </div>
  
          <div class="overflow-hidden shadow sm:rounded-md">
            <div class="px-4 py-5 sm:p-6">
              <div class="col-span-12 py-2">
              <div
                class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-12 gap-4 gap-x-4"
              >
                <div
                  class="col-span-3 flex items-center text-sm font-medium text-gray-700"
                >
                  Related to Project *
                  <svg
                    v-tooltip.right="{
                      content:
                        '<div>Obligatory, here you have to select which project you want to add group to.</div>',
                      html: true,
                    }"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 ml-2 text-gray-800"
                    style="display: inline-block"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                    />
                  </svg>
                  <!-- <div
                    class="basis-1/2 flex items-center text-sm font-medium text-gray-700 pl-3"
                  >
                    <button
                      type="button"
                      :disabled="form.category === null"
                      @click="(event) => saveDefault(form.category)"
                      class="bg-[#bcbcbc] rounded-md border border-transparent py-1 px-4 text-sm font-medium text-black disabled:text-gray-500"
                    >
                      Store as default
                    </button>
                    <svg
                      v-tooltip.right="{
                        content:
                          '<div>The value that is selected here on the right becomes the default value when you press the “store as default”button. <br />The next time that you create a new category item, This value will be automatically selected for you. </div>',
                        html: true,
                      }"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6 ml-2 text-gray-800"
                      style="display: inline-block"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                      />
                    </svg>
                  </div> -->
                </div>
                <div class="col-span-9">
                  <select
                  v-model="form.projectId"
                    id="category"
                    class="bg-[#dddddd] h-10 py-2 px-3 text-gray-900 mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-gray-800 focus:ring-indigo-500 sm:text-sm"
                    required
                  >
                    <option v-for="project in projects" :value="project.id" :key="project.id">{{project?.name}}</option>
                  </select>
                </div>
              </div>
            </div>

              <div class="col-span-12 mt-4">
                <div class="grid grid-cols-12">
                  <div
                    class="col-span-3 flex items-center text-sm font-medium text-gray-700"
                  >
                    Group name *
                  </div>
                  <div class="col-span-9">
                    <input
                      placeholder="Need to enter account name (obligatory)"
                      type="text"
                      v-model="form.name"
                      id="name"
                      class="bg-[#dddddd] h-10 py-2 px-3 text-gray-900 mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-gray-800 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
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
                      placeholder="(free text field, 1000 characters max, about 30 sentenses max) what is the goal of this item or group"
                    ></textarea>
                  </div>
                </div>
              </div>
              </div>
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
  const projects = ref([])
  const activeProject = ref(0)
  const form = reactive({
  name: "",
  description: "",
  projectId: "",
})
const store = useStore();
projects.value = [...store.value?.projects];

const projectId = computed(()=> store.value.projectId);
if(projectId){
  form.projectId = projectId.value;
}




watch(()=> store.value.projectId, (newData)=>{
  if(newData){
    form.projectId = newData;
  }
})


const {createGroups} = actions;
const createGroup =  () => {
  createGroups(form);
}
  
 
  </script>
  