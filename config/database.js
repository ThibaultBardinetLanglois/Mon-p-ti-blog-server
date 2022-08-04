const mysql = require('promise-mysql')

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
})
.catch(err => { throw err })

pool
  .then(connection => {
    connection.query('SELECT 1')
    .then(() => {
      console.log(`Connected to the "${process.env.DB_NAME}" database on port ${process.env.DB_PORT}`)
    })
    .catch(err => console.log(err))
  })

module.exports = {
  pool
}