const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require ('mysql')

const pool = require('./db/conn')

console.log(pool)

const app = express()

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

app.use(express.static('public'))

app.get('/', function (req, res) {
  res.render('home')
})

app.post('/books/insertbook', function (req, res) {
  const conclusion = req.body.conclusion
  const name = req.body.name
  const student = req.body.student
  const certificate = req.body.certificate
  const course = req.body.course
  const expiration = req.body.expiration
  const email = req.body.email
  const fone = req.body.fone

  const query = `INSERT INTO books (conclusion,name,student,certificate,course,expiration,email,fone) 
  VALUES ('${conclusion}','${name}','${student}', '${certificate}','${course}','${expiration}','${email}','${fone}')`

  pool.query(query, function (err) {
    if (err) {
      console.log(err)
    }

    res.redirect('/')
  })
})

app.get('/books', function (req, res) {
  const query = `SELECT * FROM books`

  console.log('Teste')

  pool.query(query, function (err, data) {
    if (err) {
      console.log(err)
    }

    const books = data

    console.log(data)

    res.render('books', { books })
  })
})

app.get('/books/:id', function (req, res) {
  const id = req.params.id

  const query = `SELECT * FROM books WHERE id = ${id}`

  pool.query(query, function (err, data) {
    if (err) {
      console.log(err)
    }

    const book = data[0]

    console.log(data[0])

    res.render('book', { book })
  })
})

app.get('/books/edit/:id', function (req, res) {
  const id = req.params.id

  const query = `SELECT * FROM books WHERE id = ${id}`

  pool.query(query, function (err, data) {
    if (err) {
      console.log(err)
    }

    const book = data[0]

    console.log(data[0])

    res.render('editbook', { book })
  })
})

app.post('/books/updatebook', function (req, res) {
  const id = req.body.id
  const conclusion = req.body.conclusion
  const name = req.body.name
  const student = req.body.student
  const certificate = req.body.certificate
  const course = req.body.course
  const expiration = req.body.expiration
  const email = req.body.email
  const fone = req.body.fone

  const query = `UPDATE books SET  conclusion = '${conclusion}', name = '${name}',student = '${student},certificate = '${certificate}', course = '${course}', expiration = '${expiration}', email = '${email}', fone = '${fone}' WHERE id = ${id}`

  pool.query(query, function (err) {
    if (err) {
      console.log(err)
    }

    res.redirect(`/books/edit/${id}`)
  })
})

app.post('/books/remove/:id', function (req, res) {
  const id = req.params.id

  const query = `DELETE FROM books WHERE id = ${id}`

  pool.query(query, function (err) {
    if (err) {
      console.log(err)
    }

    res.redirect(`/books`)
  })
})

app.get(`/books`, function (req, res) {
  
  const student = req.params.student
  const name = req.params.name

  
  pool.query(query, function (err) {
    if (err) {
      const query = "SELECT * FROM books WHERE name LIKE '%"+name+"%' AND student LIKE'%"+student+"%'"
      console.log(query)
    }

    res.render('searchbook', { books })
  })
})



/*app.get('/searchbooks/:id', (req, res) => {

  const id = req.params.id
 
  const query = `SELECT * FROM books WHERE name = ${id}`;
  pool.query(query, ['%' + id + '%'], (err) => {
    if (err) {
      console.log (err)
    }
    console.log(query)
    res.render(`shearchbook`, {book});
    

  });
});

/*app.post('/search', (req, res) => {

  pool.query(sql, ['%' + query + '%'], (err, results) => {
    if (err) {
      console.log (err)
    }
    // Render search results here
    res.render(`/search/${id}`);
  });
});*/

app.listen(3000)
