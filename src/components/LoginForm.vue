<script setup lang="ts">
import {useAuth} from "@/composables/useAuth";
import {reactive} from "vue";
import {BusinessCode} from "../shared/constants/BusinessCode.ts";

const auth = useAuth();

  let username= "";
  let password= "";
  const errors= reactive({
    username: "",
    password: "",
    response: ""
  })

  function validate(): boolean {
    errors.username= username ? '' : 'LOGIN.ERRORS.USERNAME_REQUIRED';
    errors.password= password ? '' : 'LOGIN.ERRORS.PASSWORD_REQUIRED';
    return !errors.username && !errors.password;
  }

  async function login() {
    if (!validate()) {
      return;
    }
    errors.response = ""
    const responseCode = await auth.login(username, password);
    handleResponse(responseCode);
  }
  function handleResponse(responseCode: BusinessCode) {
    if (responseCode !== BusinessCode.SUCCESS) {
      password= "";
    }
    if(responseCode === BusinessCode.INVALID_CREDENTIALS) {
      errors.response= "LOGIN.ERRORS.INVALID_CREDENTIALS";
      return;
    }
    if(responseCode === BusinessCode.FAILED) {
      errors.response= "ERROR.SERVER_ERROR";
    }

  }
</script>

<template>
  <form @submit.prevent="login">
    <input v-model="username" :placeholder="$t('LOGIN.USERNAME_PLACEHOLDER')" type="text" />
    <span v-if="errors.username">{{ $t(errors.username) }}</span>
    <input v-model="password" :placeholder="$t('LOGIN.PASSWORD_PLACEHOLDER')" type="password" />
    <span v-if="errors.password">{{ $t(errors.password) }}</span>
    <button type="submit">{{$t('LOGIN.LOGIN')}}</button>
    <div v-if="errors.response">{{ $t(errors.response) }}</div>
  </form>
</template>

<style scoped>
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 4rem;
    margin: 3rem;
    border: 1px solid var(--primary);
    border-radius: 8px;
  }
</style>