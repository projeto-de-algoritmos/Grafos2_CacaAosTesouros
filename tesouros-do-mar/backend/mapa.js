import MapGenerator from '@alex-c/map-generator';

const generator = new MapGenerator();

const map = generator.generateMap({
  numberOfPaths: 10,           // Number of paths to draw
  minPathLength: 1,            // Minimal length of a path
  maxPathLength: 5,            // Maximal length of a path
  maxWidth: 24,                // Maximum width of the map - x index will go from 0 to 23
  maxHeight: 18,               // Maximum height of the map - y index will go from 0 to 17
  startPosition: {x: 0, y: 0},  // Position at which to start drawint paths
  seed: 'some-other-seed'      // Seed for procedural generation
})

console.log(map)

export default map;

