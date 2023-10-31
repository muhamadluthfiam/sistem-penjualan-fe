import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';


export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = storeToRefs(useAuthStore());
  const token = useCookie('token')

  if (token.value) {
    isAuthenticated.value = true
  }

  if (token.value && to.name === 'sign-in') {
    return navigateTo('/')
  }

  if (!token.value && to.name !== 'sign-in') {
    abortNavigation();
    return navigateTo('/sign-in');
  }
})