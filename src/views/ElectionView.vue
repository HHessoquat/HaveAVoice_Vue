<script setup lang="ts">
import {computed, onBeforeUnmount, onMounted, ref} from "vue";
  import {getElection} from "@/repositories/election";
  import {useRoute} from "vue-router";
import {BusinessCode} from "@/shared/constants/businessCode";
import ChoiceCard from "@/components/choice/ChoiceCard.vue";
import type Choice from "@/model/Choice.ts";
import type Election from "@/model/Election/Election.js";
import {useWebSocket} from "@/composables/useWebSocket.ts";
import HorizontalDivider from "@/components/genericComponents/visuals/HorizontalDivider.vue";

  const webSocket = useWebSocket();
  const election = ref<Election>(null);
  const error = ref<string>("");

  const totalVotes= computed(() => {
    if (!election.value) return 0;
    return election.value.choices.reduce((acc: Number, choice: Choice) => acc + choice.votes.length, 0);
  });

  onMounted(async () => {
    const route = useRoute();
    const data = await getElection(route.params.id);
    if (data.code !== BusinessCode.ELECTION_RETRIEVED) {
      error.value = data.message;
      return;
    }
    election.value = data.body;

    webSocket.connect()

  });
  onBeforeUnmount(() => {
    webSocket.disconnect()
  })

</script>

<template>
  <div v-if="error">{{($t(error))}}</div>
  <div v-else-if="election">
    <h1>{{election.name}}</h1>
    <HorizontalDivider width="100%" height="2px"/>
    <div class="choiceContainer">
      <div v-for="choice of election.choices" :key=choice.id>
        <ChoiceCard :choice="choice" :date-end="Date.parse(election.dateEnd)" :total-votes="totalVotes"/>
      </div>
    </div>
  </div>

</template>

<style scoped>
  .choiceContainer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }
</style>