
export default defineNuxtRouteMiddleware(async(to, from) => {
    if (typeof window !== 'undefined'){
        const token = localStorage.getItem('token')
        const {refreshToken, fetchPlan} = actions;
        if (token == null || undefined) {
            return navigateTo('/');
        }else {
            try{
                Promise.all([refreshToken(), fetchPlan()]);
            }catch(e){
                console.log(e)
            }
           
        }
    }
})
