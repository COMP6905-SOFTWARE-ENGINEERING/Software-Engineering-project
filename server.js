// load the express package and create our app
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var signupRouter = require('./routes/signup');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

 // send our index.html file to the user for the home page
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('mycookie'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/signup', signupRouter);

app.get('/', function(req, res) {
res.sendFile(path.join(__dirname + '/index.html'));
 });
//app.get('/signup',function(req,res){
//  res.sendFile(path.join(__dirname+'/signup.html'));
//});
 // start the server
 app.listen(3334);
 console.log('3334 is the magic port!');
console.log(__dirname + '/index.html');
