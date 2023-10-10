import { defineStore } from "pinia";

export const useProductStore = defineStore('product', {
  state: () => ({
    data: null,
    loading: false,
    isSuccess: false,
    objectValue: {},
    basicPrice: [],
    allQuantity: []
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
    },

    async getProducts () {
      const cookie = await useCookie('token')
      const { data } = await useAsyncData('data', () => $fetch(`http://127.0.0.1:3333/api/v1/products`, {
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
      const keyArray = data.value.map(element => element.basic_price)
      const valueArray = data.value.map(element => element.quantity)
      for (let i = 0; i < keyArray.length; i++) {
        const key = keyArray[i];
        const value = valueArray[i];
        this.$state.objectValue[key] = value;
      }
      return data.value
    },
    
    async deleteProducts (id) {
      const cookie = await useCookie('token')
      const { status, pending } = await useFetch(`http://127.0.0.1:3333/api/v1/products/${id}`, {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookie.value.token}`
        },
        params: {
          include: 'category_id',
        },
      })
      refreshNuxtData('data')
      return status
    },

    async showProduct (id) {
      const cookie = useCookie('token')
      const { data, pending } = await useFetch(`http://127.0.0.1:3333/api/v1/products/${id}`, {
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

    async updateProduct (id ,{ name, quantity, category_id, basic_price, selling_price, slug }) {
      const cookie = useCookie('token')
      const { data, pending } = await useFetch(`http://127.0.0.1:3333/api/v1/products/${id}`, {
        method: 'PUT',
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
    },
  }
})