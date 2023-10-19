import { defineStore } from "pinia";

export const useUsersStore = defineStore('users', {
  state: () => ({
    data: [],
    users: [],
    loading: false,
    isSuccess: false,
    objectValue: {},
    basicPrice: [],
    allQuantity: []
  }),
  actions: {
    async createUser ({username, email, password }) {
      const cookie = useCookie('token')
      const { data, pending } = await useFetch('http://127.0.0.1:3333/api/v1/employees', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookie.value.token}`
        },
        body: {
          username,
          email,
          password
        }
      })
      this.loading = pending
      
      if (data.value) {
        this.isSuccess = true
      }
    },

    async getUsers () {
      const cookie = await useCookie('token')
      const { data } = await useAsyncData('data', () => $fetch(`http://127.0.0.1:3333/api/v1/employees`, {
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookie.value.token}`
          },
          params: {
            include: 'category_id',
          },
          }),
      );
      this.users = data.value
      // this.data = data
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

    // async showProduct (id) {
    //   const cookie = useCookie('token')
    //   const { data, pending } = await useFetch(`http://127.0.0.1:3333/api/v1/products/${id}`, {
    //     method: 'GET',
    //     headers: { 
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${cookie.value.token}`
    //     },
    //     onResponse({ request, response }) {
    //       console.log(response)
    //     }
    //   })
    //   return data.value
    // },

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