document.addEventListener("DOMContentLoaded", function() {
    console.log("Interface LiteraPub carregada.");

    const btnLerAgora = document.getElementById("btnLerAgora");
    const btnAdicionarEstante = document.getElementById("btnAdicionarEstante");

    if (btnLerAgora) {
        btnLerAgora.addEventListener("click", function() {
            alert("Ação: Redirecionando para o leitor interno do LiteraPub...");
        });
    }

    if (btnAdicionarEstante) {
        btnAdicionarEstante.addEventListener("click", function() {
            alert("Sucesso: Livro adicionado à sua estante pessoal!");
        });
    }

    const estrelas = document.querySelectorAll("#estrelasSelecao i");
    const formAvaliacao = document.getElementById("formAvaliacao");
    const listaAvaliacoes = document.getElementById("listaAvaliacoes");
    const textoComentario = document.getElementById("textoComentario");
    
    let notaSelecionada = 0;

    estrelas.forEach(function(estrela) {
        estrela.addEventListener("click", function() {
            notaSelecionada = parseInt(estrela.getAttribute("data-value"));
            renderizarEstrelasFormulario(notaSelecionada);
        });
    });

    function renderizarEstrelasFormulario(nota) {
        estrelas.forEach(function(estrela) {
            const valorEstrela = parseInt(estrela.getAttribute("data-value"));
            if (valorEstrela <= nota) {
                estrela.classList.remove("bi-star");
                estrela.classList.add("bi-star-fill");
            } else {
                estrela.classList.remove("bi-star-fill");
                estrela.classList.add("bi-star");
            }
        });
    }

    if (formAvaliacao) {
        formAvaliacao.addEventListener("submit", function(event) {
            event.preventDefault();

            if (notaSelecionada === 0) {
                alert("Por favor, selecione uma nota clicando nas estrelas antes de publicar!");
                return;
            }


            const novoCard = document.createElement("div");
            novoCard.classList.add("card-avaliacao");

            let estrelasHtml = "";
            for (let i = 1; i <= 5; i++) {
                if (i <= notaSelecionada) {
                    estrelasHtml += '<i class="bi bi-star-fill"></i> ';
                } else {
                    estrelasHtml += '<i class="bi bi-star"></i> ';
                }
            }

  
            novoCard.innerHTML = `
                <div class="topo-avaliacao">
                    <strong class="nome-usuario">Você (Leitor)</strong>
                    <div class="estrelas-usuario">${estrelasHtml}</div>
                </div>
                <p class="texto-avaliacao">${textoComentario.value}</p>
            `;

           
            listaAvaliacoes.appendChild(novoCard);

            textoComentario.value = "";
            notaSelecionada = 0;
            renderizarEstrelasFormulario(0);
        });
    }
});