import { defineStore } from "pinia";

export const useOrdersStore = defineStore('order', {
  state: () => ({
    data: [],
    orders: [],
    loading: false,
    isSuccess: false,
    objectValue: {},
    basicPrice: [],
    allQuantity: []
  }),
  actions: {
    async createOrder ( customer_id, order_date ) {
      const cookie = useCookie('token')
      const { data } = await useFetch('http://127.0.0.1:3333/api/v1/order', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookie.value.token}`
        },
        body: {
          customer_id: customer_id,
          order_date: order_date
        }
      })
      return data
    },
    
    async getOrder () {
      const cookie = await useCookie('token')
      const { data } = await useAsyncData('data', () => $fetch(`http://127.0.0.1:3333/api/v1/order`, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookie.value.token}`
        },
        params: {
          include: 'customer_id'
        }
      }))
      this.data = data
    },
    
    // async deleteProducts (id) {
    //   const cookie = await useCookie('token')
    //   const { status, pending } = await useFetch(`http://127.0.0.1:3333/api/v1/products/${id}`, {
    //     method: 'DELETE',
    //     headers: { 
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${cookie.value.token}`
    //     },
    //     params: {
    //       include: 'category_id',
    //     },
    //   })
    //   return status
    // },

    async showOrder (id) {
      const cookie = useCookie('token')
      const { data, pending } = await useFetch(`http://127.0.0.1:3333/api/v1/order/${id}`, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookie.value.token}`
        },
        onResponse({ request, response }) {
          console.log(response)
        }
      })
      return data.value
    },

    // async updateProduct (id ,{ name, quantity, category_id, basic_price, selling_price, slug }) {
    //   const cookie = useCookie('token')
    //   const { data, pending } = await useFetch(`http://127.0.0.1:3333/api/v1/products/${id}`, {
    //     method: 'PUT',
    //     headers: { 
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${cookie.value.token}`
    //     },
    //     body: {
    //       name,
    //       quantity,
    //       category_id,
    //       basic_price,
    //       selling_price,
    //       slug
    //     }
    //   })
    //   this.loading = pending
      
    //   if (data.value) {
    //     this.isSuccess = true
    //   }
    // },
  }
})