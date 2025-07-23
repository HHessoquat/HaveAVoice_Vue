<script setup lang="ts">
  import type VoteWriteDto from "@/model/Vote/VoteWriteDto.ts";
  import {addVote} from "@/repositories/Vote.ts";
  import {BusinessCode} from "@/shared/constants/BusinessCode.ts";
  import {useAuth} from "@/composables/useAuth.ts";
  import type Choice from "@/model/Choice.ts"
  import {computed} from "vue";

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

  const barHeight= computed(() => `${props.choice.votes.length / props.totalVotes * 100}%`);

  async function sendVote() {
    const vote: VoteWriteDto= {
      date: new Date(),
      choice_id: props.choice.id,
      voter_id: auth.getUserId
    }
    const response =  await addVote(vote);
    if(response.code === BusinessCode.VOTE_CREATED){
      props.choice.votes.push(response.body)
    }
  }
</script>

<template>
  <article >
    <div class="barContainer">
      <div class="bar"></div>
    </div>
    <p>nb vote : {{choice.votes.length}}</p>
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
.barContainer {
  height: 200px;
  width: 80px;
  background-color: lightgray;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.bar {
  background-color: var(--primary);
  height: v-bind(barHeight) ;
}
</style>