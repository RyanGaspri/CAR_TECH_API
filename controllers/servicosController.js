// controllers/servicoController.js
const db = require('../config/db');

exports.createServico = (req, res) => {
    const { descricao, preco, status_servico } = req.body;

    const query = 'INSERT INTO Servico (descricao, preco, status_servico) VALUES (?, ?, ?)';
    db.query(query, [descricao, preco, status_servico], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao criar serviço');
        }
        res.status(201).send({ message: 'Serviço criado com sucesso', id_servico: result.insertId });
    });
};

exports.getServicos = (req, res) => {
    db.query('SELECT * FROM Servico', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao buscar serviços');
        }
        res.status(200).json(results);
    });
};

exports.deletarServico = (req, res) => {
    const { id_servico } = req.params;
    
    const query = 'DELETE FROM Servico WHERE id_servico = ?';
    
    db.query(query, [id_servico], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao deletar serviço');
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Serviço não encontrado');
        }
        res.send('Serviço deletado com sucesso');
    });
};

exports.atualizarServico = (req, res) => {
    const { id_servico } = req.params;
    const { descricao, preco, status_servico } = req.body;

    const query = 'UPDATE Servico SET descricao = ?, preco = ?, status_servico = ? WHERE id_servico = ?';
    
    db.query(query, [descricao, preco, status_servico, id_servico], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao atualizar serviço');
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Serviço não encontrado');
        }
        res.send('Serviço atualizado com sucesso');
    });
};

