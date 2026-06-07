//Arquivo responsavel pela fila em javascript
class queue{
    constructor(){//cria uma lista vazia
        this.items=[];
    }

    enqueue(element){ //Enfilera o item no final da fila
        this.items.push(element);
    }
    
    dequeue(){ //desenfilera itens verificando primeiro se ela está vazia
        if(this.isEmpty()){
            return "A fila está vazia!";
        }
        return this.items.shift();
    }

    peek(){//informa o primeiro item sem remover ele 
        if(this.isEmpty()){
            return "A fila está vazia!";
        }
        return this.items[0];
    }

    isEmpty(){//Verifica se a fila está vazia
        return this.items.length === 0;
    }
    
    size(){//Retorna o tamanho da fila 
        return this.items.length;
    }
}

export default queue;