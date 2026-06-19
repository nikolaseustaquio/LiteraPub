
document.addEventListener("DOMContentLoaded", function() {
    const usuario = localStorage.getItem("usuario");
    
    if (!usuario) {
        alert("Você precisa estar logado!");
        window.location.href = "login.html";
        return;
    }

    try {
        const usuarioObj = JSON.parse(usuario);
        if (usuarioObj.email !== "admin@literahub.com") {
            alert("Acesso negado! Apenas administrador pode acessar.");
            window.location.href = "catalogo.html";
            return;
        }
    } catch (e) {
        window.location.href = "login.html";
        return;
    }

    inicializar();
});

let livroEmEdicao = null;
let livroParaExcluir = null;

function inicializar() {
    configurarAbas();
    atualizarDashboard();
    renderizarUsuarios();
    renderizarLivros();
    configurarBuscas();
}

function configurarAbas() {
    const botoes = document.querySelectorAll(".botao-menu");
    botoes.forEach(botao => {
        botao.addEventListener("click", function() {
            const tabName = this.getAttribute("data-tab");
            abrirAba(tabName);
        });
    });
}

function abrirAba(tabName) {

    const abas = document.querySelectorAll(".aba-conteudo");
    abas.forEach(aba => aba.classList.remove("ativa"));

    const botoes = document.querySelectorAll(".botao-menu");
    botoes.forEach(botao => botao.classList.remove("ativo"));

    document.getElementById(tabName).classList.add("ativa");
    document.querySelector(`[data-tab="${tabName}"]`).classList.add("ativo");
}

function atualizarDashboard() {
    const totalUsuarios = obterTodosUsuarios().length;
    const todosLivros = obterTodosLivros();
    const livrosPublicados = todosLivros.filter(l => l.status === "ativo").length;
    const pendencias = todosLivros.filter(l => l.status === "pendente").length;

    document.getElementById("totalUsuarios").textContent = totalUsuarios;
    document.getElementById("totalLivrosPublicados").textContent = livrosPublicados;
    document.getElementById("totalPendencias").textContent = pendencias;
}

function obterTodosUsuarios() {
    const usuarios = [];
    for (let i = 0; i < localStorage.length; i++) {
        const chave = localStorage.key(i);
        if (chave === "usuario") {
            try {
                const user = JSON.parse(localStorage.getItem(chave));
                usuarios.push({
                    nome: user.email.split("@")[0],
                    email: user.email,
                    tipo: "leitor"
                });
            } catch (e) {}
        }
  
        if (chave.startsWith("livros_autor_")) {
            const email = chave.replace("livros_autor_", "");
            const index = usuarios.findIndex(u => u.email === email);
            if (index === -1) {
                usuarios.push({
                    nome: email.split("@")[0],
                    email: email,
                    tipo: "escritor"
                });
            } else {
                usuarios[index].tipo = "escritor";
            }
        }
    }
    return usuarios;
}

function obterTodosLivros() {
    const livros = [];
    for (let i = 0; i < localStorage.length; i++) {
        const chave = localStorage.key(i);
        if (chave.startsWith("livros_autor_")) {
            const email = chave.replace("livros_autor_", "");
            try {
                const livrosDoAutor = JSON.parse(localStorage.getItem(chave));
                livrosDoAutor.forEach(livro => {
                    livro.autorEmail = email;
                    livros.push(livro);
                });
            } catch (e) {}
        }
    }
    return livros;
}

function renderizarUsuarios() {
    const usuarios = obterTodosUsuarios();
    const tabelaUsuarios = document.getElementById("tabelaUsuarios");
    const mensagem = document.getElementById("mensagemVazioUsuarios");

    if (usuarios.length === 0) {
        tabelaUsuarios.innerHTML = "";
        mensagem.style.display = "block";
        return;
    }

    mensagem.style.display = "none";
    tabelaUsuarios.innerHTML = "";

    usuarios.forEach(user => {
        const row = document.createElement("tr");
        const statusClass = user.tipo === "escritor" ? "status-escritor" : "status-leitor";
        const tipoTexto = user.tipo === "escritor" ? "Escritor" : "Leitor";

        row.innerHTML = `
            <td><strong>${user.nome}</strong></td>
            <td>${user.email}</td>
            <td><span class="status-badge ${statusClass}">${tipoTexto}</span></td>
            <td>
                <div class="acoes-tabela">
                    ${user.tipo === "escritor" ? `<button class="botao-acao ver" onclick="verLivrosEscritor('${user.email}', '${user.nome}')">Ver Livros</button>` : ""}
                </div>
            </td>
        `;
        tabelaUsuarios.appendChild(row);
    });
}

