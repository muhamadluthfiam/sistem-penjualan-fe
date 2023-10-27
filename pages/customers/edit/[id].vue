<template>
  <section class="py-[20px] w-full items-center justify-center px-4">
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
const customer = ref({
  name: '',
  address: '',
  phone: ''
});

const cookie = useCookie('token')



onMounted(async () => {
  const response = await fetch(`http://127.0.0.1:3333/api/customer/${route.params.id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${cookie.value}`
    }
  })
  if (response.status === 201) {
    const data = await response.json()
    customer.value.name = data.data[0].name
    customer.value.address = data.data[0].address
    customer.value.phone = data.data[0].phone
  }
})


const updateData = async (customer, address, phone) => {
  console.log(customer);
  const response = await fetch(`http://127.0.0.1:3333/api/customer/${route.params.id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${cookie.value}`
    },
    body: {
      name: customer.value.name,
      address: address.value.name,
      phone: phone.value.name,
      is_member: true
    }
  })
  if (response.status === 201) {
    console.log(await response.json())
  }
  // router.back()
}


</script>
    