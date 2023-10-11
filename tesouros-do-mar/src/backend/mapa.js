import { createNoise2D } from 'simplex-noise';

const width = 70;
const height = 25;

const noise = createNoise2D();


const map = [];

for (var i = 0; i < width; i++) {
  const row = [];
  for (var j = 0; j < height; j++) {
    var value = noise(i/30, j/30);
    console.log(value);
    if (value < 0.2) {
      row.push(0);
    } else if (value < 0.4) {
      row.push(1);
    } else if (value < 0.6) {
      row.push(2);
    } else {
      row.push(3);
    }
  }
  map.push(row);
}


export default map;