function verLivrosEscritor(email, nome) {
    const chave = `livros_autor_${email}`;
    const livros = JSON.parse(localStorage.getItem(chave) || "[]");
    const modal = document.getElementById("modalLivrosEscritor");
    const lista = document.getElementById("listaLivrosEscritor");

    document.getElementById("nomeEscritor").textContent = nome;
    lista.innerHTML = "";

    if (livros.length === 0) {
        lista.innerHTML = "<p style='text-align: center; color: #999;'>Nenhum livro publicado</p>";
    } else {
        livros.forEach(livro => {
            const item = document.createElement("div");
            item.className = "item-livro-escritor";
            item.innerHTML = `
                <strong>${livro.nome}</strong>
                <p><strong>Páginas:</strong> ${livro.paginas}</p>
                <p><strong>Status:</strong> ${livro.status === "ativo" ? "Publicado" : "Rascunho"}</p>
            `;
            lista.appendChild(item);
        });
    }

    modal.style.display = "flex";
}

function fecharModalLivrosEscritor() {
    document.getElementById("modalLivrosEscritor").style.display = "none";
}

function renderizarLivros() {
    const livros = obterTodosLivros();
    const tabelaLivros = document.getElementById("tabelaLivros");
    const mensagem = document.getElementById("mensagemVazioLivros");

    if (livros.length === 0) {
        tabelaLivros.innerHTML = "";
        mensagem.style.display = "block";
        return;
    }

    mensagem.style.display = "none";
    tabelaLivros.innerHTML = "";

    livros.forEach(livro => {
        const row = document.createElement("tr");
        const statusClass = livro.status === "ativo" ? "status-ativo" : "status-pendente";
        const statusTexto = livro.status === "ativo" ? "Ativo" : "Pendente";

        row.innerHTML = `
            <td><strong>${livro.nome}</strong></td>
            <td>${livro.autor}</td>
            <td><span class="status-badge ${statusClass}">${statusTexto}</span></td>
            <td>${livro.paginas}</td>
            <td>
                <div class="acoes-tabela">
                    <button class="botao-acao" onclick="abrirModalEditarLivro('${livro.id}')">Moderar</button>
                    <button class="botao-acao remover" onclick="abrirModalExcluir('${livro.id}')">Remover</button>
                </div>
            </td>
        `;
        tabelaLivros.appendChild(row);
    });
}

function abrirModalEditarLivro(livroId) {
    const livros = obterTodosLivros();
    const livro = livros.find(l => l.id === livroId);

    if (!livro) return;

    livroEmEdicao = livro;
    document.getElementById("editNomeLivro").value = livro.nome;
    document.getElementById("editAutorLivro").value = livro.autor;
    document.getElementById("editPaginasLivro").value = livro.paginas;
    document.getElementById("editStatusLivro").value = livro.status;

    document.getElementById("modalEditarLivro").style.display = "flex";
}

function fecharModalEditarLivro() {
    document.getElementById("modalEditarLivro").style.display = "none";
    livroEmEdicao = null;
}

document.getElementById("formEditarLivro").addEventListener("submit", function(e) {
    e.preventDefault();

    if (!livroEmEdicao) return;

    const chave = `livros_autor_${livroEmEdicao.autorEmail}`;
    let livros = JSON.parse(localStorage.getItem(chave) || "[]");

    const index = livros.findIndex(l => l.id === livroEmEdicao.id);
    if (index !== -1) {
        livros[index].nome = document.getElementById("editNomeLivro").value;
        livros[index].autor = document.getElementById("editAutorLivro").value;
        livros[index].paginas = parseInt(document.getElementById("editPaginasLivro").value);
        livros[index].status = document.getElementById("editStatusLivro").value;

        localStorage.setItem(chave, JSON.stringify(livros));
        fecharModalEditarLivro();
        atualizarDashboard();
        renderizarLivros();
        abrirModalSucesso("Livro modificado com sucesso!");
    }
});

function abrirModalExcluir(livroId) {
    const livros = obterTodosLivros();
    const livro = livros.find(l => l.id === livroId);

    if (!livro) return;

    livroParaExcluir = livro;
    document.getElementById("textoConfirmacao").textContent = `Tem certeza que deseja remover "${livro.nome}"?`;
    document.getElementById("modalConfirmarExclusao").style.display = "flex";
}

function fecharModalExclusao() {
    document.getElementById("modalConfirmarExclusao").style.display = "none";
    livroParaExcluir = null;
}

