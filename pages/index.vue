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
                <p class="text-grey">Pegawai</p>
                <div class="text-[32px] font-bold text-dark mt-[6px]">
                    0
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
                  0
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
                    0
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

const { isOpen } = storeToRefs(useUtilsStore());

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

</script>

