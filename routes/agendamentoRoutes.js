// routes/agendamentoRoutes.js
const express = require('express');
const router = express.Router();
const agendamentoController = require('../controllers/agendamentoController');

// Definição das rotas para Agendamento
router.post('/', agendamentoController.createAgendamento);
router.get('/', agendamentoController.getAgendamentos);
router.put('/:id_agendamento', agendamentoController.atualizarAgendamento); // Atualizar um agendamento
router.delete('/:id_agendamento', agendamentoController.deletarAgendamento); 

module.exports = router;
