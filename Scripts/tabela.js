document.addEventListener(
    'DOMContentLoaded', function () {

        //Recuperando os valores de dentro do LocalStorage
        const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
        const corpoTabela = document.getElementById('corpoTabelaProdutos');

        // Limpa o corpo da tabela 
        corpoTabela.innerHTML = '';

        //Adicionando os iten na tabela
        produtos.forEach((produto, index) => {
            //cria uma nova linha com createElement
            const linha = document.createElement('tr');
            //Adicionando elementos criados no formulário à tabela
            //produto. é o nome do objeto criado no cadastroProduto.js
            //este objeto está sendo salvo no LocalStorage 
            linha.innerHTML = `
            <td>${produto.codigo}</td>
            <td class="desc">${produto.descricao}</td>
            <td class="estoque">${produto.estoque}</td>
            <td>R$ ${produto.valor}</td>
            <td>${produto.categoria}</td>
            <td>
                <button class="btn p-0 btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Escolha
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item editar" href="#">Editar</a></li>
                    <li><a class="dropdown-item excluir" href="#">Excluir</a></li>
                    <li><a class="dropdown-item vender" href="#">Vender</a></li>
                    <li><a class="dropdown-item comprar" href="#">Comprar</a></li>
                </ul>
            </td>
        `;
            // Para identificar o produto
            linha.dataset.index = index;
            corpoTabela.appendChild(linha);
        });

        // Delegação de eventos para os botões da tabela
        //coloca um listener dentro do corpo da tabela para mapear qualquer click 
        //que ocorra
        corpoTabela.addEventListener('click', function (e) {
            //quando houver um click o target.closest vai pegar a linha mais próxima
            //ou seja a própria linha
            const linha = e.target.closest('tr');
            const index = linha ? linha.dataset.index : null;
            if (!index) return;

            // botão Editar
            //primeiro testa se o botão clicado contem a classe 'editar'
            if (e.target.classList.contains('editar')) {
                //abre um prmpt para adicionar a nova descrição
                //produtos[na posição escolhida] altera descrição
                const novaDesc = prompt('Nova descrição:', produtos[index].descricao);
                //se houver uma descrição
                if (novaDesc !== null) {
                    //produto[na posição escolhida] recebe a nova descrição
                    produtos[index].descricao = novaDesc;
                    //atualiza o LocalStorage
                    localStorage.setItem('produtos', JSON.stringify(produtos));
                    //faz com que a nova descrição apareça na tebela
                    linha.querySelector('.desc').textContent = novaDesc;
                }
            }

            // Excluir
            if (e.target.classList.contains('excluir')) {
                if (confirm('Deseja excluir este produto?')) {
                    produtos.splice(index, 1);
                    localStorage.setItem('produtos', JSON.stringify(produtos));
                    linha.remove();
                }
            }

            // Vender
            if (e.target.classList.contains('vender')) {
                //contante qtd armazena uma quantidade a ser vendida valor iniciar será 1 
                // e ..., 10) significa que o numero terá base decimal  
                //parseInt converte pois o valor do LocalStoragem é uma string
                const qtd = parseInt(prompt('Quantidade a vender:', 1), 0);

                //realiza 3 testes:
                //se qtd é um numero && 
                // se qtd é maior que 0 &&
                //se o estoque do produto é maior ou igual a quantidade vendida
                if (!isNaN(qtd) && qtd > 0 && produtos[index].estoque >= qtd) {
                    //se os 3 forem verdadeiros, o estoque é atualizado para estoque -qtd
                    produtos[index].estoque -= qtd;

                    //atualiza o localStorage
                    localStorage.setItem('produtos', JSON.stringify(produtos));
                    linha.querySelector('.estoque').textContent = produtos[index].estoque;
                } else {
                    //avisa caso algum if seja falso
                    alert('Quantidade inválida ou estoque insuficiente.');
                }
            }

            // Comprar
            if (e.target.classList.contains('comprar')) {
                const qtd = parseInt(prompt('Quantidade a comprar:', 1), 0);
                if (!isNaN(qtd) && qtd > 0) {
        produtos[index].estoque = Number(produtos[index].estoque) + qtd;
                    localStorage.setItem('produtos', JSON.stringify(produtos));
                    linha.querySelector('.estoque').textContent = produtos[index].estoque;
                } else {
                    alert('Quantidade inválida.');
                }
            }
        });
    });