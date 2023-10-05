<template>
   <section class="py-[20px] w-full items-center justify-center px-4">
    <div class="text-[32px] font-semibold text-dark mb-[30px]">
      Add Categories
    </div>
    <form class="w-full flex flex-col card">
      <div class="flex flex-wrap">
        <div class="w-full mt-3 lg:mt-0">
          <div class="form-group px-2">
            <label for="category" class="text-grey">Categories Name</label>
            <input v-model="categories.name" type="text" class="input-field">
          </div>
        </div>
      </div>
      <button @click="addCategory" type="button" class="w-full btn btn-primary mt-[20px]">
        Submit
      </button>
    </form>
  </section>
</template>
<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia';
import { useCategoriesStore } from '~/store/categories';

const { createCategories } = useCategoriesStore()
const { isSuccess } = storeToRefs(useCategoriesStore());

const router = useRouter()
const categories = ref({
  name: '',
});

const addCategory = async () => {
  await createCategories(categories.value)
}
</script>
