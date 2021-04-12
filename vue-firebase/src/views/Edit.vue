<template>
  <div class="about">
    <h3>This is an edit page</h3>
    <form @submit.prevent="update">
      <input type="text" v-model="form.name" required />
      <input type="email" v-model="form.email" required />
      <button type="submit">Update</button>
    </form>
  </div>
</template>

<script>
import { reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getUser, updateUser } from '@/firebase'

export default {
  setup () {
    const router = useRouter()
    const route = useRoute()
    const userId = computed(() => route.params.id)

    const form = reactive({ name: '', email: '' })

    onMounted(async () => {
      console.log(11, form, userId)
      const user = await getUser(userId.value)
      console.log(11, user)
      form.name = user.name
      form.email = user.email
    })

    const update = async () => {
      await updateUser(userId.value, { ...form })
      router.push('/')
    }

    return { form, update }
  }
}
</script>