function confirmarExclusao() {
    if (!livroParaExcluir) return;

    const chave = `livros_autor_${livroParaExcluir.autorEmail}`;
    let livros = JSON.parse(localStorage.getItem(chave) || "[]");

    livros = livros.filter(l => l.id !== livroParaExcluir.id);
    localStorage.setItem(chave, JSON.stringify(livros));

    fecharModalExclusao();
    atualizarDashboard();
    renderizarLivros();
    abrirModalSucesso("O livro foi removido com sucesso!");
}

function abrirModalSucesso(texto) {
    document.getElementById("textoSucesso").textContent = texto;
    document.getElementById("modalSucesso").style.display = "flex";
}

function fecharModalSucesso() {
    document.getElementById("modalSucesso").style.display = "none";
}

function configurarBuscas() {
    const buscaUsuarios = document.getElementById("buscaUsuarios");
    const buscaLivros = document.getElementById("buscaLivros");

    buscaUsuarios.addEventListener("input", filtrarUsuarios);
    buscaLivros.addEventListener("input", filtrarLivros);
}

function filtrarUsuarios() {
    const termo = document.getElementById("buscaUsuarios").value.toLowerCase();
    const usuarios = obterTodosUsuarios();
    const usuariosFiltrados = usuarios.filter(u => 
        u.nome.toLowerCase().includes(termo) || 
        u.email.toLowerCase().includes(termo)
    );

    const tabelaUsuarios = document.getElementById("tabelaUsuarios");
    const mensagem = document.getElementById("mensagemVazioUsuarios");

    if (usuariosFiltrados.length === 0) {
        tabelaUsuarios.innerHTML = "";
        mensagem.style.display = "block";
        return;
    }

    mensagem.style.display = "none";
    tabelaUsuarios.innerHTML = "";

    usuariosFiltrados.forEach(user => {
        const row = document.createElement("tr");
        const statusClass = user.tipo === "escritor" ? "status-escritor" : "status-leitor";
        const tipoTexto = user.tipo === "escritor" ? "Escritor" : "Leitor";

        row.innerHTML = `
            <td><strong>${user.nome}</strong></td>
            <td>${user.email}</td>
            <td><span class="status-badge ${statusClass}">${tipoTexto}</span></td>
            <td>
                <div class="acoes-tabela">
                    ${user.tipo === "escritor" ? `<button class="botao-acao ver" onclick="verLivrosEscritor('${user.email}', '${user.nome}')">Ver Livros</button>` : ""}
                </div>
            </td>
        `;
        tabelaUsuarios.appendChild(row);
    });
}

function filtrarLivros() {
    const termo = document.getElementById("buscaLivros").value.toLowerCase();
    const livros = obterTodosLivros();
    const livrosFiltrados = livros.filter(l => 
        l.nome.toLowerCase().includes(termo) || 
        l.autor.toLowerCase().includes(termo)
    );

    const tabelaLivros = document.getElementById("tabelaLivros");
    const mensagem = document.getElementById("mensagemVazioLivros");

    if (livrosFiltrados.length === 0) {
        tabelaLivros.innerHTML = "";
        mensagem.style.display = "block";
        return;
    }

    mensagem.style.display = "none";
    tabelaLivros.innerHTML = "";

    livrosFiltrados.forEach(livro => {
        const row = document.createElement("tr");
        const statusClass = livro.status === "ativo" ? "status-ativo" : "status-pendente";
        const statusTexto = livro.status === "ativo" ? "Ativo" : "Pendente";

        row.innerHTML = `
            <td><strong>${livro.nome}</strong></td>
            <td>${livro.autor}</td>
            <td><span class="status-badge ${statusClass}">${statusTexto}</span></td>
            <td>${livro.paginas}</td>
            <td>
                <div class="acoes-tabela">
                    <button class="botao-acao" onclick="abrirModalEditarLivro('${livro.id}')">Moderar</button>
                    <button class="botao-acao remover" onclick="abrirModalExcluir('${livro.id}')">Remover</button>
                </div>
            </td>
        `;
        tabelaLivros.appendChild(row);
    });
}

window.addEventListener("click", function(e) {
    const modal1 = document.getElementById("modalLivrosEscritor");
    const modal2 = document.getElementById("modalEditarLivro");
    const modal3 = document.getElementById("modalConfirmarExclusao");
    const modal4 = document.getElementById("modalSucesso");

    if (e.target === modal1) modal1.style.display = "none";
    if (e.target === modal2) modal2.style.display = "none";
    if (e.target === modal3) modal3.style.display = "none";
    if (e.target === modal4) modal4.style.display = "none";
});