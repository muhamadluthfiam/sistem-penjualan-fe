<template>
  <div>
    <section class="py-[20px] w-full items-center justify-center hide-print">
      <div class="text-[32px] font-semibold text-dark mb-[30px]">
        Add Order
      </div>
      <div class="flex flex-wrap justify-around">
        <div class=" p-6 w-full lg:w-6/12 rounded-lg flex-col">
          <div class="border-2 border-black rounded-xl">
            <div class="w-full self-start flex flex-col card">
              <div class="flex flex-wrap lg:mt-4">
                <div class="w-full">
                  <div class="form-group">
                    <label for="" class="text-grey">Customer</label>
                    <select class="block w-full input-field mt-2" v-model="selectCustomer">
                      <option v-for="(val, i) in storeCustomer.customers" :key="i" :value="{ id: val.id, text: val.name }" :disabled="isSubmit" class="card rounded-xl">
                        {{ val.name }}
                      </option>
                      <input type="text" class="bg-transparent">
                    </select>
                  </div>
                  <div class="form-group px-2 mt-4">
                    <label for="date" class="text-grey">Select Date</label>
                    <input type="date" id="date" name="trip-start" v-model="selectDate" class="card rounded-xl" :disabled="isSubmit"/>
                  </div>
                </div>
              </div>
              <button type="button" @click="addOrder()" class="w-full btn btn-primary mt-[20px]">
                Continue
              </button>
            </div>
          </div>

          <div class="bg-white rounded-xl border-black border-2 flex mt-5">
            <table class="w-full mx-5 my-5">
              <thead class="border-y-2 px-2">
                <tr>
                  <th class="text-left font-thin text-slate-800" v-for="column in tableColumns" :key="column">{{ column }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in productStore.products" :key="index" @click="injectToTransactions(row)">
                  <td>{{ index + 1 }}</td>
                  <td>{{ row.name }}</td>
                  <td>{{ row.category.name }}</td>
                  <td>{{ row.quantity }}</td>
                  <!-- <td>Rp.{{ rupiahFormat(row.basic_price) }}</td>
                  <td>Rp.{{ rupiahFormat(row.selling_price) }}</td> -->
                  <td class="flex flex-wrap flex-col gap-2 my-8">
                    <!-- <button @click="itemToDelete = row" type="button" class="border px-3 py-1 rounded-md hover:bg-red-400 hover:text-white hover:shadow-md">Delete</button>
                    <nuxt-link :to="'/products/edit/' + row.id" class="border px-3 py-1 rounded-md bg-green-500 text-white hover:bg-green-400 hover:shadow-md text-center">Edit</nuxt-link> -->
                  </td>
                  <!-- <td v-for="(value, key) in row" :key="key" :class="[key === 'no' ? 'text-center' : '']">
                    {{ value }}
                  </td> -->
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="w-full lg:w-4/12 self-start flex flex-col bg-white">
          <div class="flex-1 flex flex-col overflow-auto">
            <div class="h-16 text-center flex justify-center">
              <div class="pl-8 text-left text-lg py-4 relative">
                <!-- catchValueProduct icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <div x-show="getItemsCount() > 0" class="text-center absolute bg-cyan-500 text-white w-5 h-5 text-xs p-0 leading-5 rounded-full -right-2 top-3">{{ getItemsCount() }}</div>
              </div>
              <div class="flex-grow px-8 text-right text-lg py-4 relative">
                <!-- trash button -->
                <button x-on:click="clear()" class="text-blue-gray-300 hover:text-pink-500 focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            <div class="flex-1 w-full px-4 overflow-auto" v-for="(item, i) in catchValueProduct" :key="i">
              <div class="select-none mb-3 bg-blue-gray-50 rounded-lg w-full text-blue-gray-700 py-2 px-2 flex justify-center">
                <div class="flex-grow">
                  <h5 class="text-sm">{{ item.name }}</h5>
                  <p class="text-xs block">Rp.{{ item.price}}</p>
                </div>
                <div class="py-1">
                  <div class="w-28 grid grid-cols-3 gap-2 ml-2">
                    <button @click="addQty(item, -1)" type="button" class="rounded-lg text-center py-1 text-black bg-blue-gray-600 hover:bg-blue-gray-700 focus:outline-none">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-3 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                      </svg>
                    </button>
                    <input  v-model="item.qty" type="text" class="bg-white rounded-lg text-center shadow focus:outline-none focus:shadow-lg text-sm">
                    <button @click="addQty(item, 1)" type="button" class="rounded-lg text-center py-1 text-black bg-blue-gray-600 hover:bg-blue-gray-700 focus:outline-none">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-3 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="select-none h-auto w-full text-center pt-3 pb-4 px-4">
            <div class="flex mb-3 text-lg font-semibold text-blue-gray-700">
              <div>TOTAL</div>
              <div class="text-right w-full">{{ priceFormat(getTotalPrice()) }}</div>
            </div>
            <div class="mb-3 text-blue-gray-700 px-3 pt-2 pb-3 rounded-lg bg-blue-gray-50">
              <div class="flex text-lg font-semibold">
                <div class="flex-grow text-left">CASH</div>
                <div class="flex text-right">
                  <div class="mr-2">Rp</div>
                  <input :value="numberFormat(cash)" @keyup="updateCash($event.target.value)" type="text" class="w-28 text-right bg-white shadow rounded-lg focus:bg-white focus:shadow-lg px-2 focus:outline-none">
                </div>
              </div>
            </div>
            <div
              v-show="change > 0"
              class="flex mb-3 text-lg font-semibold bg-cyan-50 text-blue-gray-700 rounded-lg py-2 px-3"
            >
              <div class="text-cyan-800">CHANGE</div>
              <div class="text-right flex-grow text-cyan-600">{{ priceFormat(change) }}</div>
            </div>
            <div
              v-show="change < 0"
              class="flex mb-3 text-lg font-semibold bg-pink-100 text-blue-gray-700 rounded-lg py-2 px-3"
            >
              <div class="text-right flex-grow text-pink-600">{{ priceFormat(change) }}</div>
            </div>
            <div
              v-show="change == 0 && catchValueProduct.length > 0"
              class="flex justify-center mb-3 text-lg font-semibold bg-cyan-50 text-cyan-700 rounded-lg py-2 px-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
            </div>
            <button
              type="submit"
              class="text-black rounded-2xl text-lg w-full py-3 focus:outline-none"
              :class="{
                'bg-cyan-500 hover:bg-cyan-600': submitable(),
                'bg-blue-gray-200': !submitable()
              }"
              :disabled="!submitable()"
              @click="submit()"
            >
              SUBMIT
            </button>
          </div>
        </div>  
      </div>
      <div>
        <div
          v-show="isShowModalReceipt"
          class="fixed w-full h-screen left-0 top-0 z-10 flex flex-wrap justify-center content-center p-24"
        >
          <div
            v-show="isShowModalReceipt"
            class="fixed glass w-full h-screen left-0 top-0 z-0" @click="closeModalReceipt()"
            x-transition:enter="transition ease-out duration-100"
            x-transition:enter-start="opacity-0"
            x-transition:enter-end="opacity-100"
            x-transition:leave="transition ease-in duration-100"
            x-transition:leave-start="opacity-100"
            x-transition:leave-end="opacity-0"
          ></div>
          <div
            v-show="isShowModalReceipt"
            class="w-96 rounded-3xl bg-white shadow-xl overflow-hidden z-10"
            x-transition:enter="transition ease-out duration-100"
            x-transition:enter-start="opacity-0 transform scale-90"
            x-transition:enter-end="opacity-100 transform scale-100"
            x-transition:leave="transition ease-in duration-100"
            x-transition:leave-start="opacity-100 transform scale-100"
            x-transition:leave-end="opacity-0 transform scale-90"
          >
            <div id="receipt-content" class="text-left w-full text-sm p-6 overflow-auto">
              <div class="text-center">
                <h2 class="text-xl font-semibold">JAYA MANDIRI PART</h2>
                <p>SAHABAT SPAREPART ANDA</p>
              </div>
              <div class="flex mt-4 text-xs">
                <div class="flex-grow">No: <span>{{ receiptNo }}</span></div>
                <div> {{ receiptDate }} </div>
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
                    <div v-for="(item, i) in catchValueProduct" :key="i">
                      <tr>
                        <td class="py-2 text-center"> {{ i + 1 }} </td>
                        <td class="py-2 text-left">
                          <span> {{ item.name }} </span>
                          <br/>
                          <small> {{ priceFormat(item.price) }} </small>
                        </td>
                        <td class="py-2 text-center">{{ item.qty }}</td>
                        <td class="py-2 text-right">{{ priceFormat(item.qty * item.price) }}</td>
                      </tr>
                    </div>
                  </tbody>
                </table>
              </div>
              <hr class="my-2">
              <div>
                <div class="flex font-semibold">
                  <div class="flex-grow">TOTAL</div>
                  <div>{{ priceFormat(getTotalPrice()) }}</div>
                </div>
                <div class="flex text-xs font-semibold">
                  <div class="flex-grow">PAY AMOUNT</div>
                  <div>{{ priceFormat(cash) }}</div>
                </div>
                <hr class="my-2">
                <div class="flex text-xs font-semibold">
                  <div class="flex-grow">CHANGE</div>
                  <div>{{ priceFormat(change) }}</div>
                </div>
              </div>
            </div>
            <div class="p-4 w-full">
              <button type="button" class="bg-cyan-500 text-white text-lg px-4 py-3 rounded-2xl w-full focus:outline-none" @click="printAndProceed()">PROCEED</button>
            </div>
          </div>
        </div>
      </div>


    </section>
    <div id="print-area" class="print-area"></div>
  </div>
