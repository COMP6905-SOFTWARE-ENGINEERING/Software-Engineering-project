// load the express package and create our app
var express = require('express');
var fs = require('fs');
var rfs = require('rotating-file-stream');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var config = require('config-lite')(__dirname);


var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var chgpwdRouter = require('./routes/chgpwd');
var userRouter = require('./routes/user');
var projectRouter = require('./routes/project');
var startingRouter = require('./routes/starting');
var matchRouter = require('./routes/match');
var dashboardRouter = require('./routes/dashboard');

var app = express();
var logDirectory = path.join(__dirname, 'log');

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// create a rotating write stream
var accessLogStream = rfs('access.log', {
    interval: '1d', // rotate daily
    path: logDirectory
});

// setup the logger
app.use(logger('combined', { stream: accessLogStream }));

var url = config.mongodb; //mongodb address
mongoose.connect(url, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

 // send our index.html file to the user for the home page
// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('mycookie'));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use(session({
    secret: 'mycookie',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ url: config.mongodb })
}));

app.use('/index', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/chgpwd', chgpwdRouter);
app.use('/user', userRouter);
app.use('/project', projectRouter);
app.use('/starting', startingRouter);
app.use('/match', matchRouter);
app.use('/dashboard', dashboardRouter);
app.get('/', function(req, res) {
    res.redirect('/index');
 });

// 404 page
app.use(function (req, res) {
    if (!res.headersSent) {
        res.status(404).render('404')
    }
});

var debug = require('debug')('Software-Engineering-project:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || config.port);
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// server start statement
console.log('Software Engineering Group 4 Port 3334 is now active');

//引入socket模块
var serverSocket = require('./websocket/server_socket');
serverSocket(server);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

