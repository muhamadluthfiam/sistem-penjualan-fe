import { defineStore } from "pinia";

export const useTransactionsStore = defineStore('transactions', {
  state: () => ({
    transactions: [],
    orders: [],
    orderDetails: [],
    loading: false,
    isSuccess: false,
    objectValue: {},
    basicPrice: [],
    allQuantity: []
  }),
  actions: {
    async createTransaction (order_id, product) {
      try {
        const cookie = useCookie('token')
        const { data, pending } = await useFetch('http://127.0.0.1:3333/api/v1/transaction', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookie.value.token}`
          },
          body: {
            order_id : order_id,
            product: product
          }
        })
        this.loading = pending
        
        if (data.value) {
          this.isSuccess = true
        }
      } catch (error) {
        console.log(error)
      }
      
    },

    async createOrderDetail (order_id, product) {
      try {
        const cookie = useCookie('token')
        const { data, pending } = await useFetch('http://127.0.0.1:3333/api/v1/order-detail', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookie.value.token}`
          },
          body: {
            order_id : order_id,
            product: product
          }
        })
        this.loading = pending
        
        if (data.value) {
          this.isSuccess = true
        }
      } catch (error) {
        console.log(error)
      }
      
    },

    async getTranscations (id) {
      const cookie = await useCookie('token')
      const response = await useAsyncData('data', () => $fetch(`http://127.0.0.1:3333/api/v1/transaction/${id}`, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookie.value.token}`
        }
        }),
      );
      
      if (response.status === 200) {
        const data = await response.json();
        this.transactions = data;
        console.log(data);
        return data;
      } else {
        throw new Error('Failed to fetch data');
      }
    },

    async getOrderDetailTransactions (id) {
      const cookie = await useCookie('token')
      const { data } = await useAsyncData('data', () => $fetch(`http://127.0.0.1:3333/api/v1/order-detail/${id}`, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookie.value.token}`
        }
        }),
      );
      
      this.orderDetails = data
    },
    
    async getOrderTransactions () {
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
      return this.orders = data
    }
    
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