// import {useUser} from "~/composables/useAuth";

export default defineNuxtRouteMiddleware(async(to, from) => {
  
  if (typeof window !== 'undefined') {
    // Perform localStorage action
    const token = localStorage.getItem('token')
    if (token !== null || undefined) {
      // console.log('inside guest midd', user);
      return navigateTo('/dashboard');
    }
  }
  
})
