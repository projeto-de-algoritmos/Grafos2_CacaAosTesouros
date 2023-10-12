import { createNoise2D } from 'simplex-noise';

const width = 70;
const height = 25;
const noise = createNoise2D();
const numericMap = [];

for (var i = 0; i < width; i++) {
  const row = [];

  for (var j = 0; j < height; j++) {
    var value = noise(i/30, j/30);

    if (value < 0.2) {
      row.push(0); // Água
    } else {
      row.push(1); // Terra
    }
  }

  numericMap.push(row);
}

export default numericMap;
