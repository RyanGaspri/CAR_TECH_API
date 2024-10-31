const db = require('../config/db');
const { format } = require('date-fns');



exports.cadastrarServico = (req, res) => {
    const { descricao, preco, data_servico } = req.body;

      if (!data_servico) {
        return res.status(400).send('Data do serviço é obrigatória');
    }

    const [day, month, year] = data_servico.split('/');
    const formattedDate = `${year}-${month}-${day}`;


    const query = 'INSERT INTO servicos (descricao, preco, data_servico) VALUES (?, ?, ?)';
    db.query(query, [descricao, preco, formattedDate], (err, result) => {
        if (err) {
            console.error(err); 
            res.status(500).send('Erro ao cadastrar serviço');
        } else {
            res.status(201).send('Serviço cadastrado com sucesso');
        }
    });
};

exports.listarServicos = (req, res) => {
    const query = 'SELECT * FROM servicos';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err); 
            res.status(500).send('Erro ao listar serviços');
        } else {
            const formattedResults = results.map(servico => ({
                ...servico,
                data_servico: format(new Date(servico.data_servico), 'dd/MM/yyyy')
            }));
            res.json(formattedResults);
        }
    });
};

exports.alterarServico = (req, res) => {
    const { id } = req.params; 
    const { descricao, preco, data_servico } = req.body;

    const formattedDate = format(new Date(data_servico), 'yyyy-MM-dd');

    const query = 'UPDATE servicos SET descricao = ?, preco = ?, data_servico = ? WHERE id = ?';
    db.query(query, [descricao, preco, formattedDate, id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erro ao alterar serviço');
        } else {
            res.status(200).send('Serviço alterado com sucesso');
        }
    });
};

exports.apagarServico = (req, res) => {
    const { id } = req.params; 

    const query = 'DELETE FROM servicos WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erro ao apagar serviço');
        } else if (result.affectedRows === 0) {
            res.status(404).send('Serviço não encontrado');
        } else {
            res.status(200).send('Serviço apagado com sucesso');
        }
    });
};
