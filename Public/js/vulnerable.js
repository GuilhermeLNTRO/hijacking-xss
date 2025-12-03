function vulnLogin() {
    const user = document.getElementById('username').value || 'UsuarioVulneravel';
    const sessionID = "VULN_ID_" + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    // ATENÇÃO: Adicionamos 'path=/vulnerable' para restringir o cookie a esta página
    // Isso impede que ele "vaze" para a página segura no futuro
    document.cookie = `session_token=${sessionID}; path=/vulnerable;`;

    // Atualiza UI
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('userCookie').innerText = document.cookie;
    logHacker("Vítima fez login. Cookie gerado.");
}

function simulateXSS() {
    logHacker("[XSS START] Script malicioso executado!");
    
    const stolenCookie = document.cookie;
    
    if(stolenCookie) {
        logHacker(`[SUCESSO] 🍪 Sessão Roubada: ${stolenCookie}`);
    } else {
        logHacker(`[ERRO] Nenhum cookie encontrado.`);
    }
}

function logHacker(msg) {
    const consoleDiv = document.getElementById('hackerConsole');
    const time = new Date().toLocaleTimeString();
    consoleDiv.innerHTML += `> [${time}] ${msg}<br>`;
    consoleDiv.scrollTop = consoleDiv.scrollHeight;
}