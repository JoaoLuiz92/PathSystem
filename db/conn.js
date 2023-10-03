const mysql = require('mysql')

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodemysql',
  dateStrings:'date',
  
})
module.exports = pool