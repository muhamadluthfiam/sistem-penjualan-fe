import { defineStore } from "pinia";

export const useProductStore = defineStore('product', {
  state: () => ({
    data: null,
    loading: false,
    isSuccess: false
  }),
  actions: {
    async createProducts ({ name, quantity, category_id, basic_price, selling_price, slug }) {
      const cookie = useCookie('token')
      const { data, pending } = await useFetch('http://127.0.0.1:3333/api/v1/products', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookie.value.token}`
        },
        body: {
          name,
          quantity,
          category_id,
          basic_price,
          selling_price,
          slug
        }
      })
      this.loading = pending
      
      if (data.value) {
        this.isSuccess = true
      }
      console.log(data.value)
    },

    async getProducts () {
      const cookie = await useCookie('token')
      const { data,status } = await useFetch('http://127.0.0.1:3333/api/v1/products', {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookie.value.token}`
        },
        params: {
          include: 'category_id',
        },
      })

      console.log(status)
      return data.value
    }
  }
})