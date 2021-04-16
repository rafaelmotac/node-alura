import mysql from 'mysql2';

const conexao = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'agenda-petshop'
})

export default conexao;