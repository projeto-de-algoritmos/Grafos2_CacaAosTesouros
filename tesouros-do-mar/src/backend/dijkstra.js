import { MinHeap } from './minHeap.js';

const possiveisCaminhos = [
  [1, 0], // direita
  [0, 1], // baixo
  [-1, 0], // esquerda
  [0, -1] // cima
];

export function dijkstra(map, start, destination) {

  const gridH = map.length;
  const gridW = map[0].length;

  /* 
    A tabela hash é um array de arrays que guarda as seguintes informações:
    - quando a posição ainda não faz parte da mancha, o valor é null
    - quando a posição faz parte da mancha, o valor é 0
    - quando a posição foi visitada mas não faz parte da mancha, o valor é um ponteiro para o heap
  */
  let hashMap = [];
  // Cada posição é mapeada 1 para 1 com o o mapa, porém esse array guarda as seguintes informações na forma de um objeto:
  // - quadrado de origem: é a posição do quadrado que conecta o quadrado atual à mancha
  // - distância: é a distância do quadrado atual até o quadrado de origem
  let manchaArray = [];

  // Inicializa a tabela hash e o array da mancha
  for (let i = 0; i < gridH; i++) {
    hashMap[i] = [];
    manchaArray[i] = [];
    for (let j = 0; j < gridW; j++) {
      hashMap[i][j] = null;
      manchaArray[i][j] = {
        source: { x: null, y: null },
        distance: Infinity
      };
    }
  }

  const minHeap = new MinHeap();

  // INICIO DO ALGORITMO
  minHeap.push({ weight: 0, noAtual: start, source: null })
  // O algoritmo continua até que o quadrado de destino seja encontrado
  while (true) {
    // O quadrado de menor peso é retirado da fila de prioridade
    const element = minHeap.pop();
    const [x, y] = element.noAtual;

    // O quadrado é inserido na mancha
    manchaArray[x][y] = { 
      source: element.source, 
      distance: element.weight
    };
    
    // O quadrado é marcado como visitado na hash
    hashMap[x][y] = 0;

    // Se o quadrado atual for o quadrado de destino, o algoritmo é encerrado
    if (x === destination[0] && y === destination[1]) break;

    // Os vizinhos do quadrado atual são adicionados na fila de prioridade
    const neighbors = getNeighbors(x, y);
    neighbors.forEach(([x_v, y_v]) => {
      // O peso é a soma do peso do quadrado atual com o peso do quadrado vizinho
      const weight = getWeight(map[x_v][y_v]) + manchaArray[x][y].distance;

      const valorNaHash = hashMap[x_v][y_v];
      // Se o quadrado já está na mancha, não é necessário adicionar na fila de prioridade
      if (valorNaHash === 0) return; 
      // Caso o quadrado já tenha sido visitado, mas o valor da aresta que está no heap é menor ou igual a aresta atual, a aresta é descartada
      else if (valorNaHash !== null && weight >= valorNaHash.weight) return;

      // Caso o quadrado já tenha sido visitado, mas a aresta atual é menor que a aresta anterior, a aresta anterior é removida do heap e mais abaixo é adicionada a nova aresta de custo menor
      else if(valorNaHash !== null && weight < valorNaHash.weight){
        const element = { weight, noAtual: [x_v, y_v], source: [x, y] };
        minHeap.update(element);
        hashMap[x_v][y_v] = element;
        return;
      }

      const element = { weight, noAtual: [x_v, y_v], source: [x, y] };
      minHeap.push(element);
      hashMap[x_v][y_v] = element;
    });
  }

  return getPath();

  function getNeighbors(x, y) {
    const neighbors = possiveisCaminhos
      .map(([dx, dy]) => [x + dx, y + dy]) // os vizinhos são os 4 quadrados ao redor da posicao atual
      .filter(([x, y]) => x >= 0 && x < gridH && y >= 0 && y < gridW) // filtra os quadrados que estão dentro do grid
      .filter(([x, y]) => hashMap[x][y] != 0); // remove os quadrados que já estão na mancha

    return neighbors;
  }

  function getWeight(value) {
    if (value === 2) return 2; // Tesouro
    if (value === 1) return 2; // Terra
    if (value === 0) return 1; // Água
    return Infinity;
  }

  function getPath(){
    const path = [];
    let [x, y] = destination;
    while(true){
      path.unshift([x, y]);
      const { source } = manchaArray[x][y];
      if(source === null) break;
      [x, y] = source;
    }
    return path;
  }
}


