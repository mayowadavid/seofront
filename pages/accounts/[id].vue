<template>
  <div>
    <div id="last-tracking-url">

      <form @submit.prevent="updateAccount">
        <div class="flex justify-between">
          <h1 class="font-bold py-4 capitalize">Update the account</h1>

          <button
            type="submit"
            class="bg-[#bcbcbc] inline-flex justify-center rounded-md border border-transparent pt-4 px-4 text-sm font-medium text-black shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
           Update account
          </button>
        </div>

        <div class="overflow-hidden shadow sm:rounded-md">
          <div class="px-4 py-5 sm:p-6">
            <div class="col-span-12">
              <div class="grid grid-cols-12">
                <div
                  class="col-span-1 flex items-center text-sm font-medium text-gray-700"
                >
                  ID
                </div>
                <div class="col-span-3">
                  <input
                    type="text"
                    v-model="form.id"
                    :disabled="form.id"
                    id="unique_identifier"
                    class="bg-[#dddddd] h-10 py-2 px-3 text-gray-900 mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-gray-800 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div class="col-span-6">
                    <div class="grid grid-cols-12 px-4">
                    <div
                      class="col-span-3 flex items-center text-sm font-medium text-gray-700"
                    >
                      Updated
                    </div>
                    <div class="col-span-9">
                      <input
                        type="text"
                        v-model="form.createdAt"
                        :disabled="form.createdAt"
                        id="timestamp"
                        class="bg-[#dddddd] h-10 py-2 px-3 text-gray-900 mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-gray-800 focus:ring-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                  </div>

                    </div>
              </div>
            </div>

            <div class="flex flex-row mt-4">
              <div class="basis-1/2 pr-1.5">
                <div class="col-span-12">
                  <div class="grid grid-cols-12">
                    <div
                      class="col-span-3 flex items-center text-sm font-medium text-gray-700"
                    >
                      Created
                    </div>
                    <div class="col-span-9">
                      <input
                        type="text"
                        :value="formatDate(form.createdAt, 'YYYY-MM-DD HH:mm')"
                        disabled
                        id="timestamp"
                        class="bg-[#dddddd] h-10 py-2 px-3 text-gray-900 mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-gray-800 focus:ring-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="basis-1/2 pl-1.5">
                <div class="col-span-12">
                  <div class="grid grid-cols-12">
                    <div
                      class="col-span-3 flex items-center text-sm font-medium text-gray-700"
                    >
                      Created By
                    </div>
                    <div class="col-span-9">
                      <input
                        type="text"
                        v-model="form.user.userName"
                        :disabled="form.user.userName"
                        id="createdBy"
                        class="bg-[#dddddd] h-10 py-2 px-3 text-gray-900 mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-gray-800 focus:ring-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-span-12 mt-4">
              <div class="grid grid-cols-12">
                <div
                  class="col-span-3 flex items-center text-sm font-medium text-gray-700"
                >
                  Account name *
                </div>
                <div class="col-span-9">
                  <input
                    placeholder="Need to enter account name (obligatory)"
                    type="text"
                    v-model="form.name"
                    id="item_title"
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
                    placeholder="(free text field, 1000 characters max, about 30 sentenses max) what is the goal of this item or project"
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

<script setup>
import moment from "moment-timezone"

definePageMeta({
  middleware: ["auth"],
})

const AWN = inject("$awn")
const config = useRuntimeConfig()
const { id } = await useRoute().params


const clickdatas = ref([])
const isLoading = ref(false)

const form = ref({
  user: {
    "userName": "",
  },
  createdAt: "",
  description: "",
  name: "",
  id: ""
})

const {fetchSinglePlan, updatePlan} = actions;


const formatDate = (dateString, formatString) => {
  const date = new Date(dateString)
  return moment(date).format(formatString)
}

const updateAccount = () => {
   updatePlan(id, form.value);
}

const store = useStore();

watch(()=>store.value?.singlePlan, (newData)=>{
form.value = {...form.value, ...newData};
});


const setLoading = () => {
  isLoading.value = true
}
console.log('hey');
const copy = async (id) => {
  // Get the text field
  var copyText = document.getElementById(id)

  // Select the text field
  copyText.select()
  copyText.setSelectionRange(0, 99999) // For mobile devices

  // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.value)
  await AWN.success(copyText.value + " copied to clipboard!")
  // Alert the copied text
  //alert("Copied the text: " + copyText.value);
}
onMounted(async()=>{ 
  const res = await fetchSinglePlan(id);
  if(res){
    console.log('plan', res);
  }
  });
</script>

<script>
export default {
  data() {
    return {
      tab: 1,
    }
  },
  methods: {
    activeTabOne() {
      this.tab = 1
    },
    activeTabTwo() {
      this.tab = 2
    },
    activeTabThree() {
      this.tab = 3
    },
    activeTabFour() {
      this.tab = 4
    },
  },
}
</script>

<style>
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

#tasks_list h1,
table tbody tr td {
  color: #000;
}
</style>

<style>
.modal-vue3-header,
.modal-vue3-body .text {
  color: #000 !important;
}

.confirm-modal > div > .modal-vue3-content {
  /* background: red; */
  /* display: none !important; */
}
</style>
