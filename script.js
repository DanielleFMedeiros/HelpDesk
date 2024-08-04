function formatarCpf() {
  let cpfEntrada = document.getElementById("cpfInput").value;
  let cpfApenasNumeros = cpfEntrada.replace(/\D/g, '');

  if (/^\d{11}$/.test(cpfApenasNumeros)) {
    let cpfFormatado = cpfApenasNumeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    document.getElementById("cpfResultado").textContent = cpfFormatado;
    document.getElementById("botaoCopiarCPF").style.display = "inline-block";
  } else {
    document.getElementById("cpfResultado").textContent = "Por favor, digite um CPF válido com 11 dígitos.";
    document.getElementById("botaoCopiarCPF").style.display = "none";
  }
}
function copiarResultadoCPF() {
  let resultadoCPF = document.getElementById("cpfResultado").textContent;
  copiarParaAreaTransferencia(resultadoCPF);
}

function formatarCnpj() {
  let cnpjEntrada = document.getElementById("cnpjInput").value;
  let cnpjApenasNumeros = cnpjEntrada.replace(/\D/g, '');

  if (/^\d{14}$/.test(cnpjApenasNumeros)) {
    let cnpjFormatado = cnpjApenasNumeros.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    document.getElementById("cnpjResultado").textContent = cnpjFormatado;
    document.getElementById("botaoCopiarCNPJ").style.display = "inline-block";
  } else {
    document.getElementById("cnpjResultado").textContent = "Por favor, digite um CNPJ válido com 14 dígitos.";
    document.getElementById("botaoCopiarCNPJ").style.display = "none";
  }
}
function copiarResultadoCnpj() {
  let resultadoCNPJ = document.getElementById("cnpjResultado").textContent;
  copiarParaAreaTransferencia(resultadoCNPJ);
}

function abrirLink() {
  var link = "https://drive.google.com/drive/folders/1Zjxqrsom2LXvtrx62O2bYz87Md8k72va?usp=sharing";
  window.open(link, "_blank");
}

function copiarParaAreaTransferencia(texto) {
  const tempInput = document.createElement("textarea");
  tempInput.value = texto;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
  alert("Texto copiado para a área de transferência: " + texto);
}

//DMVIEW
function formatar_nome() {
  var nomeOriginal = document.getElementById("macInput").value;
  if (nomeOriginal.trim() === "") {
    document.getElementById("nomeResultado").innerText = "Por favor, digite um nome.";
  } else {
    var nomeFormatado = nomeOriginal.replace(/ /g, '_').toUpperCase();
    document.getElementById("nomeResultado").innerText = nomeFormatado;
  }
}

function copiarResultadoNome() {
  let resultadoNome = document.getElementById("nomeResultado").textContent;
  copiarParaAreaTransferencia(resultadoNome);
}

//MAC
function verificarMac() {
  // Obter o valor do input
  var macAddress = document.getElementById("macInputVerificar").value;

  // Verificar se o valor está vazio
  if (macAddress.trim() === "") {
    // Limpar o iframe se o campo estiver vazio
    document.getElementById("iframeResultado").src = "";
    document.getElementById("resultado").innerText = "Endereço MAC vazio.";
    return;
  }

  // Construir a URL da solicitação
  var apiUrl = "https://api.macvendors.com/" + encodeURIComponent(macAddress);

  // Realizar a pesquisa diretamente no iframe
  document.getElementById("iframeResultado").src = apiUrl;

  // Limpar o campo de entrada
  document.getElementById("macInputVerificar").value = "";

  // Exibir o valor construído no elemento com id "resultado"
  document.getElementById("resultado").innerText = "Verificando...";
}

// LOCALIZAÇÃO
function formatarLocalizacao() {
  // Obtém o valor do input de localização
  let localizacaoEntrada = document.getElementById("localizacaoInput").value;

  // Utiliza expressão regular para extrair números decimais
  let numeros = localizacaoEntrada.match(/-?\d+\.\d+/g);

  if (numeros && numeros.length >= 2) {
    // Gera a localização formatada
    let localizacaoFormatada = "https://maps.google.com/?q=" + numeros.join(',');

    // Atualiza o texto e o link no HTML
    document.getElementById("localizacaoFormatada").textContent = localizacaoFormatada;
    document.getElementById("localizacaoFormatada").setAttribute("data-link-mapa", localizacaoFormatada);
  } else {
    // Exibe mensagem de localização inválida
    document.getElementById("localizacaoFormatada").textContent = "Localização inválida.";
  }
}

