//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do número secreto';
//Esta é a maneira correta de selecionar um elemento h1, p e etc e alterar seu conteúdo usando JavaScript.
//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha o número 1 e 10.';

/*function verificarChute(){
    let nome1 = prompt('Qual sua cidade?');
    alert(`Estive em ${nome1} e lembrei de você.`);
}*/

let listaDeNumerosSorteados = [];
let numeroLimite = 50;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {reate:1.2});
}

function exibirMensagemInicia(){
    exibirTextoNaTela('h1','Jogo do número secreto' );
    exibirTextoNaTela('p', 'Escolha o número 1 e 50.');

}
exibirMensagemInicia();

function gerarNumeroAleatorio(){
   let numeroEscolhido = parseInt(Math.random() * numeroLimite +1);
   let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

   if(quantidadeDeElementosNaLista == numeroLimite){
    listaDeNumerosSorteados = [];
   }
   if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
   }else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
   }
}

function verificarChute(){
    let chute = document.querySelector('input').value;

    if(chute == numeroSecreto){
        exibirTextoNaTela('h1','Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'
        let mensagemTentaticvas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`
        exibirTextoNaTela('p', mensagemTentaticvas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        if(chute > numeroSecreto){
            exibirTextoNaTela('p', 'O número secreto é menor!');
        }else{
            exibirTextoNaTela('p', 'O número secreto é maior!');
        }
        tentativas++
        limparComp();
    }

}

function limparComp(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparComp();
    tentativas = 1;
    exibirMensagemInicia();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}