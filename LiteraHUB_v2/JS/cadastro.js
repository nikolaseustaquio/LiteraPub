function fazerCadastro() {
    const email = document.getElementById("emailCadastro").value;
    const senha = document.getElementById("senhaCadastro").value;
    const confirmaSenha = document.getElementById("confirmaSenhaCadastro").value;
    const erroCadastro = document.getElementById("erroCadastro");

    if (email === "" || senha === "" || confirmaSenha === "") {
        erroCadastro.textContent = "Preencha todos os campos!";
        return;
    }

    if (senha !== confirmaSenha) {
        erroCadastro.textContent = "As senhas não coincidem!";
        return;
    }

    const usuario = {
        email: email,
        senha: senha
    };

    // Salvar no localStorage
    localStorage.setItem("usuario", JSON.stringify(usuario));
    
    alert("Cadastro realizado com sucesso!");
    fecharCadastro();
    
    // Limpar campos
    document.getElementById("emailCadastro").value = "";
    document.getElementById("senhaCadastro").value = "";
    document.getElementById("confirmaSenhaCadastro").value = "";
    erroCadastro.textContent = "";
    
    // Abrir login
    abrirLogin();
}

function abrirCadastro() {
    document.getElementById("modalCadastro").style.display = "block";
}

function fecharCadastro() {
    document.getElementById("modalCadastro").style.display = "none";
}

function trocarParaLogin() {
    fecharCadastro();
    abrirLogin();
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