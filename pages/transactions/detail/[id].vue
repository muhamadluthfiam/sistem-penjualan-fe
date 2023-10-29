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
					Detail Transactions
				</div>
			</div>
		</section>
		<section class="pt-[50px]">
			<div class="w-full">
				<div id="receipt-content" class="text-left w-full text-sm p-6 overflow-hidden card" v-if="detail">
					<div class="text-center">
						<h2 class="text-xl font-semibold">JAYA MANDIRI PART</h2>
						<p>SAHABAT SPAREPART ANDA</p>
					</div>
					<div class="flex mt-4 text-xs">
						<div class="flex-grow">No: <span>{{ detail.sale.invoice }}</span></div>
						<div> {{ detail.sale.date }} </div>
					</div>
					<hr class="my-2">
					<div>
						<table class="w-full text-xs">
							<thead>
								<tr>
									<th class="py-1 w-1/12 text-center">#</th>
									<th class="py-1 text-left">Item</th>
									<th class="py-1 w-2/12 text-center">Qty</th>
									<th class="py-1 w-3/12 text-right">Subtotal</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item, i) in detail.product" :key="i">
									<td class="py-2 text-center"> {{ i + 1 }} </td>
									<td class="py-2 text-left">
										<span> {{ item.name }} </span>
										<br/>
										<small> {{ priceFormat(item.purchase_price) }} </small>
									</td>
									<td class="py-2 text-center">{{ item.quantity }}</td>
									<td class="py-2 text-right">{{ priceFormat(item.quantity * item.purchase_price) }}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</section>

  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { useUtilsStore } from '~/store/utils';
import { onMounted, ref, onBeforeMount, computed, reactive } from 'vue'

const { isOpen } = storeToRefs(useUtilsStore());
const route = useRoute()
const cookie = useCookie('token')

const detail = ref(null)

onMounted(async () => {
  const response = await fetch(`http://127.0.0.1:3333/api/detail-sale-transaction/${route.params.id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${cookie.value}`
    }
  })
  if (response.status === 201) {
    const data = await response.json()
    detail.value = data.data[0]
  }
})

const priceFormat = (number) => {
  return number ? `Rp. ${numberFormat(number)}` : `Rp. 0`;
}


const numberFormat = (number) => {
  return (number || "")
    .toString()
    .replace(/^0|\./g, "")
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}

const getTotalPrice = () => {
  return detail.value.product.reduce(
    (total, item) => total + item.qty * item.price.replace("Rp.", ""),
    0
  )
}
</script>

