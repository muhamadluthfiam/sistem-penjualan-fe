<template>
  <div>
    <section class="flex flex-col flex-wrap justify-between gap-6 md:items-center md:flex-row">
      <div class="flex items-center justify-between gap-4">
          <a href="#" id="toggleOpenSidebar" class="lg:hidden">
              <svg class="w-6 h-6 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 6h16M4 12h16M4 18h7">
                  </path>
              </svg>
          </a>
          <div class="text-[32px] font-semibold text-dark">
            Orders
          </div>
      </div>
      <div class="flex items-center gap-4">
        <a href="#"
          class="flex-none w-[46px] h-[46px] bg-white rounded-full p-[11px] relative notification-dot">
          <img src="../assets/svgs/ic-bell.svg" alt="">
        </a>
      </div>
    </section>
    <section class="pt-[50px]">
      <div class="mb-[30px]">
        <div class="flex flex-col justify-between gap-6 sm:items-center sm:flex-row">
          <div>
            <div class="text-xl font-medium text-dark">
              List Of Orders
              <p class="text-sm font-extralight text-slate-400 italic">Manage your orders</p>
            </div>
          </div>
          <NuxtLink to="/orders/add" class="btn btn-primary">Add Order</NuxtLink>
        </div>
      </div>

      <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-11">
        <div class="card !gap-y-10">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-grey">Total Assets</p>
              <p class="text-xs text-grey">Rupiah Format</p>
              <div class="text-[32px] font-bold text-dark mt-[6px]">
               {{ formatRupiah(totalSum) }}
              </div>
            </div>
          </div>
        </div>
        <div class="card !gap-y-10">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-grey">products available</p>
                <p class="text-xs text-grey">Ready to sale</p>
                <div class="text-[32px] font-bold text-dark mt-[6px]">
                  205
                </div>
              </div>
            </div>
        </div>
        <div class="card !gap-y-10">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-grey">Empty items</p>
              <p class="text-xs text-grey">Please update stock items</p>
              <div class="text-[32px] font-bold text-dark mt-[6px]">
                1
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="pt-[30px]">
      <div class="card">
        <table class="w-full">
          <thead class="border-y-2 px-2">
            <tr>
              <th class="text-left font-thin text-slate-800" v-for="column in tableColumns" :key="column">{{ column }}</th>
            </tr>
          </thead>
          <tbody v-if="tableData">
            <tr v-for="(row, index) in tableData" :key="index" class="cursor-pointer" @click="getTransactions(row.id)">
              <td>{{ index + 1 }}</td>
              <td>{{ row.order_date }}</td>
              <td>{{ row.customer.name }}</td>
              <td>{{ row.customer.address }}</td>
              <td>{{ row.customer.phone }}</td>
              <td class="flex flex-wrap flex-col gap-2 my-8">
                <nuxt-link :to="'/orders/transactions/' + row.id" class="border px-3 py-1 rounded-md bg-green-500 text-white hover:bg-green-400 hover:shadow-md text-center">Detail</nuxt-link>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="itemToDelete" class="fixed inset-0 flex items-center justify-center z-20">
          <div @click="cancelDelete" class="cursor-pointer fixed inset-0 z-10 bg-gray-800 bg-opacity-60"></div>

          <div class="relative z-20 bg-white rounded-md flex flex-wrap gap-20 p-4 hover:shadow-white shadow-2xl">
            <div class="w-28">
              <p class="font-sans text-5xl font-semibold">ARE YOU SURE DELETE DATA ?</p>
            </div>
            <div class="mt-4 flex flex-col-reverse justify-center items-center gap-4">
              <button @click="cancelDelete" class="px-4 py-2 text-green-500 bg-green-300 hover:bg-green-400 hover:text-green-600 rounded-md hover:shadow-md hover:underline ease-out duration-500">Cancel</button>
              <button @click="confirmDelete" class="px-4 py-2 text-red-500 bg-red-300 hover:bg-red-400 hover:text-red-600 rounded-md hover:shadow-md hover:underline ease-out duration-500">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup>
import { onMounted, ref, onBeforeMount, computed, reactive } from 'vue'
import { storeToRefs } from 'pinia';
import { useOrdersStore } from '~/store/order';
import TableProducts from '@/components/table/TableProducts.vue'

const store = useOrdersStore()
const { getOrder } = useOrdersStore()
const router = useRouter()
const tableColumns = ref(['No', 'Order Date', 'Name', 'Address', 'Phone'])
const tableData = ref([])
const itemToDelete = ref(null)

onMounted(async () => {
  await getOrder()
  tableData.value = store.data
})

const getTransactions = (id) => {
  router.push({ path: `/orders/transactions/` + id })
}

const cancelDelete = () => {
  itemToDelete.value = null;
}

const confirmDelete = async () => {
  // if (itemToDelete.value) {
  //   await deleteProducts(itemToDelete.value.id)
  //   await productStore.getProducts()
  //   tableData.value = productStore.data
  //   itemToDelete.value = null
  // }
}

function rupiahFormat (val) {
  if (val) {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }
}


definePageMeta({
  layout: 'transaction',
})
</script>