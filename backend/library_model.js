const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'library',
  password: 'test123',
  port: 5432,
});


const getBooks = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM books ORDER BY id ASC', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }

  const getStudents = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM students ORDER BY id ASC', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }

  const addBook = (body) => {
    return new Promise(function(resolve, reject) {
      const { name, email } = body
      pool.query('INSERT INTO books (name,author,stdname, borrowdate,returndate) VALUES ($1, $2,$3,$4,$5) RETURNING *', [name, author,stdname,borrowdate,returndate], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`A new book has been added added: ${results.rows[0]}`)
      })
    })
  }

  
  module.exports = {
    getBooks,
    addBook,
    getStudents
  }