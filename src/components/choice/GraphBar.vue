<script setup lang="ts">
defineProps({
  barHeight: {
    required: true,
    type: String,
  },
  color: {
    type: String,
    default: '#FF80FF',
  }
})
</script>

<template>
  <div class="barContainer">
    <div class="bar"></div>
  </div>
</template>

<style scoped>
.barContainer {
  height: 200px;
  width: 80px;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.bar {
  background-color: v-bind(color);
  height: v-bind(barHeight) ;
}
</style>