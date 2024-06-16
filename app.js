let numerosGerados = [];
numeroLimite = 10;
let numAleatorio = gerarNumeroAleatorio();
let tentativa = 1;
console.log(numAleatorio);

mensagemInicial()
function mensagemInicial() {
  textos('h1', 'Bem vindo ao Jogo!');
  textos('p', 'Faça um chute de 1 a 10');
}

function verifyChute(){
  let chute = parseInt(document.querySelector('input').value);
  let plural = tentativa > 1 ? 'tentativas':'tentativa';
  verifyEntrada(chute);

  if(chute == numAleatorio){
    textos('h1', 'Acertou!!!')
    textos('p', `Voce acertou em ${tentativa} ${plural}! Número era ${numAleatorio}!`);
    document.getElementById('reiniciar').removeAttribute('disabled');
    } else if (chute < numAleatorio){
      textos('p', `O numero Secreto é maior!`);
    } else {
      textos('p', `O numero Secreto é menor!`);
    }
    tentativa++;
    limparCaixa();
}


// Prestar atenção nessa função
function gerarNumeroAleatorio(){
  let numeroSelecionado = parseInt(Math.random() * numeroLimite + 1);
  let quantidadeDeSelecionados = numerosGerados.length;

  if(quantidadeDeSelecionados == 10){
    numerosGerados = [];
  }

  if (numerosGerados.includes(numeroSelecionado)){
    return gerarNumeroAleatorio();
  } else {
    numerosGerados.push(numeroSelecionado);
    console.log(numerosGerados);
    return numeroSelecionado;
  }
}

function textos(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function verifyEntrada(chute) {
  if (isNaN(chute) || chute <= 0) {
    textos('p', 'O número digitado não pode ser menor ou igual a zero e deve ser um número válido.');
    return false;
  } else if (chute > 10) {
    textos('p', 'O número digitado não pode ser maior que dez.');
    return false;
  }
}

function limparCaixa(){
  document.querySelector('input').value = '';
}

function reiniciarTudo(){
  numAleatorio = gerarNumeroAleatorio();
  tentativa = 1;
  limparCaixa();
  mensagemInicial();
  document.getElementById('reiniciar').setAttribute('disabled', true);
  console.log(numAleatorio);
}