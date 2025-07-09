//Lendo os campos do formulário com EventListner
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formProduto");
  const inputCodigo = document.getElementById("codigo");
  const inputDescricao = document.getElementById("descricao");
  const inputEstoque = document.getElementById("estoque");
  const inputValor = document.getElementById("valor");
  const inputCategoria = document.getElementById("categoria");

  //função para gerar código automático no campo código
  gerarCodigo();

  //trecho de código sugerido pela AI para ter maior controle sobre a página
  // e.preventDefault(); evita que a página sega recarregada por padrão
  form.addEventListener("submit", function (e) {
    e.preventDefault();

//gera um objeto para enviar ao LocalStorage .trim() elimina espaços desnecessários
    const produto = {
      codigo: inputCodigo.value,
      descricao: inputDescricao.value.trim(),
      estoque: inputEstoque.value.trim(),
      valor: inputValor.value.trim(),
      categoria: inputCategoria.value.trim()
    };

    //testa se todos os campos estão preenchidos
    if (!produto.descricao || !produto.estoque || !produto.valor || !produto.categoria) {
      alert("Preencha todos os campos!");
      return;
    }

    //armazena um objeto produtos no local storage enviando os objetos {produto}
    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    produtos.push(produto);
    localStorage.setItem("produtos", JSON.stringify(produtos));

    alert("Produto salvo com sucesso!");
    form.reset();
    gerarCodigo();
  });

  //gera um código automático e de forma sequancial
  function gerarCodigo() {
    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    //teste - se o código for maior que 0 coloca 0 senão pega o produto na posição, -1
    const ultimoCodigo = produtos.length > 0 ? parseInt(produtos[produtos.length - 1].codigo) : 0;
    //adiciona 1 na proxima rodada para que o código seja sempre crescente
    inputCodigo.value = ultimoCodigo + 1;
  }
});

document.getElementById("btnCancelar").addEventListener("click", function () {
  window.location.href = "tabela.html";
});

