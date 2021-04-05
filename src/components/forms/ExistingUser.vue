<template>
  <h3>Existing User</h3>
  <input type="text" v-model="state.user.username" />
  <input type="text" v-model="state.user.password" />
  <button v-on:click="signinUser">Click</button>
  <div class="error" v-if="state.showError">
    {{ state.errorText }}
  </div>
</template>

<script>
import { computed, reactive, onMounted } from "vue";
import { emitter } from "@/utils/emitter";
import formMixin from "@/utils/formMixin";

export default {
  name: "ExistingUser",
  setup() {
    const { displayError } = formMixin();

    const state = reactive({
      user: {
        username: "",
        password: "",
      },
      errorText: "",
      wrongCredentials: false,
      showError: false,
    });

    function signinUser() {
      if (this.state.user.username && this.state.user.password) {
        signinAction();
      } else {
        setErrorState();
      }
    }

    function signinAction() {
      emitter.emit("signin", state.user);
    }

    function setErrorState() {
      let errorResponse = displayError(state);
      state.showError = errorResponse.showError;
      state.errorText = errorResponse.errorText;
    }

    function init() {
      emitter.on("credentialsError", () => {
        state.wrongCredentials = true;
        setErrorState();
      });

      emitter.on("signinSuccess", () => {
        state.wrongCredentials = false;
        setErrorState();
        state.user = {
          username: "",
          password: "",
        };
        console.log("From form: signin success");
      });
    }

    onMounted(() => {
      init();
    });

    return {
      state,
      signinUser,
    };
  },
};
</script>