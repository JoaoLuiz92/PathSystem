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

app.post('/clients/insertuser', function (req, res) {
  const conclusion = req.body.conclusion
  const name = req.body.name
  const student = req.body.student
  const certificate = req.body.certificate
  const course = req.body.course
  const expiration = req.body.expiration
  const email = req.body.email
  const fone = req.body.fone

  const query = `INSERT INTO clients (conclusion,name,student,certificate,course,expiration,email,fone) 
  VALUES ('${conclusion}','${name}','${student}', '${certificate}','${course}','${expiration}','${email}','${fone}')`

  pool.query(query, function (err) {
    if (err) {
      console.log(err)
    }

    res.redirect('/')
  })
})

app.get('/clients', function (req, res) {
  const query = `SELECT * FROM clients`

  console.log('Teste')

  pool.query(query, function (err, data) {
    if (err) {
      console.log(err)
    }

    const clients = data

    console.log(data)

    res.render('clients', { clients })
  })
})

app.get('/clients/:id', function (req, res) {
  const id = req.params.id

  const query = `SELECT * FROM clients WHERE id = ${id}`

  pool.query(query, function (err, data) {
    if (err) {
      console.log(err)
    }

    const user = data[0]

    console.log(data[0])

    res.render('user', { user })
  })
})

app.get('/clients/edit/:id', function (req, res) {
  const id = req.params.id

  const query = `SELECT * FROM clients WHERE id = ${id}`

  pool.query(query, function (err, data) {
    if (err) {
      console.log(err)
    }

    const user = data[0]

    console.log(data[0])

    res.render('edituser', { user })
  })
})

app.post('/clients/updateuser', function (req, res) {
  const id = req.body.id
  const conclusion = req.body.conclusion
  const name = req.body.name
  const student = req.body.student
  const certificate = req.body.certificate
  const course = req.body.course
  const expiration = req.body.expiration
  const email = req.body.email
  const fone = req.body.fone

  const query = `UPDATE clients SET  conclusion = '${conclusion}', name = '${name}',student = '${student},certificate = '${certificate}', course = '${course}', expiration = '${expiration}', email = '${email}', fone = '${fone}' WHERE id = ${id}`

  pool.query(query, function (err) {
    if (err) {
      console.log(err)
    }

    res.redirect(`/clients/edit/${id}`)
  })
})

app.post('/clients/remove/:id', function (req, res) {
  const id = req.params.id

  const query = `DELETE FROM clients WHERE id = ${id}`

  pool.query(query, function (err) {
    if (err) {
      console.log(err)
    }

    res.redirect(`/clients`)
  })
})

app.get(`/clients`, function (req, res) {
  
  const student = req.params.student
  const name = req.params.name

  
  pool.query(query, function (err) {
    if (err) {
      const query = "SELECT * FROM clients WHERE name LIKE '%"+name+"%' AND student LIKE'%"+student+"%'"
      console.log(query)
    }

    res.render('searchuser', { clients })
  })
})



/*app.get('/searchclients/:id', (req, res) => {

  const id = req.params.id
 
  const query = `SELECT * FROM clients WHERE name = ${id}`;
  pool.query(query, ['%' + id + '%'], (err) => {
    if (err) {
      console.log (err)
    }
    console.log(query)
    res.render(`shearchuser`, {user});
    

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
