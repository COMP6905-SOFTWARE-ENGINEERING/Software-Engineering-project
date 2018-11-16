// load the express package and create our app
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');


var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var chgpwdRouter = require('./routes/chgpwd');
var userRouter = require('./routes/user');
var projectRouter = require('./routes/project');

var app = express();

var url = 'mongodb://127.0.0.1:27017/GradRecDB';
mongoose.connect(url, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

 // send our index.html file to the user for the home page
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('mycookie'));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use(session({
    secret: 'mycookie',
    resave: false,
    saveUninitialized: false
}));

app.use('/index', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/chgpwd', chgpwdRouter);
app.use('/user', userRouter);
app.use('/project', projectRouter);
app.get('/', function(req, res) {
    res.redirect('/index');
 });

// 404 page
app.use(function (req, res) {
    if (!res.headersSent) {
        res.status(404).render('404')
    }
});
//app.get('/signup',function(req,res){
//  res.sendFile(path.join(__dirname+'/signup.html'));
//});
 // start the server
 app.listen(3334);
 console.log('Software Engineering Group 4 Port 3334 is now active');
// console.log(__dirname + '/index.html');

module.exports = app;