// Função para copiar o resultado
function copiarResultado() {
  // Obtém o resultado formatado
  let resultado = document.getElementById("localizacaoFormatada").getAttribute("data-link-mapa");

  // Cria um elemento de texto temporário para a área de transferência
  const tempInput = document.createElement("textarea");
  tempInput.value = resultado;
  document.body.appendChild(tempInput);

  // Seleciona o texto no elemento temporário
  tempInput.select();
  tempInput.setSelectionRange(0, 99999); // Para dispositivos móveis

  // Copia o texto para a área de transferência
  document.execCommand("copy");

  // Remove o elemento temporário
  document.body.removeChild(tempInput);

  // Exibe mensagem de sucesso
  alert("Link do mapa copiado para a área de transferência:\n" + resultado);
}

// Função para gerar o link do mapa com coordenadas
function gerarLinkMapa(coordenadas) {
  // Gera o link do mapa com as coordenadas
  let linkMapa = "https://www.google.com/maps?q=" + coordenadas.join(',');

  // Atualiza o atributo href do elemento de link
  document.getElementById("linkMapa").setAttribute("href", linkMapa);
}

/* CONVERSÃO MINÚSCULA PARA MAIÚSCULA */
function converterMaiusculas() {
  let textoOriginal = document.getElementById("inputTexto").value;
  let textoConvertido = textoOriginal.toUpperCase();
  document.getElementById("textoConvertido").textContent = textoConvertido;
  document.getElementById("botaoCopiarTexto").style.display = "inline-block";
}
function converterMinusculas() {
  let textoOriginal = document.getElementById("inputTexto").value;
  let textoConvertido = textoOriginal.toLowerCase();
  document.getElementById("textoConvertido").textContent = textoConvertido;
  document.getElementById("botaoCopiarTexto").style.display = "inline-block";

}
function copiarTextoConversor() {
  let textoConvertido = document.getElementById("textoConvertido").textContent;
  const tempInput = document.createElement("textarea");
  tempInput.value = textoConvertido;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
  alert("Texto copiado para a área de transferência: " + textoConvertido);
}

//o.s

const problemaSelect = document.getElementById('problemaSelect');

function mostrarElemento(elemento) {
  if (elemento) {
    elemento.classList.remove('hidden');
  }
}

function esconderElemento(elemento) {
  if (elemento && elemento.classList) {
    elemento.classList.add('hidden');
  }
}

function obterValorElemento(id) {
  return document.getElementById(id).value;
}

function obterElementosSelecionados(tipo) {
  const checkboxes = document.querySelectorAll(`input[name=${tipo}]:checked`);
  return Array.from(checkboxes).map(checkbox => checkbox.value);
}

function limitarTexto(texto, limite) {
  const palavras = texto.split(' ');
  let linhaAtual = '';
  let linhas = [];

  for (let i = 0; i < palavras.length; i++) {
    const palavra = palavras[i];
    if (linhaAtual.length + palavra.length <= limite) {
      linhaAtual += palavra + ' ';
    } else {
      linhas.push(linhaAtual.trim());
      linhaAtual = palavra + ' ';
    }
  }

  // Adiciona a última linha, se houver
  if (linhaAtual.trim() !== '') {
    linhas.push(linhaAtual.trim());
  }

  return linhas.join('\n');
}

