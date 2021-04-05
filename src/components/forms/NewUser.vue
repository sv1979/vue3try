<template>
  <h3>New User</h3>
  <input type="text" v-model="state.user.username">
  <input type="text" v-model="state.user.password">
  <button v-on:click="loginUser">Click</button>
  <div class="error" v-if="state.showError">
    {{state.errorText}}
  </div>
</template>

<script>

import { computed, reactive, onMounted } from "vue";
import { emitter } from "@/utils/emitter";
import formMixin from "@/utils/formMixin"

export default {
  name: "NewUser",
  setup() {
    const { displayError } = formMixin()

    const state = reactive({
        user: {
            username: "",
            password: ""
        },
        errorText: "",
        showError: false,
        duplicateUsernameErrorShown: false
    });

    function loginUser () {
      if (this.state.user.username && this.state.user.password) {
        loginAction()
      } else {
        setErrorState()
      }
    }

    function loginAction () {
      emitter.emit("login", state.user)
    }

    function setErrorState () {
        let errorResponse = displayError(state)
        state.showError = errorResponse.showError;
        state.errorText = errorResponse.errorText;
    }

    function init () {
      emitter.on("duplicatedUsernameError", () => { 
        state.duplicateUsernameErrorShown = true; 
        setErrorState()
      });
      emitter.on("newUserCreated", () => {
        state.duplicateUsernameErrorShown = false;
        setErrorState()
        state.user = {
            username: "",
            password: ""
        }
        console.log('From form: new user created')
      })
    }

    onMounted(() => {
      init();
    });

    return {
      state,
      loginUser
    };
  },
};
</script>