/* 
O heap recebe uma estrutura da seguinte forma:
  {
    weight: number,
    noAtual: [x, y],
    source: [x_s, y_s]}
  }

E faz a validação de acordo com a propriedade weight
*/

export class MinHeap{

  constructor(){
    this.heapArray = [];
  }
  
  update(obj){
    const find = this.heapArray.findIndex((element) => {element.noAtual == obj.noAtual});
    this.heapArray[find] = obj;
    this.shiftUp(find);
  }

  push(obj){
    const len = this.heapArray.push(obj);
    // se o heap tem apenas um elemento, não precisa fazer nada
    if(len == 1) return;
    this.shiftUp(len-1);
  }

  pop(){
    if(this.heapArray.length == 0) return null;
    if(this.heapArray.length == 1) return this.heapArray.pop();

    const len = this.heapArray.length;
    const raiz = 0;
    const last = len-1;

    // troca a raiz com o último elemento
    this.swap(raiz, last);
    const min = this.heapArray.pop();
    this.heapify(raiz);
    return min;
  }

  shiftUp(i){
    if(i === this.parent(i)) return;

    if(this.heapArray[i].weight < this.heapArray[this.parent(i)].weight){
      this.swap(i, this.parent(i));
      this.shiftUp(this.parent(i));
    }
  }

  heapify(i){
    const len = this.heapArray.length;
    const left = this.left(i);
    const right = this.right(i);
    let smallest = i;

    // Se o filho esquerdo é menor que a raiz
    if (left < len && this.heapArray[left].weight < this.heapArray[smallest].weight) {
      smallest = left;
    }

  // Se o filho direito é menor que o menor até agora
  if (right < len && this.heapArray[right].weight < this.heapArray[smallest].weight) {
    smallest = right;
  }

    if(smallest !== i){
      this.swap(i, smallest);
      this.heapify(smallest);
    }
  }

  swap(a, b){
    const temp = this.heapArray[a];
    this.heapArray[a] = this.heapArray[b];
    this.heapArray[b] = temp;
  }

  parent(i){
    return Math.floor((i-1)/2);
  }

  left(i){
    return 2*i + 1;
  }

  right(i){
    return 2*i + 2;
  }
}

