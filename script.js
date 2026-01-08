/**
 * --- CONFIGURAÇÕES E ESTADO GLOBAL ---
 */
const dataConhecemos = new Date("2025-11-25T00:00:00");
let timerZoom;
let estaSegurando = false;

/**
 * --- SEGURANÇA E BLOQUEIOS ---
 * Impede menus de contexto e arrasto de imagens para proteger as fotos
 */
document.addEventListener('contextmenu', (e) => e.preventDefault());
document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG') e.preventDefault();
});

/**
 * --- GESTÃO DO MURAL (ZOOM E INTERAÇÃO) ---
 */

function iniciarContagemZoom(elemento) {
    estaSegurando = true;
    clearTimeout(timerZoom);
    timerZoom = setTimeout(() => {
        if (estaSegurando) {
            elemento.classList.add('dar-zoom');

            document.body.style.overflow = 'hidden';
        }
    }, 500);
}


function cancelarZoom(elemento) {
    estaSegurando = false;
    clearTimeout(timerZoom);
    elemento.classList.remove('dar-zoom');
    document.body.style.overflow = '';
}


const somPapel = document.getElementById('som-papel');

function virarCarta(elemento) {
    if (!elemento.classList.contains('dar-zoom')) {

        if (somPapel) {
            somPapel.currentTime = 0; 
            somPapel.play();
        }

  
        elemento.classList.toggle('virado');
    }
}

/**
 * --- PAINEL E MODAL ---
 */

function abrirPainel() {
    document.getElementById('painel-tempo').style.display = 'block';
}

function fecharPainel() {
    document.getElementById('painel-tempo').style.display = 'none';
}

function revelarSegredo() {
    const msg = document.getElementById('mensagem-secreta');
    const btn = document.getElementById('btn-porque');
    
    if (msg) msg.classList.remove('escondido');
    if (btn) btn.style.display = 'none';
    
    for (let i = 0; i < 20; i++) {
        setTimeout(gerarCoracao, i * 100);
    }
}

/**
 * --- CONTADORES E ANIMAÇÕES ---
 */

function atualizarContadores() {
    const agora = new Date();
    const diff = agora - dataConhecemos;
    const elemento = document.getElementById('contador-tempo-juntos');
    
    if (elemento && diff > 0) {
        const d = Math.floor(diff / 86400000);
        const h = Math.floor((diff / 3600000) % 24);
        const m = Math.floor((diff / 60000) % 60);
        const s = Math.floor((diff / 1000) % 60);
        elemento.innerText = `${d}d ${h}h ${m}m ${s}s`;
    }
}

function gerarCoracao() {
    const container = document.getElementById('container-coracoes');
    if (!container) return;
    
    const coracao = document.createElement('div');
    const duracao = 4 + Math.random() * 5;
    const posicaoX = Math.random() * 95;
    
    coracao.className = 'coracao-svg';
    coracao.style.left = `${posicaoX}%`;
    coracao.style.animation = `subir ${duracao}s linear forwards`;
    
    coracao.innerHTML = `
        <svg width="44" height="44" viewBox="0 0 200 200">
            <path d="M 100 60 C 100 20, 20 20, 20 80 C 20 130, 100 160, 100 180 C 100 160, 180 130, 180 80 C 180 20, 100 20, 100 60" 
            fill="#ff4d6d" opacity="0.6"/>
        </svg>`;
    
    container.appendChild(coracao);
    
    setTimeout(() => coracao.remove(), duracao * 1000);
}

/**
 * --- INICIALIZAÇÃO DO SISTEMA ---
 */
window.onload = () => {

    atualizarContadores();
    setInterval(atualizarContadores, 1000);
    
    // Inicia a chuva de corações ambiente
    setInterval(gerarCoracao, 500);
};

// --- CONFIGURAÇÃO DA PLAYLIST ---
const minhaPlaylist = ["musica1.mp3", "musica2.mp3", "musica3.mp3", "musica4.mp3", "musica5.mp3"]; // Nomes dos seus arquivos
let musicaAtual = 0;
const player = document.getElementById('musica-fundo');

// Configura o volume (0.1 é bem baixinho, 1.0 é o máximo)
player.volume = 0.2; 

function carregarEMocar() {
    player.src = minhaPlaylist[musicaAtual];
    player.play().catch(e => console.log("Aguardando interação para tocar música..."));
}

player.addEventListener('ended', () => {
    musicaAtual++;
    if (musicaAtual >= minhaPlaylist.length) musicaAtual = 0; // Volta para a primeira
    carregarEMocar();
});

document.addEventListener('click', () => {
    if (player.paused) {
        carregarEMocar();
    }
}, { once: true });

document.addEventListener("visibilitychange", function() {
    const player = document.getElementById('musica-fundo');
    
    if (document.hidden) {

        player.pause();
    } else {

        player.play().catch(e => console.log("Aguardando interação..."));
    }
});