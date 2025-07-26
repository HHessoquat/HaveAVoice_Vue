<script setup lang="ts">
const props = defineProps({
  height: {
    required: true,
    type: String,
  },
  width: {
    required: true,
    type: String,
  },
  color: {
    type: String,
    default: '#FFFFFF',
  }
});

</script>

<template>
<div class="divider"></div>
</template>

<style scoped>
.divider {
  width: v-bind(width);
  height: v-bind(height);
  margin: 2em 0;
  background: linear-gradient(0.25turn, transparent, v-bind(color), transparent);
}
</style>