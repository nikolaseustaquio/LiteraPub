document.addEventListener('DOMContentLoaded', function() {
    verificarLogin();
    configurarNavegacao();
});

function verificarLogin() {
    const usuario = localStorage.getItem('usuario');
    const botoesHeader = document.getElementById('botoesHeader');
    const usuarioLogado = document.getElementById('usuarioLogado');

    if (usuario) {
        try {
            const usuarioObj = JSON.parse(usuario);
            botoesHeader.style.display = 'none';
            usuarioLogado.style.display = 'flex';
            document.getElementById('nomeUsuarioHeader').textContent = usuarioObj.email.split('@')[0];
        } catch (e) {}
    }
}

function fazerLogout() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('tipoUsuario');
    location.reload();
}

function voltarInicio() {
    window.location.href = '#inicio';
    location.reload();
}

function configurarNavegacao() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            if (href === '#inicio') {
                document.querySelector('main > h2:first-of-type').scrollIntoView();
            } else if (href === '#generos') {
                const secaoGeneros = document.getElementById('generos');
                secaoGeneros.style.display = 'block';
                secaoGeneros.scrollIntoView();
            } else if (href === '#sobre') {
                const secaoSobre = document.getElementById('sobre');
                secaoSobre.style.display = 'block';
                secaoSobre.scrollIntoView();
            }
        });
    });

    document.querySelectorAll('.genero-card').forEach(card => {
        card.addEventListener('click', function() {
            const genero = this.getAttribute('data-genero');
            localStorage.setItem('generoSelecionado', genero);
            window.location.href = 'catalogo.html';
        });
    });
}
