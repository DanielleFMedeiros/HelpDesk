// GERADOR DE ATENDIMENTO

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

// PERSONALIZAVEL

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

    const textoComeco =
      "Tratado com: " + cliente + '.' + '\n' +
      "Telefone: " + contato + '.' + '\n' +
      "Plano, roteador e sinal: " + plano + '.' + '\n';

    const textomeio =
      "Relato: " + relato + '\n\n' +
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

  document.getElementById('copiarA').classList.remove('hidden');
  document.getElementById('atendimento').textContent = textoGerado2;
}

// MPC

function gerarMpc() {

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

  let textoGeradoMpc = "";

  if (problemaSelect2.value === 'mpc') {

    const textoComeco =
      "Cadastro: " + cadastro + '.' + '\n' +
      "Telefone: " + celular + '.' + '\n' +
      "Origem do contato: " + origem + '.' + '\n';

    const textoMotivo =
      "Motivo: " + motivos.join(' ') + '\n\n';

    const textoMeio =
      "Plano, roteador e sinal: " + infocadastro + '.' + '\n' +
      "Relato: " + relatocliente + '.' + '\n\n';

    const textoFim =
      "Desfecho: " + desfecho + '.';

    const textoAdd =
      plus ? '\n\nInformações importantes: ' + plus + '.' : '';

    textoGeradoMpc = (
      textoComeco +
      '\n' +
      textoMotivo +
      textoMeio +
      '\n' +
      textoFim +
      textoAdd
    ).toUpperCase();
  }

  document.getElementById('copiarMpc').classList.remove('hidden');
  document.getElementById('atendimentompc').textContent = textoGeradoMpc;
}

// EXIBIÇÃO DOS CAMPOS

function adicionarEventoProblema2() {

  problemaSelect2.addEventListener('change', function () {

    esconderElemento2(document.getElementById('opcoesPersonalizavel1'));
    esconderElemento2(document.getElementById('opcoesmpc'));

    if (problemaSelect2.value === 'personalizationA') {

      mostrarElemento2(document.getElementById('opcoesPersonalizavel1'));
      mostrarElemento2(document.getElementById('clientes'));
      mostrarElemento2(document.getElementById('contato'));
      mostrarElemento2(document.getElementById('plano'));
      mostrarElemento2(document.getElementById('relato'));
      mostrarElemento2(document.getElementById('alteracoes'));
      mostrarElemento2(document.getElementById('extrasate'));
    }

    if (problemaSelect2.value === 'mpc') {

      mostrarElemento2(document.getElementById('opcoesmpc'));
      mostrarElemento2(document.getElementById('cadastros'));
      mostrarElemento2(document.getElementById('divcelular'));
      mostrarElemento2(document.getElementById('divorigem'));
      mostrarElemento2(document.getElementById('divinfocadastro'));
      mostrarElemento2(document.getElementById('divrelatocliente'));
      mostrarElemento2(document.getElementById('divdesfecho'));
      mostrarElemento2(document.getElementById('divplus'));
    }

  });

}

// INICIALIZAÇÃO

document.addEventListener('DOMContentLoaded', function () {

  adicionarEventoProblema2();

  // Copiar PERSONALIZAVEL
  document.getElementById('copiarA').addEventListener('click', function () {

    const textoGerado = document.getElementById('atendimento').textContent;

    const tempInput = document.createElement('textarea');
    tempInput.value = textoGerado;

    document.body.appendChild(tempInput);

    tempInput.select();
    tempInput.setSelectionRange(0, 99999);

    document.execCommand('copy');

    document.body.removeChild(tempInput);

    alert('Texto copiado:\n' + textoGerado);
  });

  // Copiar MPC
  document.getElementById('copiarMpc').addEventListener('click', function () {

    const textoGerado = document.getElementById('atendimentompc').textContent;

    const tempInput = document.createElement('textarea');
    tempInput.value = textoGerado;

    document.body.appendChild(tempInput);

    tempInput.select();
    tempInput.setSelectionRange(0, 99999);

    document.execCommand('copy');

    document.body.removeChild(tempInput);

    alert('Texto copiado:\n' + textoGerado);
  });

});
