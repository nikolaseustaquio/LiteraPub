// Gerenciador de Favoritos
class GerenciadorFavoritos {
    constructor() {
        this.emailLogado = this.obterUsuarioLogado();
        this.chave = this.emailLogado ? `favoritos_${this.emailLogado}` : null;
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

    obterFavoritos() {
        if (!this.chave) return [];
        const favoritos = localStorage.getItem(this.chave);
        return favoritos ? JSON.parse(favoritos) : [];
    }

    salvarFavoritos(favoritos) {
        if (this.chave) {
            localStorage.setItem(this.chave, JSON.stringify(favoritos));
        }
    }

    adicionarFavorito(livro) {
        if (!this.chave) {
            alert("Você precisa estar logado para adicionar favoritos!");
            window.location.href = "login.html";
            return false;
        }

        const favoritos = this.obterFavoritos();
        const jaExiste = favoritos.some(fav => fav.id === livro.id);

        if (!jaExiste) {
            favoritos.push(livro);
            this.salvarFavoritos(favoritos);
            return true;
        }
        return false;
    }

    removerFavorito(livroId) {
        if (!this.chave) return false;

        let favoritos = this.obterFavoritos();
        favoritos = favoritos.filter(fav => fav.id !== livroId);
        this.salvarFavoritos(favoritos);
        return true;
    }

    isFavoritado(livroId) {
        const favoritos = this.obterFavoritos();
        return favoritos.some(fav => fav.id === livroId);
    }
}

const gerenciador = new GerenciadorFavoritos();

function extrairDadosLivro(card) {
    return {
        id: card.getAttribute("data-id"),
        titulo: card.getAttribute("data-titulo"),
        autor: card.getAttribute("data-autor"),
        genero: card.getAttribute("data-genero")
    };
}

function atualizarBotaoFavorito(botao, isFavoritado) {
    const icon = botao.querySelector("i");
    
    if (isFavoritado) {
        botao.classList.add("favoritado");
        icon.classList.remove("bi-heart");
        icon.classList.add("bi-heart-fill");
    } else {
        botao.classList.remove("favoritado");
        icon.classList.remove("bi-heart-fill");
        icon.classList.add("bi-heart");
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const botoesFavorito = document.querySelectorAll(".botao-favorito");

    botoesFavorito.forEach(botao => {
        const card = botao.closest(".card-livro");
        const livro = extrairDadosLivro(card);

        atualizarBotaoFavorito(botao, gerenciador.isFavoritado(livro.id));

        botao.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();

            const isFav = gerenciador.isFavoritado(livro.id);

            if (isFav) {
                gerenciador.removerFavorito(livro.id);
                atualizarBotaoFavorito(botao, false);
            } else {
                if (gerenciador.adicionarFavorito(livro)) {
                    atualizarBotaoFavorito(botao, true);
                }
            }
        });
    });
});