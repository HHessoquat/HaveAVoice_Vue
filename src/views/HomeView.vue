<template>
  <div v-if="error">{{$t('HOME')}}</div>
  <div v-else>
    <article v-for="election of elections" :key="election.id">
      <h2><router-link :to="{name: 'election', params: {id: election.id}}"> {{election.name}}</router-link> </h2>
    </article>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {getAllElections} from "../repositories/election.js";
import LoginForm from "@/components/LoginForm.vue";
import {BusinessCode} from "@/shared/constants/BusinessCode.js";

const elections = ref(null);
const error = ref(null);

onMounted(async () => {
  const data = await getAllElections();
  if (data.code === BusinessCode.ELECTION_RETRIEVED) {
    elections.value = data.body;
    return;
  }
  error.value = data.message;
})

</script>
