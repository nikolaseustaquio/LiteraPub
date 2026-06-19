document.addEventListener('DOMContentLoaded', function() {
    const btnAumentar = document.getElementById('btnAumentar');
    const btnDiminuir = document.getElementById('btnDiminuir');
    const btnLer = document.getElementById('btnLer');
    const btnMenu = document.getElementById('btnMenu');

    let tamanhoAtual = 1;
    let lendoAtivo = false;

    btnAumentar.addEventListener('click', function() {
        tamanhoAtual += 0.1;
        document.body.style.fontSize = (16 * tamanhoAtual) + 'px';
        localStorage.setItem('tamanhoFonte', tamanhoAtual);
    });

    btnDiminuir.addEventListener('click', function() {
        if (tamanhoAtual > 0.8) {
            tamanhoAtual -= 0.1;
            document.body.style.fontSize = (16 * tamanhoAtual) + 'px';
            localStorage.setItem('tamanhoFonte', tamanhoAtual);
        }
    });

    btnLer.addEventListener('click', function() {
        lendoAtivo = !lendoAtivo;
        if (lendoAtivo) {
            lerPagina();
            btnLer.style.background = '#705325';
            btnLer.style.color = 'white';
        } else {
            pararLeitura();
            btnLer.style.background = 'white';
            btnLer.style.color = '#705325';
        }
    });

    function lerPagina() {
        const textos = document.body.innerText;
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(textos);
            utterance.lang = 'pt-BR';
            utterance.rate = 1;
            speechSynthesis.speak(utterance);
        }
    }

    function pararLeitura() {
        if ('speechSynthesis' in window) {
            speechSynthesis.cancel();
        }
    }

    const tamanhoSalvo = localStorage.getItem('tamanhoFonte');
    if (tamanhoSalvo) {
        tamanhoAtual = parseFloat(tamanhoSalvo);
        document.body.style.fontSize = (16 * tamanhoAtual) + 'px';
    }
});
