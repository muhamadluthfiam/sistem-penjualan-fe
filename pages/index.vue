<template>
  <div>
    <!-- Top Section -->
    <section class="flex flex-col flex-wrap justify-between gap-6 md:items-center md:flex-row">
			<div class="flex items-center justify-between gap-4">
				<button @click="isOpen = !isOpen">
					<svg class="w-6 h-6 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M4 6h16M4 12h16M4 18h7">
						</path>
					</svg>
				</button>
				<div class="text-[32px] font-semibold text-dark">
					Dashboard
				</div>
			</div>
    </section>

    <section class="pt-[50px]">
        <!-- Section Header -->
        <div class="mb-[30px]">
          <div class="flex items-center justify-between gap-6">
            <div>
              <div class="text-xl font-medium text-dark">
                Statistik
              </div>
              <p class="text-grey">Pantau Penjualan</p>
            </div>
          </div>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-11">
          <div class="card !gap-y-10 min-h-[200px]">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-grey">Total Quantity Produk Pembelian</p>
                <div class="text-[32px] font-bold text-dark mt-[6px]">
                  {{ total }}
                </div>
              </div>
              <a href="employee_create.html">
                  <img src="../assets/svgs/ric-plus.svg" alt="">
              </a>
            </div>
          </div>
          <div class="card !gap-y-10 min-h-[200px]">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-grey">Total Assets</p>
                <div class="text-[32px] font-bold text-dark mt-[6px]">
                  Rp.{{ rupiahFormat(totalAssets) }}
                </div>
              </div>
              <a href="#">
                <img src="../assets/svgs/ric-plus.svg" alt="">
              </a>
            </div>
          </div>
          <div class="card !gap-y-10 min-h-[200px]">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-grey">Produk</p>
                <div class="text-[32px] font-bold text-dark mt-[6px]">
                  {{ product }}
                </div>
              </div>
              <a href="#">
                <img src="../assets/svgs/ric-plus.svg" alt="">
              </a>
            </div>
          </div>
        </div>
    </section>

    <section class="pt-[50px]">
      <div class="grid grid-cols-2 gap-2">
        <div class="w-full">
          <div class="flex items-center justify-between gap-6">
            <div>
              <div class="text-xl font-medium text-dark">
                Transaksi Penjualan
              </div>
              <p class="text-grey">Penjualan berada di gengaman</p>
            </div>
          </div>
          <div class="card">
            <Bar
              :data="chartData"
              :options="chartOptions"
            />
          </div>
        </div>
        <div class="w-full">
          <div class="flex items-center justify-between gap-6">
            <div>
              <div class="text-xl font-medium text-dark">
                Transaksi Pembelian
              </div>
              <p class="text-grey">Pantau arus pembelian</p>
            </div>
          </div>
          <div class="card">
            <Bar
              :data="chartData"
              :options="chartOptions"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { useUtilsStore } from '~/store/utils';
import { Bar } from 'vue-chartjs'
import { elements } from 'chart.js';

const { isOpen } = storeToRefs(useUtilsStore());
const cookie = useCookie('token')

const total = ref(0)
const totalAssets = ref(0)
const product = ref(0)

const chartData = ref({
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: '#f87979',
      data: [40, 20, 100, 50, 10],
    },
  ],
})
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
})

onMounted(async () => {
  const product = await fetch('http://127.0.0.1:3333/api/products', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookie.value}`
    }
  })
  const saleTransaction = await fetch('http://127.0.0.1:3333/api/sale-transaction', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookie.value}`
    }
  })
  const purchaseTransaction = await fetch('http://127.0.0.1:3333/api/detail-purchase-transaction', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookie.value}`
    }
  })
  if (product.status === 200) {
    const dataProduct = await product.json()
    console.log(dataProduct)
    dataProduct.data.data.forEach(element => {
      totalAssets.value += element.purchase_price
    })
    product.value = dataProduct.data.data.length
    console.log(product.value)
  }
  if(saleTransaction.status === 200) {
     const dataModelSale = await saleTransaction.json()
    //  console.log(dataModelSale)
  }
  if(purchaseTransaction.status === 200) {
     const dataModelPurchase = await purchaseTransaction.json()
     dataModelPurchase.data.data.forEach(element => {
        total.value += element.quantity
     });
  }
  
})

function rupiahFormat (val) {
  if (val) {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }
}




</script>

