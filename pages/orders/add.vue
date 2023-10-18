<template>
  <section class="py-[20px] w-full items-center justify-center">
    <div class="text-[32px] font-semibold text-dark mb-[30px]">
      Add Order
    </div>
    <div class="flex flex-wrap justify-around">
      <form @submit.prevent="addOrder()" class="w-full lg:w-6/12 self-start flex flex-col card" :class="catchProduct ? 'hidden' : 'visible'">
        <div class="flex flex-wrap lg:mt-4">
          <div class="w-full">
            <div class="form-group px-2">
              <label for="" class="text-grey">Customer</label>
              <select class="block w-full input-field mt-2" v-model="selectCustomer">
                <option v-for="(val, i) in storeCustomer.customers" :key="i" :value="{ id: val.id, text: val.name }" class="card rounded-xl">
                  {{ val.name }}
                </option>
                <input type="text" class="bg-transparent">
              </select>
            </div>
            <div class="form-group px-2 mt-4">
              <label for="date" class="text-grey">Select Date</label>
              <input type="date" id="date" name="trip-start" v-model="selectDate" class="card rounded-xl" />
            </div>
          </div>
        </div>
        <button type="submit" class="w-full btn btn-primary mt-[20px]">
          Continue
        </button>
      </form>
      <form @submit.prevent="addOrder()" class="w-full lg:w-6/12 self-start flex flex-col bg-white" v-if="catchProduct">
          Add Product
        <div class="form-group">
          <div class="flex gap-6 px-6" v-for="(val, i) in catchValueProduct" :key="i">
            <div class="w-1/2">
              <label for="" class="text-grey">Product</label>
              <option class="" :value="val.id">
                {{ val.name }}
              </option>
            </div>
            <div class="w-1/2">
              <label for="" class="text-grey">Quantity</label>
              <input v-model="catchValueProduct.name" class="input-field">
            </div>
          </div>
        </div>

        <!-- {{ catchValueProduct }} -->
      </form>
      <div class="bg-white p-6 w-full lg:w-4/12 rounded-lg">
        <table class="w-full">
          <thead class="border-y-2 px-2">
            <tr>
              <th class="text-left font-thin text-slate-800" v-for="column in tableColumns" :key="column">{{ column }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in productStore.products" :key="index" @click="injectToTransactions(row)">
              <td>{{ index + 1 }}</td>
              <td>{{ row.name }}</td>
              <td>{{ row.category.name }}</td>
              <td>{{ row.quantity }}</td>
              <!-- <td>Rp.{{ rupiahFormat(row.basic_price) }}</td>
              <td>Rp.{{ rupiahFormat(row.selling_price) }}</td> -->
              <td class="flex flex-wrap flex-col gap-2 my-8">
                <!-- <button @click="itemToDelete = row" type="button" class="border px-3 py-1 rounded-md hover:bg-red-400 hover:text-white hover:shadow-md">Delete</button>
                <nuxt-link :to="'/products/edit/' + row.id" class="border px-3 py-1 rounded-md bg-green-500 text-white hover:bg-green-400 hover:shadow-md text-center">Edit</nuxt-link> -->
              </td>
              <!-- <td v-for="(value, key) in row" :key="key" :class="[key === 'no' ? 'text-center' : '']">
                {{ value }}
              </td> -->
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
<script setup>
import { format, parseISO } from 'date-fns'
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia';
import { useProductStore } from '~/store/product';
import { useCustomersStore } from '~/store/customers'
import { useOrdersStore } from '~/store/order'
import { useCategoriesStore } from '~/store/categories';

const productStore = useProductStore()
const storeOrder = useOrdersStore()
const storeCustomer = useCustomersStore()
const { getCustomers } = useCustomersStore()
const { getOrder, createOrder} = useOrdersStore()
const selectCustomer = ref({})
const product = ref([])
const date =  ref('')

const catchProduct = ref(false)
const tableColumns = ref(['No', 'Nama', 'Category', 'Quantity'])

const selectDate = computed({
  get() {
    return date.value
  },
  set(val) {
    date.value = val;
  }
})

const catchValueProduct = ref([])

const injectToTransactions = (val) => {
  catchValueProduct.value.push(val)
}

const router = useRouter()

onMounted(async () => {
  await productStore.getProducts()

  await getCustomers()
  await getOrder()
})

const addProduct = async () => {
  const target = ref(Object.assign(product.value, { category_id: selectedCategories.value.id})) 
  // console.log(target.value)
  await createProducts(target.value)
  product.value = {
    name: '',
    quantity: '',
    basic_price: '',
    selling_price: '',
    slug: '',
  };
  selectedCategories.value = ''
}

const addOrder = async () => {
  // console.log(selectCustomer.value.text)
  if (catchProduct) {
    const idCustomer = selectCustomer.value.id
    const currentDate = format(parseISO(date.value), "dd-MM-yyyy")
    await createOrder(idCustomer, currentDate)
    catchProduct.value = true
  }
}

definePageMeta({
  layout: 'transaction',
})
</script>
    