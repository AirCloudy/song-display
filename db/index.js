const Pool = require('pg').Pool
const pool = new Pool({
  user: 'basicuser',
  host: 'localhost',
  database: 'aircloudy',
  password: 'sdc-time',
  port: 5432,
});

module.exports.pool = pool;
