const Pool = require('pg').Pool
const pool = new Pool({
  user: 'basicuser',
  host: '3.133.172.207',
  database: 'aircloudy',
  password: 'sdc-time',
  port: 5432,
});

module.exports.pool = pool;
