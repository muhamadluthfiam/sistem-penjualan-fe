import { defineStore } from "pinia";

export const useProductStore = defineStore('product', {
  state: () => ({
    data: [],
    products: [],
    loading: false,
    isSuccess: false,
    objectValue: {},
    basicPrice: [],
    allQuantity: []
  }),
  actions: {
    async createProducts ({ name, quantity, category_id, basic_price, selling_price, slug }) {
      const cookie = useCookie('token')
      const { data, pending } = await useFetch('http://127.0.0.1:3333/api/products', {
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
      const { data } = await useAsyncData('data', () => $fetch(`http://127.0.0.1:3333/api/products`, {
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookie.value}`
          },
          params: {
            include: 'category_id',
          },
          }),
      );
      this.products = data.value
      // this.data = data
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
      return status
    },

    async showProduct (id) {
      const cookie = useCookie('token')
      const { data, pending } = await useFetch(`http://127.0.0.1:3333/api/v1/products/${id}`, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookie.value.token}`
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