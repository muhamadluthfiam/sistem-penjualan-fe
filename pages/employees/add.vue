<template>
  <section class="py-[20px] flex flex-col items-center justify-center px-4">
    <div class="text-[32px] font-semibold text-dark">
        Empower Your Team
    </div>
    <p class="mt-4 text-base leading-7 text-center mb-[50px] text-grey">
        Add your new people to grow the <br>
        company reaching their goals
    </p>
    <form class="w-full card">
        <div class="form-group">
					<label for="" class="text-grey">Username</label>
					<input type="text" v-model="user.username" class="input-field">
        </div>
        <div class="form-group">
					<label for="" class="text-grey">Email Address</label>
					<input v-model="user.email" type="email" class="input-field">
				</div>
				<div class="form-group">
					<label for="" class="text-grey">Password</label>
					<input v-model="user.password" type="password" class="input-field">
				</div>
        <button @click="login" type="button" class="w-full btn btn-primary mt-[14px]">
            Continue
        </button>
    </form>
  </section>
</template>
<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia';
import { useUsersStore } from '~/store/users';

const { createUser } = useUsersStore()
const router = useRouter()

const user = ref({
	username: '',
	email: '',
	password: '',
});

const login = async () => {
  await createUser(user.value)
}
</script>
