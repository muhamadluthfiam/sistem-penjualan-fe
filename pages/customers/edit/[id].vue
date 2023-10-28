<template>
  <section class="py-[20px] w-full items-center justify-center px-4">
    <div v-if="showAlert" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
      <strong class="font-bold">Success!</strong>
      <span class="block sm:inline">Customer change successfully.</span>
      <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
        <svg @click="showAlert = false" class="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <title>Close</title>
          <path d="M6.293 6.293a1 1 0 011.414 0L10 10.586l2.293-2.293a1 1 0 111.414 1.414L11.414 12l2.293 2.293a1 1 0 01-1.414 1.414L10 13.414 7.707 15.707a1 1 0 01-1.414-1.414L8.586 12 6.293 9.707a1 1 0 010-1.414z"/>
        </svg>
      </span>
    </div>
    <div class="text-[32px] font-semibold text-dark mb-[30px]">
      Edit Customer
    </div>    
    <form class="w-full flex flex-col card">
      <div class="flex flex-wrap">
        <div class="w-full lg:w-1/3 mt-3 lg:mt-0">
          <div class="form-group px-2">
            <label for="" class="text-grey">Name</label>
            <input v-model="customer.name" type="text" class="input-field">
          </div>
        </div>
        <div class="w-full lg:w-1/3 mt-3 lg:mt-0">
          <div class="form-group px-2">
            <label for="" class="text-grey">Address</label>
            <input v-model="customer.address" type="text" class="input-field">
          </div>
        </div>
        <div class="w-full lg:w-1/3 mt-3 lg:mt-0">
          <div class="form-group px-2">
            <label for="" class="text-grey">Phone</label>
            <input v-model="customer.phone" type="text" class="input-field">
          </div>
        </div>
        <div class="relative w-full lg:w-3/12 mt-3 px-2 lg:mt-0">
            <label for="" class="text-grey">Member</label>
            <select class="block w-full input-field mt-2" v-model="selectIsMember">
              <option v-for="(val, i) in isMember" :key="i" :value="{ id: val.id, text: val.name }" class="card rounded-xl">
                {{ val.name }}
              </option>
              <input type="text" class="bg-transparent">
            </select>
          </div>
      </div>
      <button @click="updateData()" type="button" class="w-full btn btn-primary mt-[20px]">
        Submit
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

const router = useRouter()
const route = useRoute()
const customer = reactive({
  name: '',
  address: '',
  phone: ''
});

const showAlert = ref(false); 

const selectIsMember = ref({})
const isMember = ref([
  { id: 1, name: 'Yes' },
  { id: 0, name: 'No' }
])

const cookie = useCookie('token')



onMounted(async () => {
  const response = await fetch(`http://127.0.0.1:3333/api/customer/${route.params.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookie.value}`
    }
  })
  if (response.status === 201) {
    const data = await response.json()
    customer.name = data.data[0].name
    customer.address = data.data[0].address
    customer.phone = data.data[0].phone
  }
})


const updateData = async () => {
  const { status } = await useFetch(`http://127.0.0.1:3333/api/customer/${route.params.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookie.value}`
    },
    body: {
      name: customer.name,
      address: customer.address,
      phone: customer.phone,
      is_member: selectIsMember.value.id
    }
  })
  if (status.value === 'success') {
    customer.name = null
    customer.address = null
    customer.phone = null
    customer.is_member = selectIsMember.value.id
    showAlert.value = true
  }
  setTimeout(() => {
    router.push('/customers')
    showAlert.value = false
  }, 3000)
}


</script>
    