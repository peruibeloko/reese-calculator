type Pitch = [octave: number, semis: number];

const SCALE_DOWN = ['A', 'G#', 'G', 'F#', 'F', 'E', 'D#', 'D', 'C#', 'C', 'B', 'A#'];

const parsePitch = (note: string, octave: number): Pitch => {
  const semis = -SCALE_DOWN.indexOf(note);

  return [octave, semis];
};

const pitchToFreq = (oct: number, semis: number) => {
  const octDiff = oct - 4;
  const semisDiff = semis + octDiff * 12;

  return Math.pow(2, semisDiff / 12) * 440;
};
