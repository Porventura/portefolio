// formulario.js — valida o formulário e envia a mensagem através do serviço Web3Forms

const form = document.getElementById('form-contacto');
const botao = document.getElementById('botaoEnviar');
const avisoTitulo = document.getElementById('avisoTitulo');
const avisoTexto = document.getElementById('avisoTexto');
const toast = new bootstrap.Toast(document.getElementById('aviso'));

// Função pequena para não repetir código: escreve no toast e mostra-o
function mostrarAviso(titulo, texto) {
  avisoTitulo.textContent = titulo;
  avisoTexto.textContent = texto;
  toast.show();
}

// "async" permite usar "await": esperar pela resposta do servidor sem bloquear a página
form.addEventListener('submit', async function (evento) {
  evento.preventDefault(); // não deixa o browser mudar de página; tratamos nós do envio

  // 1) Validação: se alguma regra do HTML falhar, pinta os campos e pára aqui
  if (!form.checkValidity()) {
    form.classList.add('was-validated');
    return;
  }

  // 2) Junta todos os campos do formulário (incluindo os escondidos) num objeto
  const dados = Object.fromEntries(new FormData(form));

  // Enquanto envia, desliga o botão para ninguém carregar duas vezes
  botao.disabled = true;
  botao.textContent = 'A enviar…';

  try {
    // 3) fetch envia os dados para o Web3Forms em formato JSON (método POST)
    const resposta = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(dados)
    });
    const resultado = await resposta.json(); // o servidor responde com { success: true/false, message: ... }

    if (resultado.success) {
      mostrarAviso('Obrigado!', 'Mensagem enviada. Responderei assim que possível.');
      form.reset();
      form.classList.remove('was-validated');
    } else {
      mostrarAviso('Erro', 'Não foi possível enviar a mensagem. Tente novamente mais tarde.');
      console.error(resultado.message); // detalhe técnico só na consola (F12)
    }
  } catch (erro) {
    // catch apanha falhas de rede (sem internet, servidor em baixo…)
    mostrarAviso('Erro', 'Sem ligação ao servidor. Verifique a internet e tente novamente.');
    console.error(erro);
  } finally {
    // finally corre sempre, com sucesso ou erro: volta a ligar o botão
    botao.disabled = false;
    botao.textContent = 'Enviar mensagem';
  }
});
