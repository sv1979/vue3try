<template>
  <auth-screen v-if="state.showAuth" />
  <data-screen v-else :user="state.user" />
</template>

<script>
import { computed, reactive, onMounted } from "vue";
import { emitter } from "@/utils/emitter";
import AuthScreen from "./AuthScreen.vue";
import DataScreen from "./DataScreen.vue";

let users = [
  { username: "John", password: "12345" },
  { username: "Jane", password: "67890" },
];

export default {
  name: "Wrapper",
  components: { AuthScreen, DataScreen },
  setup() {
    const state = reactive({
      user: {
        username: "",
        password: "",
      },

      showAuth: computed(() => {
        return !state.isLoggedIn;
      }),

      isLoggedIn: computed(() => {
        return users.find(
          (el) =>
            el.username === state.user.username &&
            el.password === state.user.password
        );
      }),
    });

    function init() {
      emitter.on("login", (user) => {
        if (getUserByUsername(user)) {
          emitter.emit("duplicatedUsernameError");
        } else {
          let new_user = {
            username: user.username,
            password: user.password,
          };
          users.push(new_user);
          emitter.emit("newUserCreated");

          state.user.username = new_user.username;
          state.user.password = new_user.password;
        }
      });

      emitter.on("signin", (user) => {
        const existing_user = getUserByUsername(user);

        if (!existing_user) {
          emitter.emit("credentialsError");
        } else {
          emitter.emit("signinSuccess");
          state.user.username = existing_user.username;
          state.user.password = existing_user.password;
        }
      });
    }

    function getUserByUsername (userObject) {
        if (!userObject || !userObject.username) return null
        return users.find((el) => el.username === userObject.username)
    }

    onMounted(() => {
      init();
    });

    return {
      state,
    };
  },
};
</script>