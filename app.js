const express = require('express');
const cors = require('cors'); // Importa o pacote cors
const app = express();
const db = require('./config/db'); // Certifique-se de ter a conexão com o banco de dados
const routes = require('./routes'); // Importando as rotas

app.use(cors()); // Permite requisições de qualquer origem
app.use(express.json()); // Para permitir o uso de JSON nas requisições
app.use('/api', routes); // Usando as rotas prefixadas com /api


const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
