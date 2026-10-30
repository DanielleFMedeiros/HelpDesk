
// Atalhos do cabeçalho
function abrirLink() {
  window.open("https://drive.google.com/drive/folders/1Zjxqrsom2LXvtrx62O2bYz87Md8k72va?usp=sharing", "_blank");
}

function abrirLink1() {
  window.open("https://faq.tactelecom.com.br/bibliotecas/comercial/", "_blank");
}

// FORMATADOR AUTOMÁTICO DE CPF/CNPJ
function formatadorDoc() {
    const campo = document.getElementById("docInput");
    const docNumeros = campo.value.replace(/\D/g, "");
    const resultado = document.getElementById("docResultado");
    const botaoCopiar = document.getElementById("botaoCopiarDoc");

    if (docNumeros.length === 11) {
        resultado.textContent = docNumeros.replace(
            /(\d{3})(\d{3})(\d{3})(\d{2})/,
            "$1.$2.$3-$4"
        );
        botaoCopiar.style.display = "inline-block";
    } else if (docNumeros.length === 14) {
        resultado.textContent = docNumeros.replace(
            /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
            "$1.$2.$3/$4-$5"
        );
        botaoCopiar.style.display = "inline-block";
    } else {
        resultado.textContent = "";
        botaoCopiar.style.display = "none";
    }
}

function configurarFormatadoresAutomaticos() {
  const campoDoc = document.getElementById("docInput");
  const campoLocalizacao = document.getElementById("localizacaoInput");
  let temporizadorLocalizacao;

  if (campoDoc) {
    campoDoc.addEventListener("input", formatadorDoc);
  }

  if (campoLocalizacao) {
    campoLocalizacao.addEventListener("input", () => {
      clearTimeout(temporizadorLocalizacao);
      temporizadorLocalizacao = setTimeout(() => {
        formatarLocalizacao();
      }, 450);
    });
  }
}

