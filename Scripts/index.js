

// Protege o acesso à página
const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

if (!usuario) {
    window.location.href = "techControlLogin.html";
}


//função para confirmar se usuário realmente quer saír do sistema
document.addEventListener('DOMContentLoaded', function () {
    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', function () {
            const confirmar = confirm('Deseja realmente sair do sistema?');
            if (confirmar) {

                // Função de logout
                document.getElementById("btnLogout").addEventListener("click", () => {
                    localStorage.removeItem("usuarioLogado");
                });

                window.location.href = "techControlLogin.html";

            }
        });
    }

    // Atualização dinamica de valores

    //Bucando o objeto dentro do localStorage
    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

    // Soma o estoque de todos os produtos
    let estoqueTotal = 0;
    if (Array.isArray(produtos)) {
        estoqueTotal = produtos.reduce((total, prod) => total + Number(prod.estoque || 0), 0);
    } else if (produtos.estoque) {
        estoqueTotal = Number(produtos.estoque);
    }

    document.getElementById("estoque").textContent = estoqueTotal;

    //soma a quantidade de itens cadastrados
    let quantidade = 0;

    if (Array.isArray(produtos)) {
        quantidade = produtos.length;
    } else if (produtos && typeof produtos === "object") {
        quantidade = 1;
    }

    document.getElementById("qntdProdutos").textContent = quantidade;

 // Mostra o valor total do estoque (valor * estoque de cada produto)
    let valorTotal = 0;
    if (Array.isArray(produtos)) {
        valorTotal = produtos.reduce((total, prod) => {
            return total + (Number(prod.valor || 0) * Number(prod.estoque || 0));
        }, 0);
    } else if (produtos.valor && produtos.estoque) {
        valorTotal = Number(produtos.valor) * Number(produtos.estoque);
    }

    // Exibe o valor total formatado
    document.getElementById("valor").textContent = valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    
    //CARD CATEGORIA

    // Preenche o select de categorias
    const selectCategoria = document.getElementById("selectCategoria");
    const categoriaEstoque = document.getElementById("categoria");

    if (selectCategoria) {
        let categorias = [];
        if (Array.isArray(produtos)) {
            categorias = [...new Set(produtos.map(prod => prod.categoria))];
        } else if (produtos.categoria) {
            categorias = [produtos.categoria];
        }
       selectCategoria.innerHTML =
    `<option value="" disabled selected>Escolha uma categoria</option>` +
    categorias.map(cat => `<option value="${cat}">${cat}</option>`).join('');

        // Função para atualizar o estoque da categoria selecionada
        function atualizarEstoqueCategoria() {
            const categoriaSelecionada = selectCategoria.value;
            let estoqueCategoria = 0;
            if (Array.isArray(produtos)) {
                estoqueCategoria = produtos
                    .filter(prod => prod.categoria === categoriaSelecionada)
                    .reduce((total, prod) => total + Number(prod.estoque || 0), 0);
            } else if (produtos.categoria === categoriaSelecionada) {
                estoqueCategoria = Number(produtos.estoque || 0);
            }
            categoriaEstoque.textContent = estoqueCategoria;
        }

        // Atualiza ao carregar e ao trocar a seleção
        selectCategoria.addEventListener('change', atualizarEstoqueCategoria);
        atualizarEstoqueCategoria();
    }

});



