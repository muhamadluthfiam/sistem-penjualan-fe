<template>
   <section class="py-[20px] w-full items-center justify-center px-4">
    <div v-if="showAlert" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
      <strong class="font-bold">Success!</strong>
      <span class="block sm:inline">Customer added successfully.</span>
      <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
        <svg @click="showAlert = false" class="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <title>Close</title>
          <path d="M6.293 6.293a1 1 0 011.414 0L10 10.586l2.293-2.293a1 1 0 111.414 1.414L11.414 12l2.293 2.293a1 1 0 01-1.414 1.414L10 13.414 7.707 15.707a1 1 0 01-1.414-1.414L8.586 12 6.293 9.707a1 1 0 010-1.414z"/>
        </svg>
      </span>
    </div>
    <div class="text-[32px] font-semibold text-dark mb-[30px]">
      Add Suppliers
    </div>
    <form class="w-full flex flex-col card">
      <div class="flex flex-wrap">
        <div class="w-full mt-3 lg:mt-0">
          <div class="form-group px-2">
            <label for="category" class="text-grey">Names</label>
            <input v-model="supplier.name" type="text" class="input-field">
          </div>
          <div class="form-group px-2">
            <label for="category" class="text-grey">Address</label>
            <input v-model="supplier.address" type="text" class="input-field">
          </div>
          <div class="form-group px-2">
            <label for="category" class="text-grey">Phone</label>
            <input v-model="supplier.phone" type="text" class="input-field">
          </div>
        </div>
      </div>
      <button @click="addSupplier" type="button" class="w-full btn btn-primary mt-[20px]">
        Submit
      </button>
    </form>
  </section>
</template>
<script setup>
const { $swal } = useNuxtApp()
import { ref } from 'vue'
import { storeToRefs } from 'pinia';
import { useCustomersStore } from '~/store/customers';

const { createCustomer } = useCustomersStore()
const { isSuccess } = storeToRefs(useCustomersStore());

const router = useRouter()
const supplier = ref({
  name: '',
  address: '',
  phone: ''
})

const showAlert = ref(false); 

const isMember = ref([
  { id: 1, name: 'Yes' },
  { id: 0, name: 'No' }
])

const selectIsMember = ref({})
const cookie = useCookie('token')

const addSupplier = async () => {
  const response = await useFetch(`http://127.0.0.1:3333/api/supplier`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${cookie.value}`
    },
    body: {
      name: supplier.value.name,
      address: supplier.value.address,
      phone: supplier.value.phone
    }
  })
  if (response.status === 201) {
    supplier.value.name = null
    supplier.value.address = null
    supplier.value.phone = null
    $swal.fire({
      title: 'Success',
      text: 'Data Berhasil di tambah',
      icon: 'success',
      showConfirmButton: false,
      timer: 2000
    })
  }
  showAlert.value = true
  setTimeout(() => {
    router.push('/suppliers')
    showAlert.value = false
  }, 3000)
}
</script>
