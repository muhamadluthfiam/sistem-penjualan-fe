<template>
  <div class="py-[50px] flex flex-col items-center justify-center px-4">
    <div class="text-[32px] font-semibold text-dark mt-[10px]">
      Sign In
    </div>
    <p class="mt-4 text-base leading-7 text-center mb-[50px] text-grey">
      Enter your Sistem Informasi Penjualan Sparepart <br> Application
    </p>
    <form class="w-full lg:w-1/3 card">
      <div class="form-group">
        <label for="" class="text-grey">Email Address</label>
        <input v-model="user.email" type="email" class="input-field">
      </div>
      <div class="form-group">
        <label for="" class="text-grey">Password</label>
        <input v-model="user.password" type="password" class="input-field">
      </div>
      <!-- <nuxt-link v-if="!authenticated" to="/login" class="w-full btn btn-primary mt-[14px]">Login</nuxt-link> -->

      <button @click="login()" type="button" class="w-full btn btn-primary mt-[14px]">
        Sign In
      </button>
    </form>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';

const { authenticatedUser } = useAuthStore()
const router = useRouter()
const { isAuthenticated } = storeToRefs(useAuthStore());

const user = ref({
  email: '',
  password: '',
});

const login = async () => {
  await authenticatedUser(user.value)
  if (isAuthenticated) {
    router.push('/')
  }
}

definePageMeta({
  layout: 'authentication',
  name: 'sign-in'
})
</script>
