<template>
  <div>
    <div id="last-users">
      <h1 class="font-bold py-4 uppercase text-center">Update User</h1>
      <form v-on:submit.prevent>
        <div class="overflow-hidden shadow sm:rounded-md">
          <div class="px-4 py-5 sm:p-6 w-full md:w-2/4 m-auto sm:w-full">
            <div class="grid grid-cols-6 gap-6">
              <div class="col-span-10 sm:col-span-12">
                <label
                  for="userName"
                  class="block text-sm font-medium text-gray-700"
                  >First name</label
                >
                <input
                  type="text"
                  v-model="form.userName"
                  id="userName"
                  class="bg-[#dddddd] h-10 py-2 px-3 text-gray-900 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-800 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div class="col-span-10 sm:col-span-12">
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-700"
                  >Email address</label
                >
                <input
                  type="text"
                  v-model="form.email"
                  id="email"
                  class="bg-[#dddddd] h-10 py-2 px-3 text-gray-900 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-800 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div class="col-span-10 sm:col-span-12">
                <label
                  for="password"
                  class="block text-sm font-medium text-gray-700"
                  >Password</label
                >
                <input
                  type="password"
                  v-model="form.password"
                  id="password"
                  class="bg-[#dddddd] h-10 py-2 px-3 text-gray-900 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-800 focus:ring-indigo-500 sm:text-sm"
                  placeholder="New Password"
                />
              </div>

              <div class="col-span-10 sm:col-span-12">
                <label
                  for="userType"
                  class="block text-sm font-medium text-gray-700"
                  >User Type</label
                >
                <select
                  id="userType"
                  v-model="form.role"
                  autocomplete="userType"
                  class="bg-[#dddddd] h-10 py-2 px-3 text-gray-900 mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-800 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  required
                >
                  <option value="">Select</option>
                  <option value="Administrator">Administrator</option>
                  <option value="User">User</option>
                </select>
              </div>

              <div class="col-span-10 sm:col-span-12">
                <label
                  for="userType"
                  class="block text-sm font-medium text-gray-700"
                  >Account</label
                >
                <select
                  id="Account"
                  v-model="form.planId"
                  autocomplete="Account"
                  class="bg-[#dddddd] h-10 py-2 px-3 text-gray-900 mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-800 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  required
                >
                  <option value="null">Select</option>
                  <option
                    v-for="account in plans"
                    :key="account.id"
                    :value="account.id"
                  >
                    {{ account.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div
            class="px-4 py-3 text-right sm:px-6 w-full md:w-2/4 m-auto sm:w-full"
          >
            <button
              @click.prevent="updateUser"
              class="bg-[#bcbcbc] inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth", "admin"],
})
const AWN = inject("$awn")
const config = useRuntimeConfig()
const { id } = await useRoute().params
const form = ref({
  id: id,
  userName: "",
  email: "",
  password: "",
  role: "",
  planId: null,
})
const plans = ref([]);
const store = useStore();
const { fetchUser, updateUserData } = actions;
// fetch the product
plans.value = [...store.value.plan];
const updateUser = () => {
  updateUserData(id, form.value);
}



onBeforeMount(async()=>{ 
  const res = await fetchUser(id);
  if(res){
    //console.log(res);
    form.value = {...form.value, ...res};
  }
})
</script>

<style scoped></style>
