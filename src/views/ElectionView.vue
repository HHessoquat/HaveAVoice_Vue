<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
  import {getElection} from "@/repositories/election";
  import {useRoute} from "vue-router";
import {BusinessCode} from "@/shared/constants/businessCode";
import ChoiceCard from "@/components/choice/ChoiceCard.vue";


  const election = ref<Election>(null);
  const error = ref<string>("");
  console.log(!election.value);
  const totalVotes= computed(() => {
    if (!election.value) return 0;
    return election.value.choices.reduce((acc, choice) => acc + choice.votes.length, 0);
  });

  onMounted(async () => {
    const route = useRoute();
    const data = await getElection(route.params.id);
    if (data.code !== BusinessCode.ELECTION_RETRIEVED) {
      error.value = data.message;
      return;
    }
    election.value = data.body;
  });


</script>

<template>
  <div v-if="error">{{($t(error))}}</div>
  <div v-else-if="election">
    <h1>{{election.name}}</h1>
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