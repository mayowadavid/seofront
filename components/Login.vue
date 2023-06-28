<template>
  <div>
    <div class="flex justify-center w-full items-center">
      <div
        v-if="hasError"
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-full mb-6"
        role="alert"
      >
        <strong class="font-bold">Oops, try again! </strong>
        <span class="block sm:inline">{{ errorMessage }}</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg
            class="fill-current h-6 w-6 text-red-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path
              d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
            />
          </svg>
        </span>
      </div>
    </div>

    <!-- component -->
    <form v-on:submit.prevent>
      <div class="flex justify-center w-full items-center">
        <div class="w-96 flex flex-col items-center">
          <!-- text login -->
          <h1 class="text-center text-2xl font-bold text-gray-600 mb-4">
            Member's Login
          </h1>

          <!-- email input -->
          <div class="w-full mb-4">
            <input
              type="email"
              v-model="form.email"
              id="email"
              class="text-black w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 focus:text-black outline-blue-500"
              placeholder="Your Email"
              required
            />
          </div>
          <!-- password input -->
          <div class="w-full mb-4">
            <input
              type="password"
              v-model="form.password"
              id="password"
              class="text-black w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 focus:text-black outline-blue-500"
              placeholder="Password"
              required
            />
          </div>
          <!-- button -->
          <div class="w-full">
            <button
              @click.prevent="loginForm"
              :disabled="form.password == '' && form.email == ''"
              class="py-4 bg-blue-400 w-full rounded text-blue-50 font-bold hover:bg-blue-700"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>

const Swal = inject("$swal");
const AWN = inject("$awn");
const config = useRuntimeConfig();
const hasError = ref(null);
const errorMessage = ref(null);
const form = reactive({
  email: "",
  password: "",
});
console.log(getters);
const auth = actions;
//console.log(getters);
const loginForm = async () => {
  let login_data = { email: form.email, password: form.password };
  auth.login(login_data);
  //auth.login(login_data);
  // $store.dispatch('auth/login', data);
  // if (data.value) {
  //   console.log(data.value);
  //   hasError.value = false;
  //   localStorage.setItem("token", JSON.stringify(data.value.refreshToken));
  //   localStorage.setItem('role', data.value.role);
  //   navigateTo("/dashboard");
  // }
  // if (error.value) {
  //   hasError.value = true;
  //   errorMessage.value = error.value.data.message;
  // }
};

</script>

<style scoped></style>