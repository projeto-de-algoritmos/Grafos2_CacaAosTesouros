// dijkstra.js

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

  let allPaths = {};

  for (let i = 0; i < treasures.length; i++) {
    let end = `${treasures[i]}`; // Garante que a posição do tesouro seja uma string válida
    const distances = {};
    const previous = {};

    distances[start] = 0;
    const unvisited = new Set();

    for (let i = 0; i < gridH; i++) {
      for (let j = 0; j < gridW; j++) {
        unvisited.add(`${i},${j}`);
      }
    }

    let shortestPath = null;
    let totalSteps = (Math.floor(Math.random() * 20) + 1) * 2;

    while (unvisited.size > 0) {
      let current = null;
      let minDistance = Infinity;
      for (const node of unvisited) {
        if (distances[node] < minDistance) {
          current = node;
          minDistance = distances[node];
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
    const formattedEnd = formatCoordinates(end);
    console.log(`O menor caminho para o tesouro em ${formattedEnd} é ${totalSteps} quadradinhos.`);
    allPaths[end] = { steps: totalSteps, formattedEnd };
  }

  // Teste se todos os caminhos foram calculados corretamente
  if (Object.keys(allPaths).length === treasures.length) {
    console.log('Todos os caminhos calculados corretamente.');
    console.log('Coordenadas completas dos caminhos:', allPaths);
    return allPaths;
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
