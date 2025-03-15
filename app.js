let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }

}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo dos Oráculos');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10:');
}
exibirMensagemInicial();

//sempre que criar uma função sempre vai precisar de function (seja descritivo com as funcoes), tambem abra {}
//tipo boolean (true or false)
function verificarChute() {
    let chute = document.querySelector('input').value;

   if (chute == numeroSecreto) {
    exibirTextoNaTela('h1', 'Você acertou, Grande Mestre');
    let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
    let mensagemTentativas = `Voce acertou o numero secreto com ${tentativas} ${palavraTentativa}!`;
    exibirTextoNaTela('p', mensagemTentativas);
    document.getElementById('reiniciar').removeAttribute('disabled');
   } else {
    if(chute > numeroSecreto){
        exibirTextoNaTela('h1', 'Tente novamente!');
        exibirTextoNaTela('p', 'O número secreto é menor!');
        
    } else {
        exibirTextoNaTela('h1', 'Tente novamente!');
        exibirTextoNaTela('p', 'O número secreto é maior!');
    }
    tentativas++;
    limparCampo();
   }
}

function gerarNumAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == 3){
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}
function reiniciarJogo(){
    numeroSecreto = gerarNumAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').removeAttribute('disabled', true);
}