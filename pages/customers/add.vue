<template>
   <section class="py-[20px] w-full items-center justify-center px-4">
    <div class="text-[32px] font-semibold text-dark mb-[30px]">
      Add Customers
    </div>
    <form class="w-full flex flex-col card">
      <div class="flex flex-wrap">
        <div class="w-full mt-3 lg:mt-0">
          <div class="form-group px-2">
            <label for="category" class="text-grey">Name</label>
            <input v-model="customers.name" type="text" class="input-field">
          </div>
          <div class="form-group px-2">
            <label for="category" class="text-grey">Address</label>
            <input v-model="customers.address" type="text" class="input-field">
          </div>
          <div class="form-group px-2">
            <label for="category" class="text-grey">Phone</label>
            <input v-model="customers.phone" type="text" class="input-field">
          </div>
        </div>
      </div>
      <button @click="addCustomer" type="button" class="w-full btn btn-primary mt-[20px]">
        Submit
      </button>
    </form>
  </section>
</template>
<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia';
import { useCustomersStore } from '~/store/customers';

const { createCustomer } = useCustomersStore()
const { isSuccess } = storeToRefs(useCustomersStore());

const router = useRouter()
const customers = ref({
  name: '',
  address: '',
  phone: ''
});

const addCustomer = async () => {
  await createCustomer(customers.value)
}
</script>