</template>
<script setup>
import { format, parseISO } from 'date-fns'
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia';
import { useProductStore } from '~/store/product';
import { useCustomersStore } from '~/store/customers';
import { useTransactionsStore } from '~/store/transaction.js'
import { useOrdersStore } from '~/store/order'
import { useCategoriesStore } from '~/store/categories';

const productStore = useProductStore()
const storeOrder = useOrdersStore()
const storeCustomer = useCustomersStore()
const { getCustomers } = useCustomersStore()
const { getOrder, createOrder} = useOrdersStore()
const { createTransaction, createOrderDetail } = useTransactionsStore()
const selectCustomer = ref({})
const product = ref([])
const date =  ref('')

const isSubmit = ref(false)
const catchProduct = ref(false)
const tableColumns = ref(['No', 'Nama', 'Category', 'Quantity'])

const selectDate = computed({
  get() {
    return date.value
  },
  set(val) {
    date.value = val;
  }
})

const orderId = ref(null)

const isShowModalReceipt = ref(false)
const receiptNo = ref(null)
const receiptDate = ref(null)

const onInvoiceProduct = ref([])

const change = ref(0)
const cash = ref(0)

const catchValueProduct = ref([])


const injectToTransactions = (val) => {
  catchValueProduct.value.push({
    productId: val.id,
    name: val.name,
    price: val.selling_price,
    qty: 1,
  })
  // catchValueProduct.value.push(val)
}

