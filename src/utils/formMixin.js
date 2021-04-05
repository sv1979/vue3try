import { ERROR_TEXTS } from "@/utils/constants"

export default function () {
  function displayError (state) {
    if (state.wrongCredentials) {
      state.errorText = ERROR_TEXTS.WRONG_CREDENTIALS;
      state.showError = true
    } else if (state.duplicateUsernameErrorShown) {
      state.errorText = ERROR_TEXTS.DUPLICATE_USERNAME;
      state.showError = true
    } else if (!state.user.username) {
      state.errorText = ERROR_TEXTS.USERNAME_REQUIRED;
      state.showError = true
    } else if (!state.user.password) {
      state.errorText = ERROR_TEXTS.PASSWORD_REQUIRED;
      state.showError = true
    } else {
      state.errorText = "";
      state.showError = false
    }
    return state
  }

  return {
    displayError
  }
}