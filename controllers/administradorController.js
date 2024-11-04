const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

exports.createAdministrador = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username e password são obrigatórios');
    }

    // Gerando o hash da senha
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.error(err); // Log do erro
            return res.status(500).send('Erro ao criar hash da senha');
        }

        // Inserindo o administrador no banco de dados
        const query = 'INSERT INTO Administrador (username, password_hash) VALUES (?, ?)';
        db.query(query, [username, hash], (err) => {
            if (err) {
                console.error(err); // Log do erro
                return res.status(500).send('Erro ao cadastrar administrador');
            }
            res.status(201).send('Administrador cadastrado com sucesso');
        });
    });
};

exports.loginAdministrador = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username e password são obrigatórios');
    }

    // Buscar administrador pelo username
    const query = 'SELECT * FROM Administrador WHERE username = ?';
    db.query(query, [username], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao buscar administrador');
        }

        if (results.length === 0) {
            return res.status(404).send('Administrador não encontrado');
        }

        const administrador = results[0];

        // Comparar senha fornecida com a senha armazenada
        bcrypt.compare(password, administrador.password_hash, (err, isMatch) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erro ao verificar senha');
            }

            if (!isMatch) {
                return res.status(401).send('Senha incorreta');
            }

            // Gerar token JWT
            const token = jwt.sign(
                { id_adm: administrador.id_adm, username: administrador.username },
                JWT_SECRET,
                { expiresIn: '1h' } // Token expira em 1 hora
            );

            res.json({ message: 'Login bem-sucedido', token });
        });
    });
};
