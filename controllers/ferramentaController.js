// controllers/ferramentaController.js
const db = require('../config/db');

exports.createFerramenta = (req, res) => {
    const { categoria, nome_ferramenta } = req.body;

    const query = 'INSERT INTO Ferramenta (categoria, nome_ferramenta) VALUES (?, ?)';
    db.query(query, [categoria, nome_ferramenta], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao criar ferramenta');
        }
        res.status(201).send({ message: 'Ferramenta criada com sucesso', id_ferramenta: result.insertId });
    });
};

exports.getFerramentas = (req, res) => {
    db.query('SELECT * FROM Ferramenta', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao buscar ferramentas');
        }
        res.status(200).json(results);
    });
};
exports.deletarFerramenta = (req, res) => {
    const { id_ferramenta } = req.params;
    
    const query = 'DELETE FROM Ferramenta WHERE id_ferramenta = ?';
    
    db.query(query, [id_ferramenta], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao deletar ferramenta');
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Ferramenta não encontrada');
        }
        res.send('Ferramenta deletada com sucesso');
    });
};

exports.atualizarFerramenta = (req, res) => {
    const { id_ferramenta } = req.params;
    const { categoria, nome_ferramenta } = req.body;

    const query = 'UPDATE Ferramenta SET categoria = ?, nome_ferramenta = ? WHERE id_ferramenta = ?';
    
    db.query(query, [categoria, nome_ferramenta, id_ferramenta], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao atualizar ferramenta');
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Ferramenta não encontrada');
        }
        res.send('Ferramenta atualizada com sucesso');
    });
};

