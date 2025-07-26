<script setup lang="ts">
import {ref} from "vue";
import GenericModal from "@/components/genericComponents/Modals/GenericModal.vue";
import {useI18n} from "vue-i18n";
import LoginForm from "@/components/LoginForm.vue";

const {t} = useI18n();
const isModalOpen = ref(false);
function openModal() {
  isModalOpen.value = true;
}
function closeModal() {
  isModalOpen.value = false;
}
</script>

<template>
  <button @click="openModal">{{t('LOGIN.LOGIN')}}</button>
  <GenericModal :show="isModalOpen" @close="closeModal">
    <template #header>
      <h2>
        {{t('LOGIN.LOGIN')}}
      </h2>
    </template>
    <template #body><LoginForm /></template>
  </GenericModal>
</template>

<style scoped>
  h2 {
    text-transform: uppercase;
  }
</style>