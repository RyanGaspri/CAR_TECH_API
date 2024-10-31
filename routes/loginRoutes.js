const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.post('/cadastrar', loginController.cadastrarUsuario);

// Rota para fazer login
router.post('/login', loginController.login);

module.exports = router;
