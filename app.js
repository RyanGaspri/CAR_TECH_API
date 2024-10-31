const express = require('express');
const app = express();

app.use(express.json());

const servicosRoutes = require('./routes/servicosRoutes');
const pecasRoutes = require('./routes/pecasRoutes');
const loginRoutes = require('./routes/loginRoutes');

app.use('/servicos', servicosRoutes);
app.use('/pecas', pecasRoutes);
app.use('/login', loginRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
