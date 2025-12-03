const express = require('express');
const app = express();
const path = require('path');

// Serve os arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server rodando em http://localhost:${PORT}`);
    console.log(`Acesse para ver a demonstração.`);
});