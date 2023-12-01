var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressSession= require('express-session');
const flash= require('connect-flash');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const passport= require('passport');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//<-app.js----->
app.use(expressSession({
  resave:false,
  saveUninitialized:false,
  secret:"hello hello hello baye"
}));
app.use(passport.initialize());//suru ho jao authentication ke liye
app.use(passport.session());//passport ka session vala module on kar rha hu jisse passport aapne session ko save kar sake
passport.serializeUser(function(){usersRouter.serializeUser()});
passport.deserializeUser(function(){usersRouter.deserializeUser()});
//<--app.js----->
app.use(flash());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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