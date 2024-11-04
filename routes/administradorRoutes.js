const express = require('express');
const router = express.Router();
const administradorController = require('../controllers/administradorController');

console.log('Carregando rotas de administrador');

router.post('/', administradorController.createAdministrador);

router.post('/login', administradorController.loginAdministrador);

module.exports = router;
