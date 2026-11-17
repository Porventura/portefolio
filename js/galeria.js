// galeria.js — abre a imagem clicada em ponto grande dentro do modal

const modalImagem = document.getElementById('modalImagem');
const imagemGrande = document.getElementById('imagemGrande');
const tituloImagem = document.getElementById('tituloImagem');

// 'show.bs.modal' é o evento que o Bootstrap dispara mesmo antes de abrir o modal
modalImagem.addEventListener('show.bs.modal', function (evento) {
  const miniatura = evento.relatedTarget;        // a miniatura em que se clicou
  imagemGrande.src = miniatura.dataset.imagem;   // lê o atributo data-imagem="..."
  imagemGrande.alt = miniatura.alt;              // reaproveita o texto alternativo
  tituloImagem.textContent = miniatura.alt;      // e usa-o também como título do modal
});
