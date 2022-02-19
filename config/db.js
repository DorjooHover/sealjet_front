const { createPool } = require('mysql2')
const pool = createPool({
     host: 'localhost',
     user: 'root',
     password: 'dorjooX0',
     port: 3306,
     database: 'sealjet',
})

pool.getConnection((err) => {
     if (err) {
          console.log('error to connected db')
     }
     console.log('Connected to db')
})

const executeQuery = (query, arraParams) => {
     return new Promise((resolve, reject) => {
          try {
               pool.query(query, arraParams, (err, data) => {
                    if (err) {
                         console.log('error in execute query ', err)
                         reject(err)
                    }
                    resolve(data)
               }
               )
          } catch (error) {
               reject(error)
          }
     })
}
module.exports = { executeQuery }