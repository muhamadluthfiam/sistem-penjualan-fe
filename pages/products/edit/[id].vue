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
            <input v-model="product.basic_price" type="text" class="input-field">
          </div>
        </div>
        <div class="w-full lg:w-3/12 mt-3 lg:mt-0">
          <div class="form-group px-2">
            <label for="" class="text-grey">Selling Price</label>
            <input v-model="product.selling_price" type="number" class="input-field">
          </div>
        </div>
        <div class="relative w-full lg:w-3/12 mt-3 lg:mt-0" >
          <label for="" class="text-grey">Category</label>
          <select class="block w-full input-field mt-2" v-model="product.category">
            <option v-for="(val, i) in categories" :key="i" :value="val">
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

const route = useRoute()
const product = reactive({
  name: '',
  quantity: '',
  basic_price: '',
  selling_price: '',
  category: '',
  slug: ''
});


onMounted(async () => {
  getData()
})

onBeforeMount(async () => {
  categories.value = await getCategories()
})

async function getData() {
  const productData = await showProduct(route.params.id)
  console.log(productData.slug)
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
  const target = ref(Object.assign(product, { category_id: selectedCategories.value.id})) 
  // console.log(target.value)
  await updateProduct(route.params.id, target.value)
}


</script>
    