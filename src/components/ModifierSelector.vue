<template>
  <div class="modifier">
    <button
      @click="toggle('dotted')"
      :class="{
        active: state === 'dotted'
      }"
    >
      Dotted
    </button>
    <button
      @click="toggle('triplet')"
      :class="{
        active: state === 'triplet'
      }"
    >
      Triplet
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

type Mode = 'dotted' | 'triplet' | 'none';

const state = ref<Mode>('none');
const toggle = (selection: Mode) => {
  console.log(selection);

  if (selection === state.value) {
    state.value = 'none';
  } else {
    state.value = selection;
  }
};
</script>

<style scoped>
div.modifier {
  display: flex;
  flex-direction: column;
  align-items: start;
}

button {
  color: var(--gray);
  font-family: var(--font__monospace);
  background: none;
  border: none;
  cursor: pointer;
  transition-duration: 300ms;
}

button.active {
  color: var(--red);
}
</style>
