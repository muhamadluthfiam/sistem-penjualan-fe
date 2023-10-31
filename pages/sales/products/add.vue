<template>
  <section class="py-[20px] w-full items-center justify-center px-4">
    <div v-if="showAlert" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
      <strong class="font-bold">Success!</strong>
      <span class="block sm:inline">Product added successfully.</span>
      <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
        <svg @click="showAlert = false" class="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <title>Close</title>
          <path d="M6.293 6.293a1 1 0 011.414 0L10 10.586l2.293-2.293a1 1 0 111.414 1.414L11.414 12l2.293 2.293a1 1 0 01-1.414 1.414L10 13.414 7.707 15.707a1 1 0 01-1.414-1.414L8.586 12 6.293 9.707a1 1 0 010-1.414z"/>
        </svg>
      </span>
    </div>
    <div class="text-[32px] font-semibold text-dark mb-[30px]">
      Add Products
    </div>
    <form @submit.prevent="addProduct()" class="w-full flex flex-col card">
      <div class="flex flex-wrap">
        <div class="w-full lg:w-1/2 mt-3 lg:mt-0">
          <div class="form-group px-2">
            <label for="" class="text-grey">Nama Produk</label>
            <input v-model="product.name" type="text" class="input-field">
          </div>
        </div>
        <div class="relative w-full lg:w-3/12 mt-3 lg:mt-0">
          <label for="" class="text-grey">Merk</label>
          <select class="block w-full input-field mt-2 bg-white" v-model="selectBrand">
            <option v-for="(val, i) in brands" :key="i" :value="{ id: val.id, text: val.name }" class="rounded-xl px-2">
              {{ val.name }}
            </option>
            <input type="text" class="bg-transparent">
          </select>
        </div>
        <div class="w-full lg:w-1/2 mt-3 lg:mt-0">
          <div class="form-group px-2">
            <label for="" class="text-grey">Jumlah</label>
            <input v-model="product.quantity" type="number" class="input-field">
          </div>
        </div>
      </div>
      <div class="relative w-full lg:w-3/12 mt-3 lg:mt-0">
        <label for="" class="text-grey">Unit</label>
        <select class="block w-full input-field mt-2 bg-white" v-model="selectUnit">
          <option v-for="(val, i) in units" :key="i" :value="{ id: val.id, text: val.name }" class="rounded-xl px-2">
            {{ val.name }}
          </option>
          <input type="text" class="bg-transparent">
        </select>
      </div>
      <div class="flex flex-wrap lg:mt-4">
        <div class="w-full lg:w-3/12 mt-3 lg:mt-0">
          <div class="form-group px-2">
            <label for="" class="text-grey">Harga Beli</label>
            <input v-model="product.purchase_price" type="text" class="input-field">
          </div>
        </div>
        <div class="w-full lg:w-3/12 mt-3 lg:mt-0">
          <div class="form-group px-2">
            <label for="" class="text-grey">Harga Jual</label>
            <input v-model="product.sale_price" @input="rupiah" class="input-field">
          </div>
        </div>
        <div class="w-full lg:w-3/12 mt-3 lg:mt-0">
          <div class="form-group px-2">
            <label for="" class="text-grey">Keuntungan</label>
            <input v-model="product.profit" @input="rupiah" class="input-field">
          </div>
        </div>
        <div class="relative w-full lg:w-3/12 mt-3 lg:mt-0">
          <label for="" class="text-grey">Kategori</label>
          <select class="block w-full input-field mt-2 bg-white" v-model="selectCategory">
            <option v-for="(val, i) in categories" :key="i" :value="{ id: val.id, text: val.name }" class="card rounded-xl px-2">
              {{ val.name }}
            </option>
            <input type="text" class="bg-transparent">
          </select>
        </div>
        <div class="w-full lg:w-3/12 mt-3 lg:mt-0">
          <div class="form-group px-2">
            <label for="" class="text-grey">SKU (<span class="text-sm italic">stock keeping unit</span>)</label>
            <input v-model="product.slug" type="text" class="input-field">
          </div>
        </div>
      </div>
      <button type="submit" class="w-full btn btn-primary mt-[20px]">
        Tambah
      </button>
    </form>
  </section>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia';
import { useProductStore } from '~/store/product';
import { useCategoriesStore } from '~/store/categories';

const showAlert = ref(false); 

const cookie = useCookie('token')
const router = useRouter()
const product = ref({
  name: '',
  quantity: '',
  purchase_price: '',
  sale_price: '',
  profit: '',
  slug: ''
})

const selectBrand = ref({})
const selectCategory = ref({})
const selectUnit = ref({})

let categories = ref(null)
let units = ref(null)
let brands = ref(null)

onMounted(async () => {
  const category = await fetch('http://127.0.0.1:3333/api/category', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookie.value}`
    }
  })
  const unit = await fetch('http://127.0.0.1:3333/api/unit', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookie.value}`
    }
  })
  const brand = await fetch('http://127.0.0.1:3333/api/brands', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookie.value}`
    }
  })
  if(category.status === 200) {
     const thisCategory = await category.json()
     categories.value = thisCategory.data.data
  }
  if(unit.status === 200) {
    const thisUnit = await unit.json()
    console.log(thisUnit.data.data)
    units.value = thisUnit.data.data
  }
  if(brand.status === 200) {
    const thisBrand = await brand.json()
    console.log(thisBrand.data.data)
    brands.value = thisBrand.data.data
  }
})

const addProduct = async () => {
  const response = await useFetch(`http://127.0.0.1:3333/api/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookie.value}`
    },
    body: {
      name: product.value.name,
      category_id: selectCategory.value.id,
      brand_id: selectBrand.value.id,
      unit_id: selectUnit.value.id,
      quantity: product.value.quantity,
      purchase_price: product.value.purchase_price,
      sale_price: product.value.sale_price,
      profit: product.value.profit,
      slug: product.value.slug
    }
  })
  if (response.status === 201) {
    product.value.name = null
    product.value.quantity = null
    product.value.purchase_price = null
    product.value.sale_price = null
    product.value.profit = null
    product.value.slug = null
  }
  showAlert.value = true
  setTimeout(() => {
    router.push('/products')
    showAlert.value = false
  }, 3000)

  console.log(response)
}
</script>
    