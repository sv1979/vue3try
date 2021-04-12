<template>
  <div class="home">
    <user-create />
    <user-list />
  </div>
</template>

<script>
// @ is an alias to /src
import UserCreate from '@/components/UserCreate.vue'
import UserList from '@/components/UserList.vue'

export default {
  name: 'Home',
  components: {
    UserCreate,
    UserList
  }
}
</script>
