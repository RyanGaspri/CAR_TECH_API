// controllers/agendamentoController.js
const db = require('../config/db');

exports.createAgendamento = (req, res) => {
    // Definindo valores padrão como null para id_servico e id_adm caso não sejam fornecidos
    const {
        id_servico = null,
        id_adm = null,
        nome_cliente,
        contato_cliente,
        data_agendamento
    } = req.body;

    const query = `
        INSERT INTO Agendamento (id_servico, id_adm, nome_cliente, contato_cliente, data_agendamento)
        VALUES (?, ?, ?, ?, ?)
    `;
    
    db.query(query, [id_servico, id_adm, nome_cliente, contato_cliente, data_agendamento], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao criar agendamento');
        }
        res.status(201).send({ message: 'Agendamento criado com sucesso', id_agendamento: result.insertId });
    });
};

exports.getAgendamentos = (req, res) => {
    db.query('SELECT * FROM Agendamento', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao buscar agendamentos');
        }
        res.status(200).json(results);
    });
};

// Código no back-end para deletar o agendamento
exports.deletarAgendamento = (req, res) => {
    const { id_agendamento } = req.params;
    console.log('ID do agendamento recebido:', id_agendamento); // Verifique se o ID está correto

    if (!id_agendamento) {
        return res.status(400).send('ID do agendamento não fornecido');
    }

    const query = 'DELETE FROM Agendamento WHERE id_agendamento = ?';
    
    db.query(query, [id_agendamento], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao deletar agendamento');
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Agendamento não encontrado');
        }
        res.send('Agendamento deletado com sucesso');
    });
};


exports.atualizarAgendamento = (req, res) => {
    const { id_agendamento } = req.params;
    const { id_servico, id_adm, nome_cliente, contato_cliente, data_agendamento } = req.body;

    const query = `
        UPDATE Agendamento 
        SET id_servico = ?, id_adm = ?, nome_cliente = ?, contato_cliente = ?, data_agendamento = ? 
        WHERE id_agendamento = ?
    `;
    
    db.query(query, [id_servico, id_adm, nome_cliente, contato_cliente, data_agendamento, id_agendamento], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao atualizar agendamento');
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Agendamento não encontrado');
        }
        res.send('Agendamento atualizado com sucesso');
    });
};
