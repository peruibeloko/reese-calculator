const MIDI_A4 = 69;

export const periodToFreq = (interval: number) => 1 / (interval / 1000);

export const subdivisionToPeriod = (num: number, den: number, bpm: number) =>
  (60_000 * num) / (bpm * (den / 4));

export const pitchToFreq = (noteIndex: number, octave: number) => {
  const midiNote = 11 - noteIndex + (octave + 1) * 12;
  return 440 * Math.pow(Math.pow(2, 1 / 12), midiNote - MIDI_A4);
};

export const centsBetween = (f1: number, f2: number) => {
  const f1ToA4 = 1200 * Math.log2(f1 / 440);
  const f2ToA4 = 1200 * Math.log2(f2 / 440);
  return f1ToA4 > f2ToA4 ? f1ToA4 - f2ToA4 : f2ToA4 - f1ToA4;
};
