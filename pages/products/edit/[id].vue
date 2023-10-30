<template>
  <section class="py-[20px] w-full items-center justify-center px-4">
    <div class="text-[32px] font-semibold text-dark mb-[30px]">
      Edit Products
    </div>    
    <form class="w-full flex flex-col card" v-if="product">
      <div class="flex flex-wrap">
        <div class="w-full lg:w-1/2 mt-3 lg:mt-0">
          <div class="form-group px-2">
            <label for="" class="text-grey">Product Name</label>
            <input v-model="product.name" type="text" class="input-field">
          </div>
        </div>
        <div class="w-full lg:w-1/2 mt-3 lg:mt-0">
          <div class="form-group px-2">
            <label for="" class="text-grey">Quantity</label>
            <input v-model="product.quantity" type="number" class="input-field">
          </div>
        </div>
      </div>
      <div class="flex flex-wrap lg:mt-4">
        <div class="w-full lg:w-3/12 mt-3 lg:mt-0">
          <div class="form-group px-2">
            <label for="" class="text-grey">Basic Price</label>
            <input v-model="product.purchase_price" type="text" class="input-field">
          </div>
        </div>
        <div class="w-full lg:w-3/12 mt-3 lg:mt-0">
          <div class="form-group px-2">
            <label for="" class="text-grey">Selling Price</label>
            <input v-model="product.sale_price" type="number" class="input-field">
          </div>
        </div>
        <div class="relative w-full lg:w-3/12 mt-3 lg:mt-0" >
          <label for="" class="text-grey">Category</label>
          <select class="block w-full input-field mt-2" v-model="selectedCategories">
            <option v-for="(val, i) in categories" :key="i" :value="val">
              {{ val.name }}
            </option>
          </select>
        </div>
        <div class="relative w-full lg:w-3/12 mt-3 lg:mt-0" >
          <label for="" class="text-grey">Brands</label>
          <select class="block w-full input-field mt-2" v-model="selectedBrands">
            <option v-for="(val, i) in brands" :key="i" :value="val">
              {{ val.name }}
            </option>
          </select>
        </div>
        <div class="relative w-full lg:w-3/12 mt-3 lg:mt-0" >
          <label for="" class="text-grey">Units</label>
          <select class="block w-full input-field mt-2" v-model="selectedUnits">
            <option v-for="(val, i) in units" :key="i" :value="val">
              {{ val.name }}
            </option>
          </select>
        </div>
        <div class="w-full lg:w-3/12 mt-3 lg:mt-0">
          <div class="form-group px-2">
            <label for="" class="text-grey">SKU (<span class="text-sm italic">stock keeping unit</span>)</label>
            <input v-model="product.slug" type="text" class="input-field">
          </div>
        </div>
      </div>
      <button @click="updateData" type="button" class="w-full btn btn-primary mt-[20px]">
        Continue
      </button>
    </form>
  </section>
</template>
<script setup>
import { onBeforeMount, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia';
import { useProductStore } from '~/store/product';
import { useCategoriesStore } from '~/store/categories';

const { showProduct, updateProduct } = useProductStore()
const { getCategories } = useCategoriesStore()
const categories = ref([])
const selectedCategories = ref({})
const units = ref([])
const selectedUnits = ref({})
const brands = ref([])
const selectedBrands = ref({})

const router = useRouter()
const route = useRoute()
const product = ref({
  name: '',
  quantity: '',
  category_id: '',
  unit_id: '',
  brand_id: '',
  purchase_price: '',
  sale_price: '',
  slug: ''
});

const cookie = useCookie('token')



onMounted(async () => {
  const category = await fetch(`http://127.0.0.1:3333/api/category/`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${cookie.value}`
    }
  })
  
  const unit = await fetch(`http://127.0.0.1:3333/api/unit/`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${cookie.value}`
    }
  })
  
  const brand = await fetch(`http://127.0.0.1:3333/api/brands/`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${cookie.value}`
    }
  })

  const response = await fetch(`http://127.0.0.1:3333/api/products/${route.params.id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${cookie.value}`
    }
  })
  if (response.status === 201) {
    const data = await response.json()
    product.value.name = data.data[0].name
    product.value.quantity = data.data[0].quantity
    product.value.purchase_price = data.data[0].purchase_price
    product.value.sale_price = data.data[0].sale_price
    product.value.slug = data.data[0].slug
  }
  if (category.status === 200) {    
    const datas = await category.json()
    categories.value = datas.data.data
  }
  if (brand.status === 200) {    
    const datas = await brand.json()
    brands.value = datas.data.data
  }
  if (unit.status === 200) {    
    const datas = await unit.json()
    units.value = datas.data.data
  }
})

onBeforeMount(async () => {
  categories.value = await getCategories()
})

async function getData() {
  const productData = await showProduct(route.params.id)
  if (productData) {
    product.name = productData.name
    product.quantity = productData.quantity
    product.basic_price = productData.basic_price
    product.selling_price = productData.selling_price
    product.category = productData.category
    product.slug = productData.slug
  }
}

const updateData = async () => {
  product.value.category_id = selectedCategories.value.id
  product.value.brand_id = selectedBrands.value.id
  product.value.unit_id = selectedUnits.value.id
  const { status } = await useFetch(`http://127.0.0.1:3333/api/products/${route.params.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookie.value}`
    },
    body: product.value
  })
  if (status) {
    router.push('/products')
  }
}


</script>
    