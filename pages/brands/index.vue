<template>
  <div>
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
            Merk
          </div>
      </div>
      <div class="flex items-center gap-4">
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
                Daftar Merk
                <p class="text-sm font-extralight text-slate-400 italic">Brand terbaik</p>
              </div>
              <!-- <p class="text-grey">Your team powers</p> -->
          </div>
          <NuxtLink to="/brands/add" class="btn btn-primary">Tambah Merk</NuxtLink>
        </div>
      </div>
    </section>
    <section class="pt-[30px]">
        <!-- Section Header -->

        <!-- {{ itemToDelete }} -->
      <div class="flex relative">
        <div v-if="itemToDelete" class="fixed inset-0 flex items-center justify-center z-20">
          <div @click="cancelDelete" class="cursor-pointer fixed inset-0 z-10 bg-gray-800 bg-opacity-60"></div>
          <div class="relative z-20 bg-white rounded-md flex flex-wrap gap-20 p-4 hover:shadow-white shadow-2xl">
            <div class="w-28">
              <p class="font-sans text-5xl font-semibold">ARE YOU SURE DELETE DATA ?</p>
            </div>
            <div class="mt-4 flex flex-col-reverse justify-center items-center gap-4">
              <button @click="cancelDelete" class="px-4 py-2 mr-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md">Cancel</button>
              <button @click="confirmDelete" type="submit" class="px-4 py-2 text-red-500 bg-red-300 hover:bg-red-400 hover:text-red-600 rounded-md hover:shadow-md hover:underline ease-out duration-500">Delete</button>
            </div>
          </div>
        </div>
        <div id="myGrid"></div>
      </div>
    </section>
  </div>
</template>
<script setup>
import { reloadNuxtApp } from "nuxt/app";
import { Grid, h } from 'gridjs'
import "gridjs/dist/theme/mermaid.css";
import { onMounted, ref, render } from 'vue'
import { storeToRefs } from 'pinia';
import { useUtilsStore } from '~/store/utils';


const { isOpen } = storeToRefs(useUtilsStore());

const router = useRouter()
const cookie = useCookie('token')
let itemToDelete = ref(false)
let itemIdToDelete = ref(null)
const isGridInitialized = ref(false);

onMounted(async () => {
  const dataGrid = new Grid({
    autoWidth: true,
    pagination: {
      limit: 10,
      server: {
        url: (prev, page, limit) => `${prev}?perPage=${limit}&page=${page + 1}`
      }
    },
    width: '100%',
    search: true,
    sort: true,
    autoWidth: true,
    fixedHeader: true,
    resizable: true,
    columns: [{ name: 'id', hidden:true }, 'Name', 
      { 
        name: 'Actions',
        formatter: (cell, row) => {
          return h('button', {
            className: 'py-2 mb-4 px-4 border rounded-md text-white bg-blue-600',
            onClick: () => {
                router.push({ path: `/brands/edit/` + row.cells[0].data })
            }
          }, 'Edit')
        }
      }
    ],
    server: {
      url: 'http://127.0.0.1:3333/api/brands',
      then: data => data.data.data.map(data => 
        [ data.id, data.name ]
      ),
      total: data => data.data.meta.total,
      headers: {
        Authorization: `Bearer ${cookie.value}`
      },
    },
  }).render(document.getElementById('myGrid')).forceRender()
})


const cancelDelete = () => {
  itemToDelete.value = false
}

const confirmDelete = async () => {
  const { status } = await useFetch(`http://127.0.0.1:3333/api/brands/${itemIdToDelete.value}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${cookie.value}`
    }
  })
  console.log(status)
  if (status.value === 'success') {
    itemToDelete.value = false
    reloadNuxtApp({
      path: "/unit",
      ttl: 1000,
    });
  }
}


</script>