<template>
  <div>
    <form @submit.prevent="onSubmit">
      <input type="text" v-model="form.name" required />
      <input type="email" v-model="form.email" required />

      <button type="submit">Create user</button>
    </form>
  </div>
</template>

<script>
import { createUser } from '@/firebase'
import { reactive } from 'vue'

export default {
  setup () {
    const form = reactive({ name: '', email: '' })

    const onSubmit = async () => {
      await createUser({ ...form })

      form.name = ''
      form.email = ''
    }

    return { form, onSubmit }
  }
}
</script>
