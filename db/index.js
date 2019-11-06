const Pool = require('pg').Pool
const pool = new Pool({
  user: 'basicuser',
  host: 'localhost',
  database: 'aircloudy',
  password: 'sdc-time',
  port: 5432,
});

const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ contactPoints: ['localhost'], localDataCenter: 'datacenter1', keyspace: 'aircloudy' });

module.exports.pool = pool;
module.exports.client = client;