function gerarTexto() {

  /* sem */
  const regiaoMk = obterValorElemento('regiao');
  const horarioMk = obterValorElemento('horario');
  const solicitanteMk = obterValorElemento('solicitante');
  const ledVermelho = obterValorElemento('ledVermelho');
  const procedimentoCompleto = obterValorElemento('procedimentoCompleto');
  const tipoCliente = obterValorElemento('tipoCliente');
  const cabosConectados = obterValorElemento('cabosConectados');
  const tempoOffline = obterValorElemento('tempo');
  const extras = obterValorElemento('extras');
  const telefoneMk = obterValorElemento('telefone');
  const refMk = obterValorElemento('ref');
  const localMk = obterValorElemento('local');

  /* personalizavel */
  const problema = problemaSelect.value;
  const regiaoMk6 = obterValorElemento('regiao6');
  const horarioMk6 = obterValorElemento('horario6');
  const solicitanteMk6 = obterValorElemento('solicitante6');
  const extras6 = obterValorElemento('extras6');
  const osanterior = obterValorElemento('osanterior');
  const telefoneMk6 = obterValorElemento('telefone6');
  const refMk6 = obterValorElemento('ref6');
  const localMk6 = obterValorElemento('local6');

  /* lenta */
  const regiaoMk2 = obterValorElemento('regiao2');
  const horarioMk2 = obterValorElemento('horario2');
  const solicitanteMk2 = obterValorElemento('solicitante2');
  const procedimentoCompletoLento = obterValorElemento('procedimentoCompletoLento');
  const cabosConectadosDiv = obterValorElemento('cabosConectadosDiv');
  const dispositivosDiv = obterValorElemento('dispositivos');
  const tvCabeadaDiv = obterValorElemento('tvCabeadaDiv');
  const sinalDiv = obterValorElemento('sinal');
  const extras2 = obterValorElemento('extras2');
  const telefoneMk2 = obterValorElemento('telefone2');
  const refMk2 = obterValorElemento('ref2');
  const localMk2 = obterValorElemento('local2');

  /* caindo */
  const regiaoMk3 = obterValorElemento('regiao3');
  const horarioMk3 = obterValorElemento('horario3');
  const solicitanteMk3 = obterValorElemento('solicitante3');
  const procedimentoCompletoCaindo = obterValorElemento('procedimentoCompletoCaindo');
  const quedas = obterValorElemento('quedas');
  const tipo = obterValorElemento('tipo');
  const tipoCliente1 = obterValorElemento('tipoCliente1');
  const cabosConectadosDiv1 = obterValorElemento('cabosConectadosDiv1');
  const dispositivosDiv1 = obterValorElemento('dispositivos1');
  const sinalDiv1 = obterValorElemento('sinal1');
  const extras3 = obterValorElemento('extras3');
  const telefoneMk3 = obterValorElemento('telefone3');
  const refMk3 = obterValorElemento('ref3');
  const localMk3 = obterValorElemento('local3');

  /* sinal alto */
  const regiaoMk5 = obterValorElemento('regiao5');
  const horarioMk5 = obterValorElemento('horario5');
  const solicitanteMk5 = obterValorElemento('solicitante5');
  const quedas5 = obterValorElemento('quedas5');
  const tipo5 = obterValorElemento('tipo5');
  const tipoCliente5 = obterValorElemento('tipoCliente5');
  const sinalDiv5 = obterValorElemento('sinal5');
  const extras5 = obterValorElemento('extras5');
  const telefoneMk5 = obterValorElemento('telefone5');
  const refMk5 = obterValorElemento('ref5');
  const localMk5 = obterValorElemento('local5');

  /* tv */
  const regiaoMk4 = obterValorElemento('regiao4');
  const horarioMk4 = obterValorElemento('horario4');
  const solicitanteMk4 = obterValorElemento('solicitante4');
  const procedimentoCompletoTv4 = obterValorElemento('procedimentoCompletoTv4');
  const cabosConectadosDiv4 = obterValorElemento('cabosConectadosDiv4');
  const minimiza = obterValorElemento('minimiza4');
  const tvCabeadaDiv4 = obterValorElemento('tvCabeadaDiv4');
  const extras4 = obterValorElemento('extras4');
  const telefoneMk4 = obterValorElemento('telefone4');
  const refMk4 = obterValorElemento('ref4');
  const localMk4 = obterValorElemento('local4');

  let textoIntro = "";
  let textoGerado = "";
  let textoLocal = "";
  let texto = "";
  let telefone = "";

  //SEM INTERNET
  if (problema === 'semInternet') {

    textoIntro = regiaoMk + " - SEM INTERNET" + '\n' + "(" + horarioMk + ")" + '\n' + '\n' + "SOLICITANTE: " + solicitanteMk + '\n' + '\n';
    texto = "CLIENTE ESTÁ SEM INTERNET. " + ledVermelho + " ";

    if (procedimentoCompleto === 'sim') {
      texto += "CLIENTE JÁ REALIZOU O PROCEDIMENTO COMPLETO DE REINICIAR O ROTEADOR. ";
    } else if (procedimentoCompleto === 'nao') {
      texto += "CLIENTE NÃO REALIZOU O PROCEDIMENTO COMPLETO DE REINICIAR O ROTEADOR. ";
    }

    if (cabosConectados === 'sim') {
      texto += "CABOS ESTÃO BEM CONECTADOS. ";
    } else if (cabosConectados === 'nao') {
      texto += "CABOS ESTAVAM MAL CONECTADOS. ";
    }

    if (tempoOffline) {
      if (tipoCliente) {
        texto += ` CLIENTE É ${tipoCliente.toUpperCase()}. `;
      } else if (tipoCliente) {
        texto += ` CLIENTE É ${tipoCliente.toUpperCase()}. `;
      }
      texto += "ESTÁ OFFLINE NO SISTEMA DESDE: " + tempoOffline + ". " + extras + ". ";
    }

    telefone = '\n' + telefoneMk + '\n' + refMk;
    textoLocal = localMk;
    textoGerado = textoIntro.toUpperCase() + texto.toUpperCase() + '\n' + telefone.toUpperCase() + '\n' + textoLocal;
  }

  //PERSONALIZAVEL
  if (problema === 'personalization') {
    textoIntro = regiaoMk6 + '\n' + "(" + horarioMk6 + ")" + '\n' + '\n' + "SOLICITANTE: " + solicitanteMk6 + '\n' + '\n';
    textoLocal = localMk6;
    texto += extras6 ;
    
    if (osanterior) {
     texto += '\n' +'\n' + `O.S ANTERIOR: `+osanterior+'.';
    }
   

    telefone = '\n' + telefoneMk6+ '\n' + '\n' + refMk6 + '\n';
    textoGerado = textoIntro.toUpperCase() + texto.toUpperCase() + '\n' + telefone.toUpperCase() + textoLocal;
  }

  //INTERNET LENTA
  if (problema === 'internetLenta') {
    textoIntro = regiaoMk2 + " - INTERNET LENTA" + '\n' + "(" + horarioMk2 + ")" + '\n' + '\n' + "SOLICITANTE: " + solicitanteMk2 + '\n' + '\n';
    texto = "CLIENTE ESTÁ COM INTERNET LENTA. ";

    if (procedimentoCompletoLento === 'nao') {
      texto += "NÃO REALIZOU O PROCEDIMENTO COMPLETO DE REINICIAR ROTEADOR. ";
    } else if (procedimentoCompletoLento === 'sim') {
      texto += "REALIZOU O PROCEDIMENTO COMPLETO DE REINICIAR ROTEADOR. ";
    }

    if (cabosConectadosDiv === 'sim') {
      texto += "CABOS ESTÃO BEM CONECTADOS. ";
    } else if (cabosConectadosDiv === 'nao') {
      texto += "CABOS ESTÃO MAL CONECTADOS. ";
    }

    texto += "APRESENTA LENTIDÃO EM: " + dispositivosDiv + ". ";

    if (tvCabeadaDiv === 'sim') {
      texto += "TV É CABEADA. ";
    } else if (tvCabeadaDiv === 'nao') {
      texto += "TV NÃO É CABEADA. ";
    }

    textoLocal = localMk2;
    texto += "SINAL ESTÁ: " + sinalDiv + ". " + extras2;

    telefone = '\n' + telefoneMk2 + '\n' + refMk2 + '\n';
    textoGerado = textoIntro.toUpperCase() + texto.toUpperCase() + '\n' + telefone.toUpperCase() + textoLocal;

  }

  //INTERNET CAINDO
  if (problema === 'internetCaindo') {
    textoIntro = regiaoMk3 + " - INTERNET CAINDO" + '\n' + "(" + horarioMk3 + ")" + '\n' + '\n' + "SOLICITANTE: " + solicitanteMk3 + '\n' + '\n';
    texto = "CLIENTE ESTÁ COM INTERNET CAINDO. ";

    if (procedimentoCompletoCaindo === 'nao') {
      texto += "NÃO REALIZOU O PROCEDIMENTO COMPLETO DE REINICIAR ROTEADOR. ";
    } else if (procedimentoCompletoCaindo === 'sim') {
      texto += "REALIZOU O PROCEDIMENTO COMPLETO DE REINICIAR ROTEADOR. ";
    }

    if (cabosConectadosDiv1 === 'sim') {
      texto += "CABOS ESTÃO BEM CONECTADOS. ";
    } else if (cabosConectadosDiv1 === 'nao') {
      texto += "CABOS ESTÃO MAL CONECTADOS. ";
    }

    if (quedas === 'sim') {
      texto += "APRESENTAM QUEDAS SIGNIFICATIVAS NO SISTEMA. ";
    } else if (quedas === 'nao') {
      texto += "NÃO APRESENTAM QUEDAS NO SISTEMA. ";
    }

    if (tipoCliente1 === 'epon') {
      texto += ` CLIENTE É ${tipoCliente1.toUpperCase()}. `;
    } else if (tipoCliente1 === 'gpon') {
      texto += ` CLIENTE É ${tipoCliente1.toUpperCase()}. `;
    }

    texto += "Há QUEDAS EM: " + dispositivosDiv1 + ". ";

    textoLocal = localMk3;
    texto += "SINAL ESTÁ: " + sinalDiv1 + ". " + extras3;

    telefone = '\n' + telefoneMk3 + '\n' + refMk3 + '\n';
    textoGerado = textoIntro.toUpperCase() + texto.toUpperCase() + '\n' + telefone.toUpperCase() + textoLocal;

  }

  //SINAL ALTO
  if (problema === 'sinalAlto') {
    textoIntro = regiaoMk5 + " - SINAL ALTO" + '\n' + "(" + horarioMk5 + ")" + '\n' + '\n' + "SOLICITANTE: " + solicitanteMk5 + '\n' + '\n';
    texto = "CLIENTE ESTÁ COM SINAL ALTO. ";

    if (quedas5 === 'sim') {
      texto += "APRESENTAM QUEDAS SIGNIFICATIVAS NO SISTEMA. ";
    } else if (quedas5 === 'nao') {
      texto += "NÃO APRESENTAM QUEDAS NO SISTEMA. ";
    }

    if (tipoCliente5 === 'epon') {
      texto += ` CLIENTE É ${tipoCliente5.toUpperCase()}. `;
    } else if (tipoCliente5 === 'gpon') {
      texto += ` CLIENTE É ${tipoCliente5.toUpperCase()}. `;
    }

    textoLocal = localMk5;
    texto += "SINAL ESTÁ: " + sinalDiv5 + ". " + extras5;

    telefone = '\n' + telefoneMk5 + '\n' + refMk5 + '\n';
    textoGerado = textoIntro.toUpperCase() + texto.toUpperCase() + '\n' + telefone.toUpperCase() + textoLocal;

  }

  //TV TAC COM DEFEITO
  if (problema === 'tvTac') {
    textoIntro = regiaoMk4 + " - TV TAC COM DEFEITO" + '\n' + "(" + horarioMk4 + ")" + '\n' + '\n' + "SOLICITANTE: " + solicitanteMk4 + '\n' + '\n';
    texto = "CLIENTE ESTÁ COM PROBLEMAS NA TV TAC. ";

    if (procedimentoCompletoTv4 === 'nao') {
      texto += "NÃO REALIZOU O PROCEDIMENTO COMPLETO DE REINICIAR EQUIPAMENTOS. ";
    } else if (procedimentoCompletoTv4 === 'sim') {
      texto += "REALIZOU O PROCEDIMENTO COMPLETO DE REINICIAR EQUIPAMENTOS. ";
    }

    if (cabosConectadosDiv4 === 'sim') {
      texto += "CABOS ESTÃO BEM CONECTADOS. ";
    } else if (cabosConectadosDiv4 === 'nao') {
      texto += "CABOS ESTÃO MAL CONECTADOS. ";
    }

    if (minimiza === 'sim') {
      texto += "TV ESTÁ MINIMIZANDO A TELA. ";
    } else if (minimiza === 'nao') {
      texto += "TV NÃO ESTÁ MINIMIZANDO A TELA. ";
    }

    if (tvCabeadaDiv4 === 'sim') {
      texto += "TV É CABEADA. ";
    } else if (tvCabeadaDiv4 === 'nao') {
      texto += "TV NÃO É CABEADA. ";
    }

    texto += extras4;
    telefone = '\n' + telefoneMk4 + '\n' + refMk4;
    textoLocal = localMk4;
    textoGerado = textoIntro.toUpperCase() + texto.toUpperCase() + '\n' + telefone.toUpperCase() + '\n' + textoLocal;

  }

  const textoLimitado = limitarTexto(textoGerado, 47);

  // Atualiza o elemento de texto com o resultado
  document.getElementById('textoGerado').textContent = textoLimitado;

  // Mostra o botão de copiar texto
  const botaoCopiarTexto = document.getElementById('copiarTextoo');
  botaoCopiarTexto.classList.remove('hidden');
  console.log("Texto gerado:", textoGerado);
}

