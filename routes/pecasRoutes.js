const express = require('express');
const router = express.Router();
const pecasController = require('../controllers/pecasController');

router.post('/', pecasController.cadastrarPeca);

router.get('/', pecasController.listarPecas);

router.put('/:id', pecasController.atualizarPeca);

router.delete('/:id', pecasController.apagarPeca);

module.exports = router;
