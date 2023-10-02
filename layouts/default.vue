<template>
  <div>
    <TheSidebar />
    <div class="lg:pr-[70px] py-[50px] lg:ml-[320px] xl:ml-[365px] px-4 lg:pl-0">
      <slot />
    </div>
  </div>
</template>
<script>
import TheSidebar from '@/components/global/TheSidebar.vue'
export default {
  setup() {
    
  },
}
</script>
