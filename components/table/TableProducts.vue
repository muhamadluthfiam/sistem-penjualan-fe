<template>
  <div class="card">
    <table class="w-full">
      <thead class="border-y-2 px-2">
        <tr>
          <th class="text-left font-thin text-slate-800" v-for="column in props.columns" :key="column">{{ column }}</th>
        </tr>
      </thead>
      <tbody v-if="data">
        <tr v-for="(row, index) in props.data" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ row.name }}</td>
          <td>{{ row.category.name }}</td>
          <td>{{ row.quantity }}</td>
          <td>Rp.{{ rupiahFormat(row.basic_price) }}</td>
          <td>Rp.{{ rupiahFormat(row.selling_price) }}</td>
          <td>{{ row.slug }}</td>
          <td class="flex flex-wrap flex-col gap-2 my-8">
            <button @click="itemToDelete = row" type="button" class="border px-3 py-1 rounded-md hover:bg-red-400 hover:text-white hover:shadow-md">Delete</button>
            <nuxt-link :to="'/products/edit/' + row.id" class="border px-3 py-1 rounded-md bg-green-500 text-white hover:bg-green-400 hover:shadow-md text-center">Edit</nuxt-link>
          </td>
          <!-- <td v-for="(value, key) in row" :key="key" :class="[key === 'no' ? 'text-center' : '']">
            {{ value }}
          </td> -->
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
          <!-- <button @click="cancelDelete" class="px-4 py-2 mr-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md">Cancel</button> -->
          <button @click="cancelDelete" class="px-4 py-2 text-green-500 bg-green-300 hover:bg-green-400 hover:text-green-600 rounded-md hover:shadow-md hover:underline ease-out duration-500">Cancel</button>
          <button @click="confirmDelete" class="px-4 py-2 text-red-500 bg-red-300 hover:bg-red-400 hover:text-red-600 rounded-md hover:shadow-md hover:underline ease-out duration-500">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>

import { onMounted, ref, onBeforeMount, toRef } from 'vue'
import { storeToRefs } from 'pinia';
import { useProductStore } from '~/store/product';

const productStore = useProductStore()
const route = useRouter()
const props = defineProps(['columns', 'data'])
const { deleteProducts, getProducts } = useProductStore()
const itemToDelete = ref(null)

const cancelDelete = () => {
  itemToDelete.value = null;
}

const confirmDelete = async () => {
  if (itemToDelete.value) {
    const response = await deleteProducts(itemToDelete.value.id)
    if (response === 'success') {
      productStore.getProducts()
    }
    itemToDelete.value = null
  }
}

function rupiahFormat (val) {
  if (val) {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }
}
</script>
