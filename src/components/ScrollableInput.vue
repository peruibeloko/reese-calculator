<template>
  <div v-if="label">
    <label :for="id">{{ label }}</label>
    <input
      :id
      :min="min"
      :max="max"
      type="tel"
      v-model="val"
      @wheel="handleScroll"
      @mouseenter="active = true"
      @mouseleave="active = false"
    />
  </div>
  <input
    v-else
    :min="min"
    :max="max"
    type="tel"
    v-model="val"
    @wheel="handleScroll"
    @mouseenter="active = true"
    @mouseleave="active = false"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
const props = defineProps<{
  label?: string;
  min?: number;
  max?: number;
  action?: (current: number, delta: number) => number;
}>();

const active = ref<boolean>(false);
const id = computed(() => (props.label ? props.label.toLowerCase().replace(' ', '-') : ''));
const val = defineModel<number>({ required: true });

const handleScroll = (e: WheelEvent) => {
  const delta = -Math.sign(e.deltaY);

  if (props.min !== undefined && delta === -1 && val.value === props.min) return;
  if (props.max !== undefined && delta === 1 && val.value === props.max) return;

  if (props.action !== undefined) {
    val.value = props.action(val.value, delta);
  } else {
    val.value += delta;
  }
};
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--size__05);
}

input {
  width: var(--size__3);
  padding: var(--size__05) var(--size__05);
  
  background: transparent;
  
  outline: none;
  border: 1px solid var(--gray);
  border-radius: var(--size__05);
  transition-duration: 100ms;
  
  color: var(--color__text);
  text-align: center;
  font-size: var(--font-size__1);
}

input:hover,
input:focus {
  border-color: var(--color__primary);
}
</style>
