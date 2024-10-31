const db = require('../config/db');

exports.cadastrarPeca = (req, res) => {
    const { nome, quantidade, preco } = req.body;
    const query = 'INSERT INTO pecas (nome, quantidade, preco) VALUES (?, ?, ?)';
    db.query(query, [nome, quantidade, preco], (err, result) => {
        if (err) {
            res.status(500).send('Erro ao cadastrar peça');
        } else {
            res.status(201).send('Peça cadastrada com sucesso');
        }
    });
};

// Método para listar todas as peças
exports.listarPecas = (req, res) => {
    const query = 'SELECT * FROM pecas';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao listar peças:', err);
            res.status(500).send('Erro ao listar peças');
        } else {
            res.json(results);
        }
    });
};

exports.atualizarPeca = (req, res) => {
    const { id } = req.params; 
    const {nome, quantidade, preco } = req.body;

    const query = 'UPDATE pecas SET nome = ?, quantidade = ?, preco = ?  WHERE id = ?';
    db.query(query, [nome, quantidade, preco, id], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar peça:', err);
            res.status(500).send('Erro ao atualizar peça');
        } else if (result.affectedRows === 0) {
            res.status(404).send('Peça não encontrada');
        } else {
            res.send('Peça atualizada com sucesso');
        }
    });
};

exports.apagarPeca = (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM pecas WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Erro ao apagar peça:', err);
            res.status(500).send('Erro ao apagar peça');
        } else if (result.affectedRows === 0) {
            res.status(404).send('Peça não encontrada');
        } else {
            res.send('Peça apagada com sucesso');
        }
    });
};
