<script setup>


import {useAuth} from "@/composables/useAuth.js";
import {nextTick} from "vue";

const auth = useAuth();
auth.refreshIsAuthenticated();
nextTick()
</script>

<template>
  <nav>
    <p>{{ auth.isAuthenticated}}</p>
    <p>{{auth.isAuthenticated ? auth.user : "invité"}}</p>
    <router-link to="/" >{{$t("HOME")}}</router-link>

  </nav>

</template>

<style scoped>
  nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    background-color: var(--light-bg);
  }

</style>