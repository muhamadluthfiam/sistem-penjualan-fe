import { defineStore } from "pinia";

export const useCustomersStore = defineStore('customer', {
  state: () => ({
    data: null,
    loading: false,
    isSuccess: false
  }),
  actions: {
    async createCustomer ({ name, address, phone }) {
      const cookie = useCookie('token')
      const { data, pending } = await useFetch('http://127.0.0.1:3333/api/v1/customer', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookie.value.token}`
        },
        body: {
          name,
          address,
          phone
        }
      })
      this.loading = pending
      
      if (data.value) {
        this.isSuccess = true
      }
    },

    async getCustomers () {
      const cookie = await useCookie('token')
      const { data } = await useFetch('http://127.0.0.1:3333/api/v1/customer', {
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