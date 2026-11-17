// formulario.js — validação do formulário de contacto e aviso (toast)

// Vai buscar os elementos pelo id
const form = document.getElementById('form-contacto');
const toast = new bootstrap.Toast(document.getElementById('aviso')); // cria o toast do Bootstrap

// Esta função corre sempre que se carrega em "Enviar mensagem"
form.addEventListener('submit', function (evento) {
  evento.preventDefault(); // impede o envio: ainda não há servidor para receber a mensagem

  if (form.checkValidity()) {
    // checkValidity() devolve true se TODAS as regras do HTML forem cumpridas
    toast.show();                            // mostra o aviso no canto do ecrã
    form.reset();                            // limpa os campos
    form.classList.remove('was-validated');  // tira as cores verde/vermelho
  } else {
    // was-validated faz o Bootstrap pintar os campos: verde = certo, vermelho = errado
    form.classList.add('was-validated');
  }
});