function adicionarEventoProblema() {
  problemaSelect.addEventListener('change', function () {
    // Oculta todas as opções
    esconderElemento(opcoesSemInternet);
    esconderElemento(opcoesPersonalizavel);
    esconderElemento(opcoesLedVermelhoSim);
    esconderElemento(opcoesProcedimentoSim);
    esconderElemento(opcoesLedVermelhoNao);
    esconderElemento(tempoMk);
    esconderElemento(extrasc);
    esconderElemento(opcoesInternetLenta);
    esconderElemento(opcoesInternetCaindo);
    esconderElemento(opcoesSinalAlto);
    esconderElemento(opcoesTvTacDefeito);

    // Verifica o problema selecionado e mostra as opções correspondentes
    if (problemaSelect.value === 'semInternet') {
      mostrarElemento(opcoesSemInternet);
      mostrarElemento(regiaoMk);
      mostrarElemento(horarioMk);
      mostrarElemento(solicitanteMk)
      mostrarElemento(ledVermelho1)
      mostrarElemento(opcoesLedVermelhoSim);
      mostrarElemento(opcoesProcedimentoSim);
      mostrarElemento(opcoesLedVermelhoNao);
      mostrarElemento(tempoMk);
      mostrarElemento(extrasc);
      mostrarElemento(telefoneMk);
      mostrarElemento(refMk);
      mostrarElemento(localMk);

    } else if (problemaSelect.value === 'personalization') {
      mostrarElemento(opcoesPersonalizavel);
      mostrarElemento(regiaoMk6);
      mostrarElemento(horarioMk6);
      mostrarElemento(solicitanteMk6)
      mostrarElemento(extrasc6);
      mostrarElemento(osanteriores);
      mostrarElemento(telefoneMk6);
      mostrarElemento(refMk6);
      mostrarElemento(localMk6);

    } else if (problemaSelect.value === 'internetLenta') {
      mostrarElemento(opcoesInternetLenta);
      mostrarElemento(regiaoMk2);
      mostrarElemento(horarioMk2);
      mostrarElemento(solicitanteMk2)
      mostrarElemento(procedimentoCompletoLento);
      mostrarElemento(conectadoCabo);
      mostrarElemento(dispositivosDiv);
      mostrarElemento(tvCabeada);
      mostrarElemento(sinalDiv);
      mostrarElemento(extrasc2);
      mostrarElemento(telefoneMk2);
      mostrarElemento(refMk2);
      mostrarElemento(localMk2);

    } else if (problemaSelect.value === 'internetCaindo') {
      mostrarElemento(opcoesInternetCaindo);
      mostrarElemento(regiaoMk3);
      mostrarElemento(horarioMk3);
      mostrarElemento(solicitanteMk3)
      mostrarElemento(procedimentoCompletoCaindo);
      mostrarElemento(conectadoCabo1);
      mostrarElemento(tipo);
      mostrarElemento(tipoCliente1);
      mostrarElemento(quedas);
      mostrarElemento(dispositivosDiv1);
      mostrarElemento(sinalDiv1);
      mostrarElemento(extrasc3);
      mostrarElemento(telefoneMk3);
      mostrarElemento(refMk3);
      mostrarElemento(localMk3);

    } else if (problemaSelect.value === 'sinalAlto') {
      mostrarElemento(opcoesSinalAlto);
      mostrarElemento(regiaoMk5);
      mostrarElemento(horarioMk5);
      mostrarElemento(solicitanteMk5)
      mostrarElemento(tipo5);
      mostrarElemento(tipoCliente5);
      mostrarElemento(quedas5);
      mostrarElemento(sinalDiv5);
      mostrarElemento(extrasc5);
      mostrarElemento(telefoneMk5);
      mostrarElemento(refMk5);
      mostrarElemento(localMk5);

    } else if (problemaSelect.value === 'tvTac') {
      mostrarElemento(opcoesTvTacDefeito);
      mostrarElemento(regiaoMk4);
      mostrarElemento(horarioMk4);
      mostrarElemento(solicitanteMk4)
      mostrarElemento(procedimentoCompletoTv4);
      mostrarElemento(conectadoCabo4);
      mostrarElemento(minimiza);
      mostrarElemento(tvCabeada4);
      mostrarElemento(extrasc4);
      mostrarElemento(telefoneMk4);
      mostrarElemento(refMk4);
      mostrarElemento(localMk4);
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  adicionarEventoProblema();

  // Adiciona o evento de clique para copiar o texto gerado
  const botaoCopiarTexto = document.getElementById('copiarTextoo');
  botaoCopiarTexto.addEventListener('click', function () {
    // Obtém o texto gerado
    const textoGerado = document.getElementById('textoGerado').textContent;

    // Cria um elemento de texto temporário
    const tempInput = document.createElement('textarea');
    tempInput.value = textoGerado;

    // Adiciona o elemento de texto temporário ao corpo do documento
    document.body.appendChild(tempInput);

    // Seleciona o texto no elemento de texto temporário
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // Para dispositivos móveis

    // Copia o texto para a área de transferência
    document.execCommand('copy');

    // Remove o elemento de texto temporário
    document.body.removeChild(tempInput);

    // Alerta o usuário que o texto foi copiado
    alert('Texto copiado: ' +'\n'+ textoGerado);
  });
});


//gerador de atendimento

const problemaSelect2 = document.getElementById('problemaSelect2');

function mostrarElemento2(elemento2) {
    if (elemento2) {
        elemento2.classList.remove('hidden');
    }
}

function esconderElemento2(elemento2) {
    if (elemento2 && elemento2.classList) {
        elemento2.classList.add('hidden');
    }
}

function obterValorElemento2(id) {
    return document.getElementById(id).value;
}

function gerarA() {
    const problema2 = problemaSelect2.value;
    const cliente = obterValorElemento2('cliente');
    const contato = obterValorElemento2('contatos');
    const relato = obterValorElemento2('relatos');
    const plano = obterValorElemento2('planos');
    const alteracoes = obterValorElemento2('alteracoesr');
    const extrasate = obterValorElemento2('extrasatendimento');

    let textoGerado2 = "";

    if (problema2 === 'personalizationA') {
        const textoComeco = "Tratado com: " + cliente+ '.' + '\n' + "Telefone: " + contato + '.'+ '\n' + "Plano, roteador e sinal: "+  plano +'.' + '\n';
        const textomeio = "Relato: " + relato + '\n' + "Alterações realizadas: " + alteracoes+ '.' + '\n';
        const textoadd = extrasate ? "Informações importantes: " + extrasate + '.' : "";

        textoGerado2 = textoComeco + '\n' + textomeio + '\n' + textoadd;
    }

    const botaoCopiarTexto = document.getElementById('copiarA');
    botaoCopiarTexto.classList.remove('hidden');
    console.log("Texto gerado:", textoGerado2);

    document.getElementById('atendimento').textContent = textoGerado2;
}

function adicionarEventoProblema2() {
    problemaSelect2.addEventListener('change', function () {
        esconderElemento2(document.getElementById('opcoesPersonalizavel1'));

        if (problemaSelect2.value === 'personalizationA') {
            mostrarElemento2(document.getElementById('opcoesPersonalizavel1'));
            mostrarElemento2(document.getElementById('clientes'));
            mostrarElemento2(document.getElementById('contato'));
            mostrarElemento2(document.getElementById('plano'));
            mostrarElemento2(document.getElementById('relato'));
            mostrarElemento2(document.getElementById('alteracoes'));
            mostrarElemento2(document.getElementById('extrasate'));
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    adicionarEventoProblema2();

    const botaoCopiarTexto2 = document.getElementById('copiarA');
    botaoCopiarTexto2.addEventListener('click', function () {
        const textoGerado2 = document.getElementById('atendimento').textContent;

        const tempInput2 = document.createElement('textarea');
        tempInput2.value = textoGerado2;

        document.body.appendChild(tempInput2);

        tempInput2.select();
        tempInput2.setSelectionRange(0, 99999);

        document.execCommand('copy');

        document.body.removeChild(tempInput2);

        alert('Texto copiado: ' + '\n' + textoGerado2);
    });
});
