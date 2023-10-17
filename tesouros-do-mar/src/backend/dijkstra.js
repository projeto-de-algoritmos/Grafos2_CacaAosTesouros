const possiveisCaminhos = [[1, 0], [0, 1], [-1, 0], [0, -1]];

function pathFinder(map, start, end) {
  const gridW = map[0].length;
  const gridH = map.length;

  const result = {};

  const distances = {};
  const previous = {};

  distances[start] = 0;
  const unvisited = new Set();

  for (let i = 0; i < gridH; i++) {
    for (let j = 0; j < gridW; j++) {
      unvisited.add(`${i},${j}`);
    }
  }

  while (unvisited.size > 0) {
    let current = null;
    for (const node of unvisited) {
      if (!current || (distances[node] && distances[node] < distances[current])) {
        current = node;
      }
    }

    unvisited.delete(current);

    if (current === end) {
      const path = [];
      while (previous[current]) {
        path.push(current);
        current = previous[current];
      }
      result[end] = path;
      console.log(`Shortest path to treasure at ${end}:`, path);
      break;
    }

    if (current === null || distances[current] === Infinity) {
      continue;
    }

    const [xEnd, yEnd] = end.split(',').map(Number);
    for (const [dx, dy] of possiveisCaminhos) {
      const [x, y] = current.split(',').map(Number);
      const neighborX = x + dx;
      const neighborY = y + dy;

      if (neighborX >= 0 && neighborX < gridW && neighborY >= 0 && neighborY < gridH) {
        const neighbor = `${neighborX},${neighborY}`;
        const weight = getWeight(map[neighborX][neighborY]);

        const alt = distances[current] + weight;
        if (alt < (distances[neighbor] || Infinity)) {
          distances[neighbor] = alt;
          previous[neighbor] = current;
        }
      }
    }
  }

  console.log("All paths calculated:", result);
  return result;
}

function getWeight(value) {
  if (value === 2) return 2; // Tesouro
  if (value === 1) return 2; // Terra
  if (value === 0) return 1; // Água
  if (value === 3) return 1; // Pirata
  return Infinity;
}

export default pathFinder;
