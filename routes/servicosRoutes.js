const express = require('express');
const router = express.Router();
const servicosController = require('../controllers/servicosController');

router.post('/', servicosController.cadastrarServico);

router.get('/', servicosController.listarServicos);

router.put('/:id', servicosController.alterarServico);

router.delete('/:id', servicosController.apagarServico);

module.exports = router;
