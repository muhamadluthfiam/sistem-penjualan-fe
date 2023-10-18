<template>
  <div>
    <section class="flex flex-col flex-wrap justify-between gap-6 md:items-center md:flex-row">
      <div class="flex items-center justify-between gap-4">
          <a href="#" id="toggleOpenSidebar" class="lg:hidden">
              <svg class="w-6 h-6 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 6h16M4 12h16M4 18h7">
                  </path>
              </svg>
          </a>
          <div class="text-[32px] font-semibold text-dark">
              Customers
          </div>
      </div>
      <div class="flex items-center gap-4">
        <!-- <form class="shrink md:w-[516px] w-full">
          <input type="text" name="" id="" class="input-field !outline-none !border-none italic form-icon-search ring-indigo-200
                focus:ring-2 transition-all duration-300 w-full" placeholder="Search people, team, project">
        </form> -->
        <a href="#"
          class="flex-none w-[46px] h-[46px] bg-white rounded-full p-[11px] relative notification-dot">
          <img src="../assets/svgs/ic-bell.svg" alt="">
        </a>
      </div>
    </section>
    <section class="pt-[50px]">
      <div class="mb-[30px]">
        <div class="flex flex-col justify-between gap-6 sm:items-center sm:flex-row">
          <div>
              <div class="text-xl font-medium text-dark">
                List Of Customers
                <p class="text-sm font-extralight text-slate-400 italic">The Enterprise Customer</p>
              </div>
              <!-- <p class="text-grey">Your team powers</p> -->
          </div>
          <NuxtLink to="/customers/add" class="btn btn-primary">Add Customers</NuxtLink>
        </div>
      </div>
    </section>
    <section class="pt-[30px]">
        <!-- Section Header -->
      <div class="flex">
        <v-table class="w-full">
          <thead>
            <tr>
              <th class="text-left">
                Name
              </th>
              <th class="text-left">
                Address
              </th>
              <th class="text-left">
                Phone
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, i) in storeCustomer.customers"
              :key="i"
            >
              <td>{{ item.name }}</td>
              <td>{{ item.address }}</td>
              <td>{{ item.phone }}</td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </section>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia';
import { useCustomersStore } from '~/store/customers';

const storeCustomer = useCustomersStore()
const router = useRouter()

onMounted(async () => {
  storeCustomer.getCustomers()
})
</script>