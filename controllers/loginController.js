const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'key'; 

exports.cadastrarUsuario = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username e password são obrigatórios');
    }

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

            const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ message: 'Login bem-sucedido', token });
        });
    });
};
