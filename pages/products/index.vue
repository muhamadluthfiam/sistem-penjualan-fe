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
              Products
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
                Statistics
            </div>
            <!-- <p class="text-grey">Your team powers</p> -->
          </div>
          <NuxtLink to="/products/add" class="btn btn-primary">Add Product</NuxtLink>
        </div>
      </div>

      <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-11">
          <div class="card !gap-y-10">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-grey">Total Assets</p>
                <p class="text-xs text-grey">Rupiah Format</p>
                <div class="text-[32px] font-bold text-dark mt-[6px]">
                  425,000
                </div>
              </div>
            </div>
          </div>
          <div class="card !gap-y-10">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-grey">products available</p>
                  <p class="text-xs text-grey">Ready to sale</p>
                  <div class="text-[32px] font-bold text-dark mt-[6px]">
                    205
                  </div>
                </div>
              </div>
          </div>
          <div class="card !gap-y-10">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-grey">Empty items</p>
                <p class="text-xs text-grey">Please update stock items</p>
                <div class="text-[32px] font-bold text-dark mt-[6px]">
                  1
                </div>
              </div>
            </div>
          </div>
      </div>
    </section>
    <section class="pt-[30px]">
        <!-- Section Table -->
      <div class="">
        <div class="flex items-center justify-between gap-6">
          <div>
            <div class="text-xl font-medium text-dark">
                Table
            </div>
          </div>
        </div>
      </div>

      <DynamicTable :columns="tableColumns" :data="tableData"/>
      
    </section>
  </div>
</template>
<script>
import DynamicTable from '@/components/DynamicTable.vue'
export default {
  components: {
    DynamicTable,
  },
  data() {
    return {
      tableColumns: ['No', 'Nama', 'Email', 'Telepon'],
      tableData: [
        { no: 1, nama: 'John Doe', email: 'john@example.com', telepon: '123-456-7890' },
        { no: 2, nama: 'Jane Smith', email: 'jane@example.com', telepon: '987-654-3210' },
        { no: 3, nama: 'Bob Johnson', email: 'bob@example.com', telepon: '555-555-5555' },
      ],
    };
  }
}
</script>