<template>
  <div>
    <TheSidebar />
    <div class="p-10" :class="[isOpen ? 'ml-[320px]' : 'w-full']">
      <slot />
    </div>
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia';

import TheSidebar from '@/components/global/TheSidebar.vue'
import { useUtilsStore } from '~/store/utils';
const { isOpen } = storeToRefs(useUtilsStore());

</script>
