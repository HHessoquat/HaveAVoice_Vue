<script setup lang="ts">
  import type VoteWriteDto from "@/model/Vote/VoteWriteDto.ts";
  import {addVote} from "@/repositories/Vote.ts";
  import {useAuth} from "@/composables/useAuth.ts";
  import type Choice from "@/model/Choice.ts"
  import {computed, type PropType, watch} from "vue";
  import {useWebSocket} from "@/composables/useWebSocket.ts";
  import type Vote from "@/model/Vote/Vote.ts";
  import GraphBar from "@/components/choice/GraphBar.vue";

  const auth = useAuth();
  const props = defineProps({
    choice: {
      type: Object as PropType<Choice>,
      required: true
    },
    dateEnd : {
      type: Number,
      required: true
    },
    totalVotes: {
      type: Number,
      required: true
    }
  });
  const {voteData, sendVoteMessage} = useWebSocket();
  const barHeight= computed(() => `${props.choice.votes.length / props.totalVotes * 100}%`);

  watch(voteData, (v: Vote) => {
    if (v.choice.id === props.choice?.id) {
      props.choice.votes.push(v);
    }
  })

  async function sendVote() {
    const vote: VoteWriteDto= {
      date: new Date(),
      choice_id: props.choice.id,
      voter_id: auth.getUserId
    }
    await addVote(vote);
    sendVoteMessage(vote);
  }
</script>

<template>
  <article >
    <GraphBar :bar-height="barHeight" :color="choice.color"/>
    <p class="score">{{choice.votes.length}}</p>
    <h2> {{ choice.name }} </h2>
    <img v-if="choice.image" :src="choice.image" :alt="choice.alt" />
    <p> {{choice.description}}</p>
    <button @click="sendVote" :disabled="dateEnd >= Date.now()">Vote</button>
  </article>

</template>

<style scoped>
article{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.score {
  font-size: 1.2em;
  font-weight: bold;
}
h2 {
  font-size: 1.5em;
  margin: 0;
}
button:active {
  transform: scale(0.9);
}
</style>