// routes/index.js
const express = require('express');
const router = express.Router();

const servicoRoutes = require('./servicoRoutes');
const agendamentoRoutes = require('./agendamentoRoutes');
const administradorRoutes = require('./administradorRoutes');
const ferramentaRoutes = require('./ferramentaRoutes');

// Usando as rotas de cada controlador
router.use('/servicos', servicoRoutes);
router.use('/agendamentos', agendamentoRoutes);
router.use('/administradores', administradorRoutes); // Verifique se esta linha está correta
router.use('/ferramentas', ferramentaRoutes);

module.exports = router;
