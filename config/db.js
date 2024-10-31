const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'RyanDev',
    password: 'GaspriDB',  // substitua pela senha correta
    database: 'carTechdb'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conectado ao banco de dados MySQL');
    }
});

module.exports = db;
