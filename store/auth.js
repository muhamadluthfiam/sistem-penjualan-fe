import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    loading: null,
  }),
  actions: {
    async authenticatedUser({ email, password }) {
      const { data, pending } = await useFetch('http://127.0.0.1:3333/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: {
          email,
          password
        }
      })
      this.loading = pending

      if (data.value) {
        const token = useCookie('token')
        token.value = data.value.data.token
        this.isAuthenticated = true
      }
    },

    async loggedOut(val) {
      const token = useCookie(val)
      token.value = null
      this.loading = pending
    }
  }
})