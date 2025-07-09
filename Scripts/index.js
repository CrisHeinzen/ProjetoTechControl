

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
});