const buscaInput = document.querySelector(".busca-input")
const checkboxes = document.querySelectorAll(".checkbox-genero")
const selectOrdenar = document.querySelector(".select-ordenar")
const cards = document.querySelectorAll(".card-livro")

document.addEventListener("DOMContentLoaded", function() {
    const usuario = localStorage.getItem("usuario");
    const botaoAutor = document.getElementById("botaoAutor");
    const botaoAdmin = document.getElementById("botaoAdmin");

    if (usuario) {
        try {
            const usuarioObj = JSON.parse(usuario);
            if (botaoAutor) botaoAutor.style.display = "flex";

            if (usuarioObj.email === "admin@literahub.com") {
                if (botaoAdmin) botaoAdmin.style.display = "flex";
            }
        } catch (e) {}
    }
});

buscaInput.addEventListener("input", function() {
    const termo = buscaInput.value.toLowerCase()
    console.log("Buscando:", termo)
})

checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener("change", function() {
        const selecionados = []
        checkboxes.forEach(function(cb) {
            if (cb.checked) selecionados.push(cb.value)
        })
        console.log("Gêneros selecionados:", selecionados)
    })
})

selectOrdenar.addEventListener("change", function() {
    console.log("Ordenar por:", selectOrdenar.value)
})

cards.forEach(function(card) {
    const botao = card.querySelector(".botao-ver-mais");
    if (botao) {
        botao.addEventListener("click", function() {
            window.location.href = "livro.html"; 
        });
    }
});