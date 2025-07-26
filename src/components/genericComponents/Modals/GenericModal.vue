<script setup>
import { onBeforeMount, onBeforeUnmount } from 'vue';
defineProps({
  show: { type: Boolean, default: false },
});
const emit = defineEmits(['close']);
function closeModal() {
  emit('close');
}
function handleEscape(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
}
onBeforeMount(() => document.addEventListener('keydown', handleEscape));
onBeforeUnmount(() => document.removeEventListener('keydown', handleEscape));
</script>

<template>
  <teleport to="body">
    <div v-if="show" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <div v-if="$slots.header" class="header">
          <slot name="header" />
        </div>
        <div v-if="$slots.body" class="body">
          <slot name="body" />
        </div>
        <div v-if="$slots.footer" class="footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
}
.modal-overlay>.modal-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--light-bg);
  border-radius: 0.5em;
  padding: 2em;
  position: relative;
  min-width: 300px;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
}
</style>
