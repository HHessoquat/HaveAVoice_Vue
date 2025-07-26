<script setup>
import {useAuth} from "@/composables/useAuth.js";
import {useI18n} from "vue-i18n";
import {computed} from "vue";
import LoginButton from "@/components/navbar/LoginButton.vue";

const auth = useAuth();
auth.refreshIsAuthenticated();
const {t} = useI18n();

const username= computed(() => {

  try {
    return auth.user.value?.replace(/ /g, '');
  } catch  {
    return '?';
  }
});
const logout = () => {
  auth.logout();
}

</script>

<template>
  <nav>
    <router-link to="/" >{{t("HOME")}}</router-link>
    <div>
      <LoginButton v-if="!auth.isAuthenticated.value" />
      <div v-else class="navigation">
        <router-link class="link" :to="{name: 'userPage', params: {username: username}}">
          {{ auth.user }}
        </router-link>
        <button @click="logout">{{t('LOGIN.LOGOUT')}}</button>
      </div>
    </div>

  </nav>

</template>

<style scoped>
  nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1em;
    background-color: var(--light-bg);
    font-size: 1.1rem;
  }
  .navigation {
    display: flex;
    gap: 2em;
    align-items: center;
  }
  button {
    padding: 0.4em;
    border-radius: 0;
    border: none;
    background-color: var(--bg);
  }
  button:hover {
    outline: none;
    border: none;
    transform: scale(1);
  }
</style>