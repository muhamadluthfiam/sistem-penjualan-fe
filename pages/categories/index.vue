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
              Categories
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
          <NuxtLink to="/categories/add" class="btn btn-primary">Add Categories</NuxtLink>
        </div>
      </div>
    </section>
    <section class="pt-[30px]">
        <!-- Section Header -->
      <div class="mb-[30px]">
        <div class="flex items-center justify-between gap-6">
          <div>
            <div class="text-xl font-medium text-dark">
                Table
            </div>
            <p class="text-grey">The rangers</p>
          </div>
        </div>
      </div>

      <div class="flex">
        <table class="min-w-full bg-white">
          <thead>
              <tr>
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Telepon</th>
              </tr>
          </thead>
          <tbody id="data-tabel">
              <!-- Data akan ditampilkan di sini -->
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>