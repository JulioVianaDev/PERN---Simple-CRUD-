const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  password: 'juliovianadev',
  host: 'localhost',
  port: 5432,
  database: "projetopern"
})

module.exports = pool;
