export default defineNuxtRouteMiddleware(async (to, from) => {
    if (typeof window !== 'undefined'){
        const store = useStore();
        const role = store?.value?.role;

        if (role == null || undefined) {
            // console.log('inside midd', user);
            return navigateTo('/');
        }else if(role !== "Administrator"){
            return navigateTo('/dashboard')
        }
    }
})