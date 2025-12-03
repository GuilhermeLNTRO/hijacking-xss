// Simula o login
function login() {
    const user = document.getElementById('username').value;
    if(!user) return alert("Digite um usuário!");

    // Gera um ID de sessão falso aleatório
    const sessionID = "SESS_" + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    // Define o cookie no navegador (document.cookie é vulnerável se não tiver HttpOnly)
    document.cookie = `session_id=${sessionID}; path=/`;

    // Atualiza UI
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('userCookie').innerText = sessionID;
}

// Simula o clique no link malicioso
function simulateClick() {
    // 1. O script malicioso lê o cookie
    const stolenCookie = document.cookie;
    
    // 2. Envia para o console do hacker (visual apenas)
    logHacker(`[XSS ALERT] Cookie capturado!`);
    logHacker(`[DATA] ${stolenCookie}`);
    
    // Habilita o botão de Hijack
    const btn = document.getElementById('btnHijack');
    btn.disabled = false;
    btn.style.background = "var(--danger)";
    btn.style.cursor = "pointer";
    btn.dataset.cookie = stolenCookie;
}

function hijackSession() {
    const stolenData = document.getElementById('btnHijack').dataset.cookie;
    logHacker(`[ATTACK] Injetando cookie no navegador do atacante...`);
    logHacker(`[SUCCESS] Acesso concedido como ADMIN!`);
    alert(`Sessão Sequestrada com Sucesso!\nO atacante acessou usando: ${stolenData}`);
}

function logHacker(msg) {
    const consoleDiv = document.getElementById('hackerConsole');
    const time = new Date().toLocaleTimeString();
    consoleDiv.innerHTML += `> [${time}] ${msg}<br>`;
    consoleDiv.scrollTop = consoleDiv.scrollHeight;
}