//use path module
const path = require('path');
//use express module
const express = require('express');
//use hbs view engine
const hbs = require('hbs');
//use bodyParser middleware
const bodyParser = require('body-parser');
//use mysql database
const mysql = require('mysql');

const app = express();

const hostname = '127.0.0.1';
const port = 3000;

//Create Connection
const db = mysql.createConnection({
  host: hostname,
  user: 'root',
  password: 'root',
  database: 'nodejs'
});

//connect to database
db.connect((err) => {
  if(err) throw err;
  console.log('Mysql Connected...');
});

//set dynamic views file
app.set('views',path.join(__dirname,'views'));
//set view engine
app.set('view engine', 'hbs');
//set public folder as static folder for static file
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));

//route for home page
app.get('/',(req, res) => {
  //render index.hbs file
  res.render('index',{
    name : "M Fikri"
  });
});

//route for showing form
app.get('/post',(req, res) => {
  //render form.hbs file
  res.render('form');
});

//route for submit form by using post method
app.post('/post',(req, res) => {
  //render file form.hbs
  res.render('index',{
    //get value from textname
    name : req.body.textname
  });
});

//route for home with params name
// app.get('/:name',(req, res) => {
//   //render index.hbs file
//   res.render('index',{
//     name : req.params.name
//   });
// });

app.get('/home', function (req, res) {
  res.send('Welcome to Express');
});

app.get('/about', function (req, res) {
  res.send('This is about page');
});

app.get('/users/create',(req, res) => {
  res.render('users/create');
});

app.post('/users',(req, res) => {
  let name = req.body.name;
  let data = {name: name, email: req.body.email};
  let sql = "INSERT INTO nodejs.users SET ?";
  let query = db.query(sql, data, (err, results) => {
    if(err) throw err;
    res.redirect('/users');
  });
});

app.get('/users',(req, res) => {
  let sql = "SELECT * FROM users";
  let query = db.query(sql, (err, users) => {
    if(err) throw err;
    res.render('users/index',{
      users: users
    });
  });
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
