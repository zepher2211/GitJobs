var createError = require('http-errors');
var path = require('path');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const passport = require('passport');
var logger = require('morgan');
// const session = require('express-session');
const cors = require('cors');
var express = require('express');
require('dotenv').config()
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
require('./auth/auth');
const uuidv4 = require('uuid/v4');

server.listen(80);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const protectedRouter = require('./routes/protected-routes');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.options('*', cors())
// app.use(session({
//   genid: function(req) {
//     return uuidv4(); // use UUIDs for session IDs
//   },
//   secret: 'pothers',
//   resave: false, 
//   saveUninitialized: true,
//   cookie: {
//     expires: 600000
//   }
// }))
//app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/user', passport.authenticate('jwt', { session : false }), protectedRouter );


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
