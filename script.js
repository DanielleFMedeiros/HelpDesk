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
    var nomeFormatado = nomeOriginal.replace(/ /g, '_');
    document.getElementById("nomeResultado").innerText = nomeFormatado;
  }
  
  function copiarResultadoNome() {
    let resultadoNome = document.getElementById("nomeResultado").textContent;
    copiarParaAreaTransferencia(resultadoNome);
  }
  
  
  function verificarMac() {
  <<<<<<< HEAD:HelpDesk/script.js
    var macAddress = document.getElementById("macInput").value;
    var apiUrl = "/api/verificarMac.php?mac_address=" + encodeURIComponent(macAddress);
  
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                document.getElementById("resultado").innerText = "Fornecedor: " + xhr.responseText;
            } else {
                document.getElementById("resultado").innerText = "Erro ao verificar o MAC.";
            }
        }
    };
  
    xhr.open("GET", apiUrl, true);
    xhr.send();
  }
  
  
  
  =======
      // Atribuir um valor diretamente para teste
      let macAddress = "00:11:22:33:44:55";
  
      // Verificar se o valor está vazio
      if (macAddress.trim() === "") {
          console.log("Endereço MAC vazio.");
          return;
      }
  
      // Exibir o valor do input no elemento com id "resultado"
      document.getElementById("resultado").innerText = macAddress;
  
      // Construir a URL da solicitação
      var url = "https://help-desk-eta.vercel.app/api/verificar-mac/" + encodeURIComponent(macAddress);
      console.log('URL da solicitação:', url);
  
      // Enviar a solicitação à API
      fetch(url, {
          method: 'GET',
          mode: 'cors'
      })
      .then(response => {
          console.log('Status da resposta:', response.status);
          if (response.ok) {
              return response.text();
          } else {
              throw new Error(response.status);
          }
      })
      .then(data => {
          console.log('Resposta da API (Vendor):', data);
          if (data === "404") {
              document.getElementById("resultado").innerText = "Vendor não encontrado para o endereço MAC " + macAddress + ".";
          } else {
              document.getElementById("resultado").innerText = "Vendor: " + data;
          }
      })
      .catch(error => {
          console.error('Erro na solicitação à API:', error);
          document.getElementById("resultado").innerText = "Erro na solicitação à API.";
      });
  }
  
  
  >>>>>>> a7b24640584fdc16dc037cab5caa6b15e69d52fd:script.js
  //LOCALIZAÇÃO
  function formatarLocalizacao() {
    let localizacaoEntrada = document.getElementById("localizacaoInput").value;
  
    // Remove letras, espaços e vírgulas da entrada usando expressão regular
    let numeros = localizacaoEntrada.match(/-?\d+\.\d+/g);
  
    if (numeros && numeros.length >= 2) {
      let localizacaoFormatada = "https://maps.google.com/?q=" + numeros.join(',');
      document.getElementById("localizacaoFormatada").textContent = localizacaoFormatada;
  
      // Adiciona "https://maps.google.com/?q=" na frente para gerar o link
      let linkMapa = "https://maps.google.com/?q=" + localizacaoFormatada;
      document.getElementById("localizacaoFormatada").setAttribute("data-link-mapa", linkMapa);
    } else {
      document.getElementById("localizacaoFormatada").textContent = "Localização inválida.";
    }
  }
  
  function copiarResultado() {
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
  
    // Exibe uma mensagem informando que o link foi copiado
    alert("Link do mapa copiado para a área de transferência:\n" + resultado);
  }
  
  function gerarLinkMapa(coordenadas) {
    // Gera o link do mapa com as coordenadas
    let linkMapa = "https://www.google.com/maps?q=" + coordenadas.join(',');
  
    // Atualiza o atributo href do elemento de link
    document.getElementById("linkMapa").setAttribute("href", linkMapa);
  }
  function copiarResultado() {
    let resultado = document.getElementById("localizacaoFormatada").textContent;
  
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
  
    // Limpa o campo de entrada da localização
    document.getElementById("localizacaoInput").value = "";
  
    // Limpa o resultado formatado
    document.getElementById("localizacaoFormatada").textContent = "";
  
    alert("Localização formatada copiada para a área de transferência: " + resultado);
  }
  
  function gerarLinkMapa(coordenadas) {
    // Gera o link do mapa com as coordenadas
    let linkMapa = "https://www.google.com/maps?q=" + coordenadas.join(',');
  
    // Atualiza o atributo href do elemento de link
    document.getElementById("linkMapa").setAttribute("href", linkMapa);
  }
  function copiarResultado() {
    let resultado = document.getElementById("localizacaoFormatada").textContent;
  
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
  
    // Limpa o campo de entrada da localização
    document.getElementById("localizacaoInput").value = "";
  
    // Limpa o resultado formatado
    document.getElementById("localizacaoFormatada").textContent = "";
  
    alert("Localização formatada copiada para a área de transferência: " + resultado);
  }
  
  /* iframe 
  function gerarELink() {
    let coordenadasEntrada = document.getElementById("coordenadasInput").value;
  
    // Extrai as coordenadas de latitude e longitude usando expressão regular
    let matches = coordenadasEntrada.match(/-?\d+\.\d+/g);
  
    if (matches && matches.length >= 2) {
      let lat = matches[0];
      let lng = matches[1];
      let link = `https://maps.app.goo.gl/${lat},${lng}`;
  
      // Exibe o link formatado
      document.getElementById("linkFormatado").textContent = `Link formatado: ${link}`;
  
      // Atualiza o valor do atributo data-clipboard-text para o valor do link
      document.getElementById("linkFormatado").setAttribute("data-clipboard-text", link);
  
      // Torna o botão de copiar visível
      document.getElementById("botaoCopiarLink").style.display = "inline-block";
    } else {
      document.getElementById("linkFormatado").textContent = "Coordenadas inválidas.";
  
      // Oculta o botão de copiar se as coordenadas forem inválidas
      document.getElementById("botaoCopiarLink").style.display = "none";
    }
  }
  function gerarIFrame() {
    let coordenadasEntrada = document.getElementById("coordenadasInput").value;
  
    // Extrai os valores de latitude e longitude usando expressões regulares
    let match = coordenadasEntrada.match(/Lat:\s*(-?\d+\.\d+),\s*Long:\s*(-?\d+\.\d+)/);
  
    if (match) {
      let lat = parseFloat(match[1]);
      let lng = parseFloat(match[2]);
  
      // Cria o elemento iframe
      let iframe = document.createElement("iframe");
      iframe.setAttribute("src", `https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d13903.137096218743!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDM4JzAxLjMiUyA1MMKwMDMnNDkuNiJX!5e1!3m2!1spt-BR!2sbr!4v1698898368309!5m2!1spt-BR!2sbr`);
      iframe.setAttribute("width", "600");
      iframe.setAttribute("height", "450");
      iframe.setAttribute("style", "border:0;");
      iframe.setAttribute("allowfullscreen", "");
      iframe.setAttribute("loading", "lazy");
      iframe.setAttribute("referrerpolicy", "no-referrer-when-downgrade");
  
      // Substitua o conteúdo existente do elemento "mapa" pelo novo iframe
      let mapaDiv = document.getElementById("mapa");
      mapaDiv.innerHTML = "";
      mapaDiv.appendChild(iframe);
    } else {
      alert("Coordenadas inválidas. Certifique-se de usar o formato 'Lat: -28.7134130, Long: -49.054707'.");
    }
  }*/
  
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
        texto += "CLIENTE JÁ REALIZOU O PROCEDIMENTO COMPLETO. ";
      } else if (procedimentoCompleto === 'nao') {
        texto += "CLIENTE NÃO REALIZOU O PROCEDIMENTO COMPLETO. ";
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
      texto += extras6;
  
      telefone = '\n' + telefoneMk6 + '\n' + refMk6 + '\n';
      textoGerado = textoIntro.toUpperCase() + texto.toUpperCase() + '\n' + telefone.toUpperCase() + textoLocal;
    }
  
    //INTERNET LENTA
    if (problema === 'internetLenta') {
      textoIntro = regiaoMk2 + " - INTERNET LENTA" + '\n' + "(" + horarioMk2 + ")" + '\n' + '\n' + "SOLICITANTE: " + solicitanteMk2 + '\n' + '\n';
      texto = "CLIENTE ESTÁ COM INTERNET LENTA. ";
  
      if (procedimentoCompletoLento === 'nao') {
        texto += "NÃO REALIZOU O PROCEDIMENTO COMPLETO. ";
      } else if (procedimentoCompletoLento === 'sim') {
        texto += "REALIZOU O PROCEDIMENTO COMPLETO. ";
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
        texto += "NÃO REALIZOU O PROCEDIMENTO COMPLETO. ";
      } else if (procedimentoCompletoCaindo === 'sim') {
        texto += "REALIZOU O PROCEDIMENTO COMPLETO. ";
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
        texto += "NÃO REALIZOU O PROCEDIMENTO COMPLETO. ";
      } else if (procedimentoCompletoTv4 === 'sim') {
        texto += "REALIZOU O PROCEDIMENTO COMPLETO. ";
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
      alert('Texto copiado para a área de transferência: ' + textoGerado);
    });
  });
  