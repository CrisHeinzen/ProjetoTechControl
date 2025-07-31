# ProjetoTechControl

Sistema web para gerenciamento e controle de produtos em estoque.

## Funcionalidades

- Cadastro de usuários com autenticação (login)
- Cadastro, edição, exclusão, compra e venda de produtos
- Listagem de produtos em tabela dinâmica
- Dashboard com indicadores de estoque total, valor total, quantidade de produtos e estoque por categoria
- Filtros por categoria
- Armazenamento dos dados no navegador via LocalStorage

## Como rodar o projeto

1. Clone o repositório:
   ```sh
   git clone https://github.com/seu-usuario/ProjetoTechControl.git
   ```
2. Abra o arquivo `Basics/techControlLogin.html` em seu navegador.
3. Faça login ou cadastre um novo usuário para acessar o sistema.

## Estrutura de Pastas

```
Basics/    # Páginas HTML do sistema
Scripts/   # Scripts JavaScript para funcionalidades
Styles/    # Arquivos CSS e imagens
```

## Tecnologias utilizadas

- HTML5
- CSS3 (Bootstrap)
- JavaScript (LocalStorage)

## Principais arquivos

- `Basics/techControlLogin.html`: Tela de login/cadastro
- `Basics/index.html`: Dashboard principal
- `Scripts/index.js`: Lógica do dashboard e indicadores
- `Scripts/tabela.js`: Lógica da tabela de produtos (CRUD, compra/venda)
- `Styles/index.css`: Estilos personalizados

## Autor

- Cristiano Heinzen

---

Desenvolvido para fins de estudo e demonstração durante o curso SuperDev na instituição Proway