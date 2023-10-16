// djikstra.js

function pathFinder(map, start, end) {
  const gridW = map[0].length;
  const gridH = map.length;

  const visited = new Set();
  const distances = {};
  const previous = {};

  distances[start] = 0;
  const unvisited = new Set(Object.keys(map));

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
      return path;
    }

    if (current === null || distances[current] === Infinity) {
      continue;
    }

    for (const [dx, dy] of possiveisCaminhos) {
      const neighborX = Number(current[0]) + dx;
      const neighborY = Number(current[1]) + dy;

      if (neighborX >= 0 && neighborX < gridW && neighborY >= 0 && neighborY < gridH) {
        const neighbor = `${neighborX},${neighborY}`;
        const weight = getWeight(map[neighborY][neighborX]);

        const alt = distances[current] + weight;
        if (alt < (distances[neighbor] || Infinity)) {
          distances[neighbor] = alt;
          previous[neighbor] = current;
        }
      }
    }
  }

  return [];
}

function getWeight(value) {
  if (value === 2) return 2; // Tesouro
  if (value === 1) return 2; // Terra
  if (value === 0) return 1; // Água
  return Infinity;
}

export default pathFinder;
