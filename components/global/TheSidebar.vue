<template>
  <div :class="[isOpen ? 'block' : 'hidden']" class="fixed lg:max-w-[295px] w-full overflow-y-auto h-full bg-white z-10 ">
    <div class="px-6 py-[50px] gap-y-[50px] flex flex-col">
      <div class="flex items-center justify-between">
        <NuxtLink to="/">
          <h3 class="font-bold text-2xl text-center mx-auto font-sans">
            Jaya Mandiri Part
          </h3>
          <!-- <img src="/svgs/logo-type.svg" alt=""> -->
        </NuxtLink>
        <button @click="isOpen = !isOpen" class="lg:hidden">
          <svg class="w-6 h-6 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
          </path>
          </svg>
        </button>
      </div>
      <div class="flex flex-col gap-4">
        <div class="text-sm text-grey">Master data</div>
        <NuxtLink to="/employees" class="nav-link">
          <img src="/svgs/ic-users.svg" alt="">
          Pegawai
        </NuxtLink>
        <NuxtLink to="/roles" class="nav-link">
          <img src="/svgs/ic-flag.svg" alt="">
          Roles
        </NuxtLink>
        <NuxtLink to="/permissions" class="nav-link">
          <img src="/svgs/ic-flag.svg" alt="">
          Permissions
        </NuxtLink>
      </div>
      <div class="flex flex-col gap-4">
        <div class="text-sm text-grey">Sehari hari</div>
        <NuxtLink to="/" class="nav-link">
          <img src="/svgs/ic-grid.svg" alt="">
          {{ roles }}
          Dashboard
        </NuxtLink>
        <NuxtLink to="/products" class="nav-link">
          <img src="/svgs/ic-ricbox.svg" alt="">
          Produk
        </NuxtLink>
        <NuxtLink to="/brands" class="nav-link">
          <img src="/svgs/ic-flag.svg" alt="">
          Merk
        </NuxtLink>
        <NuxtLink to="/transactions" class="nav-link">
          <img src="/svgs/ic-transaction.svg" alt="">
          Penjualan
        </NuxtLink>
        <NuxtLink to="/transactions-purchase" class="nav-link">
          <img src="/svgs/ic-transaction.svg" alt="">
          Pembelian
        </NuxtLink>
        <NuxtLink to="/categories" class="nav-link">
          <img src="/svgs/ic-category.svg" alt="">
          Kategori
        </NuxtLink>
        <NuxtLink to="/customers" class="nav-link">
          <img src="/svgs/ic-users.svg" alt="">
          Pelanggan
        </NuxtLink>
        <NuxtLink to="/suppliers" class="nav-link">
          <img src="/svgs/ic-gift.svg" alt="">
          Distributor
        </NuxtLink>
        <NuxtLink to="/unit" class="nav-link">
          <img src="/svgs/ic-stack.svg" alt="">
          Unit
        </NuxtLink>
        <!-- <NuxtLink to="/settings" class="nav-link">
          <img src="/svgs/ic-settings.svg" alt="">
          Settings
        </NuxtLink> -->
        <button @click="logout()" class="nav-link">
          <img src="/svgs/ic-signout.svg" alt="">
          Keluar
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';
import { useUtilsStore } from '~/store/utils';
import { useCookie } from 'nuxt/app';

const { loggedOut } = useAuthStore()
const router = useRouter()
const token = 'token'
const roles = useCookie()

const { isOpen } = storeToRefs(useUtilsStore());
isOpen.value = false

console.log(isOpen.value)

const logout = async () => {
  loggedOut(token)
  await router.push('/')
  location.reload()
  roles.value === null
}
</script>