// routes/servicoRoutes.js
const express = require('express');
const router = express.Router();
const servicoController = require('../controllers/servicosController');

// Definição das rotas para Serviço
router.post('/', servicoController.createServico);
router.get('/', servicoController.getServicos);

router.put('/:id_servico', servicoController.atualizarServico); // Atualizar um serviço
router.delete('/:id_servico', servicoController.deletarServico); 

module.exports = router;