const getItemsCount = () => {
  return catchValueProduct.value.reduce((count, item) => count + item.qty, 0);
}


const router = useRouter()

onMounted(async () => {
  await productStore.getProducts()

  await getCustomers()
  await getOrder()
})

const addProduct = async () => {
  const target = ref(Object.assign(product.value, { category_id: selectedCategories.value.id})) 
  // console.log(target.value)
  await createProducts(target.value)
  product.value = {
    name: '',
    quantity: '',
    basic_price: '',
    selling_price: '',
    slug: '',
  };
  selectedCategories.value = ''
}

const addOrder = async () => {
  // console.log(selectCustomer.value.text)
  isSubmit.value = true
  if (isSubmit) {
    const idCustomer = selectCustomer.value.id
    const currentDate = format(parseISO(date.value), "dd-MM-yyyy")
    const response = await createOrder(idCustomer, currentDate)
    orderId.value = response._rawValue.id
  }
}

const addQty = async (item, qty) => {
  const index = catchValueProduct.value.findIndex((i) => i.productId === item.productId);
  if (index === -1) {
    return;
  }
  const afterAdd = item.qty + qty;
  if (afterAdd === 0) {
    catchValueProduct.value.splice(index, 1);
  } else {
    catchValueProduct.value[index].qty = afterAdd;
  }
  // this.updateChange();
}

const getTotalPrice = () => {
  return catchValueProduct.value.reduce(
    (total, item) => total + item.qty * item.price,
    0
  )
}

const priceFormat = (number) => {
  return number ? `Rp. ${numberFormat(number)}` : `Rp. 0`;
}

const numberFormat = (number) => {
  return (number || "")
    .toString()
    .replace(/^0|\./g, "")
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}

const updateChange = () => {
  change.value = cash.value - getTotalPrice();
}

const updateCash = (value) =>  {
  cash.value = parseFloat(value.replace(/[^0-9]+/g, ""));
  updateChange();
}

const submitable = () => {
  return change.value >= 0 && catchValueProduct.value.length > 0;
}

const submit = () => {
  const time = new Date();
  isShowModalReceipt.value = true;
  receiptNo.value = `JMP-${Math.round(time.getTime() / 1000)}`;
  receiptDate.value = dateFormat(time);
}

const printAndProceed = async () => {
  const receiptContent = document.getElementById('receipt-content');
  const titleBefore = document.title;
  const printArea = document.getElementById('print-area');
  catchValueProduct.value.map((value) => {
    const data = {
      product_id: value.productId,
      quantity: value.qty,
      price: value.price
    }
    onInvoiceProduct.value.push(data)
  })
  const api = await createTransaction(orderId.value, onInvoiceProduct.value)
  const orderDetail = await createOrderDetail(orderId.value, onInvoiceProduct.value)
  if (receiptContent || api || orderDetail) {
    printArea.innerHTML = receiptContent.innerHTML
    document.title = receiptNo.value
    window.print()
    isShowModalReceipt.value = false
  
    printArea.innerHTML = ''
    document.title = titleBefore
  
    clear();
  }
}

const closeModalReceipt = () => {
  isShowModalReceipt.value = false;
}

const dateFormat = (date) => {
  const formatter = new Intl.DateTimeFormat('id', { dateStyle: 'short', timeStyle: 'short'});
  return formatter.format(date);
}

const clear = () => {
  cash.value = 0
  catchValueProduct.value = []
  receiptNo.value = null
  receiptDate.value = null
  // storeCustomer.customers = []
  updateChange()
}



definePageMeta({
  layout: 'transaction',
})
</script>