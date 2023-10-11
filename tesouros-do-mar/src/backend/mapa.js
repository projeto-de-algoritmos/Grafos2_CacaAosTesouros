import { createNoise2D } from 'simplex-noise';
/*
0 => agua
1 => terra
2 => tesoro
3 => barco pirata
*/



// Define o tamanho do array que representa o mapa -> todos os valores são mapeados de um pra um no frontend
const width = 70;
const height = 25;

// A função createNoise2D() retorna uma função que recebe dois parâmetros (x e y) e retorna um valor entre -1 e 1, seguindo o Perlin Noise, que mantém um certo padrão de valores próximos
const noise = createNoise2D();


const map = [];

for (var i = 0; i < width; i++) {
  const row = [];
  for (var j = 0; j < height; j++) {
    // O valor de i e j é dividido por 30 para que o padrão de valores seja mais espaçado fazendo o efeito de ilhas na array
    var value = noise(i/30, j/30);
    console.log(value);
    // números negativos até 0.2 são água (indicado como 0)
    // números maiores que 0.2 são terra (indicado como 1)
    if (value < 0.2) {
      row.push(0);
    } else {
      row.push(1);
    }
  }
  map.push(row);
}
// futuramente pode ser colocado áreas intermediárias, como areia/montanha
 // } else if (value < 0.4) {
    //   row.push(1);
    // } else if (value < 0.6) {
    //   row.push(2);

export default map;

