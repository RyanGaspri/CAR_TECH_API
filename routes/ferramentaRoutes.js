// routes/ferramentaRoutes.js
const express = require('express');
const router = express.Router();
const ferramentaController = require('../controllers/ferramentaController');

// Definição das rotas para Ferramenta
router.post('/', ferramentaController.createFerramenta);
router.get('/', ferramentaController.getFerramentas);

router.put('/:id_ferramenta', ferramentaController.atualizarFerramenta); // Atualizar uma ferramenta
router.delete('/:id_ferramenta', ferramentaController.deletarFerramenta);

module.exports = router;
