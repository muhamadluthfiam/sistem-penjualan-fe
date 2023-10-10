<template>
  <div class="card">
    <table class="min-w-full">
      <thead >
        <tr>
          <th class="font-sans font-extralight mb-2" v-for="column in props.columns" :key="column">{{ column }}</th>
        </tr>
      </thead>
      <tbody v-if="data" class="text-center">
        <tr v-for="(row, index) in props.data" :key="index">
          <td class="border">{{ index + 1 }}</td>
          <td class="border">{{ row.name }}</td>
          <td class="border">{{ row.category.name }}</td>
          <td class="border">{{ row.quantity }}</td>
          <td class="border">Rp.{{ rupiahFormat(row.basic_price) }}</td>
          <td class="border">Rp.{{ rupiahFormat(row.selling_price) }}</td>
          <td class="border my-2">{{ row.slug }}</td>
          <td class="flex flex-wrap gap-2 justify-center items-center my-2">
            <button @click="deleteTable(row.id)" class="border px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-400 hover:shadow-md">Delete</button>
            <nuxt-link :to="'/products/edit/' + row.id" class="border px-3 py-1 rounded-md bg-green-500 text-white hover:bg-green-400 hover:shadow-md">Edit</nuxt-link>
          </td>
          <!-- <td v-for="(value, key) in row" :key="key" :class="[key === 'no' ? 'text-center' : '']">
            {{ value }}
          </td> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>

import { onMounted, ref, onBeforeMount, toRef } from 'vue'
import { storeToRefs } from 'pinia';
import { useProductStore } from '~/store/product';

const route = useRouter()
const props = defineProps(['columns', 'data', 'params'])
const store = useProductStore()

const deleteTable = async (val) => {
  await deleteProducts(val)
}

function rupiahFormat (val) {
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

  

</script>

<script setup>




</script>