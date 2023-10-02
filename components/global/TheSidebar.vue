<template>
  <div class="hidden lg:block fixed lg:max-w-[295px] w-full overflow-y-auto h-full bg-white z-[999]" id="sidebarHRIS">
    <div class="px-6 py-[50px] gap-y-[50px] flex flex-col">
      <div class="flex items-center justify-between">
        <NuxtLink to="/">
          <img src="/svgs/logo-type.svg" alt="">
        </NuxtLink>
        <a href="#" id="toggleCloseSidebar" class="lg:hidden">
          <svg class="w-6 h-6 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
              </path>
          </svg>
        </a>
      </div>
      <div class="flex flex-col gap-4">
        <div class="text-sm text-grey">Master data</div>
        <NuxtLink to="/employees" class="nav-link">
          <img src="/svgs/ic-users.svg" alt="">
          Employees
        </NuxtLink>
        <NuxtLink to="/roles" class="nav-link">
          <img src="/svgs/ic-flag.svg" alt="">
          Roles
        </NuxtLink>
      </div>
      <div class="flex flex-col gap-4">
        <div class="text-sm text-grey">Daily use</div>
        <NuxtLink to="/" class="nav-link">
          <img src="/svgs/ic-grid.svg" alt="">
          Dashboard
        </NuxtLink>
        <NuxtLink to="/products" class="nav-link">
          <img src="/svgs/ic-ricbox.svg" alt="">
          Product
        </NuxtLink>
        <NuxtLink to="/categories" class="nav-link">
          <img src="/svgs/ic-category.svg" alt="">
          Categories
        </NuxtLink>
        <NuxtLink to="/unit" class="nav-link">
          <img src="/svgs/ic-stack.svg" alt="">
          Unit
        </NuxtLink>
        <NuxtLink to="/transactions" class="nav-link">
          <img src="/svgs/ic-transaction.svg" alt="">
          Transactions
        </NuxtLink>
        <NuxtLink to="/settings" class="nav-link">
          <img src="/svgs/ic-settings.svg" alt="">
          Settings
        </NuxtLink>
        <NuxtLink to="#" class="nav-link">
          <img src="/svgs/ic-signout.svg" alt="">
          Logout
        </NuxtLink>
      </div>
    </div>
  </div>
</template>