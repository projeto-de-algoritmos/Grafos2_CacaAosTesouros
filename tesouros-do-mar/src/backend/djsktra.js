
const possiveisCaminhos = [
    [0, 1], // direita
    [1, 0], // baixo
    [0, -1], // esquerda
    [-1, 0] // cima
];


function criaNo(posicao, mapa){
  // Valor da posição na array do mapa, podendo ser 0 (água), 1 (terra) ou 2 (tesouro)
  const valorPosicao = mapa[posicao[0]][posicao[1]];
  /* 
  agua = peso 1
  terra = peso 2
  tesouro = peso 2 (pois esta na terra)
  */
  const peso = valorPosicao === 2 ? 2 : valorPosicao + 1;

  return {
    posicao,
    peso,
    filhos: [],
  }
}

function criaGrafo(no, mapa, nosVisitados){


}