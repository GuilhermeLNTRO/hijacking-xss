async function secureLogin() {
    const username = document.getElementById('secUsername').value || "AdminSeguro";

    try {
        // 1. Limpa qualquer lixo de testes anteriores para não confundir a demo
        limparCookiesAntigos();

        // 2. Faz a requisição ao backend para login real
        const response = await fetch('/api/secure-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username })
        });

        if (response.ok) {
            const data = await response.json();
            document.getElementById('loginSection').style.display = 'none';
            document.getElementById('protectedContent').style.display = 'block';
            document.getElementById('displayUser').innerText = data.user;

            // 3. Tenta ler o cookie imediatamente após o login
            checkCookieSecurity();
        }
    } catch (error) {
        console.error("Erro no login:", error);
    }
}

function limparCookiesAntigos() {
    // Tenta apagar cookies conhecidos dos testes anteriores definindo data de expiração no passado
    document.cookie = "session_id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "session_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
}

function checkCookieSecurity() {
    // Tenta ler o cookie via JS
    const cookie = document.cookie;
    const display = document.getElementById('cookieResult');

    // Se o cookie estiver vazio ou só tiver espaços, o HttpOnly funcionou
    if (!cookie || cookie.trim() === "") {
        display.innerHTML = '🚫 (String Vazia) - Bloqueado pelo navegador (HttpOnly)';
        display.style.color = "var(--secure-color)"; // Fica verde indicando sucesso
    } else {
        // Se ainda aparecer algo, mostramos (mas agora deve estar limpo)
        display.innerHTML = "⚠️ ALERTA: Cookie visível: " + cookie;
        display.style.color = "#ef4444"; // Vermelho
    }
}