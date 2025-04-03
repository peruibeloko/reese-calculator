<template>
  <div>
    <label :for="id">{{ label }}</label>
    <select
      :id
      v-model="note"
      @wheel="handleScroll"
      @mouseenter="active = true"
      @mouseleave="active = false"
    >
      <option value="0">B</option>
      <option value="1">A#</option>
      <option value="2">A</option>
      <option value="3">G#</option>
      <option value="4">G</option>
      <option value="5">F#</option>
      <option value="6">F</option>
      <option value="7">E</option>
      <option value="8">D#</option>
      <option value="9">D</option>
      <option value="10">C#</option>
      <option value="11">C</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const note = defineModel<number>({
  required: true,
  default: 7
});

const props = defineProps<{
  label: string;
}>();

const id = computed(() => props.label.toLowerCase().replace(' ', '-'));
const active = ref<boolean>(false);

const handleScroll = (e: WheelEvent) => {
  const delta = -Math.sign(e.deltaY);

  if (delta === -1 && note.value === 1) return;
  if (delta === 1 && note.value === 12) return;

  note.value += delta;
};
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--size__05);
}

select {
  height: 39px;
  width: calc(var(--size__3) + 20px);
  padding: var(--size__05) var(--size__05);

  background-color: var(--color__background);

  outline: none;
  border: 1px solid var(--gray);
  border-radius: var(--size__05);
  transition-duration: 100ms;

  color: var(--color__text);
  text-align: start;
  font-size: var(--font-size__1);
  font-family: var(--font__body);
}

select:hover,
select:active {
  border-color: var(--color__primary);
}
</style>
