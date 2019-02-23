//use path module
const path = require('path');
//use express module
const express = require('express');
//use hbs view engine
const hbs = require('hbs');
//use bodyParser middleware
const bodyParser = require('body-parser');

const app = express();

const hostname = '127.0.0.1';
const port = 3000;

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
app.get('/:name',(req, res) => {
  //render index.hbs file
  res.render('index',{
    name : req.params.name
  });
});

app.get('/home', function (req, res) {
  res.send('Welcome to Express');
});

app.get('/about', function (req, res) {
  res.send('This is about page');
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
