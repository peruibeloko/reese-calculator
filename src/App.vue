<template>
  <header>
    <h1>Reese Calculator</h1>
  </header>
  <main>
    <div class="group">
      <span class="group-name">Controls</span>
      <div class="controls">
        <NoteSelector label="Note" v-model="note" />
        <ScrollableInput label="Octave" :min="0" :max="10" v-model.number="oct" />
        <ScrollableInput label="BPM" :min="1" v-model.number="bpm" />
        <RatioSelector label="Pulse rate" v-model="ratio" />
      </div>
    </div>
    <div class="group">
      <span class="group-name">Detune</span>
      <span class="detune-message">
        Detune your oscillators by
        <span class="detune-amount">{{ detune[0].toFixed(2) }}</span>
        cents or
        <span class="detune-amount">{{ detune[1].toFixed(2) }}</span
        >Hz
      </span>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import NoteSelector from './components/NoteSelector.vue';
import RatioSelector from './components/RatioSelector.vue';
import ScrollableInput from './components/ScrollableInput.vue';
import { subdivisionToPeriod, pitchToFreq, periodToFreq, centsBetween } from './math';

const note = ref(7);
const oct = ref(2);
const bpm = ref(174);
const ratio = ref({ num: 1, den: 4, modifier: 'none' });

const detune = computed(() => {
  const ioi = subdivisionToPeriod(ratio.value.num, ratio.value.den, bpm.value);
  const baseFreq = pitchToFreq(note.value, oct.value);
  const detuneHz = periodToFreq(ioi);
  const cents = centsBetween(baseFreq, baseFreq + detuneHz);
  console.log('ioi', ioi, 'baseFreq', baseFreq, 'detuneHz', detuneHz, 'cents', cents);

  return [cents, baseFreq + detuneHz];
});
</script>

<style scoped>
header h1 {
  font-family: var(--font__heading);
  font-size: var(--font-size__4);
}

header {
  margin-bottom: var(--size__4);
}

div.controls {
  display: flex;
  flex-direction: row;
  gap: var(--size__1);
}

span.group-name {
  font-family: var(--font__heading);
  font-size: var(--font-size__2);
}

main,
div.group {
  display: flex;
  flex-direction: column;
}

main {
  gap: var(--size__3);
}

div.group {
  gap: var(--size__1);
}

span.detune-message {
  font-family: var(--font__body);
}

span.detune-amount {
  color: var(--red);
  font-weight: 900;
}
</style>