function copiarDocumento() {
    const resultadoDoc = document.getElementById("docResultado").textContent;

    if (resultadoDoc) {
        copiarParaAreaTransferencia(resultadoDoc);
    }
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

/*//DMVIEW
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
*/
// MAC — consulta automática ao completar os 12 caracteres hexadecimais
let macConsultaTimer = null;
let ultimoMacConsultado = "";

function normalizarMac(valor) {
  return valor.replace(/[^a-fA-F0-9]/g, "").toUpperCase();
}

function verificarMac() {
  const campo = document.getElementById("macInputVerificar");
  const resultado = document.getElementById("resultado");
  const iframe = document.getElementById("iframeResultado");
  const macOriginal = campo.value.trim();
  const macLimpo = normalizarMac(macOriginal);

  if (macLimpo.length !== 12) {
    resultado.innerText = "Digite um MAC completo com 12 caracteres hexadecimais.";
    iframe.src = "about:blank";
    ultimoMacConsultado = "";
    return;
  }

  if (macLimpo === ultimoMacConsultado) return;
  ultimoMacConsultado = macLimpo;

  const macFormatado = macLimpo.match(/.{2}/g).join(":");
  resultado.innerText = "Consultando fabricante...";
  iframe.src = "https://api.macvendors.com/" + encodeURIComponent(macFormatado);
}

function configurarConsultaAutomaticaMac() {
  const campo = document.getElementById("macInputVerificar");
  if (!campo) return;

  campo.addEventListener("input", () => {
    clearTimeout(macConsultaTimer);
    const macLimpo = normalizarMac(campo.value);
    if (macLimpo.length < 12) {
      ultimoMacConsultado = "";
      document.getElementById("resultado").innerText = "";
      document.getElementById("iframeResultado").src = "about:blank";
      return;
    }
    if (macLimpo.length > 12) return;
    macConsultaTimer = setTimeout(verificarMac, 450);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  configurarConsultaAutomaticaMac();
  configurarFormatadoresAutomaticos();
});

// FORMATADOR AUTOMÁTICO DE LOCALIZAÇÃO
function formatarLocalizacao() {
  const campo = document.getElementById("localizacaoInput");
  const saida = document.getElementById("localizacaoFormatada");
  const botaoCopiar = document.getElementById("botaoCopiarLocalizacao");
  const localizacaoEntrada = campo.value;
  const numeros = localizacaoEntrada.match(/-?\d+\.\d+/g);

  if (numeros && numeros.length >= 2) {
    const localizacaoFormatada = "https://maps.google.com/?q=" + numeros.slice(0, 2).join(",");
    saida.textContent = localizacaoFormatada;
    saida.setAttribute("data-link-mapa", localizacaoFormatada);
    if (botaoCopiar) botaoCopiar.style.display = "inline-block";
  } else {
    saida.textContent = "";
    saida.removeAttribute("data-link-mapa");
    if (botaoCopiar) botaoCopiar.style.display = "none";
  }
}

// Função para copiar o resultado
function copiarResultado() {
  // Obtém o resultado formatado
  let resultado = document.getElementById("localizacaoFormatada").getAttribute("data-link-mapa");
  if (!resultado) return;

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

let problemaSelect = null;

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

function obterReferenciaComFoto(idReferencia, idCheckbox) {
  const referencia = obterValorElemento(idReferencia);
  const fotoAnexada = document.getElementById(idCheckbox)?.checked;
  return referencia + (fotoAnexada ? (referencia ? '\n' : '') + '**FOTO ANEXADA AO CADASTRO**' : '');
}

function limitarTextoComQuebras(texto, limite) {
  return texto
    .split('\n') // Divide o texto mantendo as quebras de linha originais
    .map(linha => linha.trim() ? limitarTexto(linha, limite) : linha) // Aplica a limitação onde necessário
    .join('\n'); // Junta as linhas mantendo as quebras intactas
}

function limitarTexto(texto, limite) {
  let palavras = texto.split(' ');
  let linhas = [];
  let linhaAtual = '';

  for (let palavra of palavras) {
    if ((linhaAtual + palavra).length <= limite) {
      linhaAtual += (linhaAtual ? ' ' : '') + palavra; // Adiciona espaço apenas se já houver texto na linha
    } else {
      linhas.push(linhaAtual);
      linhaAtual = palavra;
    }
  }

  if (linhaAtual) linhas.push(linhaAtual); // Adiciona a última linha se houver conteúdo

  return linhas.join('\n');
}

function obterModoContato(id) {
  const grupo = document.getElementById(id);
  if (!grupo) return '';
  return Array.from(grupo.querySelectorAll('input[type="checkbox"]:checked'))
    .map(opcao => opcao.value)
    .join(' e ');
}

function gerarTexto() {

  // Campo genérico removido: não existe no HTML e não é necessário.

  /* sem */
  const regiaoMk = obterValorElemento('regiao');
  const horarioMk = obterValorElemento('horario');
  const solicitanteMk = obterValorElemento('solicitante');
  const divplano = obterValorElemento('plano1');
  const divroteador = obterValorElemento('roteador1');
  const divmac = obterValorElemento('mac1');
  const divsinal = obterValorElemento('sinal1');
  const divsinaltx = obterValorElemento('sinaltx');
  const extras = obterValorElemento('extras');
  const telefoneMk = obterValorElemento('telefone');
  const modoContato = obterModoContato('modoContato');
  const refMk = obterReferenciaComFoto('ref', 'fotoCadastro');
  const localMk = obterValorElemento('local');

  /* personalizavel */
  const problema = problemaSelect.value;

  // Confere os campos essenciais antes de gerar a O.S.
  // O primeiro campo pendente recebe destaque e foco para facilitar a correção.
  function conferirCamposOS(tipo) {
    document.querySelectorAll('.campo-validacao-erro').forEach(el => el.remove());
    document.querySelectorAll('.campo-com-erro').forEach(el => el.classList.remove('campo-com-erro'));

    const camposPorTipo = {
      // Dados básicos: identificação do solicitante, região, telefone e localização.
      // Horário e referência ficam opcionais.
      semInternet: ['regiao', 'horario', 'solicitante', 'telefone', 'local', 'plano1', 'roteador1', 'mac1', 'sinal1', 'sinaltx'],
      personalization: ['regiao6', 'horario6', 'solicitante6', 'telefone6', 'local6'],
      internetLenta: ['regiao2', 'horario2', 'solicitante2', 'telefone2', 'local2', 'planoLenta', 'roteadorLenta', 'macLenta', 'sinalRXLenta', 'sinalTXLenta'],
      internetCaindo: ['regiao3', 'horario3', 'solicitante3', 'telefone3', 'local3', 'planoCaindo', 'roteadorCaindo', 'macCaindo', 'sinalRXCaindo', 'sinalTXCaindo'],
      sinalAlto: ['regiao5', 'horario5', 'solicitante5', 'telefone5', 'local5', 'planoSinalAlto', 'roteadorSinalAlto', 'macSinalAlto', 'sinalRXSinalAlto', 'sinalTXSinalAlto'],
      tvDefeito: ['regiao4', 'horario4', 'solicitante4', 'telefone4', 'local4', 'planoTv', 'roteadorTv', 'macTv', 'sinalRXTv', 'sinalTXTv'],
      cabeamento: ['regiao7', 'horario7', 'solicitante7', 'telefone7', 'local7', 'cabear'],
      instalacao: ['nomeAtendente', 'planoCliente', 'telefoneComercial', 'localComercial']
    };

    const ids = camposPorTipo[tipo] || [];

    // Identifica visualmente os campos obrigatórios com asterisco,
    // incluindo os grupos de Forma de contato.
    const gruposContato = {
      semInternet: 'modoContato',
      personalization: 'modoContato6',
      internetLenta: 'modoContato2',
      internetCaindo: 'modoContato3',
      sinalAlto: 'modoContato5',
      tvDefeito: 'modoContato4',
      cabeamento: 'modoContato7',
      instalacao: 'modoContatoComercial'
    };
    const idsObrigatorios = [...Object.values(camposPorTipo).flat(), ...Object.values(gruposContato)];
    [...new Set(idsObrigatorios)].forEach(id => {
      const label = document.querySelector(`label[for="${id}"]`);
      if (label && !label.querySelector('.campo-obrigatorio-asterisco')) {
        const asterisco = document.createElement('span');
        asterisco.className = 'campo-obrigatorio-asterisco';
        asterisco.textContent = ' *';
        asterisco.setAttribute('aria-label', 'obrigatório');
        label.appendChild(asterisco);
      }
    });
    const camposTecnicos = ['mac1','sinal1','sinaltx','plano1','roteador1','planoLenta','roteadorLenta','macLenta','sinalRXLenta','sinalTXLenta','planoCaindo','roteadorCaindo','macCaindo','sinalRXCaindo','sinalTXCaindo','planoSinalAlto','roteadorSinalAlto','macSinalAlto','sinalRXSinalAlto','sinalTXSinalAlto','planoTv','roteadorTv','macTv','sinalRXTv','sinalTXTv'];
    camposTecnicos.forEach(id => {
      const campo = document.getElementById(id);
      if (campo) campo.dataset.permiteIndisponivel = 'true';
    });
    const pendentes = ids.map(id => document.getElementById(id)).filter(campo => {
      if (!campo || !campo.getClientRects().length) return false;
      if (campo.disabled) return false;
      // Se não foi possível consultar um dado técnico, pode ser preenchido
      // com "NÃO VERIFICADO" ou "NÃO DISPONÍVEL" para liberar a geração.
      return !String(campo.value || '').trim();
    });

    // A forma de contato é um grupo de caixas: basta marcar uma opção.
    const grupo = document.getElementById(gruposContato[tipo]);
    if (grupo && grupo.getClientRects().length && !grupo.querySelector('input[type="checkbox"]:checked')) {
      pendentes.push(grupo);
    }

    if (!pendentes.length) return true;

    const primeiro = pendentes[0];
    pendentes.forEach(campo => {
      const alvo = campo.matches('input, select, textarea') ? campo : campo.querySelector('input');
      if (alvo) alvo.classList.add('campo-com-erro');
    });

    const foco = primeiro.matches('input, select, textarea') ? primeiro : primeiro.querySelector('input');
    if (foco) {
      foco.scrollIntoView({ behavior: 'smooth', block: 'center' });
      foco.focus({ preventScroll: true });
    }
    return false;
  }

  if (!conferirCamposOS(problema)) return;
  const regiaoMk6 = obterValorElemento('regiao6');
  const horarioMk6 = obterValorElemento('horario6');
  const solicitanteMk6 = obterValorElemento('solicitante6');
  const divplano2 = obterValorElemento('plano2');
  const divroteador2 = obterValorElemento('roteador2');
  const divmac2 = obterValorElemento('mac2');
  const divsinal2 = obterValorElemento('sinal2');
  const divsinaltx2 = obterValorElemento('sinaltx2');
  const extras6 = obterValorElemento('extras6');
  const osanterior = obterValorElemento('osanterior');
  const telefoneMk6 = obterValorElemento('telefone6');
  const modoContato6 = obterModoContato('modoContato6');
  const refMk6 = obterReferenciaComFoto('ref6', 'fotoCadastro6');
  const localMk6 = obterValorElemento('local6');

  /* lenta */
  const regiaoMk2 = obterValorElemento('regiao2');
  const horarioMk2 = obterValorElemento('horario2');
  const solicitanteMk2 = obterValorElemento('solicitante2');
  const procedimentoCompletoLento = obterValorElemento('procedimentoCompletoLento');
  const dispositivosDiv = obterValorElemento('dispositivos');
  const tvCabeadaDiv = obterValorElemento('tvCabeadaDiv');
  const planoLenta = obterValorElemento('planoLenta');
  const roteadorLenta = obterValorElemento('roteadorLenta');
  const macLenta = obterValorElemento('macLenta');
  const sinalRXLenta = obterValorElemento('sinalRXLenta');
  const sinalTXLenta = obterValorElemento('sinalTXLenta');
  const extras2 = obterValorElemento('extras2');
  const telefoneMk2 = obterValorElemento('telefone2');
  const modoContato2 = obterModoContato('modoContato2');
  const refMk2 = obterReferenciaComFoto('ref2', 'fotoCadastro2');
  const localMk2 = obterValorElemento('local2');

  /* caindo */
  const regiaoMk3 = obterValorElemento('regiao3');
  const horarioMk3 = obterValorElemento('horario3');
  const solicitanteMk3 = obterValorElemento('solicitante3');
  const procedimentoCompletoCaindo = obterValorElemento('procedimentoCompletoCaindo');
  const quedas = obterValorElemento('quedas');
  const cabosConectadosDiv1 = obterValorElemento('cabosConectadosDiv1');
  const dispositivosDiv1 = obterValorElemento('dispositivos1');
  const planoCaindo = obterValorElemento('planoCaindo');
  const roteadorCaindo = obterValorElemento('roteadorCaindo');
  const macCaindo = obterValorElemento('macCaindo');
  const sinalRXCaindo = obterValorElemento('sinalRXCaindo');
  const sinalTXCaindo = obterValorElemento('sinalTXCaindo');
  const extras3 = obterValorElemento('extras3');
  const telefoneMk3 = obterValorElemento('telefone3');
  const modoContato3 = obterModoContato('modoContato3');
  const refMk3 = obterReferenciaComFoto('ref3', 'fotoCadastro3');
  const localMk3 = obterValorElemento('local3');

  /* sinal alto */
  const regiaoMk5 = obterValorElemento('regiao5');
  const horarioMk5 = obterValorElemento('horario5');
  const solicitanteMk5 = obterValorElemento('solicitante5');
  const quedas5 = obterValorElemento('quedas5');
  const planoSinalAlto = obterValorElemento('planoSinalAlto');
  const roteadorSinalAlto = obterValorElemento('roteadorSinalAlto');
  const macSinalAlto = obterValorElemento('macSinalAlto');
  const sinalRXSinalAlto = obterValorElemento('sinalRXSinalAlto');
  const sinalTXSinalAlto = obterValorElemento('sinalTXSinalAlto');
  const extras5 = obterValorElemento('extras5');
  const telefoneMk5 = obterValorElemento('telefone5');
  const modoContato5 = obterModoContato('modoContato5');
  const refMk5 = obterReferenciaComFoto('ref5', 'fotoCadastro5');
  const localMk5 = obterValorElemento('local5');

  /* tv */
  const regiaoMk4 = obterValorElemento('regiao4');
  const horarioMk4 = obterValorElemento('horario4');
  const solicitanteMk4 = obterValorElemento('solicitante4');
  const planoTv = obterValorElemento('planoTv');
  const roteadorTv = obterValorElemento('roteadorTv');
  const macTv = obterValorElemento('macTv');
  const sinalRXTv = obterValorElemento('sinalRXTv');
  const sinalTXTv = obterValorElemento('sinalTXTv');
  const procedimentoCompletoTv4 = obterValorElemento('procedimentoCompletoTv4');
  const cabosConectadosDiv4 = obterValorElemento('cabosConectadosDiv4');
  const minimiza = obterValorElemento('minimiza4');
  const extras4 = obterValorElemento('extras4');
  const telefoneMk4 = obterValorElemento('telefone4');
  const modoContato4 = obterModoContato('modoContato4');
  const refMk4 = obterReferenciaComFoto('ref4', 'fotoCadastro4');
  const localMk4 = obterValorElemento('local4');

  /* cabeamento*/
  const regiaoMk7 = obterValorElemento('regiao7');
  const horarioMk7 = obterValorElemento('horario7');
  const solicitanteMk7 = obterValorElemento('solicitante7');
  const cabearOq = obterValorElemento('cabear');
  const metragemMk = obterValorElemento('metragem');
  const cienteMk = obterValorElemento('ciente');
  const pagamentoMk = obterValorElemento('pagamento');
  const extras7 = obterValorElemento('extras7');
  const telefoneMk7 = obterValorElemento('telefone7');
  const modoContato7 = obterModoContato('modoContato7');
  const refMk7 = obterReferenciaComFoto('ref7', 'fotoCadastro7');
  const localMk7 = obterValorElemento('local7');

  /* instalacao */
  const extraInstalacaoFibra = obterValorElemento('extraInstalacaoFibra');
  const nomeAtendente = obterValorElemento('nomeAtendente');
  const planoCliente = obterValorElemento('planoCliente');
  const cobrancaInstalacao = obterValorElemento('cobrancaInstalacao');
  const tipoRoteador = obterValorElemento('tipoRoteador');
  const appsCortesia = obterValorElemento('appsCortesia');
  const metragemCabos = obterValorElemento('metragemCabos');
  const vencimentoFatura = obterValorElemento('vencimentoFatura');
  const fiacao = obterValorElemento('fiacao');
  const clienteCiente = obterValorElemento('clienteCiente');
  const contrato = obterValorElemento('contrato');
  const telefoneMkComercial = obterValorElemento('telefoneComercial');
  const modoContatoComercial = obterModoContato('modoContatoComercial');
  const refMkComercial = obterReferenciaComFoto('refComercial', 'fotoCadastroComercial');
  const localMkComercial = obterValorElemento('localComercial');

  let textoIntro = "";
  let textoGerado = "";
  let textoLocal = "";
  let texto = "";
  let telefone = "";
  let textoComFormatacaoPropria = false;

  // Função para pegar os valores dos checkbox marcados
  function obterCheckBoxMarcados() {
    let checkbox = document.querySelectorAll('.leds');
    let valorMarcado = [];

    checkbox.forEach(function (checkbox) {
      if (checkbox.checked) {
        valorMarcado.push(checkbox.value); // Adiciona o valor ao array
      }
    });

    return valorMarcado;
  }

  function montarTelefoneContato(numero, modo) {
    return numero + (modo ? ' - ' + modo : '');
  }

  function obterMorador() {
    const selecionado = document.querySelector('input[name="morador"]:checked');
    return selecionado ? selecionado.value : '';
  }

  function obterTipoLocal(problema) {
    const selecionado = document.querySelector(`input[name="tipoLocal_${problema}"]:checked`);
    return selecionado ? selecionado.value : '';
  }

  //SEM INTERNET
  if (problema === 'semInternet') {

    let morador = obterMorador();

    textoIntro = regiaoMk + " - SEM INTERNET " +
             (morador ? "- " + morador + " " : "") +
             '\n' + "(" + horarioMk + ")" + '\n' + '\n' +
             "TRATADO COM: " + solicitanteMk + '\n' + '\n';
    
    "(" + horarioMk + ")" + '\n' + '\n' + "TRATADO COM: " + solicitanteMk + '\n' + '\n';


    const infos = [
      divplano,
      divroteador,
      divmac,
      (divsinal || divsinaltx) ? `RX: ${divsinal} | TX: ${divsinaltx}` : null
    ]
      .filter(Boolean)
      .join(', ');

    texto = `Plano, roteador, MAC e sinal: ${infos}.` + '\n' + '\n' + `CLIENTE ESTÁ SEM INTERNET.`;

    //checkbox

    let checkboxMarcado = obterCheckBoxMarcados();

    texto += checkboxMarcado ? " " + checkboxMarcado + "." : "";
    texto += extras ? " " + extras + "." : "";

    telefone = '\n' + montarTelefoneContato(telefoneMk, modoContato) + '\n' + refMk;
    textoLocal = localMk;
    textoGerado = textoIntro.toUpperCase() + texto.toUpperCase() + '\n' + telefone.toUpperCase() + '\n' + textoLocal;
  }

  //PERSONALIZAVEL
  if (problema === 'personalization') {
    textoIntro = regiaoMk6 + (obterTipoLocal('personalization') ? ' - ' + obterTipoLocal('personalization') : '') + '\n' + "(" + horarioMk6 + ")" + '\n' + '\n' + "TRATADO COM: " + solicitanteMk6 + '\n' + '\n';
     const infos2 = [
      divplano2,
      divroteador2,
      divmac2,
      (divsinal2 || divsinaltx2) ? `RX: ${divsinal2} | TX: ${divsinaltx2}` : null
    ]
      .filter(Boolean)
      .join(', ');

    texto = `Plano, roteador, MAC e sinal: ${infos2}.` + '\n' + '\n';
    texto += extras6;

    if (osanterior) {
      texto += '\n' + '\n' + `O.S ANTERIOR: ` + osanterior + '.';
    }


    telefone = '\n' + montarTelefoneContato(telefoneMk6, modoContato6) + '\n' + '\n' + refMk6 + '\n';
    textoLocal = localMk6;
    textoGerado = textoIntro.toUpperCase() + texto.toUpperCase() + '\n' + telefone.toUpperCase() + textoLocal;
  }

  //INTERNET LENTA
  if (problema === 'internetLenta') {
    const infosLenta = [
      planoLenta ? `PLANO: ${planoLenta}` : null,
      roteadorLenta ? `MODELO DO ROTEADOR: ${roteadorLenta}` : null,
      macLenta ? `MAC DA ONU: ${macLenta}` : null,
      (sinalRXLenta || sinalTXLenta) ? `SINAL RX: ${sinalRXLenta} | SINAL TX: ${sinalTXLenta}` : null
    ].filter(Boolean).join('\n');
    textoIntro = regiaoMk2 + " - INTERNET LENTA" + (obterTipoLocal('internetLenta') ? " - " + obterTipoLocal('internetLenta') : "") + '\n' + "(" + horarioMk2 + ")" + '\n\n' +
      "TRATADO COM: " + solicitanteMk2 + ',' + '\n' +
      (infosLenta ? infosLenta + '\n' : '') + '\n';
    texto = "CLIENTE ESTÁ COM INTERNET LENTA. ";

    if (procedimentoCompletoLento === 'nao') {
      texto += "NÃO REALIZOU O PROCEDIMENTO COMPLETO DE REINICIAR ROTEADOR. ";
    } else if (procedimentoCompletoLento === 'sim') {
      texto += "REALIZOU O PROCEDIMENTO COMPLETO DE REINICIAR ROTEADOR. ";
    }

    texto += "APRESENTA LENTIDÃO EM: " + dispositivosDiv + ". ";

    if (tvCabeadaDiv === 'sim') {
      texto += "TV É CABEADA. ";
    } else if (tvCabeadaDiv === 'nao') {
      texto += "TV NÃO É CABEADA. ";
    }

    textoLocal = localMk2;
    texto += extras2;

    telefone = '\n' + montarTelefoneContato(telefoneMk2, modoContato2) + '\n' + refMk2 + '\n';
    textoComFormatacaoPropria = true;
    textoGerado = textoIntro.toUpperCase() + limitarTexto(texto.toUpperCase(), 64) + '\n' + telefone.toUpperCase() + textoLocal;

  }

  //INTERNET CAINDO
  if (problema === 'internetCaindo') {
    const infosCaindo = [
      planoCaindo ? `PLANO: ${planoCaindo}` : null,
      roteadorCaindo ? `MODELO DO ROTEADOR: ${roteadorCaindo}` : null,
      macCaindo ? `MAC DA ONU: ${macCaindo}` : null,
      (sinalRXCaindo || sinalTXCaindo) ? `SINAL RX: ${sinalRXCaindo} | SINAL TX: ${sinalTXCaindo}` : null
    ].filter(Boolean).join('\n');
    textoIntro = regiaoMk3 + " - INTERNET CAINDO" + (obterTipoLocal('internetCaindo') ? " - " + obterTipoLocal('internetCaindo') : "") + '\n' + "(" + horarioMk3 + ")" + '\n\n' +
      "TRATADO COM: " + solicitanteMk3 + ',' + '\n' +
      (infosCaindo ? infosCaindo + '\n' : '') + '\n';
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

    texto += "Há QUEDAS EM: " + dispositivosDiv1 + ". ";

    textoLocal = localMk3;
    texto += extras3;

    telefone = '\n' + montarTelefoneContato(telefoneMk3, modoContato3) + '\n' + refMk3 + '\n';
    textoComFormatacaoPropria = true;
    textoGerado = textoIntro.toUpperCase() + limitarTexto(texto.toUpperCase(), 64) + '\n' + telefone.toUpperCase() + textoLocal;

  }

  //SINAL ALTO
  if (problema === 'sinalAlto') {
    const infosSinalAlto = [
      planoSinalAlto ? `PLANO: ${planoSinalAlto}` : null,
      roteadorSinalAlto ? `MODELO DO ROTEADOR: ${roteadorSinalAlto}` : null,
      macSinalAlto ? `MAC DA ONU: ${macSinalAlto}` : null,
      (sinalRXSinalAlto || sinalTXSinalAlto) ? `SINAL RX: ${sinalRXSinalAlto} | SINAL TX: ${sinalTXSinalAlto}` : null
    ].filter(Boolean).join('\n');

    textoIntro = regiaoMk5 + " - SINAL ALTO" + (obterTipoLocal('sinalAlto') ? " - " + obterTipoLocal('sinalAlto') : "") + '\n' + "(" + horarioMk5 + ")" + '\n\n' +
      "TRATADO COM: " + solicitanteMk5 + ',' + '\n' +
      (infosSinalAlto ? infosSinalAlto + '\n' : '') + '\n';
    texto = "CLIENTE ESTÁ COM SINAL ALTO. ";

    if (quedas5 === 'sim') {
      texto += "APRESENTAM QUEDAS SIGNIFICATIVAS NO SISTEMA. ";
    } else if (quedas5 === 'nao') {
      texto += "NÃO APRESENTAM QUEDAS NO SISTEMA. ";
    }

    texto+= '\n' + extras5 + ". " +'\n\n' + "VERIFICAR SINAL DE REDE, DROPP DA FIBRA, FUSÕES, ATUALIZAR A CONFIGURAÇÃO DE EQUIPAMENTO, VELOCIDADE, INSTALAÇÃO E POSICIONAMENTO "+
    "DA ONU E DEIXAR PADRÃO DEFINIDO. AO ENTRAR EM CONTATO COM O CLIENTE INFORMAR MANUTENÇÃO PREVENTIVA. "+
    "PRECISA CONTER NO FECHAMENTO DA O.S: FOTO DO SINAL DO T.A, SINAL DA CASA E FOTO DA ONU.*";

    textoLocal = localMk5;

    telefone = '\n' + montarTelefoneContato(telefoneMk5, modoContato5) + '\n' + refMk5 + '\n';
    textoComFormatacaoPropria = true;
    textoGerado = textoIntro.toUpperCase() + limitarTexto(texto.toUpperCase(), 64) + '\n' + telefone.toUpperCase() + textoLocal;

  }

  //TV COM DEFEITO
  if (problema === 'tvDefeito') {
    const infosTv = [
      planoTv ? `PLANO: ${planoTv}` : null,
      roteadorTv ? `MODELO DO ROTEADOR: ${roteadorTv}` : null,
      macTv ? `MAC DA ONU: ${macTv}` : null,
      (sinalRXTv || sinalTXTv) ? `SINAL RX: ${sinalRXTv} | SINAL TX: ${sinalTXTv}` : null
    ].filter(Boolean).join('\n');

    textoIntro = regiaoMk4 + " - TV COM DEFEITO" + (obterTipoLocal('tvDefeito') ? " - " + obterTipoLocal('tvDefeito') : "") + '\n' + "(" + horarioMk4 + ")" + '\n\n' +
      "TRATADO COM: " + solicitanteMk4 + ',' + '\n' +
      (infosTv ? infosTv + '\n' : '') + '\n';
    texto = "CLIENTE ESTÁ COM PROBLEMAS NA TV. ";

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
      texto += "";
    }

    //CABEAMENTO
    if (problema === 'cabeamento') {
      textoIntro = regiaoMk7 + " - CABEAMENTO" + '\n' + "(" + horarioMk7 + ")" + '\n' + '\n' + "TRATADO COM: " + solicitanteMk7 + '\n' + '\n';
      textoLocal = localMk7;

      if (metragemMk) {
        texto += '\n' + '\n' + `EM TORNO DE: ` + metragemMk + '.';
      }

      if (pagamentoMk) {
        texto += '\n' + '\n' + `Será pago no: ` + pagamento + '.';
      }
      texto += extras7;


      telefone = '\n' + montarTelefoneContato(telefoneMk7, modoContato7) + '\n' + '\n' + refMk7 + '\n';
      textoGerado = textoIntro.toUpperCase() + texto.toUpperCase() + '\n' + telefone.toUpperCase() + textoLocal;
    }

    texto += extras4;
    telefone = '\n' + montarTelefoneContato(telefoneMk4, modoContato4) + '\n' + refMk4;
    textoLocal = localMk4;
    textoComFormatacaoPropria = true;
    textoGerado = textoIntro.toUpperCase() + limitarTexto(texto.toUpperCase(), 64) + '\n' + telefone.toUpperCase() + '\n' + textoLocal;

  }
  //INSTALACAO
  // Função para pegar os valores dos checkboxes marcados
  function obterCheckBoxesMarcados() {
    let checkboxes = document.querySelectorAll('.clienteCiente');
    let valoresMarcados = [];

    checkboxes.forEach(function (checkbox) {
      if (checkbox.checked) {
        valoresMarcados.push(checkbox.value); // Adiciona o valor ao array
      }
    });

    return valoresMarcados;
  }

  if (problema === 'instalacao') {

    texto = nomeAtendente + " - FIBRA " + planoCliente + " - " + "INSTA " +
      cobrancaInstalacao + " + " + tipoRoteador + " + " + "\n" + appsCortesia + " + " +
      "Metragem de Cabeamento Disponível: " + metragemCabos + '\n'
      + "VENC:" + vencimentoFatura + '\n' + "FIAÇÃO:" + fiacao + "\n" + "\n";

    let checkboxesMarcados = obterCheckBoxesMarcados();
    if (checkboxesMarcados.length > 0) {
      texto += "**" + checkboxesMarcados.join(" / ") + "**" + '\n'; // Adicionando espaçamento correto
    }

    texto += "**CONTRATO " + contrato + "**" + '\n';

    telefone = '\n' + "CONTATO: " + montarTelefoneContato(telefoneMkComercial, modoContatoComercial) + '\n' + '\n' + refMkComercial + '\n';
    textoLocal = localMkComercial;

    textoGerado = texto.toUpperCase() + telefone.toUpperCase() + textoLocal;
  }

  //CABEAMENTO
  if (problema === 'cabeamento') {

    const cienteMk = document.getElementById("ciente").checked
      ? document.getElementById("ciente").value
      : "";

    textoIntro = regiaoMk7 + " - CABEAMENTO" + '\n' + "(" + horarioMk7 + ")" + '\n' + '\n' + "TRATADO COM: " + solicitanteMk7 + '\n' + '\n';
    textoLocal = localMk7;

    if (cabearOq) {
      texto += cabearOq;
    }

    if (metragemMk) {
      texto += '\n' + `EM TORNO DE: ` + metragemMk + '.';
    }

    if (cienteMk) {
      texto += '\n' + cienteMk + " - COBRAR 3,00 O METRO DO CABO  + 50,00 A HORA TÉCNICA. " + '\n';
    }


    if (pagamentoMk) {
      texto += '\n' + pagamentoMk + '.' + '\n';
    }

    if (extras7) {
      texto += '\n' + ">> " + extras7 + '.';
    }

    telefone = '\n' + montarTelefoneContato(telefoneMk7, modoContato7) + '\n' + '\n' + refMk7 + '\n';
    textoGerado = textoIntro.toUpperCase() + texto.toUpperCase() + '\n' + telefone.toUpperCase() + textoLocal;
  }

  function obterValorElemento(elementoId) {
    var elemento = document.getElementById(elementoId);

    // Verifique se o elemento existe
    if (elemento) {
      return elemento.value; // Só tenta acessar o valor se o elemento for encontrado
    } else {
      console.error('Elemento com id ' + elementoId + ' não encontrado.');
      return ''; // Retorna um valor padrão ou vazio se o elemento não for encontrado
    }
  }

  // Aplica o mesmo limite de 64 caracteres por linha a todos os modelos de O.S.,
  // preservando as quebras de linha que já foram definidas em cada modelo.
  const textoLimitado = limitarTextoComQuebras(textoGerado, 64);

  // Atualiza o elemento de texto com o resultado
  document.getElementById('textoGerado').textContent = textoLimitado;
  const avisoConferencia = document.getElementById('avisoConferenciaOS');
  if (avisoConferencia) avisoConferencia.classList.remove('hidden');

  // Mostra o botão de copiar texto
  const botaoCopiarTexto = document.getElementById('copiarTextoo');
  botaoCopiarTexto.classList.remove('hidden');
  console.log("Texto gerado:", textoGerado);
}

function adicionarEventoProblema() {
  if (!problemaSelect) {
    console.error('Campo #problemaSelect não encontrado no HTML.');
    return;
  }
  problemaSelect.addEventListener('change', function () {
    // Oculta todas as opções
    esconderElemento(opcoesSemInternet);
    esconderElemento(opcoesPersonalizavel);
    // Esconde os leds
    let checkbox = document.querySelectorAll('.leds');
    checkbox.forEach(function (checkbox) {
      esconderElemento(checkbox);
    });

    // Esconde os checkboxes da instalação
    let checkboxes = document.querySelectorAll('.clienteCiente');
    checkboxes.forEach(function (checkbox) {
      esconderElemento(checkbox);
    });
    esconderElemento(extrasc);
    esconderElemento(opcoesInternetLenta);
    esconderElemento(opcoesInternetCaindo);
    esconderElemento(opcoesSinalAlto);
    esconderElemento(opcoesTvDefeito);
    esconderElemento(opcoesInstalacao);
    esconderElemento(extraInstalacaoFibra);
    esconderElemento(opcoesCabeamento);

    // Verifica o problema selecionado e mostra as opções correspondentes
    if (problemaSelect.value === 'semInternet') {
      mostrarElemento(opcoesSemInternet);
      mostrarElemento(regiaoMk);
      mostrarElemento(horarioMk);
      mostrarElemento(solicitanteMk);
      mostrarElemento(divplano);
      mostrarElemento(divroteador);
      mostrarElemento(divmac);
      mostrarElemento(divsinal);
      mostrarElemento(divsinaltx);
      // Aqui, encontramos todos os checkbox e mostramos cada um deles individualmente
      document.querySelectorAll('.leds').forEach(mostrarElemento);

      mostrarElemento(extrasc);
      mostrarElemento(telefoneMk);


      mostrarElemento(refMk);
      mostrarElemento(localMk);
      
    } else if (problemaSelect.value === 'personalization') {
      mostrarElemento(opcoesPersonalizavel);
      mostrarElemento(regiaoMk6);
      mostrarElemento(horarioMk6);
      mostrarElemento(solicitanteMk6)
      mostrarElemento(divplano2);
      mostrarElemento(divroteador2);
      mostrarElemento(divmac2);
      mostrarElemento(divsinal2);
      mostrarElemento(divsinaltx2);
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
      mostrarElemento(dispositivosDiv);
      mostrarElemento(tvCabeada);
      mostrarElemento(planoLentaDiv);
      mostrarElemento(roteadorLentaDiv);
      mostrarElemento(macLentaDiv);
      mostrarElemento(sinalRXLentaDiv);
      mostrarElemento(sinalTXLentaDiv);
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
      mostrarElemento(quedas);
      mostrarElemento(dispositivosDiv1);
      mostrarElemento(planoCaindoDiv);
      mostrarElemento(roteadorCaindoDiv);
      mostrarElemento(macCaindoDiv);
      mostrarElemento(sinalRXCaindoDiv);
      mostrarElemento(sinalTXCaindoDiv);
      mostrarElemento(extrasc3);
      mostrarElemento(telefoneMk3);
      mostrarElemento(refMk3);
      mostrarElemento(localMk3);

    } else if (problemaSelect.value === 'sinalAlto') {
      mostrarElemento(opcoesSinalAlto);
      mostrarElemento(regiaoMk5);
      mostrarElemento(horarioMk5);
      mostrarElemento(solicitanteMk5)
      mostrarElemento(quedas5);
      mostrarElemento(planoSinalAltoDiv);
      mostrarElemento(roteadorSinalAltoDiv);
      mostrarElemento(macSinalAltoDiv);
      mostrarElemento(sinalRXSinalAltoDiv);
      mostrarElemento(sinalTXSinalAltoDiv);
      mostrarElemento(extrasc5);
      mostrarElemento(telefoneMk5);
      mostrarElemento(refMk5);
      mostrarElemento(localMk5);

    } else if (problemaSelect.value === 'tvDefeito') {
      mostrarElemento(opcoesTvDefeito);
      mostrarElemento(regiaoMk4);
      mostrarElemento(horarioMk4);
      mostrarElemento(solicitanteMk4);
      mostrarElemento(planoTvDiv);
      mostrarElemento(roteadorTvDiv);
      mostrarElemento(macTvDiv);
      mostrarElemento(sinalRXTvDiv);
      mostrarElemento(sinalTXTvDiv);
      mostrarElemento(procedimentoCompletoTv4);
      mostrarElemento(conectadoCabo4);
      mostrarElemento(minimiza);
      mostrarElemento(extrasc4);
      mostrarElemento(telefoneMk4);
      mostrarElemento(refMk4);
      mostrarElemento(localMk4);

    } else if (problemaSelect.value === 'cabeamento') {
      mostrarElemento(opcoesCabeamento);
      mostrarElemento(regiaoMk7);
      mostrarElemento(horarioMk7);
      mostrarElemento(solicitanteMk7)
      mostrarElemento(cabearOq);
      mostrarElemento(metragemMk);
      mostrarElemento(cienteMk);
      mostrarElemento(pagamentoMk);
      mostrarElemento(extrasc7);
      mostrarElemento(telefoneMk7);
      mostrarElemento(refMk7);
      mostrarElemento(localMk7);

    } else if (problemaSelect.value === 'instalacao') {
      mostrarElemento(opcoesInstalacao);
      mostrarElemento(extraInstalacaoFibra);
      mostrarElemento(nomeAtendente);
      mostrarElemento(planoCliente);
      mostrarElemento(cobrancaInstalacao);
      mostrarElemento(tipoRoteador);
      mostrarElemento(appsCortesia);
      mostrarElemento(metragemCabos);
      mostrarElemento(vencimentoFatura);
      mostrarElemento(fiacao);
      // Aqui, encontramos todos os checkboxes e mostramos cada um deles individualmente
      let checkboxes = document.querySelectorAll('.clienteCiente');
      checkboxes.forEach(function (checkbox) {
        mostrarElemento(checkbox); // Agora, mostramos o próprio elemento checkbox
      });
      mostrarElemento(contrato);
      mostrarElemento(telefoneComercial);
      mostrarElemento(refComercial);
      mostrarElemento(localComercial);
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  problemaSelect = document.getElementById('problemaSelect');
  problemaSelect2 = document.getElementById('problemaSelect2');
  adicionarEventoProblema();
  configurarProblemaSelect2();
  configurarCopiarAtendimento();

  // Adiciona o evento de clique para copiar o texto gerado
  const botaoCopiarTexto = document.getElementById('copiarTextoo');
  if (botaoCopiarTexto) botaoCopiarTexto.addEventListener('click', function () {
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
    alert('Texto copiado: ' + '\n' + textoGerado);
  });
});


// GERADOR DE ATENDIMENTO

let problemaSelect2 = null;

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
  const elemento = document.getElementById(id);
  return elemento ? elemento.value : '';
}
// PERSONALIZAVEL

function gerarA() {

  const problema2 = problemaSelect2.value;

  let textoGerado2 = "";

  // PERSONALIZAVEL
  if (problema2 === 'personalizationA') {

    const cliente = obterValorElemento2('cliente');
    const contato = obterValorElemento2('contatos');
    const origem2 = obterValorElemento2('origem2');
    const relato = obterValorElemento2('relatos');
    const plano = obterValorElemento2('planos');
    const alteracoes = obterValorElemento2('alteracoesr');
    const extrasate = obterValorElemento2('extrasatendimento');

    const textoComeco =
      "Tratado com: " + cliente + '.' + '\n' +
      "Telefone: " + contato + ' - ' + origem2 + "." + '\n\n' +
      "Plano, roteador, MAC e sinal: " + plano + '.' + '\n';

    const textomeio =
      "Relato: " + relato + '.' + '\n\n' +
      "Alterações realizadas: " + alteracoes + '.' + '\n';

    const textoadd =
      extrasate ? "Informações importantes: " + extrasate + '.' : "";

    textoGerado2 = (
      textoComeco +
      '\n' +
      textomeio +
      '\n' +
      textoadd
    ).toUpperCase();
  }

  // MPC
  else if (problema2 === 'mpc') {

    const cadastro = obterValorElemento2('cadastro');
    const celular = obterValorElemento2('celular');
    const origem = obterValorElemento2('origem');
    const infocadastro = obterValorElemento2('infocadastro');
    const relatocliente = obterValorElemento2('relatocliente');
    const desfecho = obterValorElemento2('desfecho');
    const plus = obterValorElemento2('plus');

    const motivosSelecionados = document.querySelectorAll('.motivompc:checked');

    let motivos = [];

    motivosSelecionados.forEach(function (motivo) {
      motivos.push(motivo.value);
    });

    const textoComeco =
      "Cadastro: " + cadastro + '.' + '\n' +
      "Telefone: " + celular + '.' + origem + '.' + '\n';

    const textoMotivo =
      "Motivo: *" + motivos.join(' ') + "*" + '\n\n';

    const textoMeio =
      "Plano, roteador, MAC e sinal: " + infocadastro + '.' + '\n\n' +
      "Relato: " + relatocliente + '.' + '\n';

    const textoFim =
      "Desfecho: " + desfecho + '.';

    const textoAdd =
      plus ? '\n\nInformações importantes: ' + plus + '.' : '';

    textoGerado2 = (
      textoComeco +
      '\n' +
      textoMotivo +
      textoMeio +
      '\n' +
      textoFim +
      textoAdd);
  }
  // PÓS - CHAMADO
  else if (problema2 === 'poschamado') {

    const cadastro2 = obterValorElemento2('cadastro2');
    const celular2 = obterValorElemento2('celular2');
    const origem3 = obterValorElemento2('origem3');
    const dataultimavisita = obterValorElemento2('dataultimavisita');
    const motivodavisita = obterValorElemento2('motivodavisita');
    const tecnico = obterValorElemento2('tecnico');
    const situacao = obterValorElemento2('situacao');
    const relatocliente2 = obterValorElemento2('relatocliente2');
    const plus2 = obterValorElemento2('plus2');

    //data da ultima visita formatação dia/mes/ano
    const data = document.getElementById('dataultimavisita').value;

    const dataFormatada = data
      ? data.split('-').reverse().join('-')
      : '';

    const textoComeco =
      "*Nome do cadastro:* " + cadastro2 + '.' + '\n' +
      "*Telefone do cliente:* " + celular2 + ' - ' + origem3 + "." + '\n\n' +
      "*Data da última visita:*  " + dataFormatada + '.' + '\n' +
      "*Motivo da abertura da O.S.:* " + motivodavisita + '.' + '\n';

    const textomeio =
      "*Técnico responsável na visita:* " + tecnico + '.' + '\n\n' +
      "*Situação:* " + situacao + '.' + '\n' +
      "*Relato:* " + relatocliente2 + '.' + '\n';

    const textoadd =
      plus2 ? "*Informações extras:* " + plus2 + '.' : "";

    textoGerado2 = (
      textoComeco +
      '\n' +
      textomeio +
      '\n' +
      textoadd
    );
  };

  const botaoCopiar = document.getElementById('copiarA');
  if (botaoCopiar) botaoCopiar.classList.remove('hidden');
  const campoAtendimento = document.getElementById('atendimento');
  if (campoAtendimento) campoAtendimento.textContent = textoGerado2;
}

function configurarProblemaSelect2() {
  if (!problemaSelect2) {
    console.error('Campo #problemaSelect2 não encontrado no HTML.');
    return;
  }
  problemaSelect2.addEventListener('change', function () {

  const problema = this.value;

  // Esconde tudo primeiro
  document.querySelectorAll('#formulario1 .opcoes').forEach(el => {
    el.classList.add('hidden');
  });

  if (problema === 'personalizationA') {

    document.getElementById('opcoesPersonalizavel1').classList.remove('hidden');
    document.getElementById('clientes').classList.remove('hidden');
    document.getElementById('contato').classList.remove('hidden');
    document.getElementById('divorigem2').classList.remove('hidden');
    document.getElementById('plano').classList.remove('hidden');
    document.getElementById('relato').classList.remove('hidden');
    document.getElementById('alteracoes').classList.remove('hidden');
    document.getElementById('extrasate').classList.remove('hidden');

  } else if (problema === 'mpc') {

    document.getElementById('opcoesmpc').classList.remove('hidden');
    document.getElementById('cadastros').classList.remove('hidden');
    document.getElementById('divcelular').classList.remove('hidden');
    document.getElementById('divorigem').classList.remove('hidden');
    document.getElementById('divinfocadastro').classList.remove('hidden');
    document.getElementById('divrelatocliente').classList.remove('hidden');
    document.getElementById('divdesfecho').classList.remove('hidden');
    document.getElementById('divplus').classList.remove('hidden');

  } else if (problema === 'poschamado') {

    document.getElementById('opcoespos').classList.remove('hidden');
    document.getElementById('cadastros2').classList.remove('hidden');
    document.getElementById('divcelular2').classList.remove('hidden');
    document.getElementById('divorigem3').classList.remove('hidden');
    document.getElementById('divdataultimavisita').classList.remove('hidden');
    document.getElementById('divmotivodavisita').classList.remove('hidden');
    document.getElementById('divtecnico').classList.remove('hidden');
    document.getElementById('divsituacao').classList.remove('hidden');
    document.getElementById('divrelatocliente2').classList.remove('hidden');
    document.getElementById('divplus2').classList.remove('hidden');
  }
  });
}

function configurarCopiarAtendimento() {
  const botaoCopiarAtendimento = document.getElementById('copiarA');
  if (!botaoCopiarAtendimento) {
    console.error('Botão #copiarA não encontrado no HTML.');
    return;
  }
  botaoCopiarAtendimento.addEventListener('click', function () {
  const texto = document.getElementById('atendimento').textContent;

  navigator.clipboard.writeText(texto)
    .then(() => {
      alert('Texto copiado!');
    })
    .catch(err => {
      console.error('Erro ao copiar:', err);
    });
  });
}


function aplicarTema(modoEscuro) {
    document.body.classList.toggle("modo-escuro", modoEscuro);

    const botao = document.getElementById("botaoTema");

    if (botao) {
        botao.textContent = modoEscuro
            ? "☀️ Modo claro"
            : "🌙 Modo escuro";
    }
}

function alternarTema() {
    const modoEscuro =
        !document.body.classList.contains("modo-escuro");

    aplicarTema(modoEscuro);

    localStorage.setItem(
        "temaHelpDesk",
        modoEscuro ? "escuro" : "claro"
    );
}

document.addEventListener("DOMContentLoaded", function () {
    const temaSalvo = localStorage.getItem("temaHelpDesk");

    aplicarTema(temaSalvo === "escuro");
});
