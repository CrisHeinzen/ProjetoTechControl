//Função para validar o longin na tela inicial
function validarLogin() {
  const inputEmail = document.getElementById('email');
  const inputSenha = document.getElementById('pass');

  //.trim() serve para eliminar espaços em branco para não ocorrer erro de digitação
  const email = inputEmail.value.trim();
  const senha = inputSenha.value.trim();

  if (!email || !senha) {
    alert('Preencha todos os campos!');
    return;
  }

  // Recupera lista de usuários cadastrados
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  // Procura usuário correspondente
  const usuarioValido = usuarios.find(user => user.email === email && user.password === senha);

  if (usuarioValido) {
    // Se encontrou, redireciona para a página principal
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioValido));
    window.location.href = "index.html";
  } else {
    alert('Usuário ou senha incorretos!');
  }

  // Limpa os campos
  inputEmail.value = "";
  inputSenha.value = "";
}


//Função para cadastrar novo usário no modal


  document.getElementById("submit").addEventListener("click", function () {
    const email = document.getElementById("floatingInput").value.trim();
    const password = document.getElementById("floatingPassword").value.trim();

    if (!email || !password) {
      alert("Preencha todos os campos!");
      return;
    }

    const user = { email, password };

    // Recupera usuários existentes
    let users = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verifica se o e-mail já está cadastrado
    const alreadyExists = users.some(u => u.email === email);
    if (alreadyExists) {
      alert("Este e-mail já está cadastrado.");
      return;
    }

    // Adiciona novo usuário
    users.push(user);

    // Salva no Local Storage
    localStorage.setItem("usuarios", JSON.stringify(users));

    alert("Usuário cadastrado com sucesso!");

    // Limpa os campos
    document.getElementById("floatingInput").value = "";
    document.getElementById("floatingPassword").value = "";

    // Fecha o modal
    const modalEl = document.getElementById('staticBackdrop');
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();

    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioValido));

  });


