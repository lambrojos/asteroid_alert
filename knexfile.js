module.exports = {
  client: 'mysql',
  connection: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    charset: 'UTF8',
    pool: {min: 1, max: 2},
    timezone: 'UTC',
    multipleStatements: false
  }
}
