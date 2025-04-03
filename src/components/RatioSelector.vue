<template>
  <div class="ratio">
    <label data-grid-name="label">{{ label }}</label>
    <div data-grid-name="inputs">
      <ScrollableInput :min="1" :max="64" v-model="ratio.num" disabled />
      <span class="div">/</span>
      <ScrollableInput :min="1" :max="64" v-model="ratio.den" :action="onDenChange" disabled />
    </div>
    <ModifierSelector data-grid-name="modifiers" />
  </div>
</template>

<script setup lang="ts">
import ScrollableInput from './ScrollableInput.vue';
import ModifierSelector from './ModifierSelector.vue';

defineProps<{
  label: string;
}>();
const ratio = defineModel({
  default: {
    num: 1,
    den: 4,
    modifier: 'none'
  },
  required: true
});

const onDenChange = (current: number, delta: number) => {
  if (delta === 1) {
    return current * 2;
  } else if (current > 1) {
    return current / 2;
  } else {
    return current;
  }
};
</script>

<style scoped>
label {
  line-height: var(--font-size__1);
}

div.ratio {
  height: fit-content;
  display: grid;
  grid-template-areas:
    'label .'
    'inputs modifiers';
  align-items: center;
  gap: var(--size__05);
  font-family: Archivo;
}

[data-grid-name='label'] {
  grid-area: label;
}

[data-grid-name='inputs'] {
  grid-area: inputs;
  display: flex;
  align-items: center;
}

[data-grid-name='modifiers'] {
  grid-area: modifiers;
}

div.inputs {
  display: flex;
  align-items: center;
}

span.div {
  font-family: var(--font__monospace);
  font-size: var(--size__2);
  line-height: var(--font-size__2);
  color: var(--gray);
}
</style>
