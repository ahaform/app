export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    if (!localStorage.getItem("curr_sid")) {
      return navigateTo("/login");
    }
  }
});
