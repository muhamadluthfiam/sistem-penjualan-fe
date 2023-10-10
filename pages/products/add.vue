<template>
  <section class="py-[20px] w-full items-center justify-center px-4">
    <div class="text-[32px] font-semibold text-dark mb-[30px]">
      Add Products
    </div>
    <form class="w-full flex flex-col card">
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
        <div class="relative w-full lg:w-3/12 mt-3 lg:mt-0">
          <label for="" class="text-grey">Category</label>
          <select class="block w-full input-field mt-2" v-model="selectedCategories">
            <option v-for="(val, i) in data" :key="i" :value="{ id: val.id, text: val.name }">
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
      <button @click.stop="addProduct" type="button" class="w-full btn btn-primary mt-[20px]">
        Continue
      </button>
    </form>
  </section>
</template>
<script setup>
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia';
import { useProductStore } from '~/store/product';
import { useCategoriesStore } from '~/store/categories';

const { createProducts } = useProductStore()
const { getCategories } = useCategoriesStore()
const data = ref([])
const selectedCategories = ref({})

const router = useRouter()
const product = ref({
  name: '',
  quantity: '',
  basic_price: '',
  selling_price: '',
  slug: ''
});

onMounted(async () => {
  data.value = await getCategories() 
})

const addProduct = async () => {
  const target = ref(Object.assign(product.value, { category_id: selectedCategories.value.id})) 
  // console.log(target.value)
  await createProducts(target.value)
}

product.value.selling_price = computed({
  get() {
    return product.value.selling_price
  },
  set(val) {
    product.value.selling_price = val
  }
})

// function formatRupiah (price, prefix) {
//   let number = price.replace(/[^,\d]/g, '').toString(),
//       split  = number.split(','),
//       sisa   = split[0].length % 3,
//       rupiah = split[0].substr(0, sisa),
//       ribuan = split[0].substr(sisa).match(/\d{3}/gi)

//       if (ribuan) {
//         let separator = sisa ? '.' : ''
//         rupiah += separator + ribuan.join('.')
//       }

//       rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah
//       return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '')
// }

// var number_string = angka.replace(/[^,\d]/g, '').toString(),
//             split    = number_string.split(','),
//             sisa     = split[0].length % 3,
//             rupiah     = split[0].substr(0, sisa),
//             ribuan     = split[0].substr(sisa).match(/\d{3}/gi);
            
//         if (ribuan) {
//             separator = sisa ? '.' : '';
//             rupiah += separator + ribuan.join('.');
//         }
        
//         rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
//         return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');

</script>
    