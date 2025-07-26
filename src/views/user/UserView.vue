<script setup lang="ts">
import {useAuth} from "@/composables/useAuth.ts";

const auth = useAuth();
</script>

<template>
<h1>Hi {{auth.user}}</h1>
</template>

<style scoped>

</style>