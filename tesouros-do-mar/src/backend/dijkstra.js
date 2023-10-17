const possiveisCaminhos = [[1, 0], [0, 1], [-1, 0], [0, -1]];

function formatCoordinates(coordinate) {
  const coordinateString = coordinate.toString();
  const [x, y] = coordinateString.split(',').map(Number);
  return `(${x},${y})`;
}

function pathFinder(map, start) {
  const gridW = map[0].length;
  const gridH = map.length;

  const treasures = [];

  for (let i = 0; i < gridH; i++) {
    for (let j = 0; j < gridW; j++) {
      if (map[i][j] === 2) {
        treasures.push(`${i},${j}`);
      }
    }
  }

  let shortestPath = null;
  let result = {};

  for (const treasure of treasures) {
    let end = `${treasure}`; // Garante que a posição do tesouro seja uma string válida
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
        let temp = current;
        while (previous[temp]) {
          path.push(temp);
          temp = previous[temp];
        }
        path.push(start);
        path.reverse();
        if (!shortestPath || path.length < shortestPath.length) {
          shortestPath = path;
        }
        const formattedPath = path.map(formatCoordinates).join(', ');
        console.log(`Shortest path to treasure at ${end}:`, formattedPath);
        result[end] = formattedPath;
        break;
      }

      if (current === null || distances[current] === Infinity) {
        break;
      }

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
  }

  // Teste se o caminho foi calculado corretamente
  if (shortestPath) {
    console.log('Menor caminho calculado corretamente.');
    console.log('Coordenadas completas do caminho:', result);
    return shortestPath;
  } else {
    console.log('Ainda não.');
    return 'ainda não';
  }
}

function getWeight(value) {
  if (value === 2) return 2; // Tesouro
  if (value === 1) return 2; // Terra
  if (value === 0) return 1; // Água
  if (value === 3) return 1; // Pirata
  return Infinity;
}

export default pathFinder;