function fazerLogin() {
    const email = document.getElementById("emailLogin").value;
    const senha = document.getElementById("senhaLogin").value;
    const erroLogin = document.getElementById("erroLogin");

    if (email === "" || senha === "") {
        erroLogin.textContent = "Preencha todos os campos!";
        return;
    }

    const usuarioSalvo = localStorage.getItem("usuario");
    
    if (!usuarioSalvo) {
        erroLogin.textContent = "Nenhum usuário encontrado!";
        return;
    }

    try {
        const usuario = JSON.parse(usuarioSalvo);
        
        if (email === usuario.email && senha === usuario.senha) {
            erroLogin.textContent = "";
            alert("Login realizado com sucesso!");
            fecharLogin();
            // Redirecionar pro catálogo
            window.location.href = "catalogo.html";
        } else {
            erroLogin.textContent = "Email ou senha incorretos!";
        }
    } catch (e) {
        erroLogin.textContent = "Erro ao fazer login!";
    }
}

function abrirLogin() {
    document.getElementById("modalLogin").style.display = "block";
}

function fecharLogin() {
    document.getElementById("modalLogin").style.display = "none";
}

function trocarParaCadastro() {
    fecharLogin();
    abrirCadastro();
}

function toggleSenha(fieldId) {
    const campo = document.getElementById(fieldId);
    const icon = campo.nextElementSibling.querySelector('i');
    
    if (campo.type === 'password') {
        campo.type = 'text';
        icon.classList.remove('bi-eye');
        icon.classList.add('bi-eye-slash');
    } else {
        campo.type = 'password';
        icon.classList.remove('bi-eye-slash');
        icon.classList.add('bi-eye');
    }
}