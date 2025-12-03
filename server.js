const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const PORT = 8080;

// 1. Middleware para processar JSON (importante para o login)
app.use(express.json());

// 2. Servir arquivos estáticos (CSS, JS, Imagens)
app.use(express.static(path.join(__dirname, 'public')));

// 3. CONFIGURAÇÃO DA SESSÃO (CORRIGIDO)
// Agora o session funciona globalmente para garantir que a API consiga acessá-lo.
app.use(session({
    secret: 'chave_super_complexa_do_projeto_unificado',
    name: 'secureSessionId', // Nome personalizado do cookie
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true, // 🛡️ A MÁGICA: JavaScript não vê este cookie
        secure: false,  // (Mantenha false para localhost. Em produção com HTTPS, use true)
        path: '/',      // O cookie vale para o site todo, mas é invisível pro JS
        maxAge: 3600000 // 1 hora de validade
    }
}));

// --- ROTAS DE NAVEGAÇÃO (Front-end) ---

// Página Inicial (Hub)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Página do Cenário Vulnerável
app.get('/vulnerable', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'vulnerable.html'));
});

// Página do Cenário Seguro
app.get('/secure', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'secure.html'));
});

// --- API BACKEND (Login Seguro) ---

app.post('/api/secure-login', (req, res) => {
    const { username } = req.body;

    // Regenera a sessão para evitar Session Fixation
    req.session.regenerate((err) => {
        if (err) {
            console.error("Erro ao gerar sessão:", err);
            return res.status(500).json({ message: "Erro interno no servidor" });
        }
        
        // Salva dados na sessão (no servidor)
        req.session.user = username || 'Usuário Seguro';
        req.session.isAuthenticated = true;
        
        // Retorna sucesso. O navegador receberá o cookie HttpOnly automaticamente no header.
        res.json({ status: 'success', user: req.session.user });
    });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`--------------------------------------------------`);
    console.log(`🚀 Servidor Unificado rodando em http://localhost:${PORT}`);
    console.log(`--------------------------------------------------`);
});