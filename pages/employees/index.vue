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
					Employees
				</div>
      </div>
      <div class="flex items-center gap-4">
				<form class="shrink md:w-[516px] w-full">
						<input type="text" name="" id="" class="input-field !outline-none !border-none italic form-icon-search ring-indigo-200
								focus:ring-2 transition-all duration-300 w-full" placeholder="Search people, team, project">
				</form>
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
						<p class="text-grey">Your team powers</p>
          </div>
          <NuxtLink to="/employees/add" class="btn btn-primary">Add Employee</NuxtLink>
        </div>
      </div>

      <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-11">
				<div class="card !gap-y-10">
					<div class="flex items-center justify-between">
						<div>
							<p class="text-grey">In Total</p>
							<div class="text-[32px] font-bold text-dark mt-[6px]">
								2
							</div>
						</div>
					</div>
				</div>
				<div class="card !gap-y-10">
					<div class="flex items-center justify-between">
						<div>
							<p class="text-grey">Active</p>
							<div class="text-[32px] font-bold text-dark mt-[6px]">
								2
							</div>
						</div>
					</div>
				</div>
				<div class="card !gap-y-10">
					<div class="flex items-center justify-between">
						<div>
							<p class="text-grey">Inactive</p>
							<div class="text-[32px] font-bold text-dark mt-[6px]">
								0
							</div>
						</div>
					</div>
				</div>
      </div>
    </section>
    <section class="pt-[50px]">
        <!-- Section Header -->
      <div class="mb-[30px]">
				<div class="flex items-center justify-between gap-6">
					<div>
						<div class="text-xl font-medium text-dark">
							Employees
						</div>
						<p class="text-grey">The rangers</p>
					</div>
				</div>
      </div>

      <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-10 lg:gap-3">
          <!-- Card -->
				<div class="items-center card py-6 md:!py-10 md:!px-[38px] !gap-y-0" v-for="(item, i) in storeUser.users.data" :key="i">
						<a href="#" class="absolute inset-0 focus:ring-2 ring-primary rounded-[26px]"></a>
						<img src="../assets/images/user-f-1.png" width="70" alt="">
						<div class="mt-6 mb-1 font-semibold text-center text-dark">
							{{ item.username }}
						</div>
						<p class="text-center text-grey">
							{{ item.email }}
						</p>
						<div class="mt-[30px] text-success flex items-center gap-[6px]">
								<img src="../assets//svgs/ic-check-circle.svg" alt="">
								Verified
						</div>
				</div>
      </div>
    </section>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia';
import { useUsersStore } from '~/store/users';

const storeUser = useUsersStore()
const { getUsers } = useUsersStore()
const router = useRouter()

onMounted( async () => {
	await getUsers()
})

</script>