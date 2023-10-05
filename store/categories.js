import { defineStore } from "pinia";

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    data: null,
    loading: false,
    isSuccess: false
  }),
  actions: {
    async createCategories ({ name }) {
      const cookie = useCookie('token')
      const { data, pending } = await useFetch('http://127.0.0.1:3333/api/v1/category', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookie.value.token}`
        },
        body: {
          name
        }
      })
      this.loading = pending
      
      if (data.value) {
        this.isSuccess = true
      }
    },

    async getCategories () {
      const cookie = await useCookie('token')
      const { data } = await useFetch('http://127.0.0.1:3333/api/v1/category', {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookie.value.token}`
        },
      })
      return data.value
    }
  }
})