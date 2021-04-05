<template>
  <h2>Auth</h2>
  <new-user />
  <existing-user />
</template>

<script>
import { ref } from "vue";

import NewUser from "./forms/NewUser.vue";
import ExistingUser from "./forms/ExistingUser.vue";

export default {
  components: { NewUser, ExistingUser },
  name: "AuthScreen",
  setup() {
    return {
      
    };
  },
};
</script>

<style scoped>
</style>