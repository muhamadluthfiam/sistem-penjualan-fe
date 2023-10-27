<template>
  <div>
    <section class="flex flex-col flex-wrap justify-between gap-6 md:items-center md:flex-row">
      <div class="flex items-center justify-between gap-4">
          <button @click="isOpen = !isOpen">
            <svg class="w-6 h-6 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h7">
              </path>
            </svg>
          </button>
          <div class="text-[32px] font-semibold text-dark">
            Products
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
              List Of Products
              <p class="text-sm font-extralight text-slate-400 italic">Enpower your products</p>
            </div>
          </div>
          <NuxtLink to="/products/add" class="btn btn-primary">Add Product</NuxtLink>
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
      <div v-if="itemToDelete" class="fixed inset-0 flex items-center justify-center z-20">
        <div @click="cancelDelete" class="cursor-pointer fixed inset-0 z-10 bg-gray-800 bg-opacity-60"></div>

        <div class="relative z-20 bg-white rounded-md flex flex-wrap gap-20 p-4 hover:shadow-white shadow-2xl">
          <div class="w-28">
            <p class="font-sans text-5xl font-semibold">ARE YOU SURE DELETE DATA ?</p>
          </div>
          <div class="mt-4 flex flex-col-reverse justify-center items-center gap-4">
            <button @click="cancelDelete" class="px-4 py-2 mr-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md">Cancel</button>
            <button @click="cancelDelete" class="px-4 py-2 text-green-500 bg-green-300 hover:bg-green-400 hover:text-green-600 rounded-md hover:shadow-md hover:underline ease-out duration-500">Cancel</button>
            <button @click="confirmDelete" class="px-4 py-2 text-red-500 bg-red-300 hover:bg-red-400 hover:text-red-600 rounded-md hover:shadow-md hover:underline ease-out duration-500">Delete</button>
          </div>
        </div>
      </div>
      <div id="myGrid"></div>
    </section>
  </div>
</template>
<script setup>
import { Grid, h } from 'gridjs'
import "gridjs/dist/theme/mermaid.css";
import { onMounted, ref, onBeforeMount, computed, reactive } from 'vue'
import { storeToRefs } from 'pinia';
import { useProductStore } from '~/store/product';
import { useUtilsStore } from '~/store/utils';

import TableProducts from '@/components/table/TableProducts.vue'


const { isOpen } = storeToRefs(useUtilsStore());

const productStore = useProductStore()
const { deleteProducts, getProducts } = useProductStore()
const router = useRouter()
const columns = ['No', 'Nama', 'Category', 'Quantity', 'Price', 'Selling price', 'Slug']
const tableData = ref([])
const itemToDelete = ref(null)
const cookie = useCookie('token')

onMounted(async () => {
  await productStore.getProducts()
  tableData.value = productStore.products.data
  const response = await fetch('http://127.0.0.1:3333/api/products?page=10', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${cookie.value}`
    }
  })
  if (response.status === 200) {
    const data = await response.json()
    new Grid({
      autoWidth: true,
      pagination: {
        limit: data.data.meta.per_page,
        server: {
          url: (prev, page, limit) => `${prev}?perPage=${limit}&page=${page + 1}`
        }
      },
      width: '100%',
      search: true,
      sort: true,
      autoWidth: true,
      fixedHeader: true,
      resizable: true,
      columns: [{ name: 'id', hidden:true }, 'Name', 'Brand', 'Category', 'Qty', 'Unit', 'Purchase', 'Sale', 'Profit', 
        { 
          name: 'Actions',
          formatter: (cell, row) => {
            return h('button', {
              className: 'py-2 mb-4 px-4 border rounded-md text-white bg-blue-600',
              onClick: () => console.log(row.cells)
            }, 'Edit');
          }
        },
      ],
      server: {
        url: 'http://127.0.0.1:3333/api/products',
        then: data => data.data.data.map(data => 
          [ data.id, data.name, data.brand.name, data.category.name, data.quantity ,data.unit.name, 'Rp.' + rupiahFormat(data.purchase_price), 'Rp.' + rupiahFormat(data.sale_price), 'Rp.' +  rupiahFormat(data.profit), null ]
        ),
        total: data => data.data.meta.total,
        headers: {
          Authorization: `Bearer ${cookie.value}`
        },
      },
    }).render(document.getElementById('myGrid'))
  }
})

const cancelDelete = () => {
  itemToDelete.value = null;
}

const confirmDelete = async () => {
  if (itemToDelete.value) {
    await deleteProducts(itemToDelete.value.id)
    await productStore.getProducts()
    itemToDelete.value = null
  }
}

function rupiahFormat (val) {
  if (val) {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }
}

function catchProfit(val) {
  if(val) {
    console.log(val)
  }
}


</script>