const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Secret key for JWT
const JWT_SECRET = 'sua_chave_secreta_aqui'; // Mantenha esta chave em segredo e fora do código fonte!

// Cadastrar um novo usuário
exports.cadastrarUsuario = (req, res) => {
    const { username, password } = req.body;

    // Verificar se os dados foram fornecidos
    if (!username || !password) {
        return res.status(400).send('Username e password são obrigatórios');
    }

    // Hash da senha
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return res.status(500).send('Erro ao criar hash da senha');
        }

        const query = 'INSERT INTO usuario (username, password) VALUES (?, ?)';
        db.query(query, [username, hash], (err, result) => {
            if (err) {
                return res.status(500).send('Erro ao cadastrar usuário');
            }
            res.status(201).send('Usuário cadastrado com sucesso');
        });
    });
};

// Fazer login do usuário
exports.login = (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM usuario WHERE username = ?';
    db.query(query, [username], (err, results) => {
        if (err) {
            return res.status(500).send('Erro ao verificar usuário');
        }

        if (results.length === 0) {
            return res.status(404).send('Usuário não encontrado');
        }

        const user = results[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).send('Erro ao verificar senha');
            }

            if (!isMatch) {
                return res.status(401).send('Senha incorreta');
            }

            // Login bem-sucedido - gera um token JWT
            const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ message: 'Login bem-sucedido', token });
        });
    });
};
