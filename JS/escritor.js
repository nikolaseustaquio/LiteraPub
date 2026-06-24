
class GerenciadorLivrosAutor {
    constructor() {
        this.emailLogado = this.obterUsuarioLogado();
        this.chave = this.emailLogado ? `livros_autor_${this.emailLogado}` : null;
    }

    obterUsuarioLogado() {
        const usuario = localStorage.getItem("usuario");
        if (usuario) {
            try {
                return JSON.parse(usuario).email;
            } catch (e) {
                return null;
            }
        }
        return null;
    }

    obterLivros() {
        if (!this.chave) return [];
        const livros = localStorage.getItem(this.chave);
        return livros ? JSON.parse(livros) : [];
    }

    salvarLivros(livros) {
        if (this.chave) {
            localStorage.setItem(this.chave, JSON.stringify(livros));
        }
    }

    adicionarLivro(livro) {
        const livros = this.obterLivros();
        livro.id = Date.now().toString();
        livro.status = "ativo";
        livro.visualizacoes = 0;
        livro.notaMedia = 0;
        livro.avaliacoes = [];
        livros.push(livro);
        this.salvarLivros(livros);
        return livro;
    }

    obterEstatisticas() {
        const livros = this.obterLivros();
        const ativosCount = livros.filter(l => l.status === "ativo").length;
        const totalVisualizacoes = livros.reduce((sum, l) => sum + (l.visualizacoes || 0), 0);
        const notaMediaGeral = livros.length > 0 
            ? (livros.reduce((sum, l) => sum + (l.notaMedia || 0), 0) / livros.length).toFixed(1)
            : 0;

        return {
            totalLivros: ativosCount,
            totalVisualizacoes: totalVisualizacoes,
            notaMediaGeral: notaMediaGeral
        };
    }
}

const gerenciador = new GerenciadorLivrosAutor();

const modal = document.getElementById("modalPublicar");
const btnPublicar = document.getElementById("btnPublicar");
const btnFecharModal = document.getElementById("btnFecharModal");
const btnCancelar = document.getElementById("btnCancelar");
const formPublicar = document.getElementById("formPublicar");
const tabelaLivros = document.getElementById("tabelaLivros");
const mensagemVazio = document.getElementById("mensagemVazio");

document.addEventListener("DOMContentLoaded", function() {
    if (!gerenciador.emailLogado) {
        alert("Você precisa estar logado para acessar esta página!");
        window.location.href = "login.html";
        return;
    }

    atualizarEstatisticas();
    renderizarTabela();
    configurarModal();
});

function atualizarEstatisticas() {
    const stats = gerenciador.obterEstatisticas();
    document.getElementById("totalLivros").textContent = stats.totalLivros;
    document.getElementById("totalVisualizacoes").textContent = stats.totalVisualizacoes;
    document.getElementById("notaMediaGeral").textContent = stats.notaMediaGeral;
}

function renderizarTabela() {
    const livros = gerenciador.obterLivros();

    if (livros.length === 0) {
        tabelaLivros.innerHTML = "";
        mensagemVazio.style.display = "block";
        return;
    }

    mensagemVazio.style.display = "none";
    tabelaLivros.innerHTML = "";

    livros.forEach(livro => {
        const row = document.createElement("tr");
        const statusClass = livro.status === "ativo" ? "status-ativo" : "status-rascunho";
        const statusTexto = livro.status === "ativo" ? "Publicado" : "Rascunho";

        row.innerHTML = `
            <td><strong>${livro.nome}</strong></td>
            <td>${livro.autor}</td>
            <td><span class="status-badge ${statusClass}">${statusTexto}</span></td>
            <td>${livro.paginas}</td>
            <td>${livro.visualizacoes || 0}</td>
            <td>${(livro.notaMedia || 0).toFixed(1)}</td>
            <td>
                <div class="acoes-tabela">
                    <button class="botao-acao" onclick="editarLivro('${livro.id}')">Editar</button>
                    <button class="botao-acao" onclick="adicionarCapitulos('${livro.id}')">Cap.</button>
                    <button class="botao-acao" onclick="capitulosGratuitos('${livro.id}')">Grátis</button>
                </div>
            </td>
        `;
        tabelaLivros.appendChild(row);
    });
}

function configurarModal() {
    btnPublicar.addEventListener("click", abrirModal);
    btnFecharModal.addEventListener("click", fecharModal);
    btnCancelar.addEventListener("click", fecharModal);
    formPublicar.addEventListener("submit", publicarLivro);

    modal.addEventListener("click", function(e) {
        if (e.target === modal) fecharModal();
    });
}

function abrirModal() {
    modal.style.display = "flex";
}

function fecharModal() {
    modal.style.display = "none";
    formPublicar.reset();
}

function publicarLivro(e) {
    e.preventDefault();

    const livro = {
        nome: document.getElementById("nomeLivro").value,
        autor: document.getElementById("autorLivro").value,
        paginas: parseInt(document.getElementById("paginasLivro").value),
        sinopse: document.getElementById("sinopseLivro").value,
        capa: document.getElementById("capaLivro").value ? "com-capa" : "sem-capa"
    };

    if (!livro.nome || !livro.autor || !livro.paginas) {
        alert("Preencha todos os campos obrigatórios!");
        return;
    }

    gerenciador.adicionarLivro(livro);
    fecharModal();
    atualizarEstatisticas();
    renderizarTabela();
    alert("Livro publicado com sucesso!");
}

function editarLivro(livroId) {
    alert("Função de editar em desenvolvimento!");
}

function adicionarCapitulos(livroId) {
    alert("Função de adicionar capítulos em desenvolvimento!");
}

function capitulosGratuitos(livroId) {
    alert("Função de capítulos gratuitos em desenvolvimento!");
